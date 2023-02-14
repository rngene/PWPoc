import CountryListItem from '@/models/countryListItem';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import Head from 'next/head'
import { Countries, CountriesProps } from '../components/countries'

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
          <Countries countryListItems={data.countryListItems} ></Countries>
        </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {

  interface CountriesResult {
    countries:  CountryListItem[];
  };

  const client = new ApolloClient({
    uri: "http://countries.trevorblades.com/graphql",
    cache: new InMemoryCache()
  });   

  const { data } = await client.query<CountriesResult>({
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
    