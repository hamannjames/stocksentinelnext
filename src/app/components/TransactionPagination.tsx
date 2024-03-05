import getCount from "@/lib/fetchCount";
import getSearchParams from "@/lib/getSearchParams";
import { LimitQuery, Query, SkipQuery } from "@/lib/queryBuilder";
import Link from "next/link";
import { parse } from "path";

export default async function TransactionPagination({query, search}: {query: Query, search: any}) {
    const count = await getCount(query);

    const {per_page = '20', page = '1'} = search;
    const max = Math.ceil(count/parseInt(per_page));

    const buildParams = (page: number) => {
        return (new URLSearchParams({...search, page: page.toString(), per_page: per_page || '20'})).toString();
    }

    return (
        <div>
            <ul className="flex gap-4">
                <li>
                    {max > 5 && parseInt(page) > 1 ? <Link href={`/?${buildParams(1)}`}>First</Link> : <span className="text-gray-500">First</span> }
                </li>
                <li>
                    {parseInt(page) > 1 ? <Link href={`/?${buildParams(parseInt(page) - 1)}`}>Previous</Link> : <span className="text-gray-500">Previous</span> }
                </li>
                <li>
                    {parseInt(page) < max ? <Link href={`/?${buildParams(parseInt(page) + 1)}`}>Next</Link> : <span className="text-gray-500">Next</span> }
                </li>
                <li>
                    {max > 5 && parseInt(page) < max ? <Link href={`/?${buildParams(max)}`}>Last</Link> : <span className="text-gray-500">Last</span>}
                </li>
            </ul>
        </div>
    )
}