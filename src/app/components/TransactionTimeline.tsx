'use client'

import queryBuilder, { Query } from "@/lib/queryBuilder";
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react";

export default function TransactionTimeline(query: Query) {
    const [status, setStatus] = useState('loading');
    const [transactions, setTransactions] = useState([] as any[]);

    const fetchTransactions = async () => {
        const response = await fetch(`${window.location.origin}/api/transactions?${window.location.search}`)
        setTransactions(await response.json());
    }

    useEffect(() => {
        setStatus('loading');
        fetchTransactions().then(() => setStatus('idle'));
    }, [query])

    return (
        <>
            <h2>Transaction Timeline</h2>
            <Suspense fallback={<p>Loading...</p>}>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'idle' && <div>
                        {transactions.count}
                    </div>}
            </Suspense>
        </>
    )
}