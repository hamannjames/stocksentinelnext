import { Suspense } from "react";
import SenatorFeed from "./components/SenatorFeed";
import { Transaction } from "mongodb";
import TransactionTimeline from "./components/TransactionTimeline";
import TransactionTable from "./components/TransactionTable";

export default async function Home() {
  return (
    <main className="min-h-screen p-8 space-y-4">
      <h1 className="text-6xl max-w-7xl">Great things coming! Check back here for some juicy stock details. Estimated timeline to stock content: 2-15-24</h1>
      <a className="text-pink-300 text-2xl" href="https://github.com/hamannjames/stocksentinelnext">Follow along on github</a>
      <TransactionTable />
      <Suspense fallback={<p>Loading Senators...</p>}>
        <SenatorFeed />
      </Suspense>
    </main>
  );
}
