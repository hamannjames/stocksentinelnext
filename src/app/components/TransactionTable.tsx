'use client'

import { Suspense, useEffect, useState } from "react"
import TransactionDateFilter from "./TransactionDateFilter"
import { TransactionResponse } from "../api/transactions/route";
import TransactionList from "./TransactionList";

export default function TransactionTable() {

    return (
        <section>
            <header>
                <h2>Transactions</h2>
                <TransactionDateFilter />
            </header>
            <div>
                <Suspense fallback={<p>Loading...</p>}>
                    <TransactionList />
                </Suspense>
            </div>
        </section>
    )
}