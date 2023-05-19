import { HomeIcon } from '@/components/icons/navbar/Home'
import styles from './bottombar.module.css'
import { useRouter } from 'next/router'
import { SearchIcon } from '@/components/icons/navbar/Search'
import { NotifIcon } from '@/components/icons/navbar/Notif'
import { MessageIcon } from '@/components/icons/navbar/Message'
import Link from 'next/link'

export default function BottomBar () {
  const router = useRouter()
  return <>
  <div style={{ height: 55 }}></div>
  <nav className={styles.bar}>
    <ul>
      <Link href='/home'>
        <li className={styles.icon}>
          <HomeIcon color='var(--mainColor)' width='26.25px' height='26.25px' isSelected={router.route === '/home'} />
        </li>
      </Link>
      <li className={styles.icon}>
        <SearchIcon color='var(--mainColor)' width='26.25px' height='26.25px' />
      </li>
      <li className={styles.icon}>
        <NotifIcon color='var(--mainColor)' width='26.25px' height='26.25px' />
      </li>
      <li className={styles.icon}>
        <MessageIcon color='var(--mainColor)' width='26.25px' height='26.25px' />
      </li>
    </ul>

  </nav>
  </>
}
