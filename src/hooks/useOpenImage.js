import { getSingleTweet } from '@/assets/consts'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useModal } from './useModal'
import { useModalLogic } from './useModalLogic'

export function useOpenImage ({ id, closeModalProp, addTweetToTweetPage }) {
  const [tweet, setTweet] = useState(null)

  const { openModal, closeModal, open } = useModal()
  useModalLogic({ closeModal: closeModalProp })

  useEffect(() => {
    return closeModal
  }, [])

  const { isLoading, data } = useQuery(
    ['getSingleTweet', id],
    () => getSingleTweet(id),
    { retryDelay: 5000, refetchOnWindowFocus: false, refetchInterval: false, onSuccess: setTweet, staleTime: 600000 })

  useEffect(() => {
    if (data && !tweet) {
      setTweet(data)
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

  return { tweet, setTweet, addTweet, isLoading, openReply, closeReply, open, handleAddLike }
}
