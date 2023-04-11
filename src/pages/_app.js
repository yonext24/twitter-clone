import { WriteTweetModalContextProvider } from '@/contexts/WriteTweetModalContext'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { createElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App ({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>

      <QueryClientProvider client={queryClient}>

        <WriteTweetModalContextProvider>

          {getLayout(createElement(Component, pageProps))}

        </WriteTweetModalContextProvider>

      </QueryClientProvider>

    </SessionProvider>
  )
}
