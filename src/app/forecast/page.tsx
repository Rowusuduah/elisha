"use client";

import Link from "next/link";
import { useState } from "react";
import { DEMO_FORECASTS, DEMO_DASHBOARD } from "@/lib/demo-data";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function ForecastPage() {
  const [period, setPeriod] = useState<"30" | "60" | "90">("30");
  const [showAssumptions, setShowAssumptions] = useState(false);
  const forecasts = DEMO_FORECASTS.filter((f) => f.period === period);

  const scenarioColors = { best: "border-green-300 bg-green-50", likely: "border-amber-300 bg-amber-50", worst: "border-red-300 bg-red-50" };
  const balanceColors = (n: number) => (n >= 0 ? "text-green-600" : "text-red-600");

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🫒</span>
          <h1 className="text-xl font-semibold text-stone-900">Elisha</h1>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="text-stone-600 hover:text-stone-900">Dashboard</Link>
          <Link href="/discover" className="text-stone-600 hover:text-stone-900">Discover</Link>
          <Link href="/reserves" className="text-stone-600 hover:text-stone-900">Reserves</Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-stone-900">Cash Flow Forecast</h2>
        <p className="text-sm text-stone-500 mt-1">
          Current balance: {fmt(DEMO_DASHBOARD.cash_position)} &middot;
          Monthly burn: {fmt(DEMO_DASHBOARD.monthly_burn_rate)}
        </p>

        {/* Period Selector */}
        <div className="mt-6 flex gap-2">
          {(["30", "60", "90"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                period === p ? "bg-elisha-700 text-white" : "bg-white text-stone-600 border border-stone-200"
              }`}
            >
              {p} Days
            </button>
          ))}
        </div>

        {/* Scenario Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {forecasts.map((f) => (
            <div
              key={f.scenario}
              className={`rounded-lg border-2 p-6 ${scenarioColors[f.scenario]}`}
            >
              <p className="text-xs text-stone-500 uppercase tracking-wide font-medium">
                {f.scenario} Case
              </p>
              <p className={`mt-2 text-3xl font-bold ${balanceColors(f.predicted_balance)}`}>
                {fmt(f.predicted_balance)}
              </p>
              <div className="mt-4 space-y-1 text-sm text-stone-600">
                <p>Inflow: {fmt(f.predicted_inflow)}</p>
                <p>Outflow: {fmt(f.predicted_outflow)}</p>
                <p>Confidence: {Math.round(f.confidence * 100)}%</p>
              </div>
              {f.crisis_flag && (
                <div className="mt-4 bg-red-100 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800 font-medium">{f.crisis_description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Projection Timeline */}
        <div className="mt-8 bg-white rounded-lg border border-stone-200 p-6">
          <h3 className="font-semibold text-stone-900 mb-4">Projected Balance Timeline</h3>
          <div className="flex items-end gap-2 h-32">
            {(["30", "60", "90"] as const).map((p) => {
              const likely = DEMO_FORECASTS.find((f) => f.period === p && f.scenario === "likely");
              if (!likely) return null;
              const maxBal = 50000;
              const pct = Math.min(Math.abs(likely.predicted_balance) / maxBal, 1);
              const isNeg = likely.predicted_balance < 0;
              return (
                <div key={p} className="flex-1 flex flex-col items-center justify-end h-full">
                  <p className={`text-xs font-medium mb-1 ${isNeg ? "text-red-600" : "text-green-600"}`}>
                    {fmt(likely.predicted_balance)}
                  </p>
                  <div
                    className={`w-full rounded-t ${isNeg ? "bg-red-400" : "bg-green-400"}`}
                    style={{ height: `${pct * 100}%` }}
                  />
                  <p className="text-xs text-stone-500 mt-2">{p}d</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Crisis Summary */}
        {forecasts.some((f) => f.crisis_flag) && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="font-semibold text-red-800">Crisis Alerts</h3>
            <ul className="mt-3 space-y-2">
              {forecasts.filter((f) => f.crisis_flag).map((f) => (
                <li key={f.scenario} className="flex gap-2 text-sm text-red-700">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span><strong className="capitalize">{f.scenario}:</strong> {f.crisis_description}</span>
                </li>
              ))}
            </ul>
            <Link href="/discover" className="text-sm text-red-700 underline mt-3 inline-block">
              View discoverable resources &rarr;
            </Link>
          </div>
        )}

        {/* Assumptions */}
        <div className="mt-6">
          <button
            onClick={() => setShowAssumptions(!showAssumptions)}
            className="text-sm text-stone-500 hover:text-stone-700"
          >
            {showAssumptions ? "Hide" : "Show"} forecast assumptions
          </button>
          {showAssumptions && (
            <div className="mt-3 bg-white rounded-lg border border-stone-200 p-6 text-sm text-stone-600 space-y-2">
              <p>Revenue trend: -7% month-over-month (declining since January)</p>
              <p>Recurring expenses: ~$86K/month (payroll, rent, supplies, utilities, insurance)</p>
              <p>Outstanding AR: $47,350 (3 invoices past 30 days)</p>
              <p>Upcoming obligations: April 5 payroll ($38,000), April rent ($8,500)</p>
              <p>No projected one-time revenue events</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
