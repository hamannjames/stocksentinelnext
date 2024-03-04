import { EstimatedDocumentCountOptions } from "mongodb";
import { getClient } from "./client";
import { Query } from "./queryBuilder";
import { cache } from "react";

async function fetchCount(query: Query): Promise<number> {
    const client = await getClient();

    const match = query[0]['$match'];

    return await client.db('stocksentinel').collection('transactions').countDocuments(match, { hint: { transaction_date: 1 } } as EstimatedDocumentCountOptions)
}

const getCount = cache(fetchCount);

export default getCount;
