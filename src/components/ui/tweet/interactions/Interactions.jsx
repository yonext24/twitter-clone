/* eslint-disable react/no-unknown-property */

import { BookmarkEntry } from './entrys/BookmarkEntry'
import { CommentEntry } from './entrys/CommentEntry'
import { LikeEntry } from './entrys/LikeEntry'
import { RetweetEntry } from './entrys/RetweetEntry'

export function Interactions ({ likes, comments, retweets, bookmarks, id, isLiked, isBookmarked, openReply, isStretch }) {
  return <>
    <div onClick={e => e.stopPropagation()}>
      <LikeEntry id={id} likes={likes} isLiked={isLiked} />
      <CommentEntry id={id} comments={comments} openReply={openReply} />
      <RetweetEntry id={id} retweets={retweets} />
      {
        !isStretch &&
          <BookmarkEntry id={id} bookmarks={bookmarks} isBookmarked={isBookmarked} />
      }
    </div>

    <style jsx>{`
      div {
        display: flex;
        column-gap: ${isStretch ? '8px' : '2rem'};
        margin: 12px 0 0;
        width: ${isStretch ? '100%' : '100%'};
        justify-content: flex-start;
      }
    `}</style>
  </>
}
