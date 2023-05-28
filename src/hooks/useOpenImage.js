import { getExternalInteractions } from '@/assets/getExternalInteractions'
import { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { useQuery } from 'react-query'
import { useModal } from './useModal'
import { useModalLogic } from './useModalLogic'
import { TweetsReducer } from '@/reducers/TweetsReducer'
import { INITIAL_TWEETS_STATE } from '@/assets/INITIAL_TWEETS_STATE'
import { getSingleTweet } from '@/assets/consts'
import { WindowSizeContext } from '@/contexts/WindowSizeContext'

export function useOpenImage ({ id, closeModalProp, addTweetToTweetPage }) {
  const [tweet, setTweet] = useState(null)
  const [state, dispatch] = useReducer(TweetsReducer, INITIAL_TWEETS_STATE)
  const [isTweetOpen, setIsTweetOpen] = useState({
    open: true,
    declared: false
  })
  const externalInteractions = getExternalInteractions(dispatch)

  const { size } = useContext(WindowSizeContext)

  useEffect(() => {
    if (size < 800 && !isTweetOpen.declared) {
      setIsTweetOpen(prev => ({ ...prev, open: false }))
    } else if (size >= 800 && !isTweetOpen.declared) {
      setIsTweetOpen(prev => ({ ...prev, open: true }))
    }
  }, [size])

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
    () => getSingleTweet({ id }),
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
      dispatch({ type: 'addTweet', payload: newTweet })
      setTweet(prev => ({ ...prev, replies: [...prev.replies, newTweet._id] }))
    }, [tweet, addTweetToTweetPage]
  )

  const handleAddLike = (isLiked) => {
    setTweet(prev => {
      const newLikes = isLiked ? prev.likes - 1 : prev.likes + 1
      return { ...prev, likes: newLikes, isLiked: !isLiked }
    })
  }

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    setIsTweetOpen(prev => ({ declared: true, open: !prev.open }))
  }, [setIsTweetOpen, isTweetOpen])

  const openReply = () => openModal('reply')
  const closeReply = () => closeModal()

  return { tweet, replies, externalInteractions, setTweet, addTweet, isLoading, openReply, closeReply, open, handleAddLike, isTweetOpen, handleClick }
}
