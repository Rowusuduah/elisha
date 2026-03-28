import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🫒</span>
          <h1 className="text-xl font-semibold text-stone-900">Elisha</h1>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/pricing" className="text-sm text-stone-600 hover:text-stone-900">
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="text-sm bg-elisha-700 text-white px-4 py-2 rounded-lg hover:bg-elisha-800"
          >
            View Demo
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
          Before You Borrow, Discover
          <br />
          <span className="text-elisha-700">What You Already Have</span>
        </h2>
        <p className="mt-6 text-lg text-stone-600 max-w-2xl mx-auto">
          Every cash flow tool shows you the problem. Elisha finds the money you
          didn&apos;t know you had &mdash; aging invoices, unclaimed tax credits, unused
          credit lines, and renegotiable contracts.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="bg-elisha-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-elisha-800"
          >
            See the Demo
          </Link>
          <Link
            href="#how-it-works"
            className="bg-stone-100 text-stone-700 px-8 py-3 rounded-lg font-medium hover:bg-stone-200"
          >
            How It Works
          </Link>
        </div>
        <p className="mt-4 text-sm text-stone-500">
          Average discovery: $167K in hidden resources. No credit card required.
        </p>
      </section>

      {/* Problem Stats */}
      <section className="bg-white border-y border-stone-200 py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-elisha-700">82%</p>
            <p className="mt-2 text-stone-600">
              of small businesses that fail cite cash flow as the primary cause
            </p>
          </div>
          <div>
            <p className="text-4xl font-bold text-elisha-700">$167K</p>
            <p className="mt-2 text-stone-600">
              average hidden resources in a business under $5M revenue
            </p>
          </div>
          <div>
            <p className="text-4xl font-bold text-elisha-700">88%</p>
            <p className="mt-2 text-stone-600">
              of small businesses experienced cash flow disruptions in the past year
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20">
        <h3 className="text-2xl font-bold text-center text-stone-900">
          Three Steps to Find Your Hidden Resources
        </h3>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-elisha-100 rounded-full flex items-center justify-center mx-auto text-elisha-700 font-bold text-lg">
              1
            </div>
            <h4 className="mt-4 font-semibold text-stone-900">Connect</h4>
            <p className="mt-2 text-sm text-stone-600">
              Link your QuickBooks, Xero, or bank account. Two-minute setup.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-elisha-100 rounded-full flex items-center justify-center mx-auto text-elisha-700 font-bold text-lg">
              2
            </div>
            <h4 className="mt-4 font-semibold text-stone-900">Discover</h4>
            <p className="mt-2 text-sm text-stone-600">
              Our engine scans for aging invoices, unclaimed credits, unused lines,
              and renegotiable contracts.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-elisha-100 rounded-full flex items-center justify-center mx-auto text-elisha-700 font-bold text-lg">
              3
            </div>
            <h4 className="mt-4 font-semibold text-stone-900">Recover</h4>
            <p className="mt-2 text-sm text-stone-600">
              Get specific dollar amounts with step-by-step action plans. Money you
              already earned.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-stone-200 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center text-stone-900">
            What Elisha Does For Your Business
          </h3>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
              <h4 className="font-semibold text-stone-900">Asset Discovery Engine</h4>
              <p className="mt-2 text-sm text-stone-600">
                Scans your books for aging invoices, unclaimed tax credits, unused
                credit lines, renegotiable contracts, and liquidatable inventory.
                Finds money you didn&apos;t know you had.
              </p>
            </div>
            <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
              <h4 className="font-semibold text-stone-900">Cash Flow Prediction</h4>
              <p className="mt-2 text-sm text-stone-600">
                Forecasts crises 30, 60, and 90 days out with plain-English alerts.
                &ldquo;You&apos;ll be $14K short for April 5 payroll&rdquo; &mdash; not
                charts, but action plans.
              </p>
            </div>
            <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
              <h4 className="font-semibold text-stone-900">Automated Reserve Building</h4>
              <p className="mt-2 text-sm text-stone-600">
                Automatically sweeps surplus into a reserve account during good
                months. When lean months hit, you have a buffer. Joseph&apos;s wisdom,
                automated.
              </p>
            </div>
            <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
              <h4 className="font-semibold text-stone-900">Action Dashboard</h4>
              <p className="mt-2 text-sm text-stone-600">
                Every discovered resource comes with specific dollar amounts, contact
                names, and numbered action steps. Not just insights &mdash;
                instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Biblical Foundation — subtle */}
      <section className="bg-elisha-50 border-y border-elisha-100 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold text-stone-800">
            Ancient Wisdom, Modern Finance
          </h3>
          <blockquote className="mt-4 text-lg italic text-stone-700">
            &ldquo;What do you have in your house?&rdquo;
          </blockquote>
          <p className="mt-1 text-sm text-stone-500">
            &mdash; 2 Kings 4:2
          </p>
          <p className="mt-4 text-sm text-stone-600 max-w-xl mx-auto">
            The principle is 2,700 years old: before seeking outside resources,
            discover what you already have. The prophet Elisha asked this question
            to a widow facing debt. She had oil she didn&apos;t see as the solution.
            Elisha applies this principle to your business finances.
          </p>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h3 className="text-2xl font-bold text-center text-stone-900">
          Pricing That Pays For Itself
        </h3>
        <p className="mt-2 text-center text-stone-600">
          Average client discovers $167K in hidden resources. The ROI is obvious.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-stone-200 p-6 text-center">
            <h4 className="font-semibold text-stone-900">Dashboard</h4>
            <p className="mt-2 text-3xl font-bold text-stone-900">
              $49<span className="text-sm font-normal text-stone-500">/mo</span>
            </p>
            <p className="mt-2 text-sm text-stone-600">Cash flow visibility + alerts</p>
          </div>
          <div className="bg-white rounded-lg border-2 border-elisha-500 p-6 text-center relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-elisha-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              Most Popular
            </span>
            <h4 className="font-semibold text-stone-900">Discovery</h4>
            <p className="mt-2 text-3xl font-bold text-stone-900">
              $149<span className="text-sm font-normal text-stone-500">/mo</span>
            </p>
            <p className="mt-2 text-sm text-stone-600">
              Asset scanning + hidden resource identification
            </p>
          </div>
          <div className="bg-white rounded-lg border border-stone-200 p-6 text-center">
            <h4 className="font-semibold text-stone-900">Autopilot</h4>
            <p className="mt-2 text-3xl font-bold text-stone-900">
              $349<span className="text-sm font-normal text-stone-500">/mo</span>
            </p>
            <p className="mt-2 text-sm text-stone-600">
              Automated reserves + CFO-level insights
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link href="/pricing" className="text-sm text-elisha-700 hover:underline">
            See all plan details &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-white">
            Your money is already there. Let&apos;s find it.
          </h3>
          <p className="mt-4 text-stone-400">
            14-day free trial. No credit card required.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-block bg-elisha-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-elisha-600"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🫒</span>
            <span className="text-sm font-medium text-stone-700">
              Elisha &mdash; Small Business Cash Flow Discovery
            </span>
          </div>
          <p className="text-xs text-stone-400 italic">
            &ldquo;What do you have in your house?&rdquo; &mdash; 2 Kings 4:2
          </p>
        </div>
      </footer>
    </div>
  );
}
