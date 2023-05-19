/* eslint-disable react/no-unknown-property */
import Image from 'next/image'

export function BookmarkedEmpty () {
  return <>
    <div className='container'>
      <Image
        src='/bookmarksImage.png'
        width={336}
        height={168}
        alt='Placeholder image'
        />
      <div className='text'>
        <h2>Save Tweets for later</h2>
        <p>Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</p>
      </div>
    </div>
    <style jsx>{`
      .container {
        display: flex; 
        flex-direction: column;
        align-items: center;
        max-width: 336px;
        margin: 32px auto;
      }
      .text {
        color: white
      }
      .text p {
        color: var(--dateColor)
      }
      h2 {
        font-size: 31px;
      }
    
    `}</style>
  </>
}
