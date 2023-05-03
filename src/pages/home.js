import { TweetsSection } from '@/components/ui/tweetsSection/TweetsSection'
import { useSession } from 'next-auth/react'
import { ScreenProtector } from '@/components/ui/screenProtector/ScreenProtector'
import { useGetTweets } from '@/hooks/useGetTweets'
import { Layout } from '@/components/ui/Layout'
import { SEO } from '@/components/ui/SEO'

export default function Home () {
  const { status } = useSession()

  const { sectionSelected, setSectionSelected, tweets, error, isLoading, intersectionRef, isRefetching } = useGetTweets()
  return (
    <>
      <SEO title='Home / Twitter Clone' />
      {
        status === 'loading' && <ScreenProtector />
      }
        <TweetsSection
          sectionSelected={sectionSelected}
          setSectionSelected={setSectionSelected}
          tweets={tweets}
          error={error}
          isLoading={isLoading || isRefetching}
        />
        <div ref={intersectionRef} style={{ height: 1, width: '100%' }}></div>
    </>
  )
}

Home.getLayout = (page) => {
  return <Layout>
    {page}
  </Layout>
}
