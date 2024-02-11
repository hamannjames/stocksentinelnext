export interface Query {
    transaction_date?: {
        $gte?: Date
        $lte?: Date
    }
    'transactor.bio_id'?: {
        bio_id: string
    }
    ticker?: string
    'transactor.party'?: string
    type?: string
}

export default function queryBuilder(searchParams: URLSearchParams) {
    const { start, end, transactor, ticker, party, type } = Object.fromEntries(searchParams.entries());

    const query: Query = {}

    if (start) {
        query['transaction_date'] = { $gte: new Date(start) }
    }

    if (end) {
        query['transaction_date'] = { ...query['transaction_date'], $lte: new Date(end) }
    }

    if (transactor) {
        query['transactor.bio_id'] = { bio_id: transactor }
    }

    if (ticker) {
        query['ticker'] = ticker
    }

    if (party) {
        query['transactor.party'] = party
    }

    if (type) {
        query['type'] = type
    }

    console.log(query)

    return query;
}