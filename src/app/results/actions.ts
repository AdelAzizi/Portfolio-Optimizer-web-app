"use server";

import { generateRebalancingRecommendation } from '@/ai/flows/generate-rebalancing-recommendation';
import type { StrategyApiResponse } from '@/types';

export async function getDynamicRecommendation(
  data: StrategyApiResponse
): Promise<string> {
  if (
    !data ||
    !data.backtest_data ||
    !data.next_steps ||
    !data.optimal_weights ||
    !data.transaction_analysis
  ) {
    return "اطلاعات ورودی برای تولید پیشنهاد کامل نیست.";
  }

  try {
    const recommendationInput = {
      backtestData: {
        dates: data.backtest_data.dates,
        strategyValues: data.backtest_data.strategy_values,
        benchmarkValues: data.backtest_data.benchmark_values,
      },
      nextRebalanceDate: data.next_steps.next_rebalance_date,
      currentWeights: data.optimal_weights.map(w => ({ symbol: w.symbol, weight: w.weight })),
      transactionAnalysis: {
        annualTurnover: data.transaction_analysis.annual_turnover,
        estimatedTotalCost: data.transaction_analysis.estimated_total_cost,
        rebalanceHistory: data.transaction_analysis.rebalance_history,
      },
    };

    const result = await generateRebalancingRecommendation(recommendationInput);
    return result.recommendationText;
  } catch (error) {
    console.error('Error generating recommendation:', error);
    // Return the static text from the mock as a fallback
    return data.next_steps.recommendation_text;
  }
}


export async function subscribeToNotifications(prevState: any, formData: FormData) {
  const email = formData.get("email");
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return { message: 'لطفا یک ایمیل معتبر وارد کنید.', type: 'error' };
  }
  
  // In a real app, you'd save this to a database.
  // For now, we'll just log it to the console.
  console.log(`New subscription from: ${email}`);
  
  return { message: 'از ثبت‌نام شما متشکریم!', type: 'success' };
}
