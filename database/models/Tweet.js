import mongoose from 'mongoose'

const TweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'UserInteractions',
    required: true
  },
  isReplying: {
    type: Boolean,
    required: true,
    default: false
  },
  replyingTo: {
    type: mongoose.Types.ObjectId,
    ref: 'Tweet',
    required: false
  },
  replyingUser: {
    type: mongoose.Types.ObjectId,
    ref: 'UserInteractions',
    required: false
  },
  replies: [{
    type: mongoose.Types.ObjectId,
    ref: 'Tweet',
    default: []
  }],
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  usersWhoLiked: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'UserInteractions'
    }
  ]

}, { timestamps: true })

const Tweet = mongoose.models.Tweet || mongoose.model('Tweet', TweetSchema)
export default Tweet
