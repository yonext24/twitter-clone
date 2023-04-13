import { getTimeline } from '@/assets/consts'
import { useState } from 'react'
import { useQuery } from 'react-query'

export function useGetTweets () {
  const [sectionSelected, setSectionSelected] = useState('foryou')
  const [tweets, setTweets] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1)

  const addTweet = (tweet) => {
    setTweets(prev => ([tweet, ...prev]))
  }
  const concatFn = (data) => setTweets(prev => prev.concat(data))

  const { isLoading, error } = useQuery('getTweets', () => getTimeline(page),
    { retryDelay: 5000, refetchOnWindowFocus: false, refetchInterval: false, onSuccess: concatFn })
  console.log(isLoading)

  return { sectionSelected, setSectionSelected, tweets, error, isLoading, addTweet }
}
