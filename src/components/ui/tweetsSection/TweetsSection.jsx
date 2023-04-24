import styles from './tweetsSection.module.css'
import { Tweet } from '../tweet/Tweet'
import { TweetSectionHeader } from '../tweetSectionHeader/TweetSectionHeader'
import { WriteTweetMain } from '../writeTweet/WriteTweetMain'
import { Spinner } from '../spinner/Spinner'
import { useContext } from 'react'
import { WindowSizeContext } from '@/contexts/WindowSizeContext'

export function TweetsSection ({ sectionSelected, setSectionSelected, tweets, addTweet, error, isLoading }) {
  const { size } = useContext(WindowSizeContext)

  return <section className={styles.section} style={{ minHeight: size <= 1000 ? 'calc(100vh - 1px)' : 'calc(100% - 1px)' }}>
    <TweetSectionHeader sectionSelected={sectionSelected} setSectionSelected={setSectionSelected} />
    <WriteTweetMain addTweet={addTweet} />
    {
      tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />)
    }
    {
      isLoading && <Spinner style={{ margin: '15px auto' }} />
    }
    {
      error && <span style={{ color: 'red', textAlign: 'center', display: 'block' }}>{error.message}</span>
    }
  </section>
}
