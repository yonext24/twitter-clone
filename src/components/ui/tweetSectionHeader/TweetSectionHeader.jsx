import styles from './tweetsectionheader.module.css'

export function TweetSectionHeader ({ sectionSelected, setSectionSelected }) {
  return <header className={styles.header}>
    <div className={styles.inicioContainer}>
      <h3>Home</h3>
    </div>
    <div className={styles.buttonsContainer}>
      <button className={styles.button} onClick={() => setSectionSelected('foryou')}>
        <div>
            <div className={styles.spanContainer}>
              <span style={{ fontWeight: sectionSelected === 'foryou' ? 'bold' : 'normal', color: sectionSelected === 'foryou' ? 'var(--mainColor)' : 'var(--slugColor)' }}>For You</span>
            </div>
            <div style={{ width: '100%', height: 4, borderRadius: 5, backgroundColor: sectionSelected === 'foryou' ? 'var(--blue)' : 'transparent' }}></div>
        </div>
      </button>
      <button className={styles.button} onClick={() => setSectionSelected('following')}>
        <div>
            <div className={styles.spanContainer}>
              <span style={{ fontWeight: sectionSelected === 'following' ? 'bold' : 'normal', color: sectionSelected === 'following' ? 'var(--mainColor)' : 'var(--slugColor)' }}>Following</span>
            </div>
            <div style={{ width: '100%', height: 4, borderRadius: 5, backgroundColor: sectionSelected === 'following' ? 'var(--blue)' : 'transparent' }}></div>
        </div>
      </button>
    </div>
  </header>
}
