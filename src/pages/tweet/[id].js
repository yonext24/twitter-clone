import { getSingleTweet } from '@/assets/consts'
import { Layout } from '@/components/ui/Layout'
import { Tweet } from '@/components/ui/tweet/Tweet'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'

export default function TweetPage () {
  const [tweet, setTweet] = useState(null)

  const router = useRouter()
  const { id } = router.query

  const { isLoading, error } = useQuery(
    ['getSingleTweet', id],
    () => (id && !tweet ? getSingleTweet(id) : null),
    { retryDelay: 5000, refetchOnWindowFocus: false, refetchInterval: false, onSuccess: setTweet })

  return <>
    <Head>
      <title>Tweet</title>
    </Head>

      {
        tweet && <Tweet tweet={tweet} />
      }

  </>
}

TweetPage.getLayout = (page) => {
  return <Layout>
    {page}
  </Layout>
}
