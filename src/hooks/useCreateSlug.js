import { changeSlug } from '@/assets/consts'
import debounce from 'just-debounce-it'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'

export function useCreateSlug (closeModal) {
  const [value, setValue] = useState('')
  const [info, setInfo] = useState({
    error: '',
    success: '',
    loading: false
  })

  useEffect(() => {
    document.querySelector('html').style.overflow = 'hidden'
    document.querySelector('html').style.paddingRight = '17px'

    return () => {
      document.querySelector('html').style.overflow = 'auto'
      document.querySelector('html').style.paddingRight = '0'

      localStorage.setItem('slugSetted', true)
    }
  }, [])

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: changeSlug,
    onSuccess: (_) => {
      setTimeout(closeModal, 1500)
    }
  })
  const handleSlugChange = useCallback(
    (slug) => {
      mutate(slug)
    }, [mutate]
  )

  const createError = useCallback(
    (error) => {
      setInfo({
        error,
        success: '',
        loading: false
      })
    }, [setInfo])

  const createSuccess = useCallback(
    (success) => {
      setInfo({
        error: '',
        success,
        loading: false
      })
    }, [setInfo])

  const checkUsername = useCallback(
    debounce(async (username) => {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        body: username
      })
      const data = await res.json()
      console.log(data)

      if (data.error) {
        createError(data.error)
      } else if (data.success) {
        createSuccess(data.success)
      }
    }, 500)
    , [setInfo, createError, createSuccess])

  const handleChange = useCallback(e => {
    const myRegex = /[^a-zA-Z0-9_-]/g
    const myValue = e.target.value
    if (myValue.length <= 25) {
      setValue(myValue)
    }
    if (myRegex.test(myValue)) {
      createError('Your username cant contain special characters, only "_" and "-".')
      return
    }
    if (myValue.length < 5) {
      createError('Your username must have at least 5 characters.')
      return
    } else if (myValue.length >= 25) {
      createError('Your username can only have 25 characters.')
      return
    }

    setInfo({ success: '', error: '', loading: true })
    checkUsername(myValue)
  }, [createError, createSuccess, checkUsername, setValue])

  const inputRef = useRef()

  return { value, handleChange, inputRef, info, handleSlugChange, isError, isLoading, isSuccess }
}
