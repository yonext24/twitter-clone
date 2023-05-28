import { options } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import dbConnect from '../dbConnect'
import Tweet from '../models/Tweet'
import UserInteractions from '../models/UserInteractions'
import { isValidObjectId } from 'mongoose'
import { deleteImage } from '@firebase/utils'
import { ObjectId } from 'mongodb'

export const getSingleTweet = async (req, res) => {
  const id = req.query.id
  const getThread = req.query.getThread
  if (!id) return res.status(405).json({ error: 'There are no tweet!' })

  const session = await getServerSession(req, res, options)

  if (!isValidObjectId(id)) return res.status(404).json({ error: 'The id is not a valid ObjectId.' })

  let tweet
  try {
    tweet = await Tweet.findOne({ _id: id })
  } catch (err) {
    return res.status(404).json({ error: `Tweet with id ${id} was not found.` })
  }

  if (!tweet) return res.status(404).json({ error: `Tweet with id ${id} was not found.` })

  await tweet.populate({
    path: 'author'
  })
  await tweet.populate({
    path: 'reply.replyingUser',
    select: 'slug'
  })
  await tweet.populate({
    path: 'replies',
    populate: [
      { path: 'author' },
      { path: 'reply.replyingUser', select: ['slug'] }
    ]
  })

  if (getThread) {
    const threadTweets = [tweet]
    try {
      let user
      if (session) {
        user = await UserInteractions.findOne({ _id: session.user.id })
        const isMainTweetLiked = user.likedTweets.some(el => el.tweet.equals(tweet._id))
        const isMainTweetBookmarked = user.bookmarks.some(el => el.tweet.equals(tweet._id))
        threadTweets[0] = { ...tweet._doc, isLiked: isMainTweetLiked, isBookmarked: isMainTweetBookmarked }
      }

      while (true) {
        if (threadTweets[0].reply.isReplying && !threadTweets[0].reply.isReplyDeleted) {
          const newTweet = await Tweet.findOne({ _id: threadTweets[0].reply.replyingTo })
          console.log(newTweet)
          await newTweet.populate({
            path: 'author'
          })
          await newTweet.populate({
            path: 'reply.replyingUser',
            select: 'slug'
          })
          await newTweet.populate({
            path: 'replies',
            populate: [
              { path: 'author' },
              { path: 'reply.replyingUser', select: ['slug'] }
            ]
          })
          if (!user) threadTweets.unshift(newTweet)
          const isNewTweetLiked = user.likedTweets.some(el => el.tweet.equals(newTweet._id))
          const isNewTweetBookmarked = user.bookmarks.some(el => el.tweet.equals(newTweet._id))

          threadTweets.unshift({ ...newTweet._doc, isLiked: isNewTweetLiked, isBookmarked: isNewTweetBookmarked })
        } else break
      }
      return res.status(200).json(threadTweets)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Error while finding thread' })
    }
  }

  if (session) {
    const user = await UserInteractions.findOne({ _id: session.user.id })
    const isMainTweetLiked = user.likedTweets.some(el => el.tweet.equals(tweet._id))
    const isMainTweetBookmarked = user.bookmarks.some(el => el.tweet.equals(tweet._id))

    const parsedReplies = tweet.replies.map(document => {
      const likeMatch = user.likedTweets.some(el => el.tweet.equals(document._id))
      const bookmarkMatch = user.bookmarks.some(el => el.tweet.equals(document._id))

      return { ...document._doc, isLiked: likeMatch, isBookmarked: bookmarkMatch }
    })
    tweet._doc.replies = parsedReplies

    return res.status(200).json({ ...tweet._doc, isLiked: isMainTweetLiked, isBookmarked: isMainTweetBookmarked })
  }

  return res.status(200).json(tweet)
}
export const createTweet = async (req, res) => {
  if (!req.body) return res.status(405).json({ error: 'There are no body!' })
  try {
    JSON.parse(req.body)
  } catch {
    return res.status(406).json({ error: 'Expected json' })
  }
  const { data: body } = JSON.parse(req.body)
  const { replyingUser, replyingTo, data, image } = body

  const hasImage = Boolean(image?.src)
  const isReplying = Boolean(replyingTo && replyingUser)

  if (!data && !hasImage) return res.status(404).json({ error: 'Expected data' })

  const session = await getServerSession(req, res, options)
  if (!session) return res.status(401).json({ error: 'You are not logged!' })

  try {
    await dbConnect()
    const tweet = new Tweet({
      content: data,
      author: session.user.id,
      reply: {
        isReplying,
        ...(isReplying && {
          replyingUser,
          replyingTo
        })
      },
      image: {
        hasImage,
        ...(hasImage && { src: image.src, id: image.id, width: image.width, height: image.height, aspectRatio: image.width / image.height })
      }
    })

    if (isReplying) {
      try {
        await Tweet.updateOne({ _id: replyingTo }, { $push: { replies: tweet._id } }).lean()
      } catch {
        throw new Error('Error al actualizar la lista de respuestas del comentario respondido')
      }
    }
    try {
      await UserInteractions.updateOne({ _id: session.user.id }, { $push: { tweets: { tweet: tweet._id } } })
    } catch {
      throw new Error('Error al actualizar la lista de tweets del usuario')
    }

    await tweet.save()
    await tweet.populate({ path: 'author', select: ['image', 'username', 'slug'] })
    if (tweet.reply.isReplying) {
      await tweet.populate({ path: 'reply.replyingUser', select: 'slug' })
    }

    return res.status(200).json(tweet)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Error while creating tweet' })
  }
}
export const getTimelineTweets = async (req, res) => {
  if (!req.query.page) return res.status(404).json({ error: 'Page not found' })

  const session = await getServerSession(req, res, options)

  try {
    await dbConnect()

    const porPagina = 10
    const pagina = req.query.page
    const saltar = (pagina - 1) * porPagina

    const myDocuments = await Tweet.find()
      .sort({ createdAt: -1 })
      .skip(saltar)
      .limit(porPagina)
      .populate({
        path: 'author',
        select: ['image', 'username', 'slug']
      })
      .populate({ path: 'reply.replyingUser', select: ['slug'] })

    const hasMore = myDocuments.length === porPagina

    if (session) {
      const user = await UserInteractions.findOne({ _id: session.user.id })

      const parsedDocuments = myDocuments
        .map(document => {
          const likeMatch = user.likedTweets.some(el => el.tweet.equals(document._id))
          const bookmarkMatch = user.bookmarks.some(el => el.tweet.equals(document._id))

          return { ...document._doc, isLiked: likeMatch, isBookmarked: bookmarkMatch }
        })
        .map((el, _, array) => {
          if (!el.reply.isReplying) return el
          else {
            const index = array.findIndex(e => e._id.equals(el.reply.replyingTo))
            if (index < 0) return el
            if (array[index].currentReplie) return el
            array[index].currentReplie = el._id
            return { ...el, isCurrentlyReplying: array[index]._id }
          }
        })
      parsedDocuments.forEach(el => console.log(el.content))
      const correctlySorted = []
      parsedDocuments.forEach(el => {
        if (!el.currentReplie && !el.isCurrentlyReplying) {
          correctlySorted.push(el)
          return
        }
        // ^ Si el elemento no está respondiendo a nada o no está siendo respondido se agrega y listo

        // el problema es que si el elemento que esta respondiendo viene antes que el que está siendo respondido se van a
        // ordenar incorrectamente

        if (el.isCurrentlyReplying) {
          const indexOfElementBeingResponded = correctlySorted.findIndex(({ _id }) => _id.equals(el.isCurrentlyReplying))
          // ^ Si el elemento actual del forEach esta respondiendo, se localiza el elemento al que está respondiendo

          if (indexOfElementBeingResponded >= 0) {
            // ^ Si el indice se encuentra quiere decir que dentro del array ya hay un elemento que está siendo respondido por este elemento
            // por lo que este elemento se inyecta justo abajo de ese
            correctlySorted.splice(indexOfElementBeingResponded, 0, el)
          } else {
            if (!el.currentReplie) {
              // ^ Si el elemento no está respondiendo a nada y no se encuentra el elemento siendo respondido simplemente se agrega atrás de todo
              correctlySorted.push(el)
              return
            }
            // Si el elemento está siendo respondido hay que verificar si la respuesta no se encuentra dentro del array para
            // inyectar este elemento arriba de esta respuesta, caso contrario simplemente se agrega al final del array
            // estas verificaciones deben hacerse porque es posible que un tweet este respondiendo y siendo respondido a la vez
            const indexOfElementResponding = correctlySorted.findIndex(doc => doc._id.equals(el.currentReplie))
            if (indexOfElementResponding < 0) correctlySorted.push(el)
            else correctlySorted.splice(indexOfElementResponding, 0, el)
          }
        } else if (el.currentReplie) {
          // ^ Si el elemento tiene una respuesta, pero no está respondiendo a nada, se verifica si el elemento que lo está respondiendo
          // ya se encuentra dentro del array, para en ese caso agregarlo arriba, de lo contrario, simplemente se agrega
          const indexOfRespondingElement = correctlySorted.findIndex(({ _id }) => _id.equals(el.currentReplie))

          if (indexOfRespondingElement < 0) {
            correctlySorted.push(el)
            return
          }

          correctlySorted.splice(indexOfRespondingElement, 0, el)
        }
      })

      return res.status(200).json({ tweets: correctlySorted, hasMore })
    }

    return res.status(200).json({ tweets: myDocuments, hasMore })
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error while finding tweets.')
  }
}
export const likeTweet = async (req, res) => {
  if (!req.body) return res.status(404).json({ error: 'Comment id not found' })

  const tweetId = req.body

  const session = await getServerSession(req, res, options)
  if (!session) return res.status(401).json({ error: 'You are not logged!' })

  try {
    await dbConnect()

    const userHasLiked = await Tweet.exists({ _id: tweetId, usersWhoLiked: session.user.id })

    const update = userHasLiked
      ? { $inc: { likes: -1 }, $pull: { usersWhoLiked: session.user.id } }
      : { $inc: { likes: 1 }, $push: { usersWhoLiked: session.user.id } }

    const updateUser = userHasLiked
      ? { $pull: { likedTweets: { tweet: tweetId } } }
      : { $push: { likedTweets: { tweet: tweetId } } }

    const updatedTweet = await Tweet.findOneAndUpdate({ _id: tweetId }, update, { new: true })
    await UserInteractions.updateOne({ _id: session.user.id }, updateUser)

    await updatedTweet.save()

    return res.status(200).json({ likes: updatedTweet.likes, isLiked: !userHasLiked })
  } catch (_) {
    console.log(_)
    return res.status(500).json({ error: 'Error while creating like' })
  }
}
export const deleteTweet = async (req, res) => {
  if (!req.body) return res.status(404).json({ error: 'Tweet id not found' })
  const tweetId = req.body

  const session = await getServerSession(req, res, options)
  if (!session) return res.status(401).json({ error: 'You are not logged!' })

  try {
    await dbConnect()

    const tweet = await Tweet.findOne({ _id: tweetId })
    if (tweet.author._id.toString() !== session.user.id && session.user.role !== 'admin') return res.status(406).json({ error: 'You are not authorized' })

    if (tweet.image.hasImage) {
      await deleteImage(session.user.id, tweet.image.id)
    }
    if (tweet.replies.length > 0) {
      await Tweet.updateMany({ 'reply.replyingTo': tweetId }, { 'reply.isReplyDeleted': true })
    }
    if (tweet.bookmarks > 0) {
      await UserInteractions.updateMany(
        { bookmarks: { $elemMatch: { tweet: { $eq: tweetId } } } },
        { $pull: { bookmarks: { tweet: tweetId } } }
      )
    }
    if (tweet.likes > 0) {
      await UserInteractions.updateMany(
        { likedTweets: { $elemMatch: { tweet: { $eq: tweetId } } } },
        { $pull: { likedTweets: { tweet: tweetId } } }
      )
    }

    await UserInteractions.updateOne({ _id: session.user.id }, { $pull: { tweets: { tweet: tweetId } } })
    await Tweet.deleteOne({ _id: tweet._id })
    if (tweet.reply.isReplying) {
      await Tweet.updateOne({ _id: tweet.reply.replyingTo }, { $pull: { replies: tweetId } })
    }

    return res.status(200).json({ success: 'Tweet Deleted' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Error while deleting tweet' })
  }
}
export const bookmarkTweet = async (req, res) => {
  if (!req.body) return res.status(400).json({ error: 'Id is needed ' })
  const tweetId = new ObjectId(req.body)

  const session = await getServerSession(req, res, options)
  if (!session) return res.status(401).json({ error: 'You are not logged!' })

  try {
    await dbConnect()

    const userHasBookmarked = await UserInteractions.exists({
      _id: session.user.id,
      bookmarks: { $elemMatch: { tweet: tweetId } }
    })

    const updateUser = userHasBookmarked
      ? { $pull: { bookmarks: { tweet: tweetId } } }
      : { $push: { bookmarks: { tweet: tweetId } } }
    const updateTweet = userHasBookmarked
      ? { $inc: { bookmarks: -1 } }
      : { $inc: { bookmarks: 1 } }

    await UserInteractions.updateOne({ _id: session.user.id }, updateUser)
    await Tweet.updateOne({ _id: tweetId }, updateTweet)
    return res.status(200).json({ success: !userHasBookmarked ? 'Tweet added to your Bookmarks' : 'Tweet removed from your Bookmarks' })
  } catch (_) {
    console.log(_)
    return res.status(500).json({ error: 'Error while creating bookmark' })
  }
}
