import { Suspense } from 'react';
import ResultsDashboard from './_components/results-dashboard';
import ResultsLoading from './loading';
import { Header } from '@/components/shared/header';
import type { Strategy } from '@/types';

export default function ResultsPage({ searchParams }: { searchParams: { strategy: Strategy } }) {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main>
        <Suspense fallback={<ResultsLoading />}>
          <ResultsDashboard searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
