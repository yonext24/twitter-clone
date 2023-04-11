import { DownArrowIcon } from '@/components/icons/writeTweet/DownArrow'
import { WorldIcon } from '@/components/icons/writeTweet/World'
import { useState } from 'react'
import { WriteTweetFooter } from './WriteTweetFooter'
import styles from './writetweetmain.module.css'
import { useCreateTweet } from '@/hooks/useCreateTweet'
import { LoadingTweet } from './LoadingTweet'
import { useSession } from 'next-auth/react'
import { ImageWithPlaceholder } from '../ImageWithPlaceholder'

export function WriteTweetMain ({ iniciated = false, addTweet, reply }) {
  const [value, setValue] = useState('')

  const { data } = useSession()
  const user = data?.user

  const { handleTweet, isLoading, isSuccess, focused, setFocused, isError } = useCreateTweet({ value, iniciated, addTweet, reply, setValue })

  return <div className={styles.container}>
    <LoadingTweet isLoading={isLoading} isSuccess={isSuccess} isError={isError} />
    <ImageWithPlaceholder image={user?.image} height={50} width={50} alt='Your profile image' />
    <div className={styles.inputContainer}>
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
        onFocus={() => setFocused(prev => ({ ...prev, rest: true }))}
        style={{ marginTop: focused && iniciated ? 23 : 10, height: iniciated ? '120px' : 'unset' }}
      />
      {
        focused.rest && <>
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
      <WriteTweetFooter handleClick={() => { handleTweet(value, reply) }} disabled={value.length === 0} isLoading={isLoading} />
    </div>
  </div>
}
