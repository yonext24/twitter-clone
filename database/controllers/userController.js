import { options } from '@/pages/api/auth/[...nextauth]'
import UserInteractions from '../models/UserInteractions'
import { getServerSession } from 'next-auth'
import dbConnect from '../dbConnect'

export const checkIfUserExists = async (req, res) => {
  if (!req.body) return res.status(400).json({ error: 'Request must have a body' })

  const exists = await UserInteractions.exists({ slug: req.body })

  if (!exists) return res.status(200).json({ success: 'Username available.' })
  else return res.status(406).json({ error: 'Username already exists.' })
}
export const handleSlugChange = async (req, res) => {
  if (!req.body) return res.status(400).json({ error: 'Request must have a body' })
  console.log(req.body)

  const session = await getServerSession(req, res, options)
  if (!session) return res.status(401).json({ error: 'You are not logged!' })

  const exists = await UserInteractions.exists({ slug: req.body })

  if (exists) return res.status(406).json({ error: 'Username already exists.' })

  try {
    await UserInteractions.updateOne({ _id: session.user.id }, { slug: req.body, slugSetted: true })
  } catch (err) {
    return res.status(500).json({ error: 'Error while changing slug.' })
  }

  return res.status(200).json({ success: 'Username changed correctly.' })
}
export async function getBookmarked (req, res) {
  const session = await getServerSession(req, res, options)
  if (!session) return res.status(401).json({ error: 'You are not logged!' })

  try {
    await dbConnect()

    const userExists = await UserInteractions.exists({ _id: session.user.id })
    if (!userExists) return res.status(401).json({ error: 'You are not authorized' })

    const porPagina = 3
    const pagina = req.query.page
    const saltar = (pagina - 1) * porPagina

    const user = await UserInteractions.findOne({ _id: session.user.id })
      .sort({ 'bookmarks.bookmarkedAt': 1 })
      .slice('bookmarks', [saltar, porPagina])
      .populate({
        path: 'bookmarks.tweet',
        populate: {
          path: 'author',
          select: ['username', 'slug', 'image']
        }
      })

    const myDocuments = user.bookmarks
    const hasMore = myDocuments.length === porPagina

    const parsedDocuments = myDocuments
      .map(({ tweet }) => {
        const likeMatch = user.likedTweets.some(el => el.tweet.equals(tweet._id))

        return { ...tweet._doc, isLiked: likeMatch, isBookmarked: true }
      })
    console.log(parsedDocuments)

    return res.status(200).json({ tweets: parsedDocuments, hasMore })
  } catch (err) {
    console.log({ err })
    return res.status(500).json({ error: 'Error while finding bookmarks' })
  }
}
