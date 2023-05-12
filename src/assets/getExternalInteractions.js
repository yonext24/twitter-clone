export const getExternalInteractions = (dispatch) => {
  return {
    like: (id) => dispatch({ type: 'addLike', payload: id }),
    delete: (id) => dispatch({ type: 'deleteTweet', payload: id }),
    addComment: (id) => dispatch({ type: 'addTweet', payload: id }),
    bookmark: (id) => dispatch({ type: 'addBookmark', payload: id }),
    upReplies: (id, newId) => dispatch({ type: 'upReplies', payload: { commentId: id, newTweet: newId } })
  }
}
