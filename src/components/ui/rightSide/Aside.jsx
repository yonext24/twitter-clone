import { useEffect, useState } from 'react'
import styles from './aside.module.css'
import { HashtagsSection } from './hashtags/HashtagsSection'
import { Search } from './search/Search'

export function Aside () {
  const [size, setSize] = useState(500)

  useEffect(() => {
    if (!window) return

    setSize(window.innerWidth)

    window.addEventListener('resize', e => {
      setSize(e.target.innerWidth)
    })
  }, [])

  if (size < 1000) return null

  return <aside className={styles.aside}>
    <Search />
    <HashtagsSection />
  </aside>
}
