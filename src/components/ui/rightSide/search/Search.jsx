import { SearchIcon } from '@/components/icons/navbar/Search'
import { useRef } from 'react'
import styles from '../aside.module.css'

// La parte del focus del input esta hecha en ../hashtagssection.module.css
/* eslint-disable react/no-unknown-property */
export function Search () {
  const inputRef = useRef()

  const handleClick = () => {
    inputRef?.current.focus()
  }

  return <>
  <div className='container' onClick={handleClick}>
    <form>
      <input className={styles.input} type='text' placeholder='Search Twitter' ref={inputRef} />
      <SearchIcon className={styles.svg} width='1.40rem' style={{ color: 'var(--slugColor)', margin: '0 14px' }} />
      <div className={styles.wrapper + ' wrapper'}></div>
    </form>
  </div>
  <style jsx>{`
    .container {
      width: 100%;
      padding: 5px 0;
      position: sticky;
      z-index: 1;
      top: 0;
      background-color: var(--background)
    }
    form svg {
      color: red!important
    }
    form {
      width: 100%;
      background-color: var(--dark-search-background);
      display: flex;
      flex-direction: row-reverse;
      padding: 0 0 0 8px;
      border-radius: 9999px;
      position: relative;
    }
    .wrapper {
      width: 100%;
      height: 100%;
      border-radius: 9999px;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      border: 1px solid transparent;
      z-index: 2;
    }
    input {
      border-radius: 9999px;
      width: 100%;
      padding: 12px 0;
      background-color: var(--dark-search-background);
      border: none;
      color: var(--mainColor)
    }

  `}</style>
  </>
}
