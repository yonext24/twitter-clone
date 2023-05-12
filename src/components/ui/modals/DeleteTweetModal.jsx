/* eslint-disable react/no-unknown-property */
import { deleteTweet } from '@/assets/consts'
import { useModalLogic } from '@/hooks/useModalLogic'
import { useTweetsContext } from '@/hooks/useTweetsContext'
import { toast } from 'react-toastify'

export function DeleteTweetModal ({ closeModal, id, externalDelete }) {
  useModalLogic({
    closeModal,
    action: function handleKeyDown (e) {
      if (e.key === 'Enter') {
        handleClick()
      }
    }
  })

  const { dispatch } = useTweetsContext()

  const handleClick = async () => {
    deleteTweet(id)
      .then(res => {
        if (res.ok) {
          closeModal()
          dispatch({ type: 'deleteTweet', payload: id })
          externalDelete && externalDelete(id)
          toast('Your tweet was deleted')
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
      padding: 32px 32px;
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
      padding: 10px 0;
      font-weight: bold;
      font-size: 15px
    }
    .close button:nth-of-type(2) {
      color: white;
      backgorund-color var(--background);
      outline: 1px solid rgb(83, 100, 113)
    }
    p {
      color: rgb(113, 118, 123);
      line-height: 20px;
      font-size: 15px;
    }
    h3 {
      width: 256px;
      font-size: 20px;
      margin-bottom: 8px
    }

  `}</style>
  </>
}
