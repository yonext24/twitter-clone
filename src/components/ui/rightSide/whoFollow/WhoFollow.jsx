import { useEffect, useState } from 'react'
import { RightSideContainer } from '../RightSideContainer'
import { ShowMore } from '../ShowMore'
import styles from '../aside.module.css'
import { WhoFollowPerson } from './WhoFollowPerson'
import { Spinner } from '../../spinner/Spinner'

const whoToFollowEntrys = [
  {
    key: 1,
    name: 'Yonathan Picone',
    slug: 'Administrator',
    image: 'https://lh3.googleusercontent.com/a/AGNmyxaWFTmNKXnYY1e3fr6R1-Lab6u3nOaFesBmwpdn=s96-c'
  }
]

export function WhoFollow () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const randomTimer = Math.random() * 1000

    const timeoutId = setTimeout(() => {
      setLoading(false)
    }, randomTimer)

    return () => clearTimeout(timeoutId)
  }, [])

  return <RightSideContainer>
    {
      loading
        ? <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner />
    </div>
        : <>
      <p className={styles.title}>Who to follow</p>
      {
        whoToFollowEntrys.map(({ key, ...el }) => <WhoFollowPerson key={key} {...el} />)
      }
      <ShowMore />
      </>
    }
    </RightSideContainer>
}
