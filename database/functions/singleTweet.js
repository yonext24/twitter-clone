import { isValidObjectId } from 'mongoose'
import { getServerSession } from 'next-auth'
import UserInteractions from '../models/UserInteractions'
import Tweet from '../models/Tweet'
import dbConnect from '../dbConnect'
import { options } from '@/pages/api/auth/[...nextauth]'

export const singleTweet = async ({ id, getThread, req, res }) => {
  if (!id) throw new Error('There are no tweet!')
  if (!isValidObjectId(id)) throw new Error(`The id: "${id}" is not a valid ObjectId.`)

  const session = await getServerSession(req, res, options)

  try {
    await dbConnect()
  } catch {
    throw new Error('Unable to connect to database')
  }

  let tweet
  try {
    tweet = await Tweet.findOne({ _id: id })
  } catch (err) {
    throw new Error(`Tweet with id: ${id} was not found.`)
  }

  if (!tweet) throw new Error(`Tweet with id: ${id} was not found.`)

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
      return threadTweets
    } catch (err) {
      throw new Error('Error while finding tweets')
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

    return { ...tweet._doc, isLiked: isMainTweetLiked, isBookmarked: isMainTweetBookmarked }
  }

  return tweet
}
