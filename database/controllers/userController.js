import { options } from '@/pages/api/auth/[...nextauth]'
import UserInteractions from '../models/UserInteractions'
import { getServerSession } from 'next-auth'

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
