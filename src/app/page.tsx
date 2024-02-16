import { Suspense } from "react";
import SenatorFeed from "./components/SenatorFeed";
import { Transaction } from "mongodb";
import TransactionTimeline from "./components/TransactionTimeline";
import TransactionTable from "./components/TransactionTable";

export default async function Home({searchParams}: {searchParams: Record<string, string>}) {
  return (
    <main className="min-h-screen p-8 space-y-4">
      <h1 className="text-4xl max-w-7xl">A small taste of what is to come. Filter transactions by start and end date and party. The pagination is just about working, a few bumps when you get to the end. Keep an eye out for sub pages for ticker and senator incoming next week.</h1> 
      <a className="text-pink-300 text-2xl" href="https://github.com/hamannjames/stocksentinelnext">Follow along on github</a>
      <Suspense fallback={<p>Loading...</p>}>
        <TransactionTable search={searchParams} />
      </Suspense>
    </main>
  );
}
