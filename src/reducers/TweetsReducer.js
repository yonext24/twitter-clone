/* eslint-disable no-case-declarations */
export const TweetsReducer = (state, action) => {
  switch (action.type) {
    case 'addTweet':
      const addTweet = action.payload
      const addNewTweets = [...state.tweets]
      if (addTweet.reply.isReplying) {
        const replyingIndex = addNewTweets.findIndex(el => el._id === addTweet.reply.replyingTo)
        if (replyingIndex >= 0) {
          addNewTweets[replyingIndex] = {
            ...addNewTweets[replyingIndex],
            replies: [...addNewTweets[replyingIndex].replies, addTweet._id]
          }
        }
      }
      return {
        ...state,
        tweets: [action.payload].concat(addNewTweets)
      }
    case 'fetchSuccess':
      return {
        ...state,
        tweets: state.tweets.concat(action.payload.tweets),
        hasMore: action.payload.hasMore
      }
    case 'setTweets':
      return {
        ...state,
        tweets: action.payload
      }
    case 'upReplies':
      console.log(action.payload)
      return {
        ...state,
        tweets: state.tweets.map(el => {
          if (el._id === action.payload.commentId) {
            return { ...el, replies: [...el.replies, action.payload.newTweet] }
          }
          return el
        })
      }
    case 'intersected':
      return {
        ...state,
        page: { number: state.page.number + 1, fetched: false }
      }
    case 'fetchNewPage':
      action.payload.refetch()
      return {
        ...state,
        page: { ...state.page, fetched: true }
      }
    case 'addLike':
      return {
        ...state,
        tweets: state.tweets.map(el => {
          if (el._id === action.payload) {
            const isLiked = el.isLiked
            return { ...el, isLiked: !isLiked, likes: isLiked ? el.likes - 1 : el.likes + 1 }
          }
          return el
        })
      }
    case 'addBookmark':
      return {
        ...state,
        tweets: state.tweets.map(el => {
          if (el._id === action.payload) {
            const isBookmarked = el.isBookmarked
            return { ...el, isBookmarked: !isBookmarked, bookmarks: isBookmarked ? el.bookmarks - 1 : el.bookmarks + 1 }
          }
          return el
        })
      }
    case 'deleteTweet':
      const id = action.payload
      let newTweets = [...state.tweets]
      const tweetToDelete = newTweets.find(el => el._id === id)
      if (!tweetToDelete) return { ...state }
      const { reply, isCurrentlyReplying } = tweetToDelete

      if (reply.isReplying) {
        const tweetReplyingIndex = newTweets.findIndex(el => el._id === reply.replyingTo)
        if (tweetReplyingIndex >= 0) {
          newTweets[tweetReplyingIndex].replies = newTweets[tweetReplyingIndex].replies.filter(el => el !== id)
        }
      }
      if (isCurrentlyReplying) {
        const index = newTweets.findIndex(el => el._id === isCurrentlyReplying)
        if (index >= 0) {
          newTweets[index].currentReplie = null
        }
      }

      newTweets = newTweets.filter(el => el._id !== id)

      return {
        ...state,
        tweets: newTweets
      }

    default:
      return state
  }
}
