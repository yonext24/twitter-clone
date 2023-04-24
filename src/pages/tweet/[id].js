/* eslint-disable react/no-unknown-property */
import { getSingleTweet } from '@/assets/consts'
import { Layout } from '@/components/ui/Layout'
import { SEO } from '@/components/ui/SEO'
import { TweetModal } from '@/components/ui/modals/TweetModal'
import { Spinner } from '@/components/ui/spinner/Spinner'
import { Tweet } from '@/components/ui/tweet/Tweet'
import { TweetPageEntrys } from '@/components/ui/tweet/TweetPageEntrys'
import { TweetPageInteractions } from '@/components/ui/tweet/TweetPageInteractions'
import { TweetPageHeader } from '@/components/ui/tweetPageHeader/TweetPageHeader'
import { WriteTweetMain } from '@/components/ui/writeTweet/WriteTweetMain'
import { WriteTweetModalContext } from '@/contexts/WriteTweetModalContext'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useQuery } from 'react-query'

export default function TweetPage () {
  const [tweet, setTweet] = useState(null)

  const router = useRouter()
  const { id } = router.query

  const { dispatch, state } = useContext(WriteTweetModalContext)

  const openReply = () => {
    dispatch({ type: 'openReply', payload: tweet })
  }
  const addTweet = (newTweet) => {
    setTweet(prev => {
      const updatedReplies = [...prev.replies, newTweet]
      return { ...prev, replies: updatedReplies }
    })
  }

  const { isLoading } = useQuery(
    ['getSingleTweet', id],
    () => (id && !tweet ? getSingleTweet(id) : null),
    { retryDelay: 5000, refetchOnWindowFocus: false, refetchInterval: false, onSuccess: setTweet })

  return <>
    <SEO title={tweet
      ? `${tweet.author.username} on Twitter: "${tweet.content}"`
      : 'Tweet'}
    />

      {
        state.open === true && <TweetModal addTweet={addTweet} />
      }

      <main>
      <TweetPageHeader />
      {
        isLoading || !tweet
          ? <Spinner style={{ margin: '1rem auto' }} />
          : <>
            <Tweet tweet={tweet} isInPage={true} />
            <TweetPageEntrys {...tweet} />
            <TweetPageInteractions setTweet={setTweet} openReply={openReply} {...tweet} />
            <WriteTweetMain isInTweetPage={true} replyingTo={tweet?.author?.slug} reply={{ isReply: true, reply: tweet }} addTweet={addTweet} />
            {
              tweet.replies.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />)
            }
          </>
      }
      </main>

      <style jsx>{`

        main {
          display: flex;
          flex-direction: column;
          height: auto;
          min-height: 100vh;
          width: 100%;
          max-width: 600px;
          border-left: 1px solid var(--borderColor);
          border-right: 1px solid var(--borderColor);
        }
        
      `}</style>
  </>
}

TweetPage.getLayout = (page) => {
  return <Layout>
    {page}
  </Layout>
}
