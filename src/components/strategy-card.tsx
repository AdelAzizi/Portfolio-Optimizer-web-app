"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Strategy } from "@/types";

export interface StrategyInfo {
  id: Strategy;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  factors: { name: string; value: number }[];
  color: string;
}

interface StrategyCardProps {
  strategy: StrategyInfo;
  isSelected: boolean;
  onSelect: () => void;
}

export function StrategyCard({ strategy, isSelected, onSelect }: StrategyCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={cn(
        "cursor-pointer group text-right transition-all duration-300 ease-in-out border-2 hover:shadow-2xl hover:-translate-y-2",
        isSelected
          ? "border-accent shadow-2xl -translate-y-2"
          : "border-transparent"
      )}
      style={{
        '--strategy-color': strategy.color,
      } as React.CSSProperties}
    >
      <CardHeader className="items-end">
        <div className="text-6xl mb-3">{strategy.icon}</div>
        <CardTitle className="font-headline text-3xl font-bold text-primary">
          {strategy.title}
        </CardTitle>
        <p className="text-muted-foreground font-medium">{strategy.subtitle}</p>
      </CardHeader>
      <CardContent>
        <p className="mb-6 h-20">{strategy.description}</p>
        <div className="space-y-4 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h4 className="font-bold text-sm text-foreground">فاکتورهای کلیدی</h4>
          {strategy.factors.map((factor) => (
            <div key={factor.name} className="w-full">
              <div className="flex justify-between mb-1 text-xs font-semibold">
                <span>{factor.name}</span>
                <span>{factor.value}%</span>
              </div>
              <Progress
                value={factor.value}
                className="h-2"
                indicatorClassName="bg-[var(--strategy-color)]"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
