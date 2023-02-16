import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import Head from 'next/head'
import { Countries, CountriesProps } from '../components/countries'
import GetCountriesResult from '../models/getCountriesResult'

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

  // if (process.env.PLAYWRIGHT_TEST_BASE_URL!==undefined) {
  //   return null;
  // }

  const client = new ApolloClient({
    uri: "http://countries.trevorblades.com/graphql",
    cache: new InMemoryCache()
  });   

  const { data } = await client.query<GetCountriesResult>({
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
    