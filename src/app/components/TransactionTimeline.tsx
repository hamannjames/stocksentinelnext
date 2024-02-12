'use client'

import queryBuilder, { Query } from "@/lib/queryBuilder";
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react";
import { TransactionResponse } from "../api/transactions/route";

export default function TransactionTimeline() {
    const [status, setStatus] = useState('loading');
    const [transactions, setTransactions] = useState({} as TransactionResponse);

    const fetchTransactions = async () => {
        const response = await fetch(`${window.location.origin}/api/transactions?${window.location.search}`)
        setTransactions(await response.json());
    }

    useEffect(() => {
        setStatus('loading');
        fetchTransactions().then(() => setStatus('idle'));
    }, [])

    console.log(transactions)

    return (
        <>
            <h2>Transaction Timeline</h2>
            
            <Suspense fallback={<p>Loading...</p>}>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'idle' && <div>
                        {transactions.count} transactions found
                    </div>}
            </Suspense>
        </>
    )
}