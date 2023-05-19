import { useSession } from 'next-auth/react'
import { Slug } from '../common/Slug'

/* eslint-disable react/no-unknown-property */
export function BookmarksHeader () {
  const { data } = useSession()
  const user = data?.user
  return <>

    <header>
      <h1>Bookmarks</h1>
      <Slug styles={{ lineHeight: '13px', color: 'var(--dateColor)' }} size='14px'>{'@' + user?.slug || ''}</Slug>

    </header>

    <style jsx>{`
      
      header {
        display: flex;
        flex-direction: column;
        width: 100%;
        color: var(--mainColor);
        position: sticky;
        top: 0;
        background-color: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(12px);
        z-index: 2;
        padding: 4px 10px
      }  
      h1 {
        font-size: 20px
      }
      
    `}</style>
  </>
}
