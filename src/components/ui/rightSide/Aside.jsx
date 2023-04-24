import { useContext } from 'react'
import styles from './aside.module.css'
import { HashtagsSection } from './hashtags/HashtagsSection'
import { Search } from './search/Search'
import { WhoFollow } from './whoFollow/WhoFollow'
import { Help } from './help/Help'
import { WindowSizeContext } from '@/contexts/WindowSizeContext'

export function Aside () {
  const { size } = useContext(WindowSizeContext)

  if (size < 1000) return null

  return <aside className={styles.aside}>
    <Search />
    <div className={styles.container}>
      <HashtagsSection />
      <WhoFollow />
      <Help />
    </div>
  </aside>
}
