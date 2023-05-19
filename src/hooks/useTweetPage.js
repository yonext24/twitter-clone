import { useEffect, useReducer, useRef, useState } from 'react'
import { useModal } from './useModal'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getExternalInteractions } from '@/assets/getExternalInteractions'
import { TweetsReducer } from '@/reducers/TweetsReducer'
import { INITIAL_TWEETS_STATE } from '@/assets/INITIAL_TWEETS_STATE'
import { getSingleTweet } from '@/assets/consts'

export function useTweetPage () {
  const [tweet, setTweet] = useState(null)
  const [threadTweet, setThreadTweet] = useState([])
  const { openModal, open, modalName, closeModal } = useModal()

  const [state, dispatch] = useReducer(TweetsReducer, INITIAL_TWEETS_STATE)

  const { tweets: replies } = state

  const router = useRouter()
  const { id } = router.query
  const divRef = useRef()

  const openReply = () => {
    openModal('writeTweet')
  }
  const handleSuccess = res => {
    setTweet(res)
    dispatch({ type: 'setTweets', payload: res?.replies || [] })
  }
  const externalInteractions = getExternalInteractions(dispatch)

  const deleteTweetBack = () => router.back()

  const { data, isLoading } = useQuery(
    ['getSingleTweet', id],
    () => (id ? getSingleTweet(id) : null),
    { retryDelay: 5000, refetchOnWindowFocus: false, refetchInterval: false, onSuccess: handleSuccess, staleTime: 60 })

  useEffect(() => {
    if (data && !tweet) {
      setTweet(data)
      dispatch({ type: 'setTweets', payload: data.replies })
    }
  }, [data])

  useEffect(() => {
    if (tweet && !tweet.reply.isReplyDeleted && tweet.reply.replyingTo) {
      getSingleTweet(tweet.reply.replyingTo, true)
        .then(setThreadTweet)
    }
  }, [tweet])

  useEffect(() => {
    if (!id) return
    setThreadTweet([])
    if (!tweet) return
    setTweet(null)
  }, [id])

  useEffect(() => {
    if (threadTweet.length > 0) {
      divRef.current.scrollIntoView()
    }
  }, [threadTweet])

  return { openReply, setTweet, openModal, closeModal, deleteTweetBack, isLoading, tweet, replies, open, threadTweet, divRef, modalName, externalInteractions }
}
