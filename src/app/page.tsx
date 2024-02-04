import Image from "next/image";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {getClient} from "../lib/client"

export default async function Home() {
  const client = await getClient();

  const cursor = await client.db('stocksentinel').collection('transactors').find();
  const data = await cursor.toArray();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Great things coming! Check back here for some juicy stock details. Estimated timeline to stock content: 2-15-24</h1>
      {data.map(s => <div key={s['bio_id']}>
        <h2>Senator {s.full_name}</h2>
        <p>Party: {s.party}</p>
        <p>State: {s.state}</p>
      </div>)}
    </main>
  );
}
