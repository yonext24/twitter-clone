import { getTimeline } from '@/assets/consts'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useIntersectionObserver } from './useIntersectionObserver'
import { useTweetsContext } from './useTweetsContext'

export function useGetTweets () {
  const [sectionSelected, setSectionSelected] = useState('foryou')
  const { tweets, page, hasMore, dispatch } = useTweetsContext()

  const firstFetched = useRef(false)

  const { intersecting, intersectionRef } = useIntersectionObserver({ hasMore })

  const { isLoading, error, refetch, isRefetching } = useQuery('getTweets',
    () => {
      if (!firstFetched.current && tweets.length >= 1) {
        return new Promise(resolve => {
          firstFetched.current = true
          resolve({ hasMore, tweets: [] })
        })
      }
      firstFetched.current = true
      return getTimeline(page.number)
    },
    {
      retryDelay: 5000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      onSuccess: (res) => dispatch({ type: 'fetchSuccess', payload: { hasMore: res.hasMore, tweets: res.tweets } })
    })

  useEffect(() => {
    if (intersecting && !isLoading && !error && firstFetched.current && hasMore) {
      dispatch({ type: 'intersected' })
    }
  }, [intersecting])

  useEffect(() => {
    if (!page.fetched && firstFetched.current && hasMore) {
      dispatch({ type: 'fetchNewPage', payload: { refetch } })
    }
  }, [page])

  return { sectionSelected, setSectionSelected, tweets, error, isLoading, intersectionRef, isRefetching }
}
