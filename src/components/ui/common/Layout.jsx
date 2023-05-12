import styles from '@styles/layout.module.css'
import { Navbar } from '../navbar/Navbar'
import { Aside } from '../rightSide/Aside'
import { useEffect } from 'react'
import { useModal } from '@/hooks/useModal'
import { CreateSlugModal } from '../modals/CreateSlugModal'
import { useSession } from 'next-auth/react'
import { ToastContainer, cssTransition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Layout ({ children }) {
  const { openModal, closeModal, open } = useModal()
  // ^ Not sure but probably i should have used createPortal to do this instead
  const { data } = useSession()
  const user = data?.user

  useEffect(() => {
    if (user) {
      const hasSlug = user.hasSlug
      if (!hasSlug) {
        openModal()
      }
    }
  }, [user])

  const animation = cssTransition({
    enter: 'appear',
    exit: 'dissapear',
    collapseDuration: 0
  })

  return <div className={styles.div} style={{ position: 'relative' }}>
    {
      open && <CreateSlugModal closeModal={closeModal} />
    }
    <Navbar />
    <main className={styles.main}>
      {children}
    </main>
    <Aside />
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      limit={1}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={animation}
    />
  </div>
}
