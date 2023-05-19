/* eslint-disable react/no-unknown-property */
import { ImageWithPlaceholder } from '../common/ImageWithPlaceholder'
import { ModalBackground } from '../common/ModalBackground'
import { ReactPortal } from '../common/ReactPortal'
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
import { DoubleArrowIcon } from '@/components/icons/tweet/DoubleArrow'
import { CloseIcon } from '@/components/icons/writeTweet/Close'

export function OpenImage ({ closeModal, id, addTweetToTweetPage }) {
  const {
    tweet,
    replies,
    externalInteractions,
    open,
    isLoading,
    setTweet,
    addTweet,
    openReply,
    handleAddLike,
    closeReply,
    isTweetOpen,
    handleClick
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
                <div className='buttonsContainer'>
                  <button>
                    <div>
                      <CloseIcon width='20px' height='20px' />
                    </div>
                  </button>
                  <button onClick={handleClick}>
                    <div>
                      <DoubleArrowIcon width='20px' height='20px' styles={{ transform: isTweetOpen.open && 'rotate(180deg)' }} />
                    </div>
                  </button>
                </div>
                <div className='imageContainer' >
                  <ImageWithPlaceholder
                    height={image.height}
                    width={image.width}
                    image={image.src}
                    styles={{ width: '100%', height: 'auto', maxHeight: 'calc(100vh - 88px)', maxWidth: image.width, objectFit: 'contain', borderRadius: 0, aspectRatio: image.aspectRatio, margin: 'auto' }}
                    alt='image'
                  />
                </div>
                <div className='interactionsContainer' onClick={e => e.stopPropagation()}>
                  <CommentEntry width='1.5rem' openReply={openReply} />
                  <RetweetEntry width='1.5rem' />
                  <LikeEntry id={tweet._id} likes={tweet.likes} isLiked={tweet.isLiked} isInPage={true} width='1.5rem' externalAddLike={handleAddLike} />
                </div>

              </div>
              <div className='dataSide'style={{ width: !isTweetOpen.open && 0 }} onClick={e => e.stopPropagation()}>
                <Tweet tweet={tweet} isInPage={true} withoutImage isStretch/>
                <TweetPageEntrys {...tweet} />
                <TweetPageInteractions setTweet={setTweet} openReply={openReply} {...tweet} />
                <WriteTweetMain noPadding noIcons isInTweetPage={true} replyingTo={tweet?.author?.slug} reply={{ isReply: true, reply: tweet }} addTweet={addTweet} />
                {
                  replies.map((tweet) => <Tweet key={tweet._id} tweet={tweet} externalInteractions={externalInteractions} upReply isStretch noOpenImage />)
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
        grid-template-rows: 48px 1fr 48px;
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
      .buttonsContainer {
        display: flex;
        justify-content: space-between;
        color: var(--mainColor)
      }
      .buttonsContainer button {
        height: 100%;
        aspect-ratio: 1;
        color: inherit;
        cursor: pointer
      }
      .buttonsContainer button div {
        margin: auto 0;
        color: inherit;
        height: 36px;
        width: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(4px);3
        background-color: rgba(0, 0, 0, 0.75);
        border-radius: 9999px;
        transition: background-color .2s;
      }
      .buttonsContainer button div:hover {
        background-color: rgba(39, 44, 48, 0.75);
      }
    
    `}</style>
  </>
}
