/* eslint-disable react/no-unknown-property */
import { Layout } from '@/components/ui/common/Layout'
import { ReactPortal } from '@/components/ui/common/ReactPortal'
import { SEO } from '@/components/ui/common/SEO'
import { TweetModal } from '@/components/ui/modals/TweetModal'
import { ScreenProtector } from '@/components/ui/screenProtector/ScreenProtector'
import { Spinner } from '@/components/ui/spinner/Spinner'
import { Tweet } from '@/components/ui/tweet/Tweet'
import { TweetPageEntrys } from '@/components/ui/tweet/TweetPageEntrys'
import { TweetPageInteractions } from '@/components/ui/tweet/TweetPageInteractions'
import { TweetPageHeader } from '@/components/ui/tweetPageHeader/TweetPageHeader'
import { WriteTweetMain } from '@/components/ui/writeTweet/WriteTweetMain'
import { useTweetPage } from '@/hooks/useTweetPage'
import { useSession } from 'next-auth/react'

export default function TweetPage () {
  const { status } = useSession()
  const { openReply, addTweet, deleteTweet, deleteTweetBack, setTweet, isLoading, tweet, open, closeModal, modalName, threadTweet, divRef } = useTweetPage()
  return <>
      <SEO title={tweet
        ? `${tweet.author.username} on Twitter: "${tweet.content}"`
        : 'Tweet'}
      />
      {
        status === 'loading' && <ScreenProtector />
      }

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
            {
              threadTweet && <Tweet tweet={threadTweet} isInTweetReply={true} />
            }
            <div className='refContainer'>
              <div className='ref' ref={divRef}></div>
            <Tweet tweet={tweet} isInPage={true} openImageAddTweet={addTweet} deleteTweet={deleteTweetBack} />
            <TweetPageEntrys {...tweet} />
            <TweetPageInteractions setTweet={setTweet} openReply={openReply} {...tweet} />
            <WriteTweetMain noPadding isInTweetPage={true} replyingTo={tweet?.author?.slug} reply={{ isReply: true, reply: tweet }} addTweet={addTweet} />
            {
              tweet.replies.map((tweet) => <Tweet key={tweet._id} tweet={tweet} deleteTweet={deleteTweet} />)
            }
            </div>
          </>
      }
      </main>

      <style jsx>{`
        .ref {
          position: absolute;
          height: 53px;
          top: -53px
        }
        .refContainer {
          min-height: 100vh;
          position: relative
        }
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
