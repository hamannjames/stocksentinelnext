import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import { NextRequest } from 'next/server';
import 'dotenv/config';
import { MongoClient } from 'mongodb';

/*
const connString = process.env.COSMOSDB_CONNECTION_STRING;
const client = new MongoClient(connString);

const resolvers = {
    Query: {
        transactors: async (_,__,contextValue) => {
            const transactors = await contextValue.cosmos.db('stocksentinel').collection('transactors').find()
            const returnable = await transactors.toArray()
            return returnable
        }
    },
}

const typeDefs = gql`
    scalar Date

    enum ReportType {
        NEW
        ADDENDUM
    }

    enum Party {
        R
        D
        I
    }

    enum TransactionType {
        PURCHASE
        SALE
        EXCHANGE
    }

    type Transactor {
        id: ID
        first_name: String!
        last_name: String!
        party: Party!
        transactions: [Transaction]
        active: Boolean!
    }

    type Report {
        id: String!
        type: ReportType!
    }

    type Transaction {
        id: ID
        ticker: String!
        transactor: Transactor!
        type: TransactionType!
        amount_min: Int!
        amount_max: Int!
    }

    type Query {
        transactors: [Transactor]
        transactions: [Transaction]
    }

    type Mutation {
        addTransactor(
            first_name: String, 
            last_name: String,
            party: Party,
            active: Boolean
        ): Transactor
    }
`

const server = new ApolloServer({
    resolvers,
    typeDefs
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({
        req,
        cosmos: await client.connect()
    }),
})

export { handler as GET, handler as POST };
*/