"use client";

import Link from "next/link";
import { useState } from "react";

type Tab = "account" | "billing" | "team" | "notifications";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("account");
  const [notifications, setNotifications] = useState({
    cash_crisis: true,
    resource_found: true,
    weekly_digest: true,
    sweep_alerts: true,
  });

  const tabs: { key: Tab; label: string }[] = [
    { key: "account", label: "Account" },
    { key: "billing", label: "Billing" },
    { key: "team", label: "Team" },
    { key: "notifications", label: "Notifications" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🫒</span>
          <h1 className="text-xl font-semibold text-stone-900">Elisha</h1>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="text-stone-600 hover:text-stone-900">Dashboard</Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-stone-900">Settings</h2>

        {/* Tab Navigation */}
        <div className="mt-6 flex gap-2 border-b border-stone-200">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                tab === t.key
                  ? "border-elisha-600 text-elisha-700"
                  : "border-transparent text-stone-500 hover:text-stone-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "account" && (
            <div className="bg-white rounded-lg border border-stone-200 p-6 space-y-4">
              <div>
                <label className="text-xs text-stone-500 block mb-1">Business Name</label>
                <input defaultValue="Bella's Kitchen" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Industry</label>
                <select defaultValue="restaurant" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm">
                  <option value="restaurant">Restaurant</option>
                  <option value="construction">Construction</option>
                  <option value="agency">Agency</option>
                  <option value="retail">Retail</option>
                  <option value="services">Services</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Annual Revenue</label>
                <input defaultValue="2100000" type="number" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <button className="bg-elisha-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-elisha-800">
                Save
              </button>
            </div>
          )}

          {tab === "billing" && (
            <div className="bg-white rounded-lg border border-stone-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-elisha-100 text-elisha-800 text-sm px-3 py-1 rounded-full font-medium">
                  Discovery Plan
                </span>
                <span className="text-sm text-stone-500">$149/month</span>
              </div>
              <p className="text-sm text-stone-600">
                Next billing date: April 28, 2026
              </p>
              <div className="mt-6 flex gap-3">
                <button className="bg-stone-100 text-stone-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-200">
                  Change Plan
                </button>
                <button className="text-sm text-stone-400 hover:text-red-500">
                  Cancel Subscription
                </button>
              </div>
            </div>
          )}

          {tab === "team" && (
            <div className="bg-white rounded-lg border border-stone-200">
              <div className="px-6 py-3 border-b border-stone-100 flex items-center justify-between">
                <span className="text-sm text-stone-500">1 member</span>
                <button className="bg-elisha-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-elisha-800">
                  Invite Member
                </button>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-900">Bella Torres</p>
                  <p className="text-xs text-stone-400">bella@bellaskitchen.com</p>
                </div>
                <span className="text-xs bg-elisha-100 text-elisha-800 px-2 py-0.5 rounded-full font-medium">
                  Owner
                </span>
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div className="bg-white rounded-lg border border-stone-200 p-6 space-y-4">
              {[
                { key: "cash_crisis" as const, label: "Cash crisis alerts", desc: "Critical warnings when cash position drops below safe levels" },
                { key: "resource_found" as const, label: "Resource discoveries", desc: "Notifications when new hidden resources are identified" },
                { key: "weekly_digest" as const, label: "Weekly digest", desc: "Summary of cash flow, resources, and actions every Monday" },
                { key: "sweep_alerts" as const, label: "Reserve sweep notifications", desc: "Confirmation when auto-sweep moves money to reserves" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-stone-900">{item.label}</p>
                    <p className="text-xs text-stone-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      notifications[item.key] ? "bg-elisha-600" : "bg-stone-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        notifications[item.key] ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
