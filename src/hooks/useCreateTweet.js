import { createTweet } from '@/assets/consts'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useTweetsContext } from './useTweetsContext'

const ToastNotif = ({ id }) => {
  return <>
  <span>Your tweet was sent.</span>
  <Link href={'/tweet/' + id} onClick={e => { e.stopPropagation(); toast.dismiss() }} className='Toastify-view-anchor'>View</Link>
  </>
}

export function useCreateTweet ({ iniciated, isInTweetPage, addTweet }) {
  const [focused, setFocused] = useState({
    focused: false,
    rest: iniciated,
    everyone: iniciated,
    footer: false
  })
  const [image, setImage] = useState(null)
  const [value, setValue] = useState('')

  const { dispatch } = useTweetsContext()

  const inputRef = useRef()
  const textareaRef = useRef()

  const router = useRouter()
  const { status, data } = useSession()
  const user = data?.user

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: createTweet,
    onSuccess: (res) => {
      addTweet && addTweet(res)
      dispatch({ type: 'addTweet', payload: res })
      setValue('')
      setImage(null)
      inputRef.current.value = null
      toast(<ToastNotif id={res._id} />)
    },
    onError: () => {
      toast.error('Error while creating tweet')
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

  const handleFile = useCallback(e => {
    setImage(e.target.files[0])
  }, [inputRef.current])
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

  useLayoutEffect(() => {
    textareaRef.current.style.height = 'inherit'

    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      58
    )}px`
  }, [value, textareaRef.current])

  return { handleTweet, value, setValue, isLoading, isError, isSuccess, focused, setFocused, handleFile, handleFileClear, image, inputRef, textareaRef }
}
