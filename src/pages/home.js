import { TweetsSection } from '@/components/ui/tweetsSection/TweetsSection'
import { useSession } from 'next-auth/react'
import { ScreenProtector } from '@/components/ui/screenProtector/ScreenProtector'
import { useGetTweets } from '@/hooks/useGetTweets'
import { Layout } from '@/components/ui/common/Layout'
import { SEO } from '@/components/ui/common/SEO'
import { TweetsContext } from '@/contexts/TweetsContext'
import { useContext, useState } from 'react'
import { getTimeline } from '@/assets/consts'

export default function Home () {
  const [sectionSelected, setSectionSelected] = useState('foryou')
  const { status } = useSession()

  const { state, dispatch } = useContext(TweetsContext)
  const { error, tweets, isLoading, intersectionRef, isRefetching } = useGetTweets({ state, dispatch, func: getTimeline })
  console.log(tweets)

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
