import { NextResponse } from "next/server";
import type { Strategy, StrategyApiResponse } from "@/types";

const mockData: Record<Strategy, StrategyApiResponse> = {
  aggressive: {
    strategy_profile: {
      name: "شاهین تیزبین",
      icon: "🦅",
      description: "این استراتژی تهاجمی با تمرکز بر قوی‌ترین روندهای بازار، برای سرمایه‌گذارانی طراحی شده که به دنبال بازدهی حداکثری و پذیرای ریسک بالاتر هستند.",
    },
    performance_summary: {
      expected_annual_return: 0.755,
      annual_volatility: 0.167,
      sharpe_ratio: 2.96,
    },
    optimal_weights: [
      { symbol: "حپرتو", weight: 0.15 }, { symbol: "سآبیک", weight: 0.15 },
      { symbol: "تپسی", weight: 0.148 }, { symbol: "فزر", weight: 0.12 },
      { symbol: "آپ", weight: 0.12 }, { symbol: "ثامان", weight: 0.112 },
      { symbol: "سغدیر", weight: 0.10 }, { symbol: "شستا", weight: 0.10 },
    ],
    transaction_analysis: {
      annual_turnover: 0.88, estimated_total_cost: 5500000,
      rebalance_history: [
        { date: "1404-01-12", sold: ["فزر", "سغدیر"], bought: ["آپ", "ثامان"] },
        { date: "1403-10-11", sold: ["خودرو", "خساپا"], bought: ["حپرتو", "سآبیک"] },
        { date: "1403-07-09", sold: ["فملی", "فولاد"], bought: ["تپسی", "فزر"] },
      ],
    },
    backtest_data: {
      dates: Array.from({ length: 12 }, (_, i) => `1402-${String(i + 1).padStart(2, '0')}-15`),
      strategy_values: [100, 105, 112, 110, 120, 130, 145, 140, 155, 160, 170, 175.5],
      benchmark_values: [100, 102, 105, 104, 108, 112, 118, 115, 122, 125, 130, 132],
    },
    next_steps: {
      next_rebalance_date: "1404-07-20",
      recommendation_text: "بر اساس تحلیل ما، این سبد برای دوره ۳ ماهه آینده بهینه است. پیشنهاد می‌شود جهت حفظ بازدهی بالا، در تاریخ مشخص شده سبد خود را مجددا تنظیم نمایید.",
    },
  },
  balanced: {
    strategy_profile: {
      name: "گرگ باتجربه",
      icon: "🐺",
      description: "این استراتژی متعادل با هدف کسب بازدهی معقول و مدیریت ریسک، برای سرمایه‌گذارانی مناسب است که به دنبال تعادل بین رشد و ثبات هستند.",
    },
    performance_summary: {
      expected_annual_return: 0.45,
      annual_volatility: 0.11,
      sharpe_ratio: 2.25,
    },
    optimal_weights: [
        { "symbol": "فولاد", "weight": 0.20 }, { "symbol": "فملی", "weight": 0.20 },
        { "symbol": "شپنا", "weight": 0.15 }, { "symbol": "وبملت", "weight": 0.15 },
        { "symbol": "وغدیر", "weight": 0.10 }, { "symbol": "اخابر", "weight": 0.10 },
        { "symbol": "حکشتی", "weight": 0.10 },
    ],
    transaction_analysis: {
      annual_turnover: 0.45, estimated_total_cost: 2800000,
      rebalance_history: [
        { date: "1404-01-15", sold: ["کگل"], bought: ["وغدیر"] },
        { date: "1403-10-15", sold: ["شتران"], bought: ["اخابر"] },
        { date: "1403-07-15", sold: [], bought: ["حکشتی"] },
      ],
    },
    backtest_data: {
      dates: Array.from({ length: 12 }, (_, i) => `1402-${String(i + 1).padStart(2, '0')}-15`),
      strategy_values: [100, 103, 106, 108, 111, 115, 119, 122, 125, 129, 133, 138],
      benchmark_values: [100, 102, 105, 104, 108, 112, 118, 115, 122, 125, 130, 132],
    },
    next_steps: {
      next_rebalance_date: "1404-08-15",
      recommendation_text: "سبد متعادل شما عملکرد خوبی داشته است. توصیه می‌شود برای حفظ تعادل ریسک و بازده، به ترکیب فعلی پایبند باشید.",
    },
  },
  defensive: {
    strategy_profile: {
      name: "لاک‌پشت دانا",
      icon: "🐢",
      description: "این استراتژی محافظه‌کارانه با اولویت حفظ ارزش دارایی، برای سرمایه‌گذارانی ایده‌آل است که ثبات را بر بازدهی‌های هیجانی ترجیح می‌دهند.",
    },
    performance_summary: {
      expected_annual_return: 0.25,
      annual_volatility: 0.07,
      sharpe_ratio: 1.89,
    },
    optimal_weights: [
        { "symbol": "وبصادر", "weight": 0.25 }, { "symbol": "وپاسار", "weight": 0.25 },
        { "symbol": "همراه", "weight": 0.20 }, { "symbol": "رمپنا", "weight": 0.15 },
        { "symbol": "پارسان", "weight": 0.15 },
    ],
    transaction_analysis: {
      annual_turnover: 0.15, estimated_total_cost: 1100000,
      rebalance_history: [
        { date: "1404-02-20", sold: ["فارس"], bought: ["پارسان"] },
        { date: "1403-11-20", sold: [], bought: [] },
      ],
    },
    backtest_data: {
      dates: Array.from({ length: 12 }, (_, i) => `1402-${String(i + 1).padStart(2, '0')}-15`),
      strategy_values: [100, 101, 103, 104, 106, 108, 110, 112, 114, 116, 118, 121],
      benchmark_values: [100, 102, 105, 104, 108, 112, 118, 115, 122, 125, 130, 132],
    },
    next_steps: {
      next_rebalance_date: "1404-09-01",
      recommendation_text: "سبد محافظه‌کارانه شما در مسیر درستی قرار دارد. تغییرات جزئی برای بهینه‌سازی بیشتر در تاریخ بعدی پیشنهاد می‌شود.",
    },
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const strategy_name = body.strategy_name as Strategy;

    if (!strategy_name || !mockData[strategy_name]) {
      return NextResponse.json(
        { detail: "Invalid strategy_name provided." },
        { status: 400 }
      );
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json(mockData[strategy_name]);
  } catch (error) {
    return NextResponse.json(
      { detail: "Invalid JSON body." },
      { status: 400 }
    );
  }
}
