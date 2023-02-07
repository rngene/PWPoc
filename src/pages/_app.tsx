import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/graphql",
    cache: new InMemoryCache()
});
  return <ApolloProvider client={client}>
      <Component {...pageProps} />
  </ApolloProvider> 
}
