/* eslint-disable react/no-unknown-property */
import { INITIAL_TWEETS_STATE } from '@/assets/INITIAL_TWEETS_STATE'
import { getUserBookmarks } from '@/assets/consts'
import { getExternalInteractions } from '@/assets/getExternalInteractions'
import { BookmarksHeader } from '@/components/ui/bookmarksHeader/BookmarksHeader'
import { Layout } from '@/components/ui/common/Layout'
import { SEO } from '@/components/ui/common/SEO'
import { Spinner } from '@/components/ui/spinner/Spinner'
import { Tweet } from '@/components/ui/tweet/Tweet'
import { useGetTweets } from '@/hooks/useGetTweets'
import { TweetsReducer } from '@/reducers/TweetsReducer'
import { useReducer } from 'react'

export default function BookmarkedPage () {
  const [state, dispatch] = useReducer(TweetsReducer, INITIAL_TWEETS_STATE)
  const { error, tweets, isLoading, intersectionRef, isRefetching } = useGetTweets({ state, dispatch, func: getUserBookmarks })
  const externalInteractions = getExternalInteractions(dispatch)

  return <>
    <SEO title="Bookmarks / Twitter Clone" />

    <main>
      <BookmarksHeader />
      {
        tweets.map(el => <Tweet key={el._id} tweet={el} externalInteractions={externalInteractions} upReply />)
      }
      {
        (isLoading || isRefetching) && <Spinner style={{ margin: '15px auto' }} />
      }
      {
        error && <span style={{ color: 'red', textAlign: 'center', display: 'block' }}>{error.message}</span>
      }
    </main>
    <div ref={intersectionRef} style={{ height: 1, width: '100%' }}></div>

    <style jsx>{`

      main {
        min-height: 100%;
        width: 100%;
        border-left: 1px solid var(--borderColor);
        border-right: 1px solid var(--borderColor);
      }

    `}</style>
  </>
}
BookmarkedPage.getLayout = (page) => {
  return <Layout>
    {page}
  </Layout>
}
