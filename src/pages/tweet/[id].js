/* eslint-disable react/no-unknown-property */
import { Layout } from '@/components/ui/common/Layout'
import { ReactPortal } from '@/components/ui/common/ReactPortal'
import { SEO } from '@/components/ui/common/SEO'
import { TweetModal } from '@/components/ui/modals/TweetModal'
import { ScreenProtector } from '@/components/ui/screenProtector/ScreenProtector'
import { Tweet } from '@/components/ui/tweet/Tweet'
import { TweetPageEntrys } from '@/components/ui/tweet/TweetPageEntrys'
import { TweetPageInteractions } from '@/components/ui/tweet/TweetPageInteractions'
import { TweetPageHeader } from '@/components/ui/tweetPageHeader/TweetPageHeader'
import { WriteTweetMain } from '@/components/ui/writeTweet/WriteTweetMain'
import { WindowSizeContext } from '@/contexts/WindowSizeContext'
import { useTweetPage } from '@/hooks/useTweetPage'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { singleTweet } from '../../../database/functions/singleTweet'
import { waitFunc } from '../../../database/functions/waitFunc'

export default function TweetPage ({ tweet, error }) {
  const { status } = useSession()
  const {
    openReply,
    closeModal,
    deleteTweetBack,
    setTweet,
    replies,
    open,
    threadTweet,
    divRef,
    modalName,
    externalInteractions
  } = useTweetPage({ tweet, error })

  const { size } = useContext(WindowSizeContext)

  return <>
      <SEO title={tweet
        ? `${tweet.author.username} on Twitter: "${tweet.content.substring(0, 40)}"`
        : 'Tweet'}
        image={tweet?.image?.hasImage ? tweet?.image?.src : null }
        description={tweet?.content}
      />
      {
        status === 'loading' && <ScreenProtector />
      }

      <ReactPortal wrapperId='writetweet-modal'>
        {
        open && modalName === 'writeTweet' &&
          <TweetModal closeModal={closeModal} addTweet={externalInteractions.addComment} reply={{ isReply: true, reply: tweet }} />
        }
      </ReactPortal>

      <main>
      <TweetPageHeader isThread={tweet?.reply?.isReplying} />
      {
        tweet &&
          <>
            {
              threadTweet.data.map(el => <Tweet key={el._id} tweet={el} isInTweetReply={true} />)
            }
            <div className='refContainer'>
              <div className='ref' ref={divRef}></div>
            <Tweet tweet={tweet} isInPage={true} openImageAddTweet={externalInteractions.addComment} deleteTweet={deleteTweetBack} />
            <TweetPageEntrys {...tweet} />
            <TweetPageInteractions setTweet={setTweet} openReply={openReply} {...tweet} />
            <WriteTweetMain noPadding isInTweetPage={true} replyingTo={tweet?.author?.slug} reply={{ isReply: true, reply: tweet }} addTweet={externalInteractions.addComment} />
            {
              replies.map((tweet) => <Tweet key={tweet._id} tweet={tweet} externalInteractions={externalInteractions} upReply />)
            }
            </div>
          </>
      }
      {
        error && <span className='error'>{error}</span>
      }
      </main>

      <style jsx>{`
        .error {
          color: red;
          text-align: center
        }
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
          min-height: ${size > 1000 ? '100%' : '100vh'};
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

export async function getServerSideProps (context) {
  const req = context.req
  const res = context.res
  const id = context.params.id

  try {
    const tweet = await waitFunc(async () => await singleTweet({ id, req, res }), 5000)
    return {
      props: {
        tweet: JSON.parse(JSON.stringify(tweet))
      }
    }
  } catch (err) {
    return {
      props: { error: err.message }
    }
  }
}
