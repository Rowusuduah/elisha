"use client";

import Link from "next/link";
import { useState } from "react";
import { DEMO_RESERVE, DEMO_RESERVE_TRANSACTIONS, DEMO_DASHBOARD } from "@/lib/demo-data";
import type { Reserve, ReserveTransaction } from "@/lib/types";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function ReservesPage() {
  const [reserve, setReserve] = useState<Reserve>(DEMO_RESERVE);
  const [transactions, setTransactions] = useState<ReserveTransaction[]>(DEMO_RESERVE_TRANSACTIONS);
  const [depositAmount, setDepositAmount] = useState("");

  const pct = Math.min((reserve.balance / reserve.target_balance) * 100, 100);
  const coverageDays = reserve.balance / (DEMO_DASHBOARD.monthly_burn_rate / 30);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) return;
    const tx: ReserveTransaction = {
      id: `rt-${Date.now()}`,
      amount,
      transaction_type: "manual_deposit",
      description: "Manual deposit",
      created_at: new Date().toISOString(),
    };
    setTransactions([tx, ...transactions]);
    setReserve({ ...reserve, balance: reserve.balance + amount });
    setDepositAmount("");
  };

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
          <Link href="/forecast" className="text-stone-600 hover:text-stone-900">Forecast</Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-stone-900">Reserve Management</h2>
        <p className="text-sm text-stone-500 mt-1">
          &ldquo;Dig ditches before the water comes&rdquo; &mdash; build reserves during good months
        </p>

        {/* Reserve Status */}
        <div className="mt-6 bg-white rounded-lg border border-stone-200 p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wide">Current Balance</p>
              <p className="text-3xl font-bold text-stone-900 mt-1">{fmt(reserve.balance)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-stone-500">Target: {fmt(reserve.target_balance)}</p>
              <p className="text-xs text-stone-500">{coverageDays.toFixed(1)} days coverage</p>
            </div>
          </div>
          <div className="mt-4 w-full bg-stone-200 rounded-full h-4">
            <div
              className={`rounded-full h-4 ${pct < 25 ? "bg-red-500" : pct < 50 ? "bg-amber-500" : "bg-green-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-stone-500 mt-2">{Math.round(pct)}% of target</p>
        </div>

        {/* Auto-Sweep Config */}
        <div className="mt-6 bg-white rounded-lg border border-stone-200 p-6">
          <h3 className="font-semibold text-stone-900">Auto-Sweep Configuration</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-600">Auto-sweep enabled</span>
              <button
                onClick={() => setReserve({ ...reserve, auto_sweep_enabled: !reserve.auto_sweep_enabled })}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  reserve.auto_sweep_enabled ? "bg-elisha-600" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    reserve.auto_sweep_enabled ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-stone-500 block mb-1">Sweep when above</label>
                <input
                  type="number"
                  value={reserve.sweep_threshold}
                  onChange={(e) => setReserve({ ...reserve, sweep_threshold: Number(e.target.value) })}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Sweep percentage</label>
                <input
                  type="number"
                  value={reserve.sweep_percentage}
                  onChange={(e) => setReserve({ ...reserve, sweep_percentage: Number(e.target.value) })}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Deposit */}
        <div className="mt-6 bg-white rounded-lg border border-stone-200 p-6">
          <h3 className="font-semibold text-stone-900">Quick Deposit</h3>
          <div className="mt-4 flex gap-2">
            <input
              type="number"
              placeholder="Amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="flex-1 border border-stone-300 rounded-lg px-3 py-2 text-sm"
            />
            <button
              onClick={handleDeposit}
              className="bg-elisha-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-elisha-800"
            >
              Deposit
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-6 bg-white rounded-lg border border-stone-200">
          <div className="px-6 py-4 border-b border-stone-200">
            <h3 className="font-semibold text-stone-900">Transaction History</h3>
          </div>
          <div className="divide-y divide-stone-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="px-6 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-700">{tx.description}</p>
                  <p className="text-xs text-stone-400">
                    {new Date(tx.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`font-semibold text-sm ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                  {tx.amount > 0 ? "+" : ""}{fmt(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Insight */}
        <div className="mt-6 bg-elisha-50 border border-elisha-100 rounded-lg p-6">
          <p className="text-sm text-stone-700">
            At your current revenue, enabling auto-sweep at {reserve.sweep_percentage}%
            would build your reserve to target in approximately{" "}
            <strong>
              {Math.ceil((reserve.target_balance - reserve.balance) / (DEMO_DASHBOARD.monthly_burn_rate * reserve.sweep_percentage / 100))} months
            </strong>.
          </p>
        </div>
      </main>
    </div>
  );
}
