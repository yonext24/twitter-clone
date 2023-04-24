import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver () {
  const [intersecting, setIntersecting] = useState(false)

  const intersectionRef = useRef()

  useEffect(() => {
    if (!intersectionRef.current) return

    const element = intersectionRef.current

    const onChange = ([el]) => {
      setIntersecting(el.isIntersecting)
    }

    const observer = new IntersectionObserver(onChange, {
      rootMargin: '0px'
    })

    observer.observe(element)

    return () => observer && observer.disconnect()
  }, [intersectionRef])

  return { intersecting, intersectionRef }
}
