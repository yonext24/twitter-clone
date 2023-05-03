import styles from '../aside.module.css'
import { Hashtag } from './Hashtag'
import { RightSideContainer } from '../RightSideContainer'
import { ShowMore } from '../ShowMore'
import { useEffect, useState } from 'react'
import { Spinner } from '../../spinner/Spinner'

const hashtags = [
  {
    id: '1',
    name: 'Argentina World Champion',
    amount: '1986K',
    type: 'Fifa World Cup 2022',
    image: {
      hasImage: true,
      src: '/messigoat.webp',
      alt: 'Lionel messi kissing world cup 2022 cup'
    }
  },
  {
    id: '3',
    name: 'Counter Strike 2 Release',
    amount: '201K',
    type: 'Videogames',
    image: {
      hasImage: true,
      src: '/cs2.webp',
      alt: 'Counter Strike 2 release photo'
    }
  },
  {
    id: '2',
    name: 'Twitter Blue',
    amount: '12K',
    type: 'Technology'
  },
  {
    id: 4,
    name: 'Nextjs',
    amount: '8K',
    type: 'Technology'
  }
]

export function HashtagsSection () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timeoutId)
  }, [])

  return <RightSideContainer minHeight='220px'>
    {
      loading
        ? <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
          </div>
        : <>
            <p className={styles.title}>What&lsquo;s happening</p>
            {
              hashtags.map(({ id, ...el }) => <Hashtag key={id} {...el} />)
            }
            <ShowMore />
      </>
    }
  </RightSideContainer>
}
