import Link from "next/link";
import { PLANS } from "@/lib/stripe";

const PLAN_KEYS = ["dashboard", "discovery", "autopilot"] as const;

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🫒</span>
          <h1 className="text-xl font-semibold text-stone-900">Elisha</h1>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-stone-600 hover:text-stone-900">
            Demo
          </Link>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-stone-900">Pricing That Pays For Itself</h2>
        <p className="mt-3 text-stone-600">
          Average client discovers $167K in hidden resources. The ROI is obvious.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLAN_KEYS.map((key) => {
            const plan = PLANS[key];
            const isPopular = key === "discovery";
            return (
              <div
                key={key}
                className={`bg-white rounded-lg p-8 relative ${
                  isPopular
                    ? "border-2 border-elisha-500 shadow-lg"
                    : "border border-stone-200"
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-elisha-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-stone-900">{plan.name}</h3>
                <p className="mt-4 text-4xl font-bold text-stone-900">
                  ${plan.price / 100}
                  <span className="text-sm font-normal text-stone-500">/mo</span>
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-stone-600">
                      <span className="text-elisha-600 mt-0.5">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full py-3 rounded-lg font-medium text-sm ${
                    isPopular
                      ? "bg-elisha-700 text-white hover:bg-elisha-800"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Start Free Trial
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Success Fee */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-elisha-50 border border-elisha-100 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-stone-900">Recovery Fee</h3>
          <p className="mt-2 text-3xl font-bold text-elisha-700">10&ndash;15%</p>
          <p className="mt-1 text-sm text-stone-500">of money we help you find</p>
          <p className="mt-4 text-sm text-stone-600">
            No recovery, no fee. We only win when you win. Applied to recovered tax
            credits, accelerated collections, and renegotiated savings.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h3 className="text-xl font-bold text-stone-900 text-center">
          Frequently Asked Questions
        </h3>
        <div className="mt-8 space-y-6">
          {[
            {
              q: 'What counts as a "hidden resource"?',
              a: "Aging invoices over 30 days, unclaimed tax credits (ERC, WOTC, R&D), unused approved credit lines, vendor contracts above market rate, early payment discounts you're not capturing, and duplicate payments.",
            },
            {
              q: "How does the success fee work?",
              a: "We charge 10-15% only on money we help you actually recover. If we identify $42K in tax credits and your CPA files for them, our fee applies when the credit is received. No recovery, no fee.",
            },
            {
              q: "What integrations do you support?",
              a: "QuickBooks Online, Xero, and FreshBooks for accounting data. Bank accounts via Plaid for real-time balances. More integrations coming soon.",
            },
            {
              q: "Is my financial data secure?",
              a: "All data is encrypted in transit and at rest. We use Supabase with Row Level Security for data isolation. We never store raw banking credentials — all connections use OAuth tokens through Plaid.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Yes. No contracts, no cancellation fees. All plans include a 14-day free trial.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h4 className="font-medium text-stone-900">{faq.q}</h4>
              <p className="mt-1 text-sm text-stone-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
