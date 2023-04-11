import { TwitterIcon } from '@/components/icons/navbar/Twitter'
import { useCreateSlug } from '@/hooks/useCreateSlug'
import { Spinner } from '../spinner/Spinner'

/* eslint-disable react/no-unknown-property */
export function CreateSlugModal ({ closeModal }) {
  const { value, handleChange, inputRef, info, isLoading, isSuccess, handleSlugChange } = useCreateSlug(closeModal)

  return <>
  <div className='wrapper' onClick={closeModal}>
    <section onClick={e => e.stopPropagation()}>
      <TwitterIcon color='rgb(214, 217, 219)' width='2.5rem' height='2.5rem' style={{ margin: '0 auto' }} />
      <h2>What should we call you?</h2>
      <span>Your @username is unique. You can always change it later.</span>

      <div className='inputContainer'>
        <label>Username</label>
        <div>
          <p className='arroba'>@</p>
          <input ref={inputRef} spellCheck={false} type='text' value={value} onChange={e => handleChange(e)} autoFocus={true} />
          {
            info.loading && <Spinner style={{ height: '20px', width: '20px', borderColor: '#ffff0026', borderBottomColor: 'yellow' }} />
          }
          <div className='inputSibling' onClick={() => inputRef.current?.focus()}></div>
        </div>
      </div>
      <p className='info'>{info.error || info.success}</p>

      <button disabled={Boolean(!info.success && !isSuccess && !isLoading)} onClick={() => handleSlugChange(value)}>
        {
          isLoading
            ? <Spinner style={{ height: '24px', width: '24px', borderColor: 'rgba(0,0,0,.3)', borderBottomColor: 'black', margin: '0 auto' }} />
            : isSuccess
              ? <span>Username created correctly.</span>
              : <span>Set username</span>
        }
      </button>
    </section>
  </div>

  <style jsx>{`
    .info {
      color: ${info.error ? 'red!important' : info.success ? 'rgb(63 253 102)!important' : 'var(--blue)'}; 
    }
    button {
      background-color: ${isLoading ? 'var(--blue)!important' : isSuccess ? 'rgb(63 253 102)!important' : 'white'};
      border-radius: 9999px;
      color: black;
      padding: 10px 0;
      font-weight: bold;
      margin-top: auto;
      transition: background-color .2s;
      cursor: pointer;
    }
    button span {
      color: inherit
    }
    button:disabled {
      background-color: rgba(255,255,255, .5);
      cursor: not-allowed;
    }
    label {
      color: ${info.error ? 'red!important' : info.success ? 'rgb(63 253 102)!important' : info.loading ? 'yellow!important' : 'var(--blue)'}; 
      display: block;
      transition: color .2s
    }
    .arroba {
      color: rgba(122,122,122,.8);
      display: inline;
      font-size: 1.3rem
    }
    .inputContainer > div {
      display: flex;
      align-items: center;
      gap: 5px;
      width: 100%
    }
    .inputContainer {
      position: relative;
      padding: 4px 10px
    }
    .inputSibling {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 1;
      transition: border-color .2s;
      border: 1px solid ${info.error ? 'red!important' : info.success ? 'rgb(63 253 102)!important' : info.loading ? 'yellow!important' : 'var(--slugColor)'};
      cursor: text;
      border-radius: 5px;
    }
    input:focus ~ .inputSibling {
      border-color: var(--blue)
    }
    
    input[type=text] {
      background-color: transparent;
      border: none;
      color: var(--mainColor);
      position: relative;
      z-index: 2;
      flex: 1;
    }
    input[type=text]:focus, input[type=text]:focus-visible {
      outline: none;
    }

    .wrapper {
      height: 100%;
      width: 100%;
      position: fixed;
      z-index: 2100;
      top: 0;
      left: 0;
      background-color: rgba(91, 112, 131, 0.4);
      display: flex;
      justify-content: center;
      align-items: center
    }
    section {
      display: flex;
      background-color: var(--background);
      border-radius: 16px;
      height: 90%;
      width: 100%;
      max-width: 500px;
      flex-direction: column;
      padding: 24px 30px;
      gap: 1rem
    }
    h2 {
      font-size: 2rem;
      color: var(--mainColor);
    }
    span {
      color: var(--slugColor);
    }

  `}</style>
  </>
}
