/* eslint-disable react/no-unknown-property */
import { HeartIcon } from '@/components/icons/tweet/Heart'
import { likeTweet } from '@/assets/consts'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useTweetsContext } from '@/hooks/useTweetsContext'

export function LikeEntry ({ id, isInPage = false, width = '18.75px', handleAddLike, externalAddLike, isLiked, likes }) {
  const { status } = useSession()
  const router = useRouter()
  const { dispatch } = useTweetsContext()

  const handleLike = () => {
    if (status === 'unauthenticated') {
      router.push('/')
      return
    }

    handleAddLike && handleAddLike(id)
    externalAddLike && externalAddLike(isLiked)

    dispatch({ type: 'addLike', payload: id })
    likeTweet(id)
  }

  return <>

    <button className='container' onClick={handleLike} style={{ color: isLiked ? 'rgba(249, 24, 128)' : '' }}>
      <div className='svgContainer'>
        <HeartIcon liked={isLiked} width={width} />
      </div>
      {
        !isInPage && <span>{likes || ''}</span>
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
          font-size: 13px;
        }
        .container:hover .svgContainer {
          background-color: rgb(var(--accent-pink) / .1);
          color: rgb(var(--accent-pink))
        }
    `}</style>
  </>
}
