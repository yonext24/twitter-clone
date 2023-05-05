/* eslint-disable react/no-unknown-property */
import { RetweetIcon } from '@/components/icons/tweet/Retweet'

export function RetweetEntry ({ retweets, isInPage = false, width = '1.25rem' }) {
  return <>

    <button className='container'>
      <div className='svgContainer'>
        <RetweetIcon retweets={retweets} width={width} />
      </div>
      {
        !isInPage && <span>{retweets || ''}</span>
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
          background-color: rgb(var(--accent-green) / .1);
          color: rgb(var(--accent-green))
        }
    `}</style>
  </>
}
