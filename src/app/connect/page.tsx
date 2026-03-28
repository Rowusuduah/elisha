"use client";

import Link from "next/link";
import { useState } from "react";
import { DEMO_CONNECTED_ACCOUNTS } from "@/lib/demo-data";
import type { ConnectedAccount } from "@/lib/types";

const INTEGRATIONS = [
  {
    provider: "quickbooks" as const,
    name: "QuickBooks Online",
    icon: "QB",
    description: "Sync invoices, expenses, and chart of accounts",
    color: "bg-green-600",
  },
  {
    provider: "xero" as const,
    name: "Xero",
    icon: "XR",
    description: "Import transactions and bill history",
    color: "bg-blue-600",
  },
  {
    provider: "freshbooks" as const,
    name: "FreshBooks",
    icon: "FB",
    description: "Pull invoices and client payment history",
    color: "bg-blue-500",
  },
  {
    provider: "plaid" as const,
    name: "Bank Accounts",
    icon: "PL",
    description: "Connect checking and savings for real-time balances via Plaid",
    color: "bg-stone-800",
  },
];

export default function ConnectPage() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>(DEMO_CONNECTED_ACCOUNTS);
  const [toast, setToast] = useState<string | null>(null);

  const connectedProviders = new Set(accounts.map((a) => a.provider));

  const handleConnect = (provider: string) => {
    setToast(`${provider} integration coming soon. Demo data is pre-loaded.`);
    setTimeout(() => setToast(null), 3000);
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
          <Link href="/settings" className="text-stone-600 hover:text-stone-900">Settings</Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-stone-900">Integrations</h2>
        <p className="text-sm text-stone-500 mt-1">
          Connect your accounting software and bank accounts to power the discovery engine.
        </p>

        {toast && (
          <div className="mt-4 bg-elisha-50 border border-elisha-200 rounded-lg p-3 text-sm text-elisha-800">
            {toast}
          </div>
        )}

        {/* Connected Accounts */}
        {accounts.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-stone-900 mb-3">Connected</h3>
            <div className="space-y-3">
              {accounts.map((a) => {
                const info = INTEGRATIONS.find((i) => i.provider === a.provider);
                return (
                  <div key={a.id} className="bg-white rounded-lg border border-stone-200 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-10 h-10 rounded-lg ${info?.color || "bg-stone-600"} text-white flex items-center justify-center text-xs font-bold`}>
                        {info?.icon}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-stone-900">{info?.name}</p>
                        <p className="text-xs text-stone-400">
                          Last synced: {a.last_synced_at ? new Date(a.last_synced_at).toLocaleString() : "Never"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                        {a.status}
                      </span>
                      <button
                        onClick={() => setAccounts(accounts.filter((acc) => acc.id !== a.id))}
                        className="text-xs text-stone-400 hover:text-red-500"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Available Integrations */}
        <div className="mt-8">
          <h3 className="font-semibold text-stone-900 mb-3">Available Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTEGRATIONS.filter((i) => !connectedProviders.has(i.provider)).map((integration) => (
              <div key={integration.provider} className="bg-white rounded-lg border border-stone-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-10 h-10 rounded-lg ${integration.color} text-white flex items-center justify-center text-xs font-bold`}>
                    {integration.icon}
                  </span>
                  <h4 className="font-medium text-stone-900">{integration.name}</h4>
                </div>
                <p className="text-sm text-stone-600 mb-4">{integration.description}</p>
                <button
                  onClick={() => handleConnect(integration.name)}
                  className="w-full bg-stone-100 text-stone-700 py-2 rounded-lg text-sm font-medium hover:bg-stone-200"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sync Status */}
        <div className="mt-8 bg-white rounded-lg border border-stone-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-stone-900">Sync Status</p>
              <p className="text-xs text-stone-400 mt-1">
                Last full sync: March 28, 2026 at 5:30 AM
              </p>
            </div>
            <button className="bg-elisha-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-elisha-800">
              Sync Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
