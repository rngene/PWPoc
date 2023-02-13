import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Countries from '@/components/countries';

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/graphql",
    cache: new InMemoryCache()
});
  return <>
  <ApolloProvider client={client}>
    {/* <Countries></Countries> */}
    <Component {...pageProps} />
     
  </ApolloProvider> 
  </>
}
