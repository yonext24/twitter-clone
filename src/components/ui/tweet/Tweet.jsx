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

export function Tweet ({ tweet, isInReply = false, replyingTo }) {
  const [modalName, setModalName] = useState('')
  const [deleted, setDeleted] = useState(false)

  const { image, username, slug } = tweet.author
  const { content, createdAt, replies, likes, _id, isLiked } = tweet
  const formattedDate = formatDate(createdAt)
  const { data } = useSession()
  const user = data?.user

  const { open, openModal, closeModal } = useModal()
  const { dispatch } = useContext(WriteTweetModalContext)

  const openReply = () => {
    dispatch({ type: 'openReply', payload: tweet })
  }
  const router = useRouter()

  const handleClick = () => {
    if (!isInReply) {
      router.push(`/tweet/${tweet._id}`)
    }
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
    <article onClick={handleClick} className={`${styles.tweet} ${isInReply ? styles.inReply : ''}`} style={{ borderBottom: !isInReply && 'var(--borderProperty)' }}>
      {
        open && modalName === 'options' && <TweetOptionsModal id={_id} username={username} isOwn={ user.name === username || user?.role === 'admin' } setModalName={setModalName} />
      }
      <div>
          <ImageWithPlaceholder image={image} height={48} width={48} alt='Your profile image' />
          {
            isInReply && <div className={styles.replyBar}></div>
          }
        </div>
      <div className={styles.dataContainer}>
        <div className={styles.namesContainer}>
          <h5>{username}</h5>
          <span>@{slug}</span>
          <span>·</span>
          <span>{formattedDate}</span>
          {
            !isInReply && (
              <button className={styles.points} onClick={(e) => { e.stopPropagation(); openModal(); setModalName('options') }}>
                <PointsIcon width='1.25rem' />
              </button>
            )
          }
        </div>
        {
          tweet.isReplying && !isInReply && (
            <p style={{ color: 'var(--slugColor)', marginTop: '' }}>Replying to
            <span style={{ color: 'var(--blue)', cursor: 'pointer' }}> @{tweet.replyingUser.slug}</span>
            </p>
          )
        }
        <div className={styles.contentContainer}>
          <p>{content}</p>
        </div>
        {
          !isInReply && <Interactions id={_id} comments={replies.length} likes={likes} retweets={0} isLiked={isLiked} openReply={openReply} />
        }
        {
          isInReply && <p style={{ color: 'var(--slugColor)', marginTop: '1rem' }}>Replying to
          <span style={{ color: 'var(--blue)', cursor: 'pointer' }}> @{replyingTo}</span>
          </p>
        }
      </div>

    </article>
  </>
  )
}
