export type Strategy = "aggressive" | "balanced" | "defensive";

export interface StrategyApiResponse {
  strategy_profile: {
    name: string;
    icon: string;
    description: string;
  };
  performance_summary: {
    expected_annual_return: number;
    annual_volatility: number;
    sharpe_ratio: number;
  };
  optimal_weights: {
    symbol: string;
    weight: number;
  }[];
  transaction_analysis: {
    annual_turnover: number;
    estimated_total_cost: number;
    rebalance_history: {
      date: string;
      sold: string[];
      bought: string[];
    }[];
  };
  backtest_data: {
    dates: string[];
    strategy_values: number[];
    benchmark_values: number[];
  };
  next_steps: {
    next_rebalance_date: string;
    recommendation_text: string;
  };
}
