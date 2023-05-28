import { formatDate } from '@/assets/formatDate.js'
import { PointsIcon } from '@/components/icons/navbar/Points'
import { useModal } from '@/hooks/useModal'
import { useSession } from 'next-auth/react'
import { ModalBackground } from '../common/ModalBackground'
import { DeleteTweetModal } from '../modals/DeleteTweetModal'
import { TweetOptionsModal } from '../modals/TweetOptionsModal'
import { Interactions } from './interactions/Interactions'
import styles from './tweet.module.css'
import { ImageWithPlaceholder } from '../common/ImageWithPlaceholder'
import { useRouter } from 'next/router'
import { Slug } from '../common/Slug'
import { Name } from '../common/Name'
import { parseText } from '@/assets/parseText'
import { ReactPortal } from '../common/ReactPortal'
import { TweetModal } from '../modals/TweetModal'
import { OpenImage } from '../modals/OpenImage'

export function Tweet ({
  tweet,
  isInReply = false,
  isInTweetReply = false,
  replyingTo,
  externalInteractions,
  upReply,
  isInPage = false,
  isStretch = false,
  openImageAddTweet,
  noOpenImage,
  withoutImage
}) {
  const { image: userImage, username, slug } = tweet.author
  const { content, createdAt, replies, likes, _id, isLiked, isBookmarked, image, currentReplie, reply } = tweet
  const { isReplying } = reply
  const formattedDate = formatDate(createdAt, isInPage)
  const { data } = useSession()
  const user = data?.user

  const { open, openModal, closeModal, modalName } = useModal()
  const openReply = () => {
    openModal('writeTweet')
  }
  const router = useRouter()

  const handleClick = () => {
    if (isInReply || isInPage) {
      return
    }
    router.push(`/tweet/${tweet._id}`)
  }
  return (
  <>
      <ReactPortal wrapperId='openimage-modal'>
      {
        open && modalName === 'image' && <OpenImage closeModal={closeModal} id={_id} open={open} addTweetToTweetPage={openImageAddTweet} />
      }
      </ReactPortal>
      <ReactPortal wrapperId='writetweet-modal'>
      {
        open && modalName === 'writeTweet' && <TweetModal upReplies={upReply ? externalInteractions?.upReplies : false} closeModal={closeModal} reply={{ isReply: true, reply: tweet }} />
      }
      </ReactPortal>
      <ReactPortal wrapperId='deleteTweet-modal'>
      {
        open && modalName === 'delete' && <DeleteTweetModal closeModal={closeModal} id={tweet._id} externalDelete={externalInteractions?.delete} />
      }
      </ReactPortal>
    {
      open && modalName === 'options' && <ModalBackground closeModal={closeModal} />
    }
    <article onClick={handleClick} className={`${styles.tweet} ${isInReply || isInPage ? styles.inReply : ''}`}
    style={{ borderBottom: (!isInReply && !isInPage && !currentReplie && !isInTweetReply) ? 'var(--borderProperty)' : null, cursor: (isInPage || isInReply) ? 'unset' : 'pointer', padding: isInPage ? '12px 6px' : null }}>
      {
        open && modalName === 'options' && <TweetOptionsModal id={_id} username={username} isOwn={ user?.name === username || user?.role === 'admin' } openModal={openModal} />
      }
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          !isInPage && <ImageWithPlaceholder image={userImage} height={48} width={48} alt='Your profile image' />
        }
          {
            (isInReply || currentReplie || isInTweetReply) && <div className={styles.replyBar}></div>
          }
        </div>
      <div className={styles.dataContainer}>
        <div className={styles.namesContainer} style={{ marginBottom: isInPage ? '8px' : '' }}>
            {
              isInPage && <ImageWithPlaceholder image={userImage} height={48} width={48} alt='Your profile image' animation='left' />
            }
          <div style={{ flexDirection: isInPage ? 'column' : 'row', marginLeft: isInPage ? '15px' : '', overflow: 'hidden', flex: 1, ...(isStretch && { maxWidth: 211 }) }}>
            <Name isStretch={isStretch}>{username}</Name>
            <Slug isStretch={isStretch}>@{slug}</Slug>
              {
                !isInPage && <>
                  <span>·</span>
                  <span style={{ whiteSpace: 'nowrap' }}>{formattedDate}</span>
                </>
              }
          </div>
          {
            !isInReply && (
              <button className={styles.points} onClick={(e) => { e.stopPropagation(); openModal('options') }}>
                <PointsIcon width='1.25rem' style={{ margin: '0 auto' }} />
              </button>
            )
          }
        </div>
        {
          isReplying && !isInReply && !isStretch && !isInPage && (
            <p style={{ color: 'var(--slugColor)', marginTop: '', marginBottom: isInPage ? '8px' : '' }}>Replying to
            <span style={{ color: 'var(--blue)', cursor: 'pointer' }}> @{reply.replyingUser.slug}</span>
            </p>
          )
        }
        <div className={styles.contentContainer}>
          <p style={{ ...(isInPage && { fontSize: '1.5rem', lineHeight: '1.6rem', cursor: 'text' }) }}>{parseText(content)}</p>
        </div>
        {
          !withoutImage && tweet.image.hasImage && <div className={styles.imageContainer} onClick={e => { e.stopPropagation(); !noOpenImage && openModal('image') }}>
            <ImageWithPlaceholder
              height={image.height}
              width={image.width}
              image={image.src}
              alt='Tweet image'
              loading='lazy'
              styles={{
                borderRadius: 16,
                width: '100%',
                height: 'auto',
                maxHeight: '600px',
                objectFit: 'cover',
                objectPosition: 'top',
                aspectRatio: image.aspectRatio
              }}
              animation='bottom'
            />
          </div>
        }
        {
          (!isInReply && !isInPage) && <Interactions id={_id} comments={replies.length} likes={likes} retweets={0} externalInteractions={externalInteractions} isLiked={isLiked} openReply={openReply} isStretch={isStretch} isBookmarked={isBookmarked} />
        }
        {
          isInReply && <p style={{ color: 'var(--slugColor)', marginTop: '1rem' }}>Replying to
          <span style={{ color: 'var(--blue)', cursor: 'pointer' }}> @{replyingTo}</span>
          </p>
        }
        {
          isInPage && <span className={styles.date}>{formattedDate}</span>
        }
      </div>

    </article>
  </>
  )
}
