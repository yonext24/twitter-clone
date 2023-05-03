import { DeleteIcon } from '@/components/icons/tweet/Delete'
import { FollowIcon } from '@/components/icons/tweet/Follow'
import { MuteIcon } from '@/components/icons/tweet/Mute'
import { PinIcon } from '@/components/icons/tweet/Pin'
import { useEffect, useState } from 'react'

/* eslint-disable react/no-unknown-property */
export function TweetOptionsModal ({ username, isOwn, openModal }) {
  const [inicializated, setInicializated] = useState(false)

  useEffect(() => {
    setInicializated(true)
  }, [])

  return (
    <>
      <div className='container' onClick={e => e.stopPropagation()}>
        {
          isOwn
            ? <>
                <button style={{ color: 'rgb(244, 33, 46)' }} onClick={() => openModal('delete')}>
                  <DeleteIcon width='1.25rem' height='1.25rem' />
                  <span>Delete Tweet</span>
                </button>
                <button style={{ cursor: 'not-allowed' }}>
                  <PinIcon width='1.25rem' height='1.25rem' />
                  <span>Pin to your profile</span>
                </button>
                <button style={{ cursor: 'not-allowed' }}>
                  <MuteIcon width='1.25rem' height='1.25rem' />
                  <span>Mute this conversation</span>
                </button>
              </>

            : <>
                <button style={{ cursor: 'not-allowed' }}>
                  <FollowIcon width='1.25rem' height='1.25rem' />
                  <span>Follow {username}</span>
                </button>
              </>
        }
      </div>

      <style jsx>{`
        .container {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: var(--background);
          display: flex;
          flex-direction: column;
          z-index: 1006;
          box-shadow: var(--dark-modal-shadow);
          border-radius: 16px;
          overflow: hidden;
          max-height: ${!inicializated ? '0px' : '500px'};
          transition: max-height .2s ease-in;
        }
        .container > button {
          width: 100%;
          padding: 15px 10px;
          display: flex;
          column-gap: 8px;
          color: var(--mainColor);
          cursor: pointer;
          transition: background-color .2s;
        }
        .container > button:hover {
          background-color: var(--buttonHover)
        }
      `}</style>
    </>
  )
}
