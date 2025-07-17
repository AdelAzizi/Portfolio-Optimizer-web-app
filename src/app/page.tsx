
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { StrategyCard } from "@/components/strategy-card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { StrategyInfo } from "@/types";
import { Button } from "@/components/ui/button";

const strategyColors: Record<string, string> = {
  defensive: "hsl(var(--chart-3))",
  balanced: "hsl(var(--chart-1))",
  aggressive: "hsl(var(--chart-5))",
};


export default function HomePage() {
  const router = useRouter();
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [hoveredStrategy, setHoveredStrategy] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const strategies: StrategyInfo[] = [
    {
      id: "defensive",
      icon: "https://placehold.co/100x100.png",
      name: { fa: "لاک‌پشت دانا", en: "Wise Turtle" },
      tagline: { fa: "رشد پیوسته، حتی در بازارهای طوفانی.", en: "Steady growth, even in stormy markets." },
      story: { fa: "همانند لاک‌پشت که با لاک محکم خود از خود محافظت می‌کند، این استراتژی بر حفظ سرمایه شما در شرایط سخت تمرکز دارد. با انتخاب سهام باکیفیت و کم‌نوسان، مسیری آرام و مطمئن را برای رشد بلندمدد سرمایه شما فراهم می‌کند.", en: "Like a turtle protecting itself with its strong shell, this strategy focuses on preserving your capital in tough conditions. By selecting high-quality, low-volatility stocks, it provides a calm and secure path for the long-term growth of your capital." },
      factors: [
        { name: { fa: "ارزش (Value)", en: "Value" }, value: 70 },
        { name: { fa: "مومنتوم (Momentum)", en: "Momentum" }, value: 20 },
        { name: { fa: "ریسک‌کم (Low Volatility)", en: "Low Volatility" }, value: 90 },
      ],
      final_cta: { fa: "مناسب برای حفظ سرمایه.", en: "For capital preservation." },
      color: strategyColors.defensive,
      optimal_weights: {}, performance_summary: { "Total Return": "", "Annualized Volatility": "", "Annualized Return": "", "Sharpe Ratio": "" }, backtest_data: { dates: [], strategy_values: [] }, transaction_analysis: { annual_turnover: "", estimated_total_cost: "", rebalance_history: [] }
    },
    {
      id: "balanced",
      icon: "https://placehold.co/100x100.png",
      name: { fa: "گرگ باتجربه", en: "Experienced Wolf" },
      tagline: { fa: "شکار هوشمندانه فرصت‌ها، با نگاهی به افق.", en: "Intelligent hunting of opportunities, with an eye on the horizon." },
      story: { fa: "گرگ‌ها به صورت گروهی و با استراتژی شکار می‌کنند. این سبد نیز با ترکیبی هوشمندانه از سهام ارزشمند و سهامی که در روند رشد قرار دارند، به دنبال شکار بهترین فرصت‌های بازار است تا بازدهی قابل توجهی را با ریسکی مدیریت‌شده به دست آورد.", en: "Wolves hunt in packs and with strategy. This portfolio, too, seeks to hunt the best market opportunities with a clever combination of value stocks and stocks in an upward trend, aiming for significant returns with managed risk." },
      factors: [
        { name: { fa: "ارزش (Value)", en: "Value" }, value: 50 },
        { name: { fa: "مومنتوم (Momentum)", en: "Momentum" }, value: 50 },
        { name: { fa: "ریسک‌کم (Low Volatility)", en: "Low Volatility" }, value: 50 },
      ],
      final_cta: { fa: "بهترین بازده تعدیل‌شده.", en: "Best risk-adjusted return." },
      color: strategyColors.balanced,
      optimal_weights: {}, performance_summary: { "Total Return": "", "Annualized Volatility": "", "Annualized Return": "", "Sharpe Ratio": "" }, backtest_data: { dates: [], strategy_values: [] }, transaction_analysis: { annual_turnover: "", estimated_total_cost: "", rebalance_history: [] }
    },
    {
      id: "aggressive",
      icon: "https://placehold.co/100x100.png",
      name: { fa: "شاهین تیزبین", en: "Sharp Eagle" },
      tagline: { fa: "اوج‌گیری سریع، برای کسانی که آسمان را می‌خواهند.", en: "Rapid ascent, for those who want the sky." },
      story: { fa: "شاهین با دید تیز خود، از ارتفاع بالا شکارش را شناسایی و با سرعتی بی‌نظیر به آن حمله می‌کند. این استراتژی تهاجمی نیز با تمرکز بر قوی‌ترین روندهای بازار، به دنبال کسب حداکثر بازده در کوتاه‌ترین زمان ممکن است.", en: "With its sharp vision, the eagle spots its prey from high altitudes and attacks it with unmatched speed. This aggressive strategy also focuses on the strongest market trends, aiming for maximum returns in the shortest possible time." },
      factors: [
        { name: { fa: "ارزش (Value)", en: "Value" }, value: 20 },
        { name: { fa: "مومنتوم (Momentum)", en: "Momentum" }, value: 90 },
        { name: { fa: "ریسک‌کم (Low Volatility)", en: "Low Volatility" }, value: 10 },
      ],
      final_cta: { fa: "برای هدف حداکثر بازدهی.", en: "Aiming for maximum returns." },
      color: strategyColors.aggressive,
      optimal_weights: {}, performance_summary: { "Total Return": "", "Annualized Volatility": "", "Annualized Return": "", "Sharpe Ratio": "" }, backtest_data: { dates: [], strategy_values: [] }, transaction_analysis: { annual_turnover: "", estimated_total_cost: "", rebalance_history: [] }
    },
  ];

  const handleSelectStrategy = (id: string) => {
    setSelectedStrategy((prev) => {
      const newId = id === prev ? null : id;
      if (newId) {
        setTimeout(() => {
          const cardElement = cardRefs.current[strategies.findIndex(s => s.id === newId)];
          cardElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
      return newId;
    });
  };
  
  const handleMouseEnter = (id: string, index: number) => {
    setHoveredStrategy(id);
    const cardElement = cardRefs.current[index];
    if (cardElement && !selectedStrategy) {
        setTimeout(() => {
            const rect = cardElement.getBoundingClientRect();
            const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            if (!isFullyVisible) {
                 window.scrollBy({ top: rect.bottom - window.innerHeight + 20, behavior: 'smooth' });
            }
        }, 300); 
    }
  };

   const handleMouseLeave = () => {
    setHoveredStrategy(null);
   };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if (selectedStrategy) {
      router.push(`/results?strategy=${selectedStrategy}`);
    }
  };

  const isAnyCardSelected = selectedStrategy !== null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-8 text-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
          سبد سرمایه‌گذاری هوشمند خود را بسازید
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          یکی از استراتژی‌های زیر را انتخاب کنید تا ما یک سبد بهینه و شخصی‌سازی شده برای شما پیشنهاد دهیم.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl items-start">
        {strategies.map((strategy, index) => {
          const isSelected = selectedStrategy === strategy.id;
          const isHovered = hoveredStrategy === strategy.id;
          
          let isBlurred = false;
          if (isAnyCardSelected) {
            isBlurred = !isSelected && !isHovered;
          } else if (hoveredStrategy) {
            isBlurred = !isHovered;
          }

          return (
            <div
              key={strategy.id}
              ref={el => cardRefs.current[index] = el}
              onMouseEnter={() => handleMouseEnter(strategy.id, index)}
              onMouseLeave={handleMouseLeave}
              className={cn(
                "transition-all duration-300 h-full",
                isBlurred ? "blur-sm scale-95 opacity-70" : ""
              )}
            >
              <StrategyCard
                strategy={strategy}
                isSelected={isSelected}
                onSelect={handleSelectStrategy}
                isHovered={isHovered}
                onSubmit={handleSubmit}
                isAnyCardSelected={isAnyCardSelected}
                currentLanguage="fa"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
