'use client'

import { useState } from "react";
import { TransactionResponse } from "../api/transactions/route";

export default function TransactionList() {
    const [transactions, setTransactions] = useState(null as TransactionResponse | null);

    if (!transactions) {
        const fetchTransactions = async () => {
            const response = await fetch(`${window.location.origin}/api/transactions?${window.location.search}`)
        
            if (!response.ok) {
                throw new Error('Failed to fetch transactions')
            }

            setTransactions(await response.json());
        }

        fetchTransactions()
    }

    if (transactions) {
        console.log(transactions.transactions)
    }

    return (
        <ul>
            {transactions?.transactions.map(t => <li key={t.bio_id}>
                <div>Date: {(new Date(t.transaction_date)).toDateString()}</div>
            </li>)}
        </ul>
    )
}