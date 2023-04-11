import { WriteTweetModalReducer } from '@/reducers/WriteTweetModalReducer'
import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
  open: false,
  reply: {
    isReply: false,
    reply: {}
  }
}

const WriteTweetModalContext = createContext()

const WriteTweetModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WriteTweetModalReducer, INITIAL_STATE)

  return (
    <WriteTweetModalContext.Provider value={{ state, dispatch }}>
      {children}
    </WriteTweetModalContext.Provider>
  )
}

export {
  WriteTweetModalContextProvider,
  WriteTweetModalContext
}
