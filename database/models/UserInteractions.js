import mongoose from 'mongoose'
const { Schema } = mongoose

const UserInteractionsSchema = mongoose.Schema({
  _id: String,
  slugSetted: { type: Boolean, default: false },
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
  tweets: [{
    tweet: { type: Schema.Types.ObjectId, ref: 'Tweet' },
    tweetedAt: { type: Date, default: Date.now }
  }],
  likedTweets: [{
    tweet: { type: Schema.Types.ObjectId, ref: 'Tweet' },
    likedAt: { type: Date, default: Date.now }
  }],
  retweetedTweets: [{
    tweet: { type: Schema.Types.ObjectId, ref: 'Tweet' },
    retweetedAt: { type: Date, default: Date.now }
  }]
})

const UserInteractions = mongoose.models.UserInteractions || mongoose.model('UserInteractions', UserInteractionsSchema)
export default UserInteractions
