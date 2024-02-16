import { Suspense, useEffect, useState } from "react"
import TransactionFilters from "./TransactionFilters"
import TransactionList from "./TransactionList";
import { EstimatedDocumentCountOptions, ObjectId } from "mongodb";
import { getClient } from "@/lib/client";
import queryBuilder from "@/lib/queryBuilder";
import TransactionPagination from "./TransactionPagination";

export interface Transaction {
    _id: ObjectId,
    ptr_id: string,
    ptr_row: number,
    transaction_date: Date,
    transactor?: Transactor,
    ticker: string,
    asset_name: string,
    transaction_type: string,
    amount_min: number,
    amount_max: number,
    comment?: string
}

export interface Transactor {
    bio_id: string,
    first_name: string,
    last_name: string,
    party: string,
    active: boolean
}

export default async function TransactionTable({search}: {search: Record<string, string>}) {
    const query = queryBuilder(search);
    const client = await getClient();

    const match = query[0]['$match'];

    const count = await client.db('stocksentinel').collection('transactions').countDocuments(match, { hint: { transaction_date: 1 } } as EstimatedDocumentCountOptions)

    const transactions = client.db('stocksentinel').collection('transactions').aggregate(query as any)

    const tArray = await transactions.toArray() as Transaction[];

    return (
        <section className="flex items-center justify-center">
            <div className="bg-gray-100 rounded-md">
                <header className="px-8 py-4 border-b-2 border-b-gray/25 border-solid flex justify-between">
                    <h2>Transactions</h2>
                    <TransactionFilters />
                    <TransactionPagination count={count} search={search} />
                </header>
                <div>
                    <TransactionList page={search['page']} perPage={search['per_page']} items={tArray} />
                </div>
            </div>
        </section>
    )
}