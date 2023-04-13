/* eslint-disable react/no-unknown-property */

import { CommentEntry } from './entrys/CommentEntry'
import { LikeEntry } from './entrys/LikeEntry'
import { RetweetEntry } from './entrys/RetweetEntry'

export function Interactions ({ likes, comments, retweets, id, isLiked, openReply }) {
  return <>
    <div onClick={e => e.stopPropagation()}>
      <LikeEntry id={id} likes={likes} isLiked={isLiked} />
      <CommentEntry id={id} comments={comments} openReply={openReply} />
      <RetweetEntry id={id} retweets={retweets} />
    </div>

    <style jsx>{`
      div {
        display: flex;
        column-gap: 8px;
        margin: 12px 0 0;
        width: 50%;
        justify-content: space-between;
      }
    `}</style>
  </>
}
