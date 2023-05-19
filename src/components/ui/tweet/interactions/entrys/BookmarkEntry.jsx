/* eslint-disable react/no-unknown-property */
import { bookmarkTweet } from '@/assets/consts'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useTweetsContext } from '@/hooks/useTweetsContext'
import { SavedIcon } from '@/components/icons/navbar/Saved'
import { toast } from 'react-toastify'

export function BookmarkEntry ({ id, width = '18.75px', handleAddBookmark, externalAddBookmark, isBookmarked }) {
  const { status } = useSession()
  const router = useRouter()
  const { dispatch } = useTweetsContext()

  const handleBookmark = () => {
    console.log('click')
    if (status === 'unauthenticated') {
      router.push('/')
      return
    }
    handleAddBookmark && handleAddBookmark(id)
    externalAddBookmark && externalAddBookmark(isBookmarked)

    dispatch({ type: 'addBookmark', payload: id })
    bookmarkTweet(id)
      .then(res => {
        if (!res.ok) toast('Error while bookmarking')
        return res.json()
      })
      .then(res => {
        toast(res.success)
      })
  }

  return <>

    <button className='container' onClick={handleBookmark} style={{ color: isBookmarked && 'rgb(var(--accent-blue))' }}>
      <div className='svgContainer'>
        <SavedIcon isSelected={isBookmarked} width={width} color='inherit' />
      </div>
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
