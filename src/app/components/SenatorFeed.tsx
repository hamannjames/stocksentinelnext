import {getClient} from "../..//lib/client"

export default async function SenatorFeed() {
    const client = await getClient();

    const cursor = await client.db('stocksentinel').collection('transactors').find();
    const data = await cursor.toArray();

    return (
        <>
            {data.map(s => <div key={s['bio_id']}>
            <h2>Senator {s.full_name}</h2>
            <p>Party: {s.party}</p>
            <p>State: {s.state}</p>
            </div>)}
        </>
    )
}