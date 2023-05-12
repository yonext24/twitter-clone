import { createWrapper } from '@/assets/createWrapper'
import { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function ReactPortal ({ children, wrapperId = 'portal-modal-wrapper' }) {
  const [wrapperElement, setWrapperElement] = useState(null)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)

    if (!element) {
      element = createWrapper(wrapperId)
    }
    setWrapperElement(element)
  }, [wrapperId])

  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}
