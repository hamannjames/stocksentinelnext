export type Query = [{$match: MatchQuery}, {$sort: {}}, SkipQuery?: {}, LimitQuery?: {}]

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
    ticker?: string | {}
    'transactor.party'?: string
    type?: string | {}
}

interface SearchParams {
    start?: string
    end?: string
    transactor?: string
    ticker?: string
    party?: string
    type?: string
    page?: string
    per_page?: string
    sort?: string
}

export default function queryBuilder(searchParams: any): Query {
    const { sort, start, end, transactor, ticker, party, type, page = '1', per_page = '20' } = searchParams as SearchParams

    const match: MatchQuery = {}

    if (start) {
        match['transaction_date'] = { $gte: (new Date(start)).getTime() }
    } else {
        const start = new Date()
        start.setDate(start.getDate() - 60)
        match['transaction_date'] = { $gte: start.getTime() }
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

    match['ticker'] = {$not: {$eq: '--'}}
    match['type'] = {$not: {$eq: 'Exchange'}}

    const query: Query = [{$match: match}, {$sort: {'transaction_date': 1}}]

    if (page) {
        query.push({ $skip: (parseInt(page) - 1) * parseInt(per_page) })
        query.push({ $limit: parseInt(per_page) })
    }

    return query
}