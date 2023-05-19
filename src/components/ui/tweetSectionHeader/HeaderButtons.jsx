import styles from './tweetsectionheader.module.css'

export function HeaderButtons ({ sectionSelected = 'foryou', setSectionSelected }) {
  return <>
    <div className={styles.buttonsContainer}>
      <button className={styles.button} onClick={() => setSectionSelected && setSectionSelected('foryou')}>
        <div>
            <div className={styles.spanContainer}>
              <span style={{ fontWeight: sectionSelected === 'foryou' ? 'bold' : '500', color: sectionSelected === 'foryou' ? 'var(--mainColor)' : 'var(--dateColor)' }}>For you</span>
            </div>
            <div style={{ width: '100%', height: 4, borderRadius: 5, margin: '-4px 0 0', backgroundColor: sectionSelected === 'foryou' ? 'var(--blue)' : 'transparent' }}></div>
        </div>
      </button>
      <button className={styles.button} onClick={() => setSectionSelected && setSectionSelected('following')}>
        <div>
            <div className={styles.spanContainer}>
              <span style={{ fontWeight: sectionSelected === 'following' ? 'bold' : '500', color: sectionSelected === 'following' ? 'var(--mainColor)' : 'var(--dateColor)' }}>Following</span>
            </div>
            <div style={{ width: '100%', height: 4, borderRadius: 5, margin: '-4px 0 0', backgroundColor: sectionSelected === 'following' ? 'var(--blue)' : 'transparent' }}></div>
        </div>
      </button>
    </div>
  </>
}
