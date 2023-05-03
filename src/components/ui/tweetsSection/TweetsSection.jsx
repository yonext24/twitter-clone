import styles from './tweetsSection.module.css'
import { Tweet } from '../tweet/Tweet'
import { TweetSectionHeader } from '../tweetSectionHeader/TweetSectionHeader'
import { WriteTweetMain } from '../writeTweet/WriteTweetMain'
import { Spinner } from '../spinner/Spinner'

export function TweetsSection ({ sectionSelected, setSectionSelected, tweets, error, isLoading }) {
  return <section className={styles.section} >
    <TweetSectionHeader sectionSelected={sectionSelected} setSectionSelected={setSectionSelected} />
    <WriteTweetMain />
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
