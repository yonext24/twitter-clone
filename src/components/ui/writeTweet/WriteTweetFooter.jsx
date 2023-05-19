/* eslint-disable react/no-unknown-property */
import { CalendarIcon } from '@/components/icons/writeTweet/Calendar'
import { EmojiIcon } from '@/components/icons/writeTweet/Emoji'
import { GaleryIcon } from '@/components/icons/writeTweet/Galery'
import { GifIcon } from '@/components/icons/writeTweet/Gif'
import { PollIcon } from '@/components/icons/writeTweet/Poll'
import { UbicationIcon } from '@/components/icons/writeTweet/Ubication'
import { useId } from 'react'

export function WriteTweetFooter ({ disabled, handleClick, isLoading, isInTweetPage, focused, handleFile, inputRef, noPadding, noIcons }) {
  const imageId = useId()
  return <>
  <div className='container'>
    {
      isInTweetPage && !focused.footer
        ? null
        : <div className='iconsDiv'>
      <div className='icon file'>
        <input ref={inputRef} id={imageId} type='file' accept="image/png, image/jpeg" onChange={handleFile} style={{ display: 'none' }} />
        <label htmlFor={imageId}></label>
        <GaleryIcon height={ isLoading ? '0px' : '20px' } />
      </div>
      <button className='icon'>
        <GifIcon height={ isLoading ? '0px' : '20px' } />
      </button>
      {
        !noIcons &&
        <button className='icon'>
          <PollIcon height={ isLoading ? '0px' : '20px' } />
        </button>
      }
      <button className='icon'>
        <EmojiIcon height={ isLoading ? '0px' : '20px' } />
      </button>
      {
        !noIcons &&
        <button className='icon'>
          <CalendarIcon height={ isLoading ? '0px' : '20px' } />
        </button>
      }
      <button className='icon'>
        <UbicationIcon height={ isLoading ? '0px' : '20px' } />
      </button>
    </div>
    }
    {
      !isLoading &&
      <button className='tweet' disabled={disabled} onClick={handleClick}>{!isLoading && isInTweetPage ? 'Reply' : 'Tweet'}</button>
    }
  </div>
  <style jsx>{`

    .container {
      display: flex;
      color: var(--blue);
      margin-top: ${isLoading || focused.footer || noPadding ? '0' : '12px'};
      justify-content: space-between;
      transition: max-height .2s;
      max-height: ${isLoading ? '0px' : '100px'}
    }
    .iconsDiv {
      transition: max-height .2s;
      max-height: ${isLoading ? '0px' : '100px'}
      display: flex;
    }
    .file.icon {
      display: inline-flex;
      position: relative;
    }
    .file.icon label {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
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
      max-height: ${isLoading ? '0px' : '100px'};
    }
    .tweet:disabled {
      opacity: .5;
    }
    @media only screen and (max-width: 635px) {
      .icon:nth-of-type(4), .icon:nth-of-type(5) {
        display: none
      }
    }

  `}</style>
  </>
}
