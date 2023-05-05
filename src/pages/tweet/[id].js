/* eslint-disable react/no-unknown-property */
import { getSingleTweet } from '@/assets/consts'
import { Layout } from '@/components/ui/Layout'
import { ReactPortal } from '@/components/ui/ReactPortal'
import { SEO } from '@/components/ui/SEO'
import { TweetModal } from '@/components/ui/modals/TweetModal'
import { Spinner } from '@/components/ui/spinner/Spinner'
import { Tweet } from '@/components/ui/tweet/Tweet'
import { TweetPageEntrys } from '@/components/ui/tweet/TweetPageEntrys'
import { TweetPageInteractions } from '@/components/ui/tweet/TweetPageInteractions'
import { TweetPageHeader } from '@/components/ui/tweetPageHeader/TweetPageHeader'
import { WriteTweetMain } from '@/components/ui/writeTweet/WriteTweetMain'
import { useModal } from '@/hooks/useModal'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export default function TweetPage () {
  const [tweet, setTweet] = useState(null)
  const { openModal, open, modalName, closeModal } = useModal()

  const router = useRouter()
  const { id } = router.query

  const openReply = () => {
    openModal('writeTweet')
  }
  const addTweet = (newTweet) => {
    console.log(newTweet)
    setTweet(prev => {
      const updatedReplies = [...prev.replies, newTweet]
      return { ...prev, replies: updatedReplies }
    })
  }
  const deleteTweet = (id) => {
    setTweet(prev => ({
      ...prev,
      replies: prev.replies.filter(el => el._id !== id)
    }))
  }

  const { data, isLoading } = useQuery(
    ['getSingleTweet', id],
    () => (id && !tweet ? getSingleTweet(id) : null),
    { retryDelay: 5000, refetchOnWindowFocus: false, refetchInterval: false, onSuccess: setTweet, staleTime: 600000 })

  useEffect(() => {
    if (data && !tweet) {
      setTweet(data)
    }
  }, [data])

  console.log(tweet)

  return <>
      <SEO title={tweet
        ? `${tweet.author.username} on Twitter: "${tweet.content}"`
        : 'Tweet'}
      />

      {
        open && modalName === 'writeTweet' &&
        <ReactPortal wrapperId='writetweet-modal'>
          <TweetModal closeModal={closeModal} addTweet={addTweet} reply={{ isReply: true, reply: tweet }} />
        </ReactPortal>
      }

      <main>
      <TweetPageHeader />
      {
        isLoading || !tweet
          ? <Spinner style={{ margin: '1rem auto' }} />
          : <>
            <Tweet tweet={tweet} isInPage={true} openImageAddTweet={addTweet} deleteTweet={() => router.back()} />
            <TweetPageEntrys {...tweet} />
            <TweetPageInteractions setTweet={setTweet} openReply={openReply} {...tweet} />
            <WriteTweetMain noPadding isInTweetPage={true} replyingTo={tweet?.author?.slug} reply={{ isReply: true, reply: tweet }} addTweet={addTweet} />
            {
              tweet.replies.map((tweet) => <Tweet key={tweet._id} tweet={tweet} deleteTweet={deleteTweet} />)
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
