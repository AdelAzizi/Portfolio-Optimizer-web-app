// src/ai/flows/generate-rebalancing-recommendation.ts
'use server';

/**
 * @fileOverview Generates personalized rebalancing recommendations based on real-time and historical backtesting data.
 *
 * - generateRebalancingRecommendation - A function that generates a rebalancing recommendation.
 * - GenerateRebalancingRecommendationInput - The input type for the generateRebalancingRecommendation function.
 * - GenerateRebalancingRecommendationOutput - The return type for the generateRebalancingRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRebalancingRecommendationInputSchema = z.object({
  backtestData: z.object({
    dates: z.array(z.string()).describe('Array of dates for backtesting data.'),
    strategyValues: z.array(z.number()).describe('Array of portfolio values for the strategy.'),
    benchmarkValues: z.array(z.number()).describe('Array of benchmark values.'),
  }).describe('Backtesting data including dates, strategy values, and benchmark values.'),
  nextRebalanceDate: z.string().describe('The date of the next rebalance.'),
  currentWeights: z.array(z.object({
    symbol: z.string().describe('Stock symbol'),
    weight: z.number().describe('Current weight of the stock in the portfolio'),
  })).describe('Current portfolio weights'),
  transactionAnalysis: z.object({
    annualTurnover: z.number().describe('Annual portfolio turnover'),
    estimatedTotalCost: z.number().describe('Estimated total cost of transactions'),
    rebalanceHistory: z.array(z.object({
      date: z.string().describe('Date of rebalancing'),
      sold: z.array(z.string()).describe('Stocks sold during rebalancing'),
      bought: z.array(z.string()).describe('Stocks bought during rebalancing'),
    })).describe('History of rebalancing transactions')
  }).describe('Transaction analysis data'),
});

export type GenerateRebalancingRecommendationInput = z.infer<typeof GenerateRebalancingRecommendationInputSchema>;

const GenerateRebalancingRecommendationOutputSchema = z.object({
  recommendationText: z.string().describe('A personalized recommendation for the next rebalancing period.'),
});

export type GenerateRebalancingRecommendationOutput = z.infer<typeof GenerateRebalancingRecommendationOutputSchema>;

export async function generateRebalancingRecommendation(input: GenerateRebalancingRecommendationInput): Promise<GenerateRebalancingRecommendationOutput> {
  return generateRebalancingRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRebalancingRecommendationPrompt',
  input: {schema: GenerateRebalancingRecommendationInputSchema},
  output: {schema: GenerateRebalancingRecommendationOutputSchema},
  prompt: `You are a financial advisor providing rebalancing recommendations for a portfolio.

  Based on the following backtesting data:
  Dates: {{{backtestData.dates}}}
  Strategy Values: {{{backtestData.strategyValues}}}
  Benchmark Values: {{{backtestData.benchmarkValues}}}

  The next rebalance date is: {{{nextRebalanceDate}}}.
  Current portfolio weights are: {{{currentWeights}}}
  Transaction Analysis: {{{transactionAnalysis}}}

  Provide a concise and personalized recommendation for the next rebalancing period, considering the portfolio's performance, transaction costs, and market conditions.
  The recommendation should be actionable and easy to understand for the user.
  `, // Added transaction analysis into the prompt
});

const generateRebalancingRecommendationFlow = ai.defineFlow(
  {
    name: 'generateRebalancingRecommendationFlow',
    inputSchema: GenerateRebalancingRecommendationInputSchema,
    outputSchema: GenerateRebalancingRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
