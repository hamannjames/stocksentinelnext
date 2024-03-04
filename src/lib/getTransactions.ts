import { getClient } from "./client";
import { Query } from "./queryBuilder";
import { Transaction } from "../app/components/TransactionTable";
import { cache } from "react";

const fetchTransactions = async (query: Query): Promise<Transaction[]> => {
    const client = await getClient();

    const transactions = await client.db('stocksentinel').collection('transactions').aggregate(query as any)

    return await transactions.toArray() as Transaction[];
}

const getTransactions = cache(fetchTransactions);

export default getTransactions;