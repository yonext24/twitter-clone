import { useEffect, useRef, useState } from 'react'
import { useModal } from './useModal'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getSingleTweet } from '@/assets/consts'

export function useTweetPage () {
  const [tweet, setTweet] = useState(null)
  const [threadTweet, setThreadTweet] = useState(null)
  const { openModal, open, modalName, closeModal } = useModal()

  const router = useRouter()
  const { id } = router.query
  const divRef = useRef()

  const openReply = () => {
    openModal('writeTweet')
  }
  const addTweet = (newTweet) => {
    setTweet(prev => {
      const updatedReplies = [...prev.replies, newTweet]
      return { ...prev, replies: updatedReplies }
    })
  }
  const deleteTweet = (id) => {
    setTweet(prev => ({
      ...prev,
      replies: prev.replies.filter(el => el._id !== id)
    }))
  }
  const deleteTweetBack = () => router.back()

  const { data, isLoading } = useQuery(
    ['getSingleTweet', id],
    () => (id && !tweet ? getSingleTweet(id) : null),
    { retryDelay: 5000, refetchOnWindowFocus: false, refetchInterval: false, onSuccess: setTweet, staleTime: 600000 })

  useEffect(() => {
    if (data && !tweet) {
      setTweet(data)
    }
  }, [data])
  console.log(tweet)
  useEffect(() => {
    if (tweet && !tweet.reply.isReplyDeleted && tweet.reply.replyingTo) {
      getSingleTweet(tweet.reply.replyingTo)
        .then(setThreadTweet)
    }
  }, [tweet])

  useEffect(() => {
    if (threadTweet) {
      divRef.current.scrollIntoView()
    }
  }, [threadTweet])

  return { openReply, addTweet, deleteTweet, isLoading, tweet, open, setTweet, openModal, closeModal, modalName, deleteTweetBack, threadTweet, divRef }
}
