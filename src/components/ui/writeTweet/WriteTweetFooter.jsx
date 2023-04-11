/* eslint-disable react/no-unknown-property */
import { CalendarIcon } from '@/components/icons/writeTweet/Calendar'
import { EmojiIcon } from '@/components/icons/writeTweet/Emoji'
import { GaleryIcon } from '@/components/icons/writeTweet/Galery'
import { GifIcon } from '@/components/icons/writeTweet/Gif'
import { PollIcon } from '@/components/icons/writeTweet/Poll'
import { UbicationIcon } from '@/components/icons/writeTweet/Ubication'

export function WriteTweetFooter ({ disabled, handleClick, isLoading }) {
  return <>
  <div className='container'>
    <div className='iconsDiv'>
      <button className='icon'>
        <GaleryIcon height={ isLoading ? '0px' : '20px' } />
      </button>
      <button className='icon'>
        <GifIcon height={ isLoading ? '0px' : '20px' } />
      </button>
      <button className='icon'>
        <PollIcon height={ isLoading ? '0px' : '20px' } />
      </button>
      <button className='icon'>
        <EmojiIcon height={ isLoading ? '0px' : '20px' } />
      </button>
      <button className='icon'>
        <CalendarIcon height={ isLoading ? '0px' : '20px' } />
      </button>
      <button className='icon'>
        <UbicationIcon height={ isLoading ? '0px' : '20px' } />
      </button>
    </div>
      <button className='tweet' disabled={disabled} onClick={handleClick}>{!isLoading && 'Tweet'}</button>
  </div>
  <style jsx>{`

    .container {
      display: flex;
      color: var(--blue);
      margin-top: ${isLoading ? '0' : '12px'};
      justify-content: space-between;
      transition: max-height .2s;
      max-height: ${isLoading ? '0px' : '100px'}
    }
    .iconsDiv {
      transition: max-height .2s;
      max-height: ${isLoading ? '0px' : '100px'}
      display: flex;
    }
    .icon {
      padding: ${isLoading ? '0' : '.5rem'};
      color: inherit;
      border-radius: 9999px;
      cursor: pointer;
      transition: max-height .2s;
      max-height: ${isLoading ? '0px' : '100px'}
    }
    .icon:hover {
      background-color: rgba(29, 155, 240, .1)
    }
    .tweet {
      padding: ${isLoading ? '0' : '6px 15px'};
      background-color: var(--blue);
      color: white;
      font-weight: bold;
      font-size: 16px;
      border-radius: 9999px;
      cursor: pointer;
      transition: opacity .2s, max-height .2s;
      max-height: ${isLoading ? '0px' : '100px'}
    }
    .tweet:disabled {
      opacity: .5;
    }

  `}</style>
  </>
}
