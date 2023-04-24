import { getTimeline } from '@/assets/consts'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useIntersectionObserver } from './useIntersectionObserver'

export function useGetTweets () {
  const [sectionSelected, setSectionSelected] = useState('foryou')
  const [tweets, setTweets] = useState([])
  const [page, setPage] = useState({
    fetched: true,
    number: 1
  })
  const [hasMore, setHasMore] = useState(false)

  const addTweet = (tweet) => {
    setTweets(prev => ([tweet, ...prev]))
  }

  const concatFn = (data) => {
    setTweets(prev => prev.concat(data.tweets))
    setHasMore(data.hasMore)
  }

  const firstFetched = useRef(false)

  const { intersecting, intersectionRef } = useIntersectionObserver()

  const { isLoading, error, refetch, isRefetching } = useQuery('getTweets', () => {
    firstFetched.current = true
    return getTimeline(page.number)
  },
  { retryDelay: 5000, refetchOnWindowFocus: false, refetchInterval: false, onSuccess: concatFn })

  useEffect(() => {
    if (intersecting && !isLoading && !error && firstFetched.current && hasMore) {
      setPage(prev => ({ fetched: false, number: prev.number + 1 }))
    }
  }, [intersecting])

  useEffect(() => {
    if (!page.fetched && firstFetched.current && hasMore) {
      refetch()
      setPage(prev => ({ ...prev, fetched: true }))
    }
  }, [page])

  return { sectionSelected, setSectionSelected, tweets, error, isLoading, addTweet, intersectionRef, isRefetching }
}
