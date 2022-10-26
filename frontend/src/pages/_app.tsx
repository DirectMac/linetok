import { queryClient } from 'common/clients'
import { theme } from 'common/theme'
import { AnimatePresence } from 'framer-motion'
import { LoginLayout, MainLayout } from 'modules'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Linetok = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AnimatePresence mode="wait" initial={false}>
          {pathname === '/login' ? (
            <LoginLayout>
              <Component {...pageProps} />
            </LoginLayout>
          ) : (
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          )}
        </AnimatePresence>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default Linetok
