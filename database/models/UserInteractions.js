import mongoose from 'mongoose'
const { Schema } = mongoose

const UserInteractionsSchema = mongoose.Schema({
  _id: String,
  username: {
    type: String,
    required: true,
    unique: false
  },
  slug: {
    type: String,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
  likedTweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
  retweetedTweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }]
})

const UserInteractions = mongoose.models.UserInteractions || mongoose.model('UserInteractions', UserInteractionsSchema)
export default UserInteractions
