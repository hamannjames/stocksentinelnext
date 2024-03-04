import { Suspense, useEffect, useState } from "react"
import TransactionFilters from "./TransactionFilters"
import TransactionList from "./TransactionList";
import { EstimatedDocumentCountOptions, ObjectId } from "mongodb";
import { getClient } from "@/lib/client";
import queryBuilder, { Query } from "@/lib/queryBuilder";
import TransactionPagination from "./TransactionPagination";
import { Audio } from "react-loader-spinner";
import LoadingWave from "./LoadingWave";

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

export default function TransactionTable({query, search}: {query: Query, search: any}) {

    return (
        <section className="flex items-center justify-center w-full">
            <div className="bg-gray-100 rounded-md w-full">
                <header className="px-8 py-4 border-b-2 border-b-gray/25 border-solid flex justify-between">
                    <h2>Transactions</h2>
                    <TransactionFilters />
                    <Suspense fallback={<div>Loading...</div>}>
                        <TransactionPagination query={query} search={search} />
                    </Suspense>
                </header>
                <div>
                    <Suspense fallback={<LoadingWave />}>
                        <TransactionList page={search['page']} perPage={search['per_page']} query={query} />
                    </Suspense>
                </div>
            </div>
        </section>
    )
}