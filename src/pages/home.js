import { TweetsSection } from '@/components/ui/tweetsSection/TweetsSection'
import { useSession } from 'next-auth/react'
import { ScreenProtector } from '@/components/ui/screenProtector/ScreenProtector'
import { useContext } from 'react'
import { WriteTweetModalContext } from '@/contexts/WriteTweetModalContext'
import { TweetModal } from '@/components/ui/modals/TweetModal'
import { useGetTweets } from '@/hooks/useGetTweets'
import { Layout } from '@/components/ui/Layout'
import { SEO } from '@/components/ui/SEO'

export default function Home () {
  const { status } = useSession()

  const { state } = useContext(WriteTweetModalContext)
  const { sectionSelected, setSectionSelected, tweets, addTweet, error, isLoading } = useGetTweets()

  return (
    <>
      <SEO title='Home / Twitter Clone' />
      {
        status === 'loading' && <ScreenProtector />
      }
      {
        state.open === true && <TweetModal addTweet={addTweet} />
      }
        <TweetsSection
          sectionSelected={sectionSelected}
          setSectionSelected={setSectionSelected}
          tweets={tweets}
          addTweet={addTweet}
          error={error}
          isLoading={isLoading}
        />
    </>
  )
}

Home.getLayout = (page) => {
  return <Layout>
    {page}
  </Layout>
}
