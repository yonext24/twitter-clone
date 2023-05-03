import { TweetsContext } from '@/contexts/TweetsContext'
import { useContext } from 'react'

export function useTweetsContext () {
  const { state, dispatch } = useContext(TweetsContext)
  const { tweets, page, hasMore } = state

  console.log(tweets)

  return { tweets, page, hasMore, dispatch }
}
