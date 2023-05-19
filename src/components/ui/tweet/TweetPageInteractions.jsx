import { BookmarkEntry } from './interactions/entrys/BookmarkEntry'
import { CommentEntry } from './interactions/entrys/CommentEntry'
import { LikeEntry } from './interactions/entrys/LikeEntry'
import { RetweetEntry } from './interactions/entrys/RetweetEntry'

/* eslint-disable react/no-unknown-property */
export function TweetPageInteractions ({ setTweet, openReply, likes, comments, retweets, bookmarks, _id, isLiked, isBookmarked }) {
  const handleAddLike = (isLiked) => {
    console.log(isLiked)
    setTweet(prev => {
      const newLikes = isLiked ? prev.likes - 1 : prev.likes + 1
      return { ...prev, likes: newLikes, isLiked: !isLiked }
    })
  }
  const handleAddBookmark = (isBookmarked) => {
    setTweet(prev => {
      const newBookmarks = isBookmarked ? prev.bookmarks - 1 : prev.bookmarks + 1
      return { ...prev, bookmarks: newBookmarks, isBookmarked: !isBookmarked }
    })
  }
  return <>

    <section>
      <CommentEntry isInPage={true} width='1.5rem' openReply={openReply} />
      <RetweetEntry isInPage={true} width='1.5rem' />
      <LikeEntry id={_id} likes={likes} isLiked={isLiked} isInPage={true} width='1.5rem' externalAddLike={handleAddLike} />
      <BookmarkEntry id={_id} bookmarks={bookmarks} isBookmarked={isBookmarked} externalAddBookmark={handleAddBookmark} isInPage={true} />
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
