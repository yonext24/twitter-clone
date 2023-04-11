export const WriteTweetModalReducer = (state, action) => {
  switch (action.type) {
    case 'closeModal':
      return {
        ...state,
        open: false,
        reply: {
          isReply: false,
          reply: {}
        }
      }
    case 'openModal':
      return { ...state, open: true }
    case 'openReply':
      return {
        ...state,
        open: true,
        reply: {
          isReply: true,
          reply: action.payload
        }
      }
    default:
      return state
  }
}
