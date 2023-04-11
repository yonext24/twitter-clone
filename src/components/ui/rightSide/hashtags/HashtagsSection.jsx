import styles from './hashtagssection.module.css'
import { Hashtag } from './Hashtag'

const hashtags = [
  {
    id: '1',
    name: 'Just',
    amount: 1978,
    type: 'Movies'
  },
  {
    id: '2',
    name: 'a',
    amount: 1986,
    type: 'Movies'
  },
  {
    id: '3',
    name: 'Placeholder :)',
    amount: 2022,
    type: 'Movies'
  }
]

export function HashtagsSection () {
  return <div className={styles.container}>
    <p className={styles.title}>What&lsquo;s happening</p>
    {
      hashtags.map(el => {
        return <Hashtag key={el.id} data={el} />
      })
    }
  </div>
}
