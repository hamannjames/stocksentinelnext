import { Chart, ChartData } from "chart.js";
import { Query } from "./queryBuilder";
import getTransactions from "./getTransactions";

export default async function formatTransactionsForPie(query: Query): Promise<ChartData<"pie">> {
    const transactions = await getTransactions(query);

    const tickerMap = new Map<string, number>();

    const chartData = {datasets: [{data: [], backgroundColor: []}], labels: []} as ChartData<"pie">;

    transactions.forEach(transaction => {
        const ticker = transaction.ticker;

        if (tickerMap.has(ticker)) {
            const index = tickerMap.get(ticker);

            if (index !== undefined) {
                chartData.datasets[0].data[index] += 1;
            }
        } else {
            if (chartData.labels !== undefined) {
                chartData.labels.push(ticker);
                const index = chartData.labels.length - 1;
                tickerMap.set(ticker, index);
                chartData.datasets[0].data.push(1);
            }
        }
    });

    return chartData
}