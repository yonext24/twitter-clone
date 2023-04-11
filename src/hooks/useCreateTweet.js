import { createTweet } from '@/assets/consts'
import { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

export function useCreateTweet ({ iniciated, addTweet, setValue }) {
  const [focused, setFocused] = useState({
    rest: iniciated,
    everyone: iniciated
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
    if (focused.rest && !iniciated) {
      const timeout = setTimeout(() => {
        setFocused(prev => ({ ...prev, everyone: true }))
      }, 300)

      return () => { clearTimeout(timeout) }
    }
  }, [focused.rest])

  return { handleTweet, isLoading, isError, isSuccess, focused, setFocused }
}
