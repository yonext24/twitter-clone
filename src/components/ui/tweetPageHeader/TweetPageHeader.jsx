import { BackIcon } from '@/components/icons/tweet/Back'
import { useRouter } from 'next/router'

/* eslint-disable react/no-unknown-property */
export function TweetPageHeader () {
  const router = useRouter()

  return <>

  <header>
    <button className='back' onClick={() => router.back()}>
      <BackIcon width='20px' height='20px' />
    </button>
    <h3>Tweet</h3>

  </header>

  <style jsx>{`
    .back {
      cursor: pointer;
      height: 75%;
      aspect-ratio: 1/1;
      border-radius: 9999px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .back:hover {
      background-color: var(--buttonHover)
    }
    header {
      display: flex;
      width: 100%;
      color: var(--mainColor);
      position: sticky;
      top: 0;
      background-color: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(12px);
      z-index: 2;
      height: 53px;
      align-items: center;
      column-gap: 35px;
      padding: 0 15px;
    }
    h3 {
      font-size: 20px;
    }
    
  `}</style>
  </>
}
