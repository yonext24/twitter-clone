import { signOut } from 'next-auth/react'

/* eslint-disable react/no-unknown-property */
export function ProfileModal () {
  return <>
  <div className='container'>
    <span />
    <div className='entry'>
      <p>Add an existing account</p>
    </div>
    <div className='entry' onClick={() => signOut({ callbackUrl: '/' })}>
      <p>Log Out @Yonext24</p>
    </div>
  </div>

  <style jsx>{`
    .container {
      transform: translateY(-100%);
      box-shadow: var(--dark-modal-shadow);
      display: flex!important;
      flex-direction: column;
      position: absolute;
      top: 10px;
      left: 0px;
      border-radius: 16px;
      width: 300px;
      font-size: 15px;
      font-weight: bold;
      overflow: hidden;
      background-color: var(--background);
      z-index: 1001;
      padding: 10px 0;
    }
    span {
      width: 100%;
      height: 1px;
      margin: 2px 0;
      background-color: rgba(255,255,255,.2);
      display: block;
    }
    .container div {
      padding: 12px 16px;
    }
    .entry {
      transition: background-color .2s;
      cursor: pointer;
    }
    .entry:hover {
      background-color: rgb(22,24,28);
      cursor: pointer;
    }
  `}</style>
  </>
}
