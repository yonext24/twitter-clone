/* eslint-disable react/no-unknown-property */

import { BookmarkEntry } from './entrys/BookmarkEntry'
import { CommentEntry } from './entrys/CommentEntry'
import { LikeEntry } from './entrys/LikeEntry'
import { RetweetEntry } from './entrys/RetweetEntry'

export function Interactions ({ likes, comments, retweets, externalInteractions, bookmarks, id, isLiked, isBookmarked, openReply, isStretch }) {
  return <>
    <div onClick={e => e.stopPropagation()}>
      <CommentEntry id={id} comments={comments} openReply={openReply} />
      <RetweetEntry id={id} retweets={retweets} />
      <LikeEntry id={id} likes={likes} isLiked={isLiked} handleAddLike={externalInteractions?.like} />
      {
        !isStretch &&
          <BookmarkEntry id={id} bookmarks={bookmarks} isBookmarked={isBookmarked} handleAddBookmark={externalInteractions?.bookmark} />
      }
    </div>

    <style jsx>{`
      div {
        display: flex;
        column-gap: ${isStretch ? '8px' : '2rem'};
        margin: 12px 0 0;
        width: 100%;
        justify-content: flex-start;
      }
      @media only screen and (max-width: 635px) {
        div {
          column-gap: 0;
          justify-content: space-between
        }
      }
    `}</style>
  </>
}
