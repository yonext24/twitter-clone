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
    path: 'replyingUser'
  })
  await tweet.populate({
    path: 'replies',
    populate: [
      { path: 'author' },
      { path: 'replyingUser', select: ['slug'] }
    ]
  })

  if (session) {
    const user = await UserInteractions.findOne({ _id: session.user.id })
    const isMainTweetLiked = user.likedTweets.some(el => el.tweet.equals(tweet._id))
    const isMainTweetBookmarked = user.bookmarks.some(el => el.tweet.equals(tweet._id))

    const parsedReplies = tweet.replies.map(document => {
      const likeMatch = user.likedTweets.includes(document._id)
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
  console.log(body)

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
      isReplying,
      image: {
        hasImage,
        ...(hasImage && { src: image.src, id: image.id, width: image.width, height: image.height, aspectRatio: image.width / image.height })
      },
      ...(isReplying && {
        replyingUser,
        replyingTo
      })
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
    if (tweet.isReplying) {
      await tweet.populate({ path: 'replyingUser', select: ['slug'] })
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

    const porPagina = 5
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
      .populate({ path: 'replyingUser', select: ['slug'] })

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
          if (!el.isReplying) return el
          else {
            const index = array.findIndex(e => e._id.equals(el.replyingTo))
            if (index < 0) return el
            if (array[index].currentReplie) return el
            array[index].currentReplie = el._id
            return { ...el, isCurrentlyReplying: array[index]._id }
          }
        })
      const correctlySorted = []
      parsedDocuments.forEach(el => {
        if (correctlySorted.some(document => el._id.equals(document._id))) return

        if (!el.currentReplie && !el.isCurrentlyReplying) correctlySorted.push(el)
        if (el.currentReplie) {
          const index = parsedDocuments.findIndex(({ _id }) => _id.equals(el.currentReplie))
          correctlySorted.push(el)
          index >= 0 && correctlySorted.push(parsedDocuments[index])
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

  const tweet = await Tweet.findOne({ _id: tweetId })
  if (tweet.author._id.toString() !== session.user.id && session.user.role !== 'admin') return res.status(406).json({ error: 'You are not authorized' })

  if (tweet.image.hasImage) {
    await deleteImage(session.user.id, tweet.image.id)
  }

  await UserInteractions.updateOne({ _id: session.user.id }, { $pull: { tweets: { tweet: tweetId } } })
  await Tweet.deleteOne({ _id: tweet._id })
  if (tweet.isReplying) {
    await Tweet.updateOne({ _id: tweet.replyingTo }, { $pull: { replies: tweetId } })
  }

  return res.status(200).json({ success: 'Tweet Deleted' })
}
export const bookmarkTweet = async (req, res) => {
  if (!req.body) return res.status(400).json({ error: 'Id is needed ' })
  const tweetId = new ObjectId(req.body)

  const session = await getServerSession(req, res, options)
  if (!session) return res.status(401).json({ error: 'You are not logged!' })

  try {
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
