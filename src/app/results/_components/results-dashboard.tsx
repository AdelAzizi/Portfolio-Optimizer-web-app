"use client";

import { useEffect, useState, use } from "react";
import type { Strategy, StrategyApiResponse } from "@/types";
import { getDynamicRecommendation } from "../actions";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

import { KpiCards } from "./kpi-cards";
import { PortfolioComposition } from "./portfolio-composition";
import { TransactionAnalysis } from "./transaction-analysis";
import { BacktestChart } from "./backtest-chart";
import { NextSteps } from "./next-steps";
import ResultsLoading from "../loading";

// The `searchParams` prop is passed from the page component
export default function ResultsDashboard({ searchParams }: { searchParams: { strategy: Strategy }}) {
  const strategy = searchParams.strategy;

  const [data, setData] = useState<StrategyApiResponse | null>(null);
  const [dynamicRec, setDynamicRec] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!strategy) {
      setError("استراتژی انتخاب نشده است.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://127.0.0.1:8000/optimize-strategy", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ strategy_name: strategy }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Server returned an error");
        }

        const result: StrategyApiResponse = await response.json();
        setData(result);

        const recommendation = await getDynamicRecommendation(result);
        setDynamicRec(recommendation);

      } catch (e: any) {
        setError(e.message || "یک خطای ناشناخته رخ داد.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [strategy]);

  if (loading) {
    return <ResultsLoading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>خطا</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const recommendationText = dynamicRec || data.next_steps.recommendation_text;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-headline font-bold text-primary">
            {data.strategy_profile.name}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-right">
            {data.strategy_profile.description}
          </p>
        </div>
        <div className="text-7xl shrink-0">{data.strategy_profile.icon}</div>
      </div>

      <KpiCards summary={data.performance_summary} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 my-8">
        <div className="lg:col-span-3">
          <BacktestChart data={data.backtest_data} />
        </div>
        <div className="lg:col-span-2">
          <PortfolioComposition data={data.optimal_weights} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
        <TransactionAnalysis data={data.transaction_analysis} />
        <NextSteps
          date={data.next_steps.next_rebalance_date}
          recommendation={recommendationText}
        />
      </div>
    </div>
  );
}
