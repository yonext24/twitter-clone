/* eslint-disable react/no-unknown-property */
import { HeartIcon } from '@/components/icons/tweet/Heart'
import { useState } from 'react'
import { likeTweet } from '@/assets/consts'

export function LikeEntry ({ likes, isLiked, id, isInPage = false, width = '1.25rem', handleAddLike }) {
  console.log(isLiked)
  const [likesState, setLikes] = useState({
    likes,
    isLiked
  })
  const handleLike = () => {
    if (isInPage) {
      handleAddLike(likesState.isLiked)
    }
    setLikes(prev => ({
      likes: !prev.isLiked ? prev.likes + 1 : prev.likes - 1,
      isLiked: !prev.isLiked
    }))
    likeTweet(id)
  }

  const backgroundColor = 'rgba(249, 24, 128'
  return <>

    <button className='container' onClick={handleLike} style={{ color: likesState.isLiked ? 'rgba(249, 24, 128)' : 'inherit' }}>
      <div className='svgContainer'>
        <HeartIcon liked={likesState.isLiked} width={width} />
      </div>
      {
        !isInPage && <span>{likesState.likes || ''}</span>
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
          background-color: ${backgroundColor}, .1);
          color: ${backgroundColor} )
        }
    `}</style>
  </>
}
