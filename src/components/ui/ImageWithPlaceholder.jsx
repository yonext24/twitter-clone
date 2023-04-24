/* eslint-disable react/no-unknown-property */
import Image from 'next/image'
import { useState } from 'react'

export function ImageWithPlaceholder ({ image, height, width, alt, styles, animation = 'left' }) {
  const [loaded, setLoaded] = useState(false)

  return <>
    <div className='container' style={{ height, width, borderRadius: '9999px', ...styles }}>
      {
        image
          ? (
            <>
                <Image
                  onLoadingComplete={() => setLoaded(true)}
                  src={image}
                  height={height}
                  width={width}
                  alt={alt}
                  style={{ borderRadius: '9999px', opacity: !loaded && '0', ...styles }}
                />

                <div className='skeleton' style={{ height, width, borderRadius: '9999px', opacity: loaded && 0, position: 'absolute', top: 0, left: 0, ...styles }} />
            </>

            )
          : <div className='skeleton' style={{ height, width, borderRadius: '9999px', ...styles }}></div>
      }
    </div>

  <style jsx>{`
    .container {
      position: relative
    }
    .skeleton {
      --left-orientation: 90deg;
      --left-size: 200px 100%;
      --left-position: left -200px top 0;
      --left-animation: right -200px top 0;

      --bottom-orientation: 0deg;
      --bottom-size: 100% 150px;
      --bottom-position: top -150px left 0;
      --bottom-animation: bottom -150px left 0;


      background-color: rgb(15,15,15);
      background-image: linear-gradient(var(--${animation}-orientation), rgba(50,50,50, 0), rgba(50,50,50, 0.5), rgba(50,50,50, 0));
      background-size: var(--${animation}-size);
      background-repeat: no-repeat;
      background-position: var(--${animation}-position);
      animation: ${animation} 1.5s ease infinite;
    }
    @keyframes ${animation} {
      to {
        background-position: var(--${animation}-animation)
      }
    }
    
  `}</style>
  </>
}
