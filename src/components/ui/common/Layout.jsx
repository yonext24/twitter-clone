import styles from '@styles/layout.module.css'
import { useContext, useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { CreateSlugModal } from '../modals/CreateSlugModal'
import { useSession } from 'next-auth/react'
import { ToastContainer, cssTransition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { WindowSizeContext } from '@/contexts/WindowSizeContext'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const BottomBar = dynamic(() => import('../navbar/downBar/BottomBar.jsx'))
const MobileHeader = dynamic(() => import('../navbar/MobileHeader.jsx'), { ssr: false })
const MobileNavbar = dynamic(() => import('../navbar/mobileNavbar/MobileNavbar.jsx'))
const WideNavbar = dynamic(() => import('../navbar/wideNavbar/WideNavbar.jsx'))
const Aside = dynamic(() => import('../rightSide/Aside.jsx'))

export function Layout ({ children }) {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false)

  const { openModal, closeModal, open } = useModal()
  const { size } = useContext(WindowSizeContext)
  const { data } = useSession()
  const user = data?.user
  const router = useRouter()

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

  return <div className={styles.div} style={{ position: 'relative', flexDirection: size > 500 ? 'row' : 'column' }}>
    {
      open && <CreateSlugModal closeModal={closeModal} />
    }
    {
      size > 500
        ? <WideNavbar />
        : router.route === '/home' && <MobileHeader setOpen={setIsMobileNavbarOpen} />
    }
    <main className={styles.main}>
      {children}
    </main>
    {
      size <= 500 && <>
        <MobileNavbar isOpen={isMobileNavbarOpen} setIsOpen={setIsMobileNavbarOpen} />
        <BottomBar />
      </>
    }
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
