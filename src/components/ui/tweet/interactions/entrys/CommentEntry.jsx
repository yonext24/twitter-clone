/* eslint-disable react/no-unknown-property */
import { CommentIcon } from '@/components/icons/tweet/Comment'

export function CommentEntry ({ comments, openReply, isInPage = false, width = '1.25rem' }) {
  return <>

    <button className='container' onClick={openReply}>
      <div className='svgContainer'>
        <CommentIcon width={width} />
      </div>
      {
        !isInPage && <span>{comments || ''}</span>
      }
    </button>

    <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          color: var(--slugColor);
          margin: -8px 0;
          cursor: pointer;
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
          background-color: rgb(var(--accent-blue) / .1);
          color: rgb(var(--accent-blue))
        }
    `}</style>
  </>
}
