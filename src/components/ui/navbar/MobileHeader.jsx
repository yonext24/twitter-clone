import { useSession } from 'next-auth/react'
import { ImageWithPlaceholder } from '../common/ImageWithPlaceholder'
import { TwitterIcon } from '@/components/icons/navbar/Twitter'
import { useMobileHeader } from '@/hooks/useMobileHeader'
import { HeaderButtons } from '../tweetSectionHeader/HeaderButtons'

/* eslint-disable react/no-unknown-property */
export default function MobileHeader ({ setOpen }) {
  const { data } = useSession()
  const user = data?.user

  const { isOpen } = useMobileHeader()

  return <>
    <header>
      <div className='container'>
        <button onClick={() => setOpen(true)} className='image-container'>
          <ImageWithPlaceholder image={user?.image} height={35} width={35} alt='Your profile image' />
        </button>
        <div className='logo-container'>
          <TwitterIcon color='var(--blue)' width='25px' height='25px' />
        </div>
      </div>
      <HeaderButtons />
    </header>
    <div className='space'/>

    <style jsx>{`
      .space {
        height: 105px;
        width: 100%;
        border-left: var(--borderProperty);
        border-right: var(--borderProperty)
      }
      header {
        position: fixed;
        top: 0;
        z-index: 50;
        width: 100%;
        background-color: var(--background)
      }
      .container {
        display: flex;
        padding: ${isOpen ? '8px 12px' : '0 12px'};
        max-height: ${isOpen ? '60px' : '0px'};
        transition: max-height .15s ease-in, padding .15s ease-in;
        overflow: hidden
      }
      .logo-container {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        padding-right: 35px
      }
    
    `}</style>
  </>
}
