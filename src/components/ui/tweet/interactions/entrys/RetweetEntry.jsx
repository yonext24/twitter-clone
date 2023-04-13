/* eslint-disable react/no-unknown-property */
import { actions } from '@/assets/consts'
import { RetweetIcon } from '@/components/icons/tweet/Retweet'
import { useState } from 'react'

export function RetweetEntry ({ retweets, id, isInPage = false, width = '1.25rem' }) {
  const [retweetsState, setRetweets] = useState(retweets)

  const backgroundColor = 'rgba(0, 186, 124'

  return <>

    <button className='container' onClick={() => actions.retweet(id, setRetweets)}>
      <div className='svgContainer'>
        <RetweetIcon retweets={retweets} width={width} />
      </div>
      {
        isInPage && <span>{retweetsState || ''}</span>
      }
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
