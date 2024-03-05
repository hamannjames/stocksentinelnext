import { Suspense, cache } from "react";
import SenatorFeed from "./components/SenatorFeed";
import { Transaction } from "mongodb";
import TransactionTimeline from "./components/TransactionTimeline";
import TransactionTable from "./components/TransactionTable";
import fetchCount from "@/lib/fetchCount";
import queryBuilder from "@/lib/queryBuilder";
import { get } from "http";
import getCount from "@/lib/fetchCount";
import getSearchParams from "@/lib/getSearchParams";
import './components/styles/loading.css';
import PieCharts from "./components/PieCharts";

export default async function Home({searchParams}: {searchParams: Record<string, string>}) {
  const query = queryBuilder(searchParams);

  return (
    <main className="min-h-screen p-8 space-y-4">
      <h1 className="text-4xl max-w-7xl">Pie Charts incoming</h1> 
      <a className="text-pink-300 text-2xl" href="https://github.com/hamannjames/stocksentinelnext">Follow along on github</a>
      <TransactionTable query={query} search={searchParams} />
      <PieCharts query={query} />
    </main>
  );
}
