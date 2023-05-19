import Link from 'next/link'

/* eslint-disable react/no-unknown-property */
export function NavbarCard ({ children, title, href }) {
  const isLink = href && href.startsWith('/')

  if (isLink) {
    return <>
      <div className='container'>
        <Link href={href || '#'} style={{
          display: 'flex',
          textDecoration: 'none',
          color: 'var(--mainColor)'
        }}>
          <div className="icon">
            {children}
          </div>

          <h5>{title}</h5>
        </Link>
      </div>

      <style jsx>{`
      
        .container {
          padding: 15px;
        }
        .container:hover {
          background-color: var(--buttonHover)
        }
        .icon {
          margin-right: 24px;
          display: flex;
          align-items: center
        }
        h5 {
          font-size: 20px;
          font-weight: bold
        }
      
      `}</style>
    </>
  }

  return <>

    <a href={href || '#'} target='_blank' rel='noreferrer' className='container'>

      <div className="icon">
        {children}
      </div>

      <h5>{title}</h5>

    </a>

    <style jsx>{`
    
      .container {
        padding: 15px;
        display: flex;
        text-decoration: none;
        color: var(--mainColor)
      }
      .container:hover {
        background-color: var(--buttonHover)
      }
      .icon {
        margin-right: 24px;
        display: flex;
        align-items: center
      }
      h5 {
        font-size: 20px;
        font-weight: bold
      }
    
    `}</style>
  </>
}
