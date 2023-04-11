import styles from './tweetsSection.module.css'
import { Tweet } from '../tweet/Tweet'
import { TweetSectionHeader } from '../tweetSectionHeader/TweetSectionHeader'
import { WriteTweetMain } from '../writeTweet/WriteTweetMain'
import { Spinner } from '../spinner/Spinner'

export function TweetsSection ({ sectionSelected, setSectionSelected, tweets, addTweet, error, isLoading }) {
  return <section className={styles.section}>
    <TweetSectionHeader sectionSelected={sectionSelected} setSectionSelected={setSectionSelected} />
    <WriteTweetMain addTweet={addTweet} />
    {
      isLoading && <Spinner style={{ margin: '10px auto 0 auto' }} />
    }
    {
      tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />)
    }
    {
      error && <span style={{ color: 'red', textAlign: 'center', display: 'block' }}>{error.message}</span>
    }
  </section>
}
