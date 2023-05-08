import { createWrapper } from '@/assets/createWrapper'
import { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function ReactPortal ({ children, wrapperId = 'portal-modal-wrapper', deleteDuplicates = false }) {
  const [wrapperElement, setWrapperElement] = useState(null)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body

    if (element) {
      if (deleteDuplicates) {
        if (element.childNodes.length > 1) {
          element.removeChild(element.firstChild)
        }
      }
    }

    if (!element) {
      systemCreated = true
      element = createWrapper(wrapperId)
    }
    setWrapperElement(element)

    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}
