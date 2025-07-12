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
import { Badge } from "@/components/ui/badge";
import type { StrategyApiResponse } from "@/types";

interface TransactionAnalysisProps {
  data: StrategyApiResponse["transaction_analysis"];
}

const formatCost = (value: number) => {
  return `${(value / 1000000).toLocaleString("fa-IR")} میلیون تومان`;
};

export function TransactionAnalysis({ data }: TransactionAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">تحلیل تراکنش‌ها</CardTitle>
        <CardDescription>هزینه‌ها و تاریخچه بازآرایی سبد</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">گردش سالانه</p>
            <p className="text-2xl font-bold text-primary">
              {(data.annual_turnover * 100).toFixed(0)}%
            </p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">هزینه کل تخمینی</p>
            <p className="text-2xl font-bold text-primary">
              {formatCost(data.estimated_total_cost)}
            </p>
          </div>
        </div>

        <h4 className="font-semibold mb-2">تاریخچه بازآرایی (Rebalancing)</h4>
        <div className="max-h-48 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">تاریخ</TableHead>
                <TableHead className="text-right">تراکنش‌ها</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rebalance_history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-right">{item.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-wrap gap-1">
                      {item.sold.map((s) => (
                        <Badge key={s} variant="destructive">
                          فروش: {s}
                        </Badge>
                      ))}
                      {item.bought.map((b) => (
                        <Badge key={b} className="bg-green-600 hover:bg-green-700 text-white">
                          خرید: {b}
                        </Badge>
                      ))}
                    </div>
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
