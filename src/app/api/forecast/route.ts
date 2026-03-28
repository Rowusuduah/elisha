import { NextRequest, NextResponse } from "next/server";
import { DEMO_FORECASTS, DEMO_DASHBOARD } from "@/lib/demo-data";

// PRODUCTION FORECAST ALGORITHM:
// 1. Pull last 90 days of actual cash flow entries.
// 2. Calculate: avg weekly revenue, revenue trend (slope), expense baseline.
// 3. Identify recurring expenses (same amount +/- 5% to same vendor monthly).
// 4. Three scenarios: BEST (+1 std dev), LIKELY (trend), WORST (-1 std dev + surprise expense).
// 5. Crisis detection: flag if any week's balance < 0 or < 7 days of expenses.
// 6. Confidence: starts at 85% for 30d, decreases 10% per additional 30d period.

export async function GET(request: NextRequest) {
  const period = request.nextUrl.searchParams.get("period");

  let forecasts = DEMO_FORECASTS;
  if (period) {
    forecasts = forecasts.filter((f) => f.period === period);
  }

  return NextResponse.json({
    forecasts,
    current_balance: DEMO_DASHBOARD.cash_position,
    burn_rate: DEMO_DASHBOARD.monthly_burn_rate,
  });
}
