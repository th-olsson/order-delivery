import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { ApolloProvider } from '@apollo/client'
import apolloClient from 'lib/apolloClient'
import Layout from 'components/layout/Layout'
import { CartContextProvider } from 'contexts/CartContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <CartContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
