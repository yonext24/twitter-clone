import mongoose from 'mongoose'

const TweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: false
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'UserInteractions',
    required: true
  },
  reply: {
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
    isReplyDeleted: {
      type: Boolean,
      default: false
    }
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
  ],
  bookmarks: {
    type: Number,
    default: 0
  },
  image: {
    hasImage: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      required: function () { return this.image.hasImage === true }
    },
    id: {
      type: String,
      required: function () { return this.image.hasImage === true }
    },
    width: {
      type: Number,
      required: function () { return this.image.hasImage === true }
    },
    height: {
      type: Number,
      required: function () { return this.image.hasImage === true }
    },
    aspectRatio: {
      type: Number,
      required: function () { return this.image.hasImage === true }
    }
  }
}, { timestamps: true })

const Tweet = mongoose.models.Tweet || mongoose.model('Tweet', TweetSchema)
export default Tweet
