import { createTweet } from '@/assets/consts'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'

export function useCreateTweet ({ iniciated, addTweet, setValue, isInTweetPage }) {
  const [focused, setFocused] = useState({
    focused: false,
    rest: iniciated,
    everyone: iniciated,
    footer: false
  })
  const [image, setImage] = useState(null)

  const inputRef = useRef()

  const router = useRouter()
  const { status, data } = useSession()
  const user = data?.user

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: createTweet,
    onSuccess: (res) => {
      addTweet(res)
      setValue('')
      setImage(null)
      inputRef.current.value = null
    }
  })

  const handleTweet = useCallback(async (value, reply) => {
    if (status === 'unauthenticated' || status === 'loading') {
      router.push('/')
      return
    }
    mutate({
      data: {
        data: value.trim(),
        ...(reply?.isReply && { replyingUser: reply.reply.author._id, replyingTo: reply.reply._id })
      },
      ...(image && { imageToUploadData: { hasImage: true, image, userId: user.id } })
    })
  }, [mutate, image, user])

  const handleFile = e => {
    setImage(e.target.files[0])
  }
  const handleFileClear = e => {
    setImage(null)
    inputRef.current.value = null
  }

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

  return { handleTweet, isLoading, isError, isSuccess, focused, setFocused, handleFile, handleFileClear, image, inputRef }
}
