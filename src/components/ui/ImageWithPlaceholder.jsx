import Image from 'next/image'

export function ImageWithPlaceholder ({ image, height, width, alt, styles }) {
  return <>
  {
    image
      ? <Image src={image} height={50} width={50} alt={alt} style={{ borderRadius: '9999px', ...styles }} />
      : <div style={{ height, width, borderRadius: '9999px', ...styles }}></div>
  }
  </>
}
