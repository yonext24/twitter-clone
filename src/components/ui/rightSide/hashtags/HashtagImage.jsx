/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react'
import { ImageWithPlaceholder } from '../../common/ImageWithPlaceholder'

export function HashtagImage ({ src, alt }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const randomTimer = Math.random() * 1600

    const timeoutId = setTimeout(() => {
      setLoading(false)
    }, randomTimer)

    return () => clearTimeout(timeoutId)
  }, [])

  return <>

    <div className='imageContainer'>
      {
        <ImageWithPlaceholder height={68} alt={alt} width={68} image={!loading && src} styles={{ height: 68, width: 68, borderRadius: 16 }} />
      }
    </div>
  </>
}
