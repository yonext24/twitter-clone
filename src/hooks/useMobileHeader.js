import debounce from 'just-debounce-it'
import { useEffect, useRef, useState } from 'react'

export function useMobileHeader () {
  const [isOpen, setIsOpen] = useState(true)
  const lastScrollPositionRef = useRef(0)

  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollPosition = window.scrollY
      const hasScrolledDown = currentScrollPosition > lastScrollPositionRef.current

      console.log(hasScrolledDown)

      if (hasScrolledDown) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }

      lastScrollPositionRef.current = currentScrollPosition
    }, 100)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { isOpen }
}
