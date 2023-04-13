import { createTweet } from '@/assets/consts'
import { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

export function useCreateTweet ({ iniciated, addTweet, setValue, isInTweetPage }) {
  const [focused, setFocused] = useState({
    focused: false,
    rest: iniciated,
    everyone: iniciated,
    footer: false
  })

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: createTweet,
    onSuccess: (res) => {
      addTweet(res)
      setValue('')
    }
  })

  const handleTweet = useCallback((value, reply) => {
    console.log(reply)
    mutate({ data: value.trim(), ...(reply?.isReply && { replyingUser: reply.reply.author._id, replyingTo: reply.reply._id }) })
  }, [mutate])

  useEffect(() => {
    if (focused.focused && !iniciated && !isInTweetPage) {
      setFocused(prev => ({ ...prev, rest: true }))
      const timeout = setTimeout(() => {
        setFocused(prev => ({ ...prev, everyone: true }))
      }, 300)

      return () => { clearTimeout(timeout) }
    } else if (isInTweetPage && focused.focused) {
      const timeout = setTimeout(() => {
        setFocused(prev => ({ ...prev, footer: true }))
      }, 300)

      return () => { clearTimeout(timeout) }
    }
  }, [focused.focused])

  return { handleTweet, isLoading, isError, isSuccess, focused, setFocused }
}
