"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Strategy } from "@/types";
import { Button } from "@/components/ui/button";
import { StrategyCard, type StrategyInfo } from "@/components/strategy-card";
import { Header } from "@/components/shared/header";
import { ArrowLeft } from "lucide-react";

const strategies: StrategyInfo[] = [
  {
    id: "defensive",
    icon: "🐢",
    title: "لاک‌پشت دانا",
    subtitle: "رشد پیوسته و مطمئن",
    description: "استراتژی محافظه‌کارانه با تمرکز بر حفظ سرمایه و رشد پایدار. مناسب برای سرمایه‌گذارانی که به دنبال ریسک کمتر هستند.",
    factors: [
      { name: "ارزش", value: 80 },
      { name: "کیفیت", value: 90 },
      { name: "مومنتوم", value: 30 },
    ],
    color: "hsl(120, 50%, 45%)",
  },
  {
    id: "balanced",
    icon: "🐺",
    title: "گرگ باتجربه",
    subtitle: "شکار هوشمندانه فرصت‌ها",
    description: "استراتژی متعادل که به دنبال ترکیبی بهینه از رشد و ریسک است. مناسب برای سرمایه‌گذارانی با دید میان‌مدت.",
    factors: [
      { name: "ارزش", value: 60 },
      { name: "کیفیت", value: 70 },
      { name: "مومنتوم", value: 60 },
    ],
    color: "hsl(210, 50%, 55%)",
  },
  {
    id: "aggressive",
    icon: "🦅",
    title: "شاهین تیزبین",
    subtitle: "اوج‌گیری سریع در بازار",
    description: "استراتژی تهاجمی با تمرکز بر سهام رشدی و مومنتوم بالا. مناسب برای سرمایه‌گذاران ریسک‌پذیر با افق بلندمدت.",
    factors: [
      { name: "ارزش", value: 40 },
      { name: "کیفیت", value: 50 },
      { name: "مومنتوم", value: 95 },
    ],
    color: "hsl(350, 65%, 55%)",
  },
];

export default function Home() {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const router = useRouter();

  const handleNavigate = () => {
    if (selectedStrategy) {
      router.push(`/results?strategy=${selectedStrategy}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
          سبد بهینه خود را انتخاب کنید
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          ما با تحلیل داده‌های بازار، سه استراتژی سرمایه‌گذاری متناسب با روحیات
          مختلف طراحی کرده‌ایم. استراتژی خود را انتخاب کنید تا سبد شخصی‌سازی شده
          شما را بسازیم.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {strategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy}
              isSelected={selectedStrategy === strategy.id}
              onSelect={() => setSelectedStrategy(strategy.id)}
            />
          ))}
        </div>

        <Button
          size="lg"
          onClick={handleNavigate}
          disabled={!selectedStrategy}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-12 py-8 rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:scale-100 disabled:bg-muted"
        >
          ساخت سبد شخصی من
          <ArrowLeft className="mr-2 h-6 w-6" />
        </Button>
      </main>
      <footer className="py-6 text-center text-muted-foreground text-sm">
        <p>© 2024 Nava Portfolio. تمام حقوق محفوظ است.</p>
      </footer>
    </div>
  );
}
