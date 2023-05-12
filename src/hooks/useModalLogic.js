import { useEffect } from 'react'

export function useModalLogic ({ closeModal, action }) {
  useEffect(() => {
    const html = document.querySelector('html')
    html.style.overflow = 'hidden'
    html.style.paddingRight = '17px'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
    }

    action && html.addEventListener('keydown', action)
    html.addEventListener('keydown', onKeyDown)

    return () => {
      html.removeEventListener('keydown', onKeyDown)
      action && html.removeEventListener('keydown', action)
      const modalsContainer = document.getElementById('modals-container')
      if (modalsContainer && Array.from(modalsContainer.childNodes).some(node => node.hasChildNodes())) return

      html.style.overflow = 'auto'
      html.style.paddingRight = '0px'
    }
  }, [])
}
