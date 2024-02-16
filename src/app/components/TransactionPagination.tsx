import Link from "next/link";
import { parse } from "path";

export default function TransactionPagination({search, count}: {search: Record<string, string>, count: number}) {
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
                {
                    parseInt(page) > 1 && max > 5 &&
                    <li>
                        ...
                    </li>
                }
                {
                    Array.from(Array(Math.min(max, 5))).map((_, i) => 
                        <li key={i}>
                            <Link 
                                className={`${i + Math.min(i + parseInt(page), max - Math.min(max, 5) + i + 1) === parseInt(page) ? 'underline pointer-events-none' : ''}`} 
                                href={`/?${buildParams(
                                    Math.min(i + parseInt(page), max - Math.min(max, 5) + i + 1)
                                )}`}
                            >
                                {Math.min(i + parseInt(page), max - Math.min(max, 5) + i + 1)}
                            </Link>
                        </li>
                    )
                }
                {
                    max > 5 && max - parseInt(page) >= 5 &&
                    <li>
                        ...
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