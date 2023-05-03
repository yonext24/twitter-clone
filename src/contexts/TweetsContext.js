import { TweetsReducer } from '@/reducers/TweetsReducer'
import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
  tweets: [],
  hasMore: true,
  page: {
    number: 1,
    fetched: true
  }
}

export const TweetsContext = createContext()

export const TweetsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TweetsReducer, INITIAL_STATE)

  return <TweetsContext.Provider value={{ state, dispatch }}>
    {children}
  </TweetsContext.Provider>
}
