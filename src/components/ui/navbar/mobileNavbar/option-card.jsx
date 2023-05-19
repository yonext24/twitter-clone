import { DownArrowIcon } from '@/components/icons/writeTweet/DownArrow'

/* eslint-disable react/no-unknown-property */
export function OptionCard ({ title }) {
  return <>

  <div>

    <p>{title}</p>

    <DownArrowIcon height='18.75px' width='18.75px' />

  </div>

    <style jsx>{`
    
      div {
        background-color: var(--background);
        display: flex;
        justify-content: space-between;
        padding: 16px;
        transition: background-color .2s
      }
      div:hover {
        background-color: var(--buttonHover)
      }
      p {
        font-size: 14px;
        font-weight: bold
      }
    
    `}</style>
  </>
}
