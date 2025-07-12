"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { StrategyApiResponse } from "@/types";

interface BacktestChartProps {
  data: StrategyApiResponse["backtest_data"];
}

const chartConfig = {
  strategy: {
    label: "استراتژی شما",
    color: "hsl(var(--chart-1))",
  },
  benchmark: {
    label: "شاخص کل",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BacktestChart({ data }: BacktestChartProps) {
  const chartData = data.dates.map((date, index) => ({
    date,
    strategy: data.strategy_values[index],
    benchmark: data.benchmark_values[index],
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">عملکرد گذشته (Backtest)</CardTitle>
        <CardDescription>مقایسه بازدهی استراتژی شما با شاخص کل در ۳ سال گذشته</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 4)}
              />
               <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="strategy"
                type="monotone"
                stroke="var(--color-strategy)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="benchmark"
                type="monotone"
                stroke="var(--color-benchmark)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
