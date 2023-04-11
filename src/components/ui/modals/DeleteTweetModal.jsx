/* eslint-disable react/no-unknown-property */
import { deleteTweet } from '@/assets/consts'
import { useEffect } from 'react'

export function DeleteTweetModal ({ closeModal, setDeleted, id }) {
  useEffect(() => {
    document.querySelector('html').style.overflow = 'hidden'
    document.querySelector('html').style.paddingRight = '17px'

    return () => {
      document.querySelector('html').style.overflow = 'auto'
      document.querySelector('html').style.paddingRight = '0'
    }
  }, [])

  const handleClick = async () => {
    deleteTweet(id)
      .then(res => {
        console.log(res)
        if (res.ok) {
          setDeleted(true)
        }
      })
  }

  return <>
  <div className='modalBackground' onClick={closeModal}>
    <div className='windowContainer' onClick={ e => e.stopPropagation() }>
      <h3>Delete Tweet?</h3>
      <p>This can&lsquo;t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results. </p>
      <div className='close'>
        <button onClick={handleClick} style={{ backgroundColor: 'rgb(244, 33, 46)', color: 'white' }}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
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
    }
    .windowContainer {
      width: 100%;
      max-width: 320px;
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      background-color: var(--background);
      color: var(--mainColor);
      padding: 32px;
    }
    .close {
      background-color: var(--background);
      width: 100%;
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .close button {
      width: 100%;
      cursor: pointer;
      border-radius: 9999px;
      padding: 12px 0;
      font-weight: bold;
    }
    .close button:nth-of-type(2) {
      color: white;
      backgorund-color var(--background);
      outline: 1px solid rgb(83, 100, 113)
    }
    p {
      color: rgb(113, 118, 123);
      line-height: 20px;
    }
    h3 {
      width: 256px;
      font-size: 20px;
    }

  `}</style>
  </>
}
