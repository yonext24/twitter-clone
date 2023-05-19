import { useEffect, useState } from 'react'
import styles from './mobilenavbar.module.css'
import { ModalBackground } from '../../common/ModalBackground'
import { CloseIcon } from '@/components/icons/writeTweet/Close'
import { ImageWithPlaceholder } from '../../common/ImageWithPlaceholder'
import { useSession } from 'next-auth/react'
import { PlusIcon } from '@/components/icons/navbar/PlusIcon'
import { Name } from '../../common/Name'
import { Slug } from '../../common/Slug'
import { NavbarCard } from './navbar-card'
import { useRouter } from 'next/router'
import { entrys, options } from '@/assets/navbarEntrys'
import { OptionCard } from './option-card'

export default function MobileNavbar ({ isOpen, setIsOpen }) {
  const [hidden, setHidden] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setHidden(false)
    }
  }, [isOpen])

  const closeModal = () => {
    setHidden(true)
    setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }
  useEffect(() => {
    if (isOpen) closeModal()
  }, [router.route])

  const { data } = useSession()
  const user = data?.user

  if (!isOpen) return null

  return <ModalBackground blueBackground={true} closeModal={closeModal}>
    <aside className={styles.aside} style={{ transform: `translateX(${hidden ? '-100%' : '0'})` }} onClick={e => e.stopPropagation()}>
      <div className={styles.header}>
        <h3>Account info</h3>
        <button onClick={closeModal}>
          <CloseIcon height={20} width={20} />
        </button>
      </div>
      <div className={styles.userInfo}>
        <div>
          <ImageWithPlaceholder image={user?.image} height={40} width={40} alt='Your profile image' />
          <div className={styles.circle}>
            <PlusIcon width={18} height={18} />
          </div>
        </div>
        <div>
          <Name styles={{ fontSize: '17px' }}>{user?.name}</Name>
          <Slug size='14px' styles={{ color: 'rgb(113, 118, 123)' }}>{ user?.slug && '@' + user?.slug}</Slug>
        </div>
        <div>
          <div>
            <span>0</span>
            <Slug size='14px' styles={{ color: 'rgb(113, 118, 123)' }}>Following</Slug>
          </div>
          <div>
            <span>0</span>
            <Slug size='14px' styles={{ color: 'rgb(113, 118, 123)' }}>Followers</Slug>
          </div>
        </div>
      </div>
      <div className={styles.entrys}>
        {
          entrys.map(el => {
            return <NavbarCard key={el.title} title={el.title} href={el.href}>
              <el.icon width={24} height={24} />
            </NavbarCard>
          })
        }
      </div>
      <div className={styles.options}>
        {
          options.map(el => <OptionCard title={el.title} key={el.title} />)
        }
      </div>
    </aside>
  </ModalBackground>
}
