import CountryListItem from '@/models/countryListItem';
import { ApolloClient, ApolloProvider, gql, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { NextPageContext } from 'next';
import Head from 'next/head'
import { Countries, CountriesProps } from '../components/countries'

function getClient() : ApolloClient<NormalizedCacheObject> {
  const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/graphql",
    cache: new InMemoryCache()
  });  

  return client;
}

export default function Index(data: CountriesProps) {
  return (
    <>
      <Head>
        <title>Countries</title>
        <meta name="description" content="Countries of the world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div>
         <ApolloProvider client={getClient()}>
           <Countries countryListItems={data.countryListItems} ></Countries>
         </ApolloProvider>
        </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {

  interface CountriesResult {
    countries:  CountryListItem[];
  };

  const { data } = await getClient().query<CountriesResult>({
    query: gql`
      query {
        countries {
          name,
          code
        }
      }
    `,
  });  

  return {
      props: {
        countryListItems : data.countries
      }
    }
 }
    