import { HeaderButtons } from './HeaderButtons'
import styles from './tweetsectionheader.module.css'

export function TweetSectionHeader ({ sectionSelected, setSectionSelected }) {
  return <header className={styles.header}>
    <div className={styles.inicioContainer}>
      <h3>Home</h3>
    </div>
    <HeaderButtons sectionSelected={sectionSelected} setSectionSelected={setSectionSelected} />
  </header>
}
