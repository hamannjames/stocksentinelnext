import { ChartData } from "chart.js";
import { Suspense } from "react";
import PieChartAsync from "./PieChartClient";

export default async function PieChart({ data, title, description }: { data: ChartData<"pie"> | Promise<ChartData<"pie">>, title: string, description: string}) {
    const chartData = await data;

    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <PieChartAsync data={chartData} />
        </div>
    )
}