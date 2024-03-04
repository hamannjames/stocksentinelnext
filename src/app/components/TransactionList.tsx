import { config } from "@/lib/config";
import { TransactionResponse } from "../api/transactions/route";
import queryBuilder, { Query } from "@/lib/queryBuilder";
import { getClient } from "@/lib/client";
import { EstimatedDocumentCountOptions } from "mongodb";
import { ReactNode } from "react";
import { Transaction } from "./TransactionTable";
import getTransactions from "@/lib/getTransactions";

export default async function TransactionList({query, page = '1', perPage='20'}: {query: Query, page: string, perPage: string}) {
    const transactions = await getTransactions(query);
    const pageNum = parseInt(page);
    const perPageNum = parseInt(perPage);
    
    return (
        <div>
            <ul>
                <li className="grid grid-cols-9 px-8 py-4 gap-4 font-bold border-b-2 border-b-gray/25 border-solid">
                    <span>Number</span>
                    <span>Transaction Date</span>
                    <span>Ticker</span>
                    <span>Senator</span>
                    <span>Minimum Amount</span>
                    <span>Maximum Amount</span>
                    <span>Transaction Type</span>
                    <span className="col-span-2">Comment</span>
                </li>
                {transactions.map((t, i) => 
                    <li 
                        key={t._id.toString()}
                        className={`grid grid-cols-9 px-8 py-4 border-b-2 border-b-gray/25 border-solid gap-4 ${i % 2 === 0 ? 'bg-gray-200' : ''    }`}
                    >
                        <span>{i + ((pageNum - 1) * perPageNum) + 1}</span>
                        <span>{t.transaction_date.toDateString()}</span>
                        <span>{t.ticker}</span>
                        <span>{`${t.transactor?.first_name ?? '--'} ${t.transactor?.last_name ?? ''}`}</span>
                        <span>{t.amount_min}</span>
                        <span>{t.amount_max}</span>
                        <span>{t.transaction_type}</span>
                        <span className="col-span-2">{t.comment}</span>
                    </li>
                )}
            </ul>
        </div>
    )
}