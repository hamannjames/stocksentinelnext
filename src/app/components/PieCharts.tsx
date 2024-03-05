import { Query } from "@/lib/queryBuilder";
import PieChart from "./charts/pie-chart/PieChart";
import { format } from "path";
import formatTransactionsForPie from "@/lib/formatTransactionsForPie";
import { Suspense } from "react";

export default function PieCharts({query}: {query: Query}) {
    const data = formatTransactionsForPie(query);

    return (
        <div className="w-full flex gap-8">
            <Suspense fallback={<div>Loading...</div>}>
                <PieChart title="Tickers" description="Top 10 Tickers" data={data} />
            </Suspense>
        </div>
    )
}