'use client'

import { ChartData } from "chart.js";
import { Pie, } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

export default function PieChartClient({data}: {data: ChartData<"pie">}) {
    return (
        <div>
            <Pie data={data} />
        </div>
    )
}