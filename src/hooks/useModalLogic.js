import { useEffect } from 'react'

export function useModalLogic ({ closeModal }) {
  useEffect(() => {
    const html = document.querySelector('html')
    html.style.overflow = 'hidden'
    html.style.paddingRight = '17px'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
    }

    html.addEventListener('keydown', onKeyDown)

    return () => {
      html.removeEventListener('keydown', onKeyDown)
      const modalsContainer = document.getElementById('modals-container')
      if (modalsContainer && Array.from(modalsContainer.childNodes).some(node => node.hasChildNodes())) return

      html.style.overflow = 'auto'
      html.style.paddingRight = '0px'
    }
  }, [])
}
