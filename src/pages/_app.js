import { TweetsContextProvider } from '@/contexts/TweetsContext'
import { WindowSizeContextProvider } from '@/contexts/WindowSizeContext'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { Suspense, createElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App ({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>

      <Suspense fallback={<p></p>}>

        <QueryClientProvider client={queryClient}>

          <WindowSizeContextProvider>

            <TweetsContextProvider>

              {getLayout(createElement(Component, pageProps))}

            </TweetsContextProvider>

          </WindowSizeContextProvider>

        </QueryClientProvider>

      </Suspense>
    </SessionProvider>
  )
}
