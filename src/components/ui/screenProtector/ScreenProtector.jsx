/* eslint-disable react/no-unknown-property */
import { TwitterIcon } from '@/components/icons/navbar/Twitter'

export function ScreenProtector () {
  return <>

  <div>
    <TwitterIcon width='5rem' height='5rem' color='var(--blue)' />
  </div>

  <style jsx>{`
  
  div {
    background-color: var(--background);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5000;
  }

  `}</style>
  </>
}
