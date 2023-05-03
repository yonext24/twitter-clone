/* eslint-disable react/no-unknown-property */
import { ImageWithPlaceholder } from '../ImageWithPlaceholder'
import { ModalBackground } from '../ModalBackground'
import { ReactPortal } from '../ReactPortal'
import { Spinner } from '../spinner/Spinner'
import { Tweet } from '../tweet/Tweet'
import { TweetPageEntrys } from '../tweet/TweetPageEntrys'
import { TweetPageInteractions } from '../tweet/TweetPageInteractions'
import { CommentEntry } from '../tweet/interactions/entrys/CommentEntry'
import { LikeEntry } from '../tweet/interactions/entrys/LikeEntry'
import { RetweetEntry } from '../tweet/interactions/entrys/RetweetEntry'
import { WriteTweetMain } from '../writeTweet/WriteTweetMain'
import { useOpenImage } from '@/hooks/useOpenImage'
import { TweetModal } from './TweetModal'

export function OpenImage ({ closeModal, id, addTweetToTweetPage }) {
  const {
    tweet,
    open,
    isLoading,
    setTweet,
    addTweet,
    openReply,
    handleAddLike,
    closeReply
  } = useOpenImage({ id, closeModalProp: closeModal, addTweetToTweetPage })
  const image = tweet?.image

  return <>

    <ReactPortal wrapperId='writetweet-modal'>
      {
        open && <TweetModal closeModal={closeReply} reply={{ isReply: true, reply: tweet }} addTweet={addTweet} />
      }
    </ReactPortal>

    <ModalBackground closeModal={closeModal} blueBackground styles={{ overflow: 'hidden', ...(!isLoading && { backgroundColor: 'rgba(0, 0, 0, 0.9)' }) }}>
        {
          isLoading && <Spinner style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-100%)' }} />
        }
        {
          !isLoading && tweet && <>
            <div className='pageContainer'>
              <div className='imageSide'>
                <div className='imageContainer' >
                  <ImageWithPlaceholder
                    height={image.height}
                    width={image.width}
                    image={image.src}
                    styles={{ width: '100%', height: 'auto', maxHeight: 'calc(100vh - 48px)', maxWidth: image.width, objectFit: 'contain', borderRadius: 0, aspectRatio: image.aspectRatio, margin: 'auto' }}
                    alt='image'
                  />
                </div>
                <div className='interactionsContainer' onClick={e => e.stopPropagation()}>
                  <CommentEntry width='1.5rem' openReply={openReply} />
                  <RetweetEntry width='1.5rem' />
                  <LikeEntry id={tweet._id} likes={tweet.likes} isLiked={tweet.isLiked} isInPage={true} width='1.5rem' handleAddLike={handleAddLike} />
                </div>

              </div>
              <div className='dataSide' onClick={e => e.stopPropagation()}>
                <Tweet tweet={tweet} isInPage={true} withoutImage isStretch/>
                <TweetPageEntrys {...tweet} />
                <TweetPageInteractions setTweet={setTweet} openReply={openReply} {...tweet} />
                <WriteTweetMain noPadding noIcons isInTweetPage={true} replyingTo={tweet?.author?.slug} reply={{ isReply: true, reply: tweet }} addTweet={addTweet} />
                {
                  tweet.replies.map((tweet) => <Tweet key={tweet._id} tweet={tweet} isStretch noOpenImage />)
                }
              </div>
            </div>

          </>
        }
    </ModalBackground>
    <style jsx>{`
    
      .interactionsContainer {
        display: flex;
        width: 100%;
        justify-content: space-around;
        flex: 48px;
        max-width: 600px;
        margin: 0 auto
      }
      .pageContainer {
        display: flex;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      .imageSide {
        flex: 1;
        display: grid;
        grid-template-rows: 1fr 48px;
      }
      .imageContainer {
        display: flex
      }
      .dataSide {
        width: 350px;
        background-color: var(--background);
        height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        border-left: 1px solid var(--borderColor)
      }
    
    `}</style>
  </>
}
