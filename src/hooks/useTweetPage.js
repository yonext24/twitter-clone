import { useEffect, useReducer, useRef, useState } from 'react'
import { useModal } from './useModal'
import { useRouter } from 'next/router'
import { getExternalInteractions } from '@/assets/getExternalInteractions'
import { TweetsReducer } from '@/reducers/TweetsReducer'
import { INITIAL_TWEETS_STATE } from '@/assets/INITIAL_TWEETS_STATE'
import { getSingleTweet } from '@/assets/consts'

export function useTweetPage ({ tweet, error }) {
  const [threadTweet, setThreadTweet] = useState({
    fetched: false,
    data: []
  })
  const { openModal, open, modalName, closeModal } = useModal()

  const [state, dispatch] = useReducer(TweetsReducer, INITIAL_TWEETS_STATE)

  const { tweets: replies } = state

  const router = useRouter()
  const { id } = router.query
  const divRef = useRef()

  const openReply = () => {
    openModal('writeTweet')
  }

  useEffect(() => {
    dispatch({ type: 'setTweets', payload: tweet?.replies || [] })
  }, [tweet])

  const externalInteractions = getExternalInteractions(dispatch)

  const deleteTweetBack = () => router.back()

  useEffect(() => {
    if (tweet && !tweet.reply.isReplyDeleted && tweet.reply.replyingTo && !threadTweet.fetched) {
      getSingleTweet({ id: tweet.reply.replyingTo, getThread: true })
        .then(data => setThreadTweet({ fetched: true, data }))
    }
  }, [tweet])

  useEffect(() => {
    if (!id) return
    setThreadTweet({ fetched: false, data: [] })
  }, [id])

  useEffect(() => {
    if (!error) {
      divRef.current.scrollIntoView()
    }
  }, [threadTweet])

  return { openReply, openModal, closeModal, deleteTweetBack, tweet, replies, open, threadTweet, divRef, modalName, externalInteractions }
}
