"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, BarChart2, Zap } from "lucide-react";
import type { StrategyApiResponse } from "@/types";

interface KpiCardsProps {
  summary: StrategyApiResponse["performance_summary"];
}

const formatPercent = (value: number) => {
  return `${(value * 100).toFixed(1)}%`;
};

export function KpiCards({ summary }: KpiCardsProps) {
  const kpis = [
    {
      title: "بازدهی مورد انتظار (سالانه)",
      value: formatPercent(summary.expected_annual_return),
      icon: <ArrowUpRight className="h-8 w-8 text-green-500" />,
      description: "میانگین بازدهی پیش‌بینی شده در یک سال",
    },
    {
      title: "نوسان (ریسک سالانه)",
      value: formatPercent(summary.annual_volatility),
      icon: <BarChart2 className="h-8 w-8 text-amber-500" />,
      description: "میزان پراکندگی بازدهی از میانگین آن",
    },
    {
      title: "نسبت شارپ",
      value: summary.sharpe_ratio.toFixed(2),
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      description: "بازدهی به ازای هر واحد ریسک پذیرفته شده",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpis.map((kpi, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            {kpi.icon}
          </CardHeader>
          <CardContent className="flex flex-col flex-grow justify-end">
            <div className="text-4xl font-bold text-primary">{kpi.value}</div>
            <p className="text-xs text-muted-foreground pt-2">
              {kpi.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
