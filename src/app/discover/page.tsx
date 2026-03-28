"use client";

import Link from "next/link";
import { useState } from "react";
import {
  DEMO_RESOURCES,
  RESOURCE_TYPE_LABELS,
  RESOURCE_TYPE_COLORS,
  STATUS_COLORS,
} from "@/lib/demo-data";
import type { ResourceType, DiscoveredResource } from "@/lib/types";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const TABS: { label: string; filter: ResourceType | null }[] = [
  { label: "All", filter: null },
  { label: "Invoices", filter: "aging_invoice" },
  { label: "Tax Credits", filter: "tax_credit" },
  { label: "Credit Lines", filter: "unused_credit_line" },
  { label: "Contracts", filter: "renegotiable_contract" },
  { label: "Other", filter: "early_payment_discount" },
];

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<ResourceType | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [resources, setResources] = useState<DiscoveredResource[]>(DEMO_RESOURCES);

  const filtered = activeTab
    ? resources.filter((r) => r.resource_type === activeTab)
    : resources;

  const totalEstimated = filtered.reduce((s, r) => s + r.estimated_amount, 0);
  const inProgress = filtered.filter((r) => r.status === "in_progress").reduce((s, r) => s + r.estimated_amount, 0);
  const recovered = filtered.filter((r) => r.status === "recovered").reduce((s, r) => s + (r.recovered_amount || 0), 0);

  const tabCount = (filter: ResourceType | null) =>
    filter ? resources.filter((r) => r.resource_type === filter).length : resources.length;

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🫒</span>
          <h1 className="text-xl font-semibold text-stone-900">Elisha</h1>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="text-stone-600 hover:text-stone-900">Dashboard</Link>
          <Link href="/forecast" className="text-stone-600 hover:text-stone-900">Forecast</Link>
          <Link href="/reserves" className="text-stone-600 hover:text-stone-900">Reserves</Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Scan Summary */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Asset Discovery</h2>
            <p className="text-sm text-stone-500 mt-1">
              Last scan: 2h ago &middot; {resources.length} resources found &middot;{" "}
              {fmt(resources.reduce((s, r) => s + r.estimated_amount, 0))} total estimated
            </p>
          </div>
          <button className="bg-elisha-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-elisha-800">
            Re-scan
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                activeTab === tab.filter
                  ? "bg-elisha-700 text-white"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
              }`}
            >
              {tab.label} ({tabCount(tab.filter)})
            </button>
          ))}
        </div>

        {/* Resource Cards */}
        <div className="mt-6 space-y-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className={`bg-white rounded-lg border border-stone-200 border-l-4 ${STATUS_COLORS[r.status]}`}
            >
              <div className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${RESOURCE_TYPE_COLORS[r.resource_type]}`}>
                        {RESOURCE_TYPE_LABELS[r.resource_type]}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        r.confidence === "high" ? "bg-green-100 text-green-800" :
                        r.confidence === "medium" ? "bg-amber-100 text-amber-800" :
                        "bg-stone-100 text-stone-600"
                      }`}>
                        {r.confidence} confidence
                      </span>
                    </div>
                    <h3 className="font-semibold text-stone-900">{r.title}</h3>
                    <p className="text-sm text-stone-600 mt-1">{r.description}</p>
                  </div>
                  <p className="text-xl font-bold text-stone-900 ml-4 shrink-0">
                    {fmt(r.estimated_amount)}
                  </p>
                </div>

                {/* Action Steps (expandable) */}
                <div className="mt-3">
                  <button
                    onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                    className="text-sm text-elisha-700 hover:underline"
                  >
                    {expanded === r.id ? "Hide" : "Show"} action steps ({r.action_steps.length})
                  </button>
                  {expanded === r.id && (
                    <ol className="mt-3 space-y-2 ml-4">
                      {r.action_steps.map((step, i) => (
                        <li key={i} className="text-sm text-stone-600 flex gap-2">
                          <span className="text-elisha-600 font-semibold shrink-0">{i + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>

                {/* Status Actions */}
                <div className="mt-4 flex gap-2">
                  {r.status === "discovered" && (
                    <button
                      onClick={() =>
                        setResources((prev) =>
                          prev.map((res) =>
                            res.id === r.id ? { ...res, status: "in_progress" } : res
                          )
                        )
                      }
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100"
                    >
                      Start Recovery
                    </button>
                  )}
                  {r.status === "in_progress" && (
                    <button
                      onClick={() =>
                        setResources((prev) =>
                          prev.map((res) =>
                            res.id === r.id ? { ...res, status: "recovered", recovered_amount: res.estimated_amount } : res
                          )
                        )
                      }
                      className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100"
                    >
                      Mark Recovered
                    </button>
                  )}
                  {(r.status === "discovered" || r.status === "in_progress") && (
                    <button
                      onClick={() =>
                        setResources((prev) =>
                          prev.map((res) =>
                            res.id === r.id ? { ...res, status: "dismissed" } : res
                          )
                        )
                      }
                      className="text-xs bg-stone-50 text-stone-500 px-3 py-1.5 rounded-lg hover:bg-stone-100"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Totals Bar */}
        <div className="mt-6 bg-white rounded-lg border border-stone-200 p-4 flex items-center justify-between text-sm">
          <span className="text-stone-600">
            Total Discoverable: <strong className="text-stone-900">{fmt(totalEstimated)}</strong>
          </span>
          <span className="text-stone-600">
            In Progress: <strong className="text-blue-600">{fmt(inProgress)}</strong>
          </span>
          <span className="text-stone-600">
            Recovered: <strong className="text-green-600">{fmt(recovered)}</strong>
          </span>
        </div>
      </main>
    </div>
  );
}
