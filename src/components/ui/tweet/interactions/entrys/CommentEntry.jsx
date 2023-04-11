/* eslint-disable react/no-unknown-property */
import { CommentIcon } from '@/components/icons/tweet/Comment'
export function CommentEntry ({ comments, openReply }) {
  const backgroundColor = 'rgba(29, 155, 240'

  return <>

    <button className='container' onClick={openReply}>
      <div className='svgContainer'>
        <CommentIcon comments={comments} />
      </div>
      <span>{comments}</span>
    </button>

    <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          color: var(--slugColor);
          margin: -8px 0
        }
        .svgContainer {
          padding: 8px;
          border-radius: 9999px;
          transition: background-color .2s
        }
        span {
          padding-left: 4px;
          padding-right: 12px;
          min-width: calc(1em + 24px);
          font-size: 13px;
        }
        .container:hover .svgContainer {
          background-color: ${backgroundColor}, .1);
          color: ${backgroundColor} )
        }
    `}</style>
  </>
}
