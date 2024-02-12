import { getClient } from "@/lib/client";
import queryBuilder from "@/lib/queryBuilder";
import { EstimatedDocumentCountOptions } from "mongodb";
import { NextResponse } from "next/server";

export interface TransactionResponse {
    count: number
    transactions: any[]
    page: number | null
}

export async function GET(request: Request) {
    const client = await getClient();
    const searchParams = new URLSearchParams((new URL(request.url).search.slice(1)))

    const query = queryBuilder(searchParams);

    const match = query[0]['$match'];

    const count = await client.db('stocksentinel').collection('transactions').countDocuments(match, { hint: { transaction_date: 1 } } as EstimatedDocumentCountOptions)

    const transactions = client.db('stocksentinel').collection('transactions').aggregate(query as any)

    const tArray = await transactions.toArray()

    return NextResponse.json({
        count,
        transactions: tArray,
        page: searchParams.get('page'),
    } as TransactionResponse)
}