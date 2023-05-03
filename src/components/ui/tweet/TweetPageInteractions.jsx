import { CommentEntry } from './interactions/entrys/CommentEntry'
import { LikeEntry } from './interactions/entrys/LikeEntry'
import { RetweetEntry } from './interactions/entrys/RetweetEntry'

/* eslint-disable react/no-unknown-property */
export function TweetPageInteractions ({ setTweet, openReply, likes, comments, retweets, _id, isLiked }) {
  const handleAddLike = (isLiked) => {
    setTweet(prev => {
      const newLikes = isLiked ? prev.likes - 1 : prev.likes + 1
      return { ...prev, likes: newLikes, isLiked: !isLiked }
    })
  }
  return <>

    <section>
      <CommentEntry isInPage={true} width='1.5rem' openReply={openReply} />
      <RetweetEntry isInPage={true} width='1.5rem' />
      <LikeEntry id={_id} likes={likes} isLiked={isLiked} isInPage={true} width='1.5rem' handleAddLike={handleAddLike} />
    </section>

    <style jsx>{`

      section {
        width: calc(100% - 10px);
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        color: var(--slugColor);
        padding: 10px 0;
        border-top: 1px solid var(--borderColor);
        border-bottom: 1px solid var(--borderColor);
        background-color: var(--background)
      }

    `}</style>
  </>
}
