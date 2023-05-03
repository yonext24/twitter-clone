import { HomeIcon } from '@/components/icons/navbar/Home'
import { MessageIcon } from '@/components/icons/navbar/Message'
import { MoreIcon } from '@/components/icons/navbar/More'
import { NotifIcon } from '@/components/icons/navbar/Notif'
import { PersonIcon } from '@/components/icons/navbar/Person'
import { PointsIcon } from '@/components/icons/navbar/Points'
import { SavedIcon } from '@/components/icons/navbar/Saved'
import { SearchIcon } from '@/components/icons/navbar/Search'
import { TwitterIcon } from '@/components/icons/navbar/Twitter'
import { WriteIcon } from '@/components/icons/navbar/Write'
import { useModal } from '@/hooks/useModal'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { ModalBackground } from '../ModalBackground'
import { ProfileModal } from '../modals/ProfileModal'
import { ImageWithPlaceholder } from '../ImageWithPlaceholder'
import { GithubIcon } from '@/components/icons/navbar/Github'
import { WindowSizeContext } from '@/contexts/WindowSizeContext'
import Link from 'next/link'
import styles from './navbar.module.css'
import { ReactPortal } from '../ReactPortal'
import { TweetModal } from '../modals/TweetModal'

export function Navbar () {
  const { open, closeModal, openModal, modalName } = useModal()

  const { data, status } = useSession()
  const user = data?.user

  const { size } = useContext(WindowSizeContext)

  return <nav className={styles.navbar} style={{ minWidth: size >= 1000 && 80 }}>

      {
        open && modalName === 'writeTweet' &&
        <ReactPortal wrapperId='writetweet-modal'>
          <TweetModal closeModal={closeModal} reply={{ isReply: false }} />
        </ReactPortal>
      }

    {
      open && modalName === 'options' && <ModalBackground closeModal={closeModal} />
    }
    <div style={{ zIndex: open ? 1000 : 0 }}>
      <ul className={styles.ul}>
        <li className={styles.li + ' ' + styles.twitterIcon}>
          <TwitterIcon color='rgb(214, 217, 219)' width='50px' height='30px' />
        </li>
          <Link href='/home' className={styles.liContainer}>
            <li className={styles.li}>
              <h4 className={styles.name} style={{ fontWeight: 'bold' }} >Home</h4>
              <HomeIcon color='var(--mainColor)' width='26.25px' height='26.25px' isSelected={true} />
            </li>
          </Link>
          <div className={styles.liContainer}>
            <li className={styles.li}>
              <h4 className={styles.name}>Search</h4>
              <SearchIcon color='var(--mainColor)' width='26.25px' height='26.25px' isSelected={false} />
            </li>
          </div>
          <div className={styles.liContainer}>
            <li className={styles.li}>
              <h4 className={styles.name}>Notifications</h4>
              <NotifIcon color='var(--mainColor)' width='26.25px' height='26.25px' isSelected={false} />
            </li>
          </div>
          <div className={styles.liContainer}>
            <li className={styles.li}>
              <h4 className={styles.name}>Messages</h4>
              <MessageIcon color='var(--mainColor)' width='26.25px' height='26.25px' isSelected={false} />
            </li>
          </div>
          <div className={styles.liContainer}>
            <li className={styles.li}>
              <h4 className={styles.name}>Bookmarks</h4>
              <SavedIcon color='var(--mainColor)' width='26.25px' height='26.25px' isSelected={false} />
            </li>
          </div>
          <Link href='https://github.com/yonext24/twitter-clone' target='_blank' rel='noreferrer' className={styles.liContainer}>
            <li className={styles.li}>
              <h4 className={styles.name}>Github</h4>
              <GithubIcon color='var(--mainColor)' width='26.25px' height='26.25px' />
            </li>
          </Link>
          <div className={styles.liContainer}>
            <li className={styles.li}>
              <h4 className={styles.name}>Profile</h4>
              <PersonIcon color='var(--mainColor)' width='26.25px' height='26.25px' isSelected={false} />
            </li>
          </div>
          <div className={styles.liContainer}>
            <li className={styles.li}>
              <h4 className={styles.name}>More</h4>
              <MoreIcon color='var(--mainColor)' width='26.25px' height='26.25px' />
            </li>
          </div>
          <button className={styles.tweetButton} onClick={() => openModal('writeTweet')}>
            <WriteIcon color='white' width='24px' height='24px' />
            <span>Tweet</span>
          </button>
      </ul>
      <div style={{ position: 'relative', margin: '-6px' }}>
        {
          open && modalName === 'options' && <ProfileModal slug={user?.slug} />
        }
      <button className={styles.profile} onClick={() => open ? closeModal() : openModal('options')}>
        {
          status === 'loading' || status === 'authenticated'
            ? <ImageWithPlaceholder image={data?.user?.image} height={40} width={40} alt='Your profile image' />
            : <ImageWithPlaceholder image={'/guest.webp'} height={40} width={40} alt='Yout guest image' />
        }
          <div style={{ display: 'flex', flexGrow: '1' }}>
            {
              status === 'authenticated' &&
              <div className={styles.nameContainer}>
                <span>{user?.name}</span>
                <label style={{ textAlign: 'left' }}>@{user?.slug}</label>
              </div>
            }
            <div className={styles.moreContainer}>
              <PointsIcon height='1.25rem' />
            </div>
          </div>
      </button>
      </div>
    </div>
  </nav>
}
