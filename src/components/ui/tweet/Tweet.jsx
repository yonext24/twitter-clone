import { formatDate } from '@/assets/consts'
import { PointsIcon } from '@/components/icons/navbar/Points'
import { useModal } from '@/hooks/useModal'
import { useSession } from 'next-auth/react'
import { useContext, useState } from 'react'
import { ModalBackground } from '../ModalBackground'
import { DeleteTweetModal } from '../modals/DeleteTweetModal'
import { TweetOptionsModal } from '../modals/TweetOptionsModal'
import { Interactions } from './interactions/Interactions'
import styles from './tweet.module.css'
import { WriteTweetModalContext } from '@/contexts/WriteTweetModalContext'
import { ImageWithPlaceholder } from '../ImageWithPlaceholder'
import { useRouter } from 'next/router'
import { Slug } from '../common/Slug'
import { Name } from '../common/Name'

export function Tweet ({ tweet, isInReply = false, replyingTo, isInPage = false }) {
  const [modalName, setModalName] = useState('')
  const [deleted, setDeleted] = useState(false)

  const { image: userImage, username, slug } = tweet.author
  const { content, createdAt, replies, likes, _id, isLiked, image } = tweet
  const formattedDate = formatDate(createdAt, isInPage)
  const { data } = useSession()
  const user = data?.user

  const { open, openModal, closeModal } = useModal()
  const { dispatch } = useContext(WriteTweetModalContext)

  const openReply = () => {
    dispatch({ type: 'openReply', payload: tweet })
  }
  const router = useRouter()

  const handleClick = () => {
    if (isInReply || isInPage) {
      return
    }
    router.push(`/tweet/${tweet._id}`)
  }

  if (deleted) return null
  return (
  <>
    {
      open && modalName === 'options' && <ModalBackground closeModal={closeModal} />
    }
    {
      open && modalName === 'delete' && <DeleteTweetModal id={_id} user={user} setDeleted={setDeleted} closeModal={closeModal} />
    }
    <article onClick={handleClick} className={`${styles.tweet} ${isInReply || isInPage ? styles.inReply : ''}`} style={{ borderBottom: (!isInReply && !isInPage) && 'var(--borderProperty)', cursor: isInPage || isInReply ? 'unset' : 'pointer', padding: isInPage && '12px 6px' }}>
      {
        open && modalName === 'options' && <TweetOptionsModal id={_id} username={username} isOwn={ user?.name === username || user?.role === 'admin' } setModalName={setModalName} />
      }
      <div>
        {
          !isInPage && <ImageWithPlaceholder image={userImage} height={48} width={48} alt='Your profile image' />
        }
          {
            isInReply && <div className={styles.replyBar}></div>
          }
        </div>
      <div className={styles.dataContainer}>
        <div className={styles.namesContainer} style={{ marginBottom: isInPage ? '8px' : '' }}>
            {
              isInPage && <ImageWithPlaceholder image={userImage} height={48} width={48} alt='Your profile image' animation='left' />
            }
          <div style={{ flexDirection: isInPage ? 'column' : 'row', marginLeft: isInPage ? '15px' : '' }}>
            <Name>{username}</Name>
            <Slug>@{slug}</Slug>
              {
                !isInPage && <>
                  <span>·</span>
                  <span>{formattedDate}</span>
                </>
              }
          </div>
          {
            !isInReply && (
              <button className={styles.points} onClick={(e) => { e.stopPropagation(); openModal(); setModalName('options') }}>
                <PointsIcon width='1.25rem' style={{ margin: '0 auto' }} />
              </button>
            )
          }
        </div>
        {
          tweet.isReplying && !isInReply && (
            <p style={{ color: 'var(--slugColor)', marginTop: '', marginBottom: isInPage ? '8px' : '' }}>Replying to
            <span style={{ color: 'var(--blue)', cursor: 'pointer' }}> @{tweet.replyingUser.slug}</span>
            </p>
          )
        }
        <div className={styles.contentContainer}>
          <p style={{ ...(isInPage && { fontSize: '1.5rem', lineHeight: '1.6rem' }) }}>{content}</p>
        </div>
        {
          tweet.image.hasImage && <div className={styles.imageContainer}>
            <ImageWithPlaceholder
              height={image.height}
              width={image.width}
              image={image.src}
              alt='Tweet image'
              styles={{
                borderRadius: 16,
                width: '100%',
                height: 'auto',
                aspectRatio:
              image.aspectRatio
              }}
              animation='bottom'
            />
          </div>
        }
        {
          (!isInReply && !isInPage) && <Interactions id={_id} comments={replies.length} likes={likes} retweets={0} isLiked={isLiked} openReply={openReply} />
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
