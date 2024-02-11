import 'dotenv/config';
import { MongoClient } from 'mongodb';
const connString: string = process.env.COSMOSDB_CONNECTION_STRING!;

let client: MongoClient | null = null;

export const getClient = async () => {
  if (!client) {
    client = new MongoClient(connString)
    await client.connect()
  }

  return client
}
/*
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({uri: graphql_uri}),
  });
});

*/