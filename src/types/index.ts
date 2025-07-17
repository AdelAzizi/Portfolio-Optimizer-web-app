export interface LocalizedString {
  fa: string;
  en: string;
}

export interface Factor {
  name: LocalizedString; // نام فاکتور (فارسی و انگلیسی)
  value: number; // مقدار فاکتور (درصد)
}

export interface StrategyInfo {
  id: 'defensive' | 'balanced' | 'aggressive';
  name: LocalizedString;
  icon: string; // مسیر فایل تصویر حیوان
  tagline: LocalizedString;
  story: LocalizedString;
  factors: Factor[]; // آرایه‌ای از فاکتورها
  final_cta: LocalizedString;
  // می‌توانید فیلدهای theme و color را نیز اضافه کنید اگر از JSON می‌آیند
  color?: string; // رنگ اصلی مرتبط با استراتژی
  theme?: { // بر اساس blueprint.md
    primaryColor: string;
    secondaryColor: string;
    backgroundImage?: string;
  };
  // فیلدهای مربوط به نتایج و تست بک
  optimal_weights: Record<string, number>;
  performance_summary: {
    "Total Return": string;
    "Annualized Volatility": string;
    "Annualized Return": string;
    "Sharpe Ratio": string;
  };
  backtest_data: {
    dates: string[];
    strategy_values: number[];
    benchmark_values?: number[];
  };
  transaction_analysis: {
    annual_turnover: string;
    estimated_total_cost: string;
    rebalance_history: {
      date: string;
      sold: Record<string, string>;
      bought: Record<string, string>;
    }[];
  };
}

// اینترفیس برای ساختار کلی فایل JSON
export interface FinalResults {
  aggressive: StrategyInfo;
  balanced: StrategyInfo;
  defensive: StrategyInfo;
}
