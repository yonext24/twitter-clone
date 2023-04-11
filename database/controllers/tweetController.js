import { options } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import dbConnect from '../dbConnect'
import Tweet from '../models/Tweet'
import UserInteractions from '../models/UserInteractions'
import { isValidObjectId } from 'mongoose'

export const getSingleTweet = async (req, res) => {
  const id = req.query.id
  if (!id) return res.status(405).json({ error: 'There are no tweet!' })

  if (!isValidObjectId(id)) return res.status(404).json({ error: 'The id is not a valid ObjectId.' })

  let tweet
  try {
    tweet = await Tweet.findOne({ _id: id })
  } catch (err) {
    return res.status(404).json({ error: `Tweet with id ${id} was not found.` })
  }

  if (!tweet) return res.status(404).json({ error: `Tweet with id ${id} was not found.` })

  await tweet.populate({
    path: 'replies'
  })

  return res.status(200).json(tweet)
}
export const createTweet = async (req, res) => {
  if (!req.body) return res.status(405).json({ error: 'There are no body!' })
  try {
    JSON.parse(req.body)
  } catch {
    return res.state(406).json({ error: 'Expected json' })
  }
  const { data: body } = JSON.parse(req.body)
  const { replyingUser, replyingTo, data } = body

  const isReplying = Boolean(replyingTo && replyingUser)

  if (!data) return res.state(404).json({ error: 'Expected data' })
  const session = await getServerSession(req, res, options)
  if (!session) return res.status(401).json({ error: 'You are not logged!' })

  try {
    await dbConnect()
    console.log(replyingUser)
    const tweet = new Tweet({
      content: data,
      author: session.user.id,
      isReplying,
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
      await UserInteractions.updateOne({ _id: session.user.id }, { $push: { tweets: tweet._id } })
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
      .populate({ path: 'replyingUser', select: ['slug'] })

    if (session) {
      const user = await UserInteractions.findOne({ _id: session.user.id })

      console.log(session.user.id)
      const parsedDocuments = myDocuments.map(document => {
        const match = user.likedTweets.includes(document._id)

        return { ...document._doc, isLiked: match }
      })

      return res.status(200).json(parsedDocuments)
    }

    return res.status(200).json(myDocuments)
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

    const updatedTweet = await Tweet.findOneAndUpdate({ _id: tweetId }, update, { new: true })
    await UserInteractions.updateOne({ _id: session.user.id }, userHasLiked ? { $pull: { likedTweets: tweetId } } : { $push: { likedTweets: tweetId } })

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

  await UserInteractions.updateOne({ _id: session.user.id }, { $pull: { tweets: tweetId } })
  await Tweet.deleteOne({ _id: tweet._id })
  if (tweet.isReplying) {
    await Tweet.updateOne({ _id: tweet.replyingTo }, { $pull: { replies: tweetId } })
  }

  return res.status(200).json({ success: 'Tweet Deleted' })
}
