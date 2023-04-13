import { TwitterIcon } from '@/components/icons/navbar/Twitter'
import Image from 'next/image'
import { GoogleIcon } from '@/components/icons/login/Google'
import { AppleIcon } from '@/components/icons/login/Apple'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

/* eslint-disable react/no-unknown-property */
export default function LoginPage () {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/home')
    }
  }, [status])

  const handleLogin = async () => {
    signIn('google', { callbackUrl: 'http://localhost:3000/home' })
  }

  return <>
  <Head>
    <title>Twitter</title>
  </Head>
  <main>
    <section className='imageContainer'>
      <Image src='/twitter-banner.webp'
      fill={true}
      style={{ objectFit: 'cover' }}
      alt='background'
      sizes="(min-width: 1024px) 45vw" />
      <TwitterIcon width={384} height={384} style={{ position: 'absolute', zIndex: 2, color: 'white', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }} />
    </section>
    <section className='info'>
      <div>

        <TwitterIcon width={48} height={48} style={{ color: 'rgb(214 217 219)', marginBottom: '2.5rem' }} />
        <h1>Happening now</h1>

      </div>

      <div>

        <h4>Join Twitter today.</h4>
        <div className='loginContainer'>
          <button onClick={handleLogin} style={{ cursor: 'pointer' }}>
            <GoogleIcon width='1.5rem' height='1.5rem' />
            <span>Sign Up with Google</span>
          </button>
          <button onClick={handleLogin} style={{ cursor: 'not-allowed' }}>
            <AppleIcon width='1.5rem' height='1.5rem' />
            <span>Sign Up with Apple</span>
          </button>
          <div className='or'>
            <div></div>
            <span>or</span>
          </div>
          <button onClick={handleLogin} style={{ cursor: 'not-allowed' }} className='email'>
            <span>Sign up with phone or email</span>
          </button>
        </div>

      </div>
    </section>
  </main>

  <style jsx>{`
    main {
      display: grid;
      grid-template-columns: 1fr 45vw;
      height: 100%;
      width: 100%;
      min-height: 100vh
    }
    section {
      position: relative;
    }
    .info, .info > div {
      display: flex;
      flex-direction: column;
    }
    .info {
      justify-content: space-between;
    }
    .info > div {
      padding: 2rem;
      color: var(--mainColor);
    }
    h1 {
      font-size: 3.75rem;
      line-height: 1;
    }
    h4 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .loginContainer {
      display: flex;
      flex-direction: column;
      row-gap: .75rem;
      max-width: 320px;
    }
    .loginContainer button {
      background-color: white;
      color: black;
      display: flex;
      gap: .5rem;
      justify-content: center;
      padding: 0.75rem;
      border-radius: 9999px;
      font-weight: bold;
    }
    .email {
      background-color: var(--blue)!important;
      color: white!important;
      margin-bottom: 2rem!important;
    }
    .loginContainer button span {
      font-size: 100%;
    }
    .or {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 20px;
    }
    .or div {
      width: 100%;
      height: 1px;
      background-color: rgb(47 51 54)
    }
    .or span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background-color: black;
      padding: 0 8px;
    }

  `}</style>
  </>
}
