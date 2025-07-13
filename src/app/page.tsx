
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StrategyCard } from "@/components/strategy-card";
import { Button } from "@/components/ui/button";
import { StrategyInfo } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [hoveredStrategy, setHoveredStrategy] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const strategies: StrategyInfo[] = [
    {
      id: "defensive",
      icon: "🐢",
      name: "لاک‌پشت دانا",
      title: "استراتژی دفاعی",
      tagline: "رشد پیوسته، حتی در بازارهای طوفانی.",
      story: "همانند لاک‌پشت که با لاک محکم خود از خود محافظت می‌کند، این استراتژی بر حفظ سرمایه شما در شرایط سخت تمرکز دارد. با انتخاب سهام باکیفیت و کم‌نوسان، مسیری آرام و مطمئن را برای رشد بلندمدت سرمایه شما فراهم می‌کند.",
      factors: [
        { name: "ارزش (Value)", value: 70 },
        { name: "مومنتوم (Momentum)", value: 20 },
        { name: "ریسک‌کم (Low Volatility)", value: 90 },
      ],
      final_cta: "اگر حفظ سرمایه و رشد پایدار اولویت شماست، این استراتژی برای شما ساخته شده است.",
      color: "hsl(120, 50%, 45%)",
    },
    {
      id: "balanced",
      icon: "🐺",
      name: "گرگ باتجربه",
      title: "استراتژی متعادل",
      tagline: "شکار هوشمندانه فرصت‌ها، با نگاهی به افق.",
      story: "گرگ‌ها به صورت گروهی و با استراتژی شکار می‌کنند. این سبد نیز با ترکیبی هوشمندانه از سهام ارزشمند و سهامی که در روند رشد قرار دارند، به دنبال شکار بهترین فرصت‌های بازار است تا بازدهی قابل توجهی را با ریسکی مدیریت‌شده به دست آورد.",
      factors: [
        { name: "ارزش (Value)", value: 50 },
        { name: "مومنتوم (Momentum)", value: 50 },
        { name: "ریسک‌کم (Low Volatility)", value: 50 },
      ],
      final_cta: "اگر به دنبال بهترین بازده تعدیل‌شده بر اساس ریسک و یک رشد هوشمندانه هستید، این مسیر شماست.",
      color: "hsl(210, 50%, 55%)",
    },
    {
      id: "aggressive",
      icon: "🦅",
      name: "شاهین تیزبین",
      title: "استراتژی تهاجمی",
      tagline: "اوج‌گیری سریع، برای کسانی که آسمان را می‌خواهند.",
      story: "شاهین با دید تیز خود، از ارتفاع بالا شکارش را شناسایی و با سرعتی بی‌نظیر به آن حمله می‌کند. این استراتژی تهاجمی نیز با تمرکز بر قوی‌ترین روندهای بازار، به دنبال کسب حداکثر بازده در کوتاه‌ترین زمان ممکن است.",
      factors: [
        { name: "ارزش (Value)", value: 20 },
        { name: "مومنتوم (Momentum)", value: 90 },
        { name: "ریسک‌کم (Low Volatility)", value: 10 },
      ],
      final_cta: "اگر تحمل ریسک بالایی دارید و هدف شما کسب حداکثر بازده ممکن است، با این استراتژی اوج بگیرید.",
      color: "hsl(350, 65%, 55%)",
    },
  ];

  const handleSelectStrategy = (id: string) => {
    setSelectedStrategy(id);
  };

  useEffect(() => {
    if (selectedStrategy && buttonRef.current) {
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300); // Wait for button animation
    }
  }, [selectedStrategy]);

  const handleMouseEnter = (id: string, index: number) => {
    setHoveredStrategy(id);
    const cardElement = cardRefs.current[index];
    if (cardElement) {
        setTimeout(() => {
            const rect = cardElement.getBoundingClientRect();
            if (rect.bottom > window.innerHeight - 20) {
                 window.scrollBy({ top: rect.bottom - window.innerHeight + 20, behavior: 'smooth' });
            }
        }, 300); // Wait for animation to start
    }
  };

  const handleSubmit = () => {
    if (selectedStrategy) {
      router.push(`/results?strategy=${selectedStrategy}`);
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {strategies.map((strategy, index) => (
          <div
            key={strategy.id}
            ref={el => cardRefs.current[index] = el}
            onMouseEnter={() => handleMouseEnter(strategy.id, index)}
            onMouseLeave={() => setHoveredStrategy(null)}
            className={cn(
              "transition-all duration-300",
              hoveredStrategy && hoveredStrategy !== strategy.id ? "blur-sm scale-95 opacity-70" : ""
            )}
          >
            <StrategyCard
              strategy={strategy}
              isSelected={selectedStrategy === strategy.id}
              onSelect={handleSelectStrategy}
              isHovered={hoveredStrategy === strategy.id}
            />
          </div>
        ))}
      </div>
      
      <AnimatePresence>
        {selectedStrategy && (
          <motion.div
            ref={buttonRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-10"
          >
            <Button
              onClick={handleSubmit}
              size="lg"
              className="text-lg font-bold px-12 py-6 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              ساخت سبد شخصی من
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
