import { DownArrowIcon } from '@/components/icons/writeTweet/DownArrow'
import { WorldIcon } from '@/components/icons/writeTweet/World'
import { useState } from 'react'
import { WriteTweetFooter } from './WriteTweetFooter'
import styles from './writetweetmain.module.css'
import { useCreateTweet } from '@/hooks/useCreateTweet'
import { LoadingTweet } from './LoadingTweet'
import { useSession } from 'next-auth/react'
import { ImageWithPlaceholder } from '../ImageWithPlaceholder'
import { DeleteImageIcon } from '@/components/icons/tweet/DeleteImage'

export function WriteTweetMain ({ iniciated = false, addTweet, reply, isInTweetPage = false, replyingTo }) {
  const [value, setValue] = useState('')

  const { data, status } = useSession()
  const user = data?.user

  const { handleTweet, isLoading, isSuccess, focused, setFocused, isError, handleFile, handleFileClear, image, inputRef } = useCreateTweet({ value, iniciated, isInTweetPage, addTweet, reply, setValue })

  return <div className={styles.container}>
    <LoadingTweet isLoading={isLoading} isSuccess={isSuccess} isError={isError} />
    {
      status === 'loading' || status === 'authenticated'
        ? <ImageWithPlaceholder styles={{ marginRight: 12 }} image={user?.image} height={50} width={50} alt='Your profile image' />
        : <ImageWithPlaceholder styles={{ marginRight: 12 }} image={'/guest.webp'} height={50} width={50} alt='Your profile image' />
    }
    <div className={styles.inputContainer} style={{ ...(isInTweetPage && !focused.footer && { flexDirection: 'row', alignItems: 'center' }) }}>
      {
        isInTweetPage && focused.footer && <p className={styles.replyingTo} >Replying to <span>@{replyingTo}</span></p>
      }
      {
        focused.everyone && !isLoading && (
        <button className={styles.everyone}>
        <span>Everyone</span>
        <DownArrowIcon width='.75rem' height='.75rem' />
      </button>)
      }
      <textarea
        spellCheck={false}
        placeholder="What's happening?"
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(prev => ({ ...prev, focused: true }))}
        style={{ marginTop: focused && iniciated ? 23 : 10, height: iniciated ? '120px' : 'unset', flex: isInTweetPage && !focused.footer && 1 }}
      />
      {
        image && <div className={styles.imageContainer}>
          {
            !isLoading && <button onClick={handleFileClear}>
            <DeleteImageIcon height='18px' width='18px' />
          </button>
          }
          <img src={URL.createObjectURL(image)} alt='Image that you are uploading' />
        </div>
      }
      {
        focused.rest && !isInTweetPage && <>
        <button className={styles.reply} style={{ maxHeight: isLoading ? '0px' : '1.5rem', transition: 'max-height .2s', margin: isLoading && 0 }}>
          <WorldIcon width='1rem' height={isLoading ? '0' : '1rem'} />
          {
            !isLoading && <span>Everyone can reply</span>
          }
        </button>
        {
          !isLoading && <div className={styles.divider}></div>
        }
      </>
      }
      <WriteTweetFooter handleClick={() => { handleTweet(value, reply) }} disabled={value.trim().length === 0 && !image} inputRef={inputRef} handleFile={handleFile} isLoading={isLoading} isInTweetPage={isInTweetPage} focused={focused} />
    </div>
  </div>
}
