"use client";

import Link from "next/link";
import { useState } from "react";
import {
  DEMO_DASHBOARD,
  DEMO_RESOURCES,
  DEMO_CASH_FLOW,
  DEMO_ALERTS,
  RESOURCE_TYPE_LABELS,
  RESOURCE_TYPE_COLORS,
} from "@/lib/demo-data";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function DashboardPage() {
  const [alerts, setAlerts] = useState(DEMO_ALERTS);
  const dash = DEMO_DASHBOARD;

  const weeklyData = (() => {
    const weeks: { label: string; amount: number }[] = [];
    const sorted = [...DEMO_CASH_FLOW].sort(
      (a, b) => new Date(a.entry_date).getTime() - new Date(b.entry_date).getTime()
    );
    for (let i = 0; i < sorted.length; i += 3) {
      const chunk = sorted.slice(i, i + 3);
      const total = chunk.reduce((s, e) => s + e.amount, 0);
      weeks.push({ label: chunk[0].entry_date.slice(5), amount: total });
    }
    return weeks;
  })();
  const maxAbs = Math.max(...weeklyData.map((w) => Math.abs(w.amount)));

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🫒</span>
          <h1 className="text-xl font-semibold text-stone-900">Elisha</h1>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/discover" className="text-stone-600 hover:text-stone-900">Discover</Link>
          <Link href="/forecast" className="text-stone-600 hover:text-stone-900">Forecast</Link>
          <Link href="/reserves" className="text-stone-600 hover:text-stone-900">Reserves</Link>
          <Link href="/connect" className="text-stone-600 hover:text-stone-900">Connect</Link>
          <Link href="/settings" className="text-stone-600 hover:text-stone-900">Settings</Link>
          <span className="bg-elisha-100 text-elisha-800 text-xs px-2 py-1 rounded-full font-medium">
            Demo Mode
          </span>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-stone-200 p-5">
            <p className="text-xs text-stone-500 uppercase tracking-wide">Cash Position</p>
            <p className={`mt-1 text-2xl font-bold ${dash.cash_position < 30000 ? "text-red-600" : "text-stone-900"}`}>
              {fmt(dash.cash_position)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-stone-200 p-5">
            <p className="text-xs text-stone-500 uppercase tracking-wide">Hidden Resources</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {fmt(dash.hidden_resources_total)}
            </p>
            <p className="text-xs text-stone-400">{dash.hidden_resources_count} items found</p>
          </div>
          <div className="bg-white rounded-lg border border-stone-200 p-5">
            <p className="text-xs text-stone-500 uppercase tracking-wide">Upcoming Crises</p>
            <p className={`mt-1 text-2xl font-bold ${dash.upcoming_crises > 0 ? "text-red-600" : "text-stone-900"}`}>
              {dash.upcoming_crises}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-stone-200 p-5">
            <p className="text-xs text-stone-500 uppercase tracking-wide">Reserve Balance</p>
            <p className="mt-1 text-2xl font-bold text-stone-900">{fmt(dash.reserve_balance)}</p>
            <div className="mt-2 w-full bg-stone-200 rounded-full h-2">
              <div
                className="bg-elisha-500 rounded-full h-2"
                style={{ width: `${Math.min((dash.reserve_balance / dash.reserve_target) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-stone-400 mt-1">
              {Math.round((dash.reserve_balance / dash.reserve_target) * 100)}% of {fmt(dash.reserve_target)} target
            </p>
          </div>
        </div>

        {/* Runway Alert */}
        {dash.runway_days < 14 && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm font-medium text-red-800">
              {dash.runway_days} days of cash remaining at current burn rate.
              You have {fmt(dash.hidden_resources_total)} in discoverable resources.
            </p>
            <Link href="/discover" className="text-sm text-red-700 underline mt-1 inline-block">
              View hidden resources &rarr;
            </Link>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resource Discovery List */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-stone-200">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
              <h2 className="font-semibold text-stone-900">Discovered Resources</h2>
              <Link href="/discover" className="text-xs text-elisha-700 hover:underline">
                View all &rarr;
              </Link>
            </div>
            <div className="divide-y divide-stone-100">
              {DEMO_RESOURCES.slice(0, 5).map((r) => (
                <div key={r.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${RESOURCE_TYPE_COLORS[r.resource_type]}`}>
                      {RESOURCE_TYPE_LABELS[r.resource_type]}
                    </span>
                    <span className="text-sm text-stone-700">{r.title}</span>
                  </div>
                  <span className="font-semibold text-stone-900">{fmt(r.estimated_amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cash Flow Timeline */}
          <div className="bg-white rounded-lg border border-stone-200 p-6">
            <h2 className="font-semibold text-stone-900 mb-4">Cash Flow (12 weeks)</h2>
            <div className="flex items-end gap-1 h-40">
              {weeklyData.map((w, i) => {
                const pct = Math.abs(w.amount) / maxAbs;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div
                      className={`w-full rounded-t ${w.amount >= 0 ? "bg-green-400" : "bg-red-400"}`}
                      style={{ height: `${pct * 100}%` }}
                      title={`${w.label}: ${fmt(w.amount)}`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-stone-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="mt-6 bg-white rounded-lg border border-stone-200">
          <div className="px-6 py-4 border-b border-stone-200">
            <h2 className="font-semibold text-stone-900">Active Alerts</h2>
          </div>
          <div className="divide-y divide-stone-100">
            {alerts.filter((a) => !a.dismissed).map((alert) => (
              <div key={alert.id} className="px-6 py-4 flex gap-3">
                <div className="flex flex-col items-center pt-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      alert.severity === "critical"
                        ? "bg-red-500"
                        : alert.severity === "warning"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-900">{alert.title}</p>
                  <p className="text-sm text-stone-600 mt-1">{alert.message}</p>
                </div>
                <button
                  onClick={() =>
                    setAlerts((prev) =>
                      prev.map((a) => (a.id === alert.id ? { ...a, dismissed: true } : a))
                    )
                  }
                  className="text-xs text-stone-400 hover:text-stone-600 self-start"
                >
                  Dismiss
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Actions */}
        <div className="mt-6 bg-white rounded-lg border border-stone-200 p-6">
          <h2 className="font-semibold text-stone-900 mb-4">Priority Actions</h2>
          <ol className="space-y-3">
            <li className="flex gap-3 text-sm">
              <span className="bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <span className="text-stone-700">
                Collect $18,400 from Downtown Corp (67 days overdue). Call Sarah Chen today.
              </span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="bg-amber-100 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <span className="text-stone-700">
                Draw $35K from First National credit line to bridge April 5 payroll. Interest: $8.15/day.
              </span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <span className="text-stone-700">
                Enable auto-sweep on reserve account. At 10%, you&apos;ll reach target in 8 months.
              </span>
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
}
