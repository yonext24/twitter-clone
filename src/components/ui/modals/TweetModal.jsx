import { CloseIcon } from '@/components/icons/writeTweet/Close'
import { useContext, useEffect } from 'react'
import { Tweet } from '../tweet/Tweet'
import { WriteTweetMain } from '../writeTweet/WriteTweetMain'
import { WriteTweetModalContext } from '@/contexts/WriteTweetModalContext'

/* eslint-disable react/no-unknown-property */
export function TweetModal ({ addTweet }) {
  useEffect(() => {
    document.querySelector('html').style.overflow = 'hidden'
    document.querySelector('html').style.paddingRight = '17px'

    return () => {
      document.querySelector('html').style.overflow = 'auto'
      document.querySelector('html').style.paddingRight = '0'
    }
  }, [])

  const { state, dispatch } = useContext(WriteTweetModalContext)
  const { reply } = state

  const closeModal = () => {
    dispatch({ type: 'closeModal' })
  }

  return <>

  <div className='modalBackground' onClick={closeModal}>
    <div className='tweetContainer' onClick={ e => e.stopPropagation() }>
      <div className='close'>
        <button onClick={closeModal}><CloseIcon /></button>
      </div>
      {
        reply.isReply && <Tweet tweet={reply.reply} isInReply={true} replyingTo={reply.reply.author.slug} />
      }
      <WriteTweetMain iniciated={true} reply={reply} addTweet={addTweet} />
    </div>
  </div>

  <style jsx>{`
    .modalBackground {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(91, 112, 131, 0.4);
      z-index: 2005;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-y: auto;
    }
    .tweetContainer {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      top: 5%;
      position: absolute;
    }
    .close {
      background-color: var(--background);
      width: 100%;
      height: 53px;
      padding: 0 16px;
    }
    .close button {
      height: 100%;
      min-width: 53px;
      cursor: pointer;
    }

  `}</style>
  </>
}
