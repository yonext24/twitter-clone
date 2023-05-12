import { getExternalInteractions } from '@/assets/getExternalInteractions'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useQuery } from 'react-query'
import { useModal } from './useModal'
import { useModalLogic } from './useModalLogic'
import { TweetsReducer } from '@/reducers/TweetsReducer'
import { INITIAL_TWEETS_STATE } from '@/assets/INITIAL_TWEETS_STATE'
import { getSingleTweet } from '@/assets/consts'

export function useOpenImage ({ id, closeModalProp, addTweetToTweetPage }) {
  const [tweet, setTweet] = useState(null)

  const [state, dispatch] = useReducer(TweetsReducer, INITIAL_TWEETS_STATE)
  const externalInteractions = getExternalInteractions(dispatch)

  const { tweets: replies } = state

  const { openModal, closeModal, open } = useModal()
  useModalLogic({ closeModal: closeModalProp })

  useEffect(() => {
    return closeModal
  }, [])

  const handleSuccess = res => {
    setTweet(res)
    dispatch({ type: 'setTweets', payload: res?.replies })
  }

  const { isLoading, data } = useQuery(
    ['getSingleTweet', id],
    () => getSingleTweet(id),
    { retryDelay: 5000, refetchOnWindowFocus: false, refetchInterval: false, onSuccess: handleSuccess, staleTime: 600000 })

  useEffect(() => {
    if (data && !tweet) {
      setTweet(data)
      dispatch({ type: 'setTweets', payload: data.replies })
    }
  }, [data])

  const addTweet = useCallback(
    (newTweet) => {
      addTweetToTweetPage && addTweetToTweetPage(newTweet)
      setTweet(prev => {
        const updatedReplies = prev.replies.concat(newTweet)
        return { ...prev, replies: updatedReplies }
      })
    }, [tweet, addTweetToTweetPage]
  )

  const handleAddLike = (isLiked) => {
    setTweet(prev => {
      const newLikes = isLiked ? prev.likes - 1 : prev.likes + 1
      return { ...prev, likes: newLikes, isLiked: !isLiked }
    })
  }

  const openReply = () => openModal('reply')
  const closeReply = () => closeModal()

  return { tweet, replies, externalInteractions, setTweet, addTweet, isLoading, openReply, closeReply, open, handleAddLike }
}
