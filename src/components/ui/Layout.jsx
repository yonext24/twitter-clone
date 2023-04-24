import styles from '@styles/layout.module.css'
import { Navbar } from './navbar/Navbar'
import { Aside } from './rightSide/Aside'
import { useEffect } from 'react'
import { useModal } from '@/hooks/useModal'
import { CreateSlugModal } from './modals/CreateSlugModal'
import { useSession } from 'next-auth/react'

export function Layout ({ children }) {
  const { openModal, closeModal, open } = useModal()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      const hasSlug = localStorage.getItem('slugSetted')
      if (hasSlug === null) {
        openModal()
      }
    }
  }, [status])

  return <div className={styles.div} style={{ position: 'relative' }}>
    {
      open && <CreateSlugModal closeModal={closeModal} />
    }
    <Navbar />
    <main className={styles.main}>
      {children}
    </main>
    <Aside />
  </div>
}
