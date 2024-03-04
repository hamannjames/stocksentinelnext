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
                {max > 5 && parseInt(page) > 1 &&
                    <li>
                        <Link href={`/?${buildParams(1)}`}>First</Link>
                    </li>
                }
                {parseInt(page) > 1 &&
                    <li>
                        <Link href={`/?${buildParams(parseInt(page) - 1)}`}>Previous</Link>
                    </li>
                }
                {parseInt(page) < max &&
                    <li>
                        <Link href={`/?${buildParams(parseInt(page) + 1)}`}>Next</Link>
                    </li>
                }
                {max > 5 && parseInt(page) < max &&
                    <li>
                        <Link href={`/?${buildParams(max)}`}>Last</Link>
                    </li>
                }
            </ul>
        </div>
    )
}