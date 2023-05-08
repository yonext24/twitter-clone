import Head from 'next/head'
import { useRouter } from 'next/router'

export function SEO ({ title = 'Twitter', image, description }) {
  const { asPath } = useRouter()
  const siteURL = process.env.NODE_ENV === 'development'
    ? 'localhost:3000'
    : ''

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name='og:title' content={title} />
      {description && <meta name='description' content={description} />}
      {description && <meta name='og:description' content={description} />}
      {image && <meta property='og:image' content={image} />}
      <meta
        name='og:url'
        content={`${siteURL}${asPath === '/' ? '' : asPath}`}
      />
    </Head>
  )
}
