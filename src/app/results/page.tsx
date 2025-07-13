import { Suspense } from 'react';
import ResultsDashboard from './_components/results-dashboard';
import ResultsLoading from './loading';
import { Header } from '@/components/shared/header';

export default function ResultsPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main>
        <Suspense fallback={<ResultsLoading />}>
          <ResultsDashboard />
        </Suspense>
      </main>
    </div>
  );
}
