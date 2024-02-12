export type Query = [{$match: MatchQuery}, SkipQuery?: {}, LimitQuery?: {}]

export interface SkipQuery {
    $skip: number
}

export interface LimitQuery {
    $limit: number
}

export interface MatchQuery {
    transaction_date?: {
        $gte?: Number
        $lte?: Number
    }
    'transactor.bio_id'?: {
        bio_id: string
    }
    ticker?: string
    'transactor.party'?: string
    type?: string
}

export default function queryBuilder(searchParams: URLSearchParams): Query {
    const { start, end, transactor, ticker, party, type, page = '1', per_page = '20' } = Object.fromEntries(searchParams.entries());

    const match: MatchQuery = {}

    if (start) {
        match['transaction_date'] = { $gte: (new Date(start)).getTime() }
    }

    if (end) {
        match['transaction_date'] = { ...match['transaction_date'], $lte: (new Date(end)).getTime() }
    }

    if (transactor) {
        match['transactor.bio_id'] = { bio_id: transactor }
    }

    if (ticker) {
        match['ticker'] = ticker
    }

    if (party) {
        match['transactor.party'] = party
    }

    if (type) {
        match['type'] = type
    }

    const query: Query = [{$match: match}]

    if (page) {
        query.push({ $skip: (parseInt(page) - 1) * parseInt(per_page) })
        query.push({ $limit: parseInt(per_page) })
    }

    return query
}