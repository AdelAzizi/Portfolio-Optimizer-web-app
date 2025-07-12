"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { StrategyApiResponse } from "@/types";
import { useMemo } from "react";

interface PortfolioCompositionProps {
  data: StrategyApiResponse["optimal_weights"];
}

export function PortfolioComposition({ data }: PortfolioCompositionProps) {
  const chartData = useMemo(() => data.map(item => ({ name: item.symbol, value: item.weight, fill: '' })), [data]);

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    chartData.forEach((item, index) => {
      config[item.name] = {
        label: item.name,
        color: `hsl(var(--chart-${(index % 5) + 1}))`,
      };
    });
    return config;
  }, [chartData]);
  
  // Add colors to chartData based on config
  chartData.forEach(item => {
    item.fill = chartConfig[item.name]?.color || '#000000';
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">ترکیب سبد</CardTitle>
        <CardDescription>تخصیص بهینه دارایی‌ها</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-52 w-full">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    {chartData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
        </div>
        <div className="mt-4 max-h-48 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">نماد</TableHead>
                <TableHead className="text-left">وزن</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((asset) => (
                <TableRow key={asset.symbol}>
                  <TableCell className="font-medium text-right">{asset.symbol}</TableCell>
                  <TableCell className="text-left">
                    {(asset.weight * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
