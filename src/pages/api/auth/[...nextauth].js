import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import dbConnect from '../../../../database/dbConnect'
import UserInteractions from '../../../../database/models/UserInteractions'
import clientPromise from '../../../../database/mongodb'

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
      async profile (profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          email_verified: profile.email_verified,
          role: 'user'
        }
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn (user) {
      try {
        await dbConnect()
        const exists = await UserInteractions.exists({ _id: user.user.id })

        if (!exists) {
          const myName = user.user.name.toLowerCase().replace(' ', '')
          let slugExists = true
          let count = 1
          let lastCheckedName

          while (slugExists) {
            lastCheckedName = myName + count
            console.log(lastCheckedName)
            slugExists = await UserInteractions.exists({ slug: lastCheckedName })
            count++
          }

          console.log('trigger !exists', lastCheckedName)
          const newUser = UserInteractions({
            username: user.user.name,
            _id: user.user.id,
            image: user.user.image,
            slug: lastCheckedName
          })

          await newUser.save()
        }

        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
    async session ({ session, user }) {
      const interactions = await UserInteractions.findOne({ _id: user.id }).lean()
      session.user = { ...user, slug: interactions.slug }
      return session
    }
  }
}

export default NextAuth(options)
