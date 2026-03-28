import type {
  DiscoveredResource,
  CashFlowEntry,
  ForecastPoint,
  Reserve,
  ReserveTransaction,
  Alert,
  DashboardSummary,
  ConnectedAccount,
} from "./types";

// ══════════════════════════════════════════════════════════
// BELLA'S KITCHEN — Restaurant, $2.1M revenue, 22 employees
// "Can't make payroll Friday" — the Hair on Fire customer
// ══════════════════════════════════════════════════════════

export const DEMO_DASHBOARD: DashboardSummary = {
  cash_position: 23847.5,
  hidden_resources_total: 127350,
  hidden_resources_count: 8,
  upcoming_crises: 2,
  reserve_balance: 8200,
  reserve_target: 45000,
  monthly_burn_rate: 168000,
  runway_days: 4.3,
};

export const DEMO_RESOURCES: DiscoveredResource[] = [
  {
    id: "res-1",
    resource_type: "aging_invoice",
    title: "Catering invoice — Downtown Corp Events",
    description:
      "Invoice #1847 for corporate catering event. 67 days outstanding. Contact: Sarah Chen, AP dept.",
    estimated_amount: 18400,
    confidence: "high",
    status: "discovered",
    action_steps: [
      "Call Sarah Chen at Downtown Corp (555-0142) — she approved the PO",
      "Send formal 60-day past due notice via email with original invoice attached",
      "Offer 5% early settlement discount if paid within 7 days",
      "If no response in 48hrs, escalate to their CFO Mark Torres",
    ],
    recovered_amount: null,
    discovered_at: "2026-03-26T10:00:00Z",
  },
  {
    id: "res-2",
    resource_type: "aging_invoice",
    title: "Weekly meal prep — Greenfield School District",
    description:
      "3 invoices totaling $14,200. 45-52 days outstanding. District pays in batches — next batch date is April 5.",
    estimated_amount: 14200,
    confidence: "high",
    status: "in_progress",
    action_steps: [
      "Confirm invoices are in the April 5 payment batch",
      "Contact Maria Lopez in AP (555-0198) to verify",
      "Request partial payment on oldest invoice now",
    ],
    recovered_amount: null,
    discovered_at: "2026-03-24T14:00:00Z",
  },
  {
    id: "res-3",
    resource_type: "aging_invoice",
    title: "Private dining — Henderson wedding reception",
    description:
      "Final balance on wedding reception catering. 38 days outstanding.",
    estimated_amount: 14750,
    confidence: "medium",
    status: "discovered",
    action_steps: [
      "Send friendly reminder to henderson.james@email.com",
      "Include photos from event as goodwill gesture",
      "Offer payment plan: 50% now, 50% in 30 days",
    ],
    recovered_amount: null,
    discovered_at: "2026-03-25T09:00:00Z",
  },
  {
    id: "res-4",
    resource_type: "tax_credit",
    title: "Employee Retention Credit (ERC) — Q3-Q4 2024",
    description:
      "Your payroll records show 14 qualifying employees during the eligible period. Many restaurants miss this.",
    estimated_amount: 42000,
    confidence: "medium",
    status: "discovered",
    action_steps: [
      "Gather Form 941 filings for Q3-Q4 2024",
      "Confirm employee count with payroll provider",
      "File amended 941-X forms (your CPA can do this)",
      "Expected processing time: 6-9 months",
    ],
    recovered_amount: null,
    discovered_at: "2026-03-27T08:00:00Z",
  },
  {
    id: "res-5",
    resource_type: "tax_credit",
    title: "Work Opportunity Tax Credit (WOTC) — 3 qualifying hires",
    description:
      "3 employees hired in 2025 may qualify based on zip code and prior employment status.",
    estimated_amount: 7200,
    confidence: "low",
    status: "discovered",
    action_steps: [
      "Verify employee eligibility with HR records",
      "File IRS Form 8850 for each qualifying employee",
      "Coordinate with CPA for 2025 amended filing",
    ],
    recovered_amount: null,
    discovered_at: "2026-03-27T08:30:00Z",
  },
  {
    id: "res-6",
    resource_type: "unused_credit_line",
    title: "Business line of credit — First National Bank",
    description:
      "Approved $75K line of credit with $62K unused. Current rate: 8.5%. Could bridge the payroll gap at $23/day interest.",
    estimated_amount: 62000,
    confidence: "high",
    status: "discovered",
    action_steps: [
      "Log into First National business portal",
      "Draw $35K to cover next payroll cycle (April 5)",
      "Set up auto-repayment from incoming AR",
      "Interest cost: ~$8.15/day on $35K draw",
    ],
    recovered_amount: null,
    discovered_at: "2026-03-26T11:00:00Z",
  },
  {
    id: "res-7",
    resource_type: "renegotiable_contract",
    title: "Sysco food supply contract — 15% above market",
    description:
      "Your current contract locked in during supply chain crisis. Market prices have dropped. Renegotiation could save $2,800/month.",
    estimated_amount: 8400,
    confidence: "medium",
    status: "discovered",
    action_steps: [
      "Pull current contract terms and pricing schedule",
      "Get competitive quotes from US Foods and local distributor",
      "Schedule call with Sysco account rep — mention competitive bids",
      "Target: 10-15% reduction on top 20 SKUs",
    ],
    recovered_amount: null,
    discovered_at: "2026-03-25T16:00:00Z",
  },
  {
    id: "res-8",
    resource_type: "early_payment_discount",
    title: "2/10 net 30 discount — 4 vendor invoices",
    description:
      "4 vendors offer 2% discount for payment within 10 days. Total invoices: $18,500. Potential savings if you can pay early.",
    estimated_amount: 370,
    confidence: "high",
    status: "discovered",
    action_steps: [
      "Review which of 4 invoices are still within the 10-day window",
      "Prioritize largest invoice first (Martinez Produce: $7,200)",
      "Use credit line draw to capture discounts — net savings after interest",
    ],
    recovered_amount: null,
    discovered_at: "2026-03-27T12:00:00Z",
  },
];

export const DEMO_CASH_FLOW: CashFlowEntry[] = [
  { id: "cf-1", entry_date: "2026-01-05", amount: 42300, category: "revenue", description: "Week 1 January sales", source: "quickbooks", is_recurring: false },
  { id: "cf-2", entry_date: "2026-01-12", amount: 38700, category: "revenue", description: "Week 2 January sales", source: "quickbooks", is_recurring: false },
  { id: "cf-3", entry_date: "2026-01-15", amount: -38000, category: "payroll", description: "January 15 payroll", source: "quickbooks", is_recurring: true },
  { id: "cf-4", entry_date: "2026-01-19", amount: 41200, category: "revenue", description: "Week 3 January sales", source: "quickbooks", is_recurring: false },
  { id: "cf-5", entry_date: "2026-01-26", amount: 39800, category: "revenue", description: "Week 4 January sales", source: "quickbooks", is_recurring: false },
  { id: "cf-6", entry_date: "2026-01-31", amount: -38000, category: "payroll", description: "January 31 payroll", source: "quickbooks", is_recurring: true },
  { id: "cf-7", entry_date: "2026-01-31", amount: -8500, category: "rent", description: "February rent", source: "quickbooks", is_recurring: true },
  { id: "cf-8", entry_date: "2026-02-02", amount: 36100, category: "revenue", description: "Week 1 February sales", source: "quickbooks", is_recurring: false },
  { id: "cf-9", entry_date: "2026-02-09", amount: 33400, category: "revenue", description: "Week 2 February sales (slow)", source: "quickbooks", is_recurring: false },
  { id: "cf-10", entry_date: "2026-02-15", amount: -38000, category: "payroll", description: "February 15 payroll", source: "quickbooks", is_recurring: true },
  { id: "cf-11", entry_date: "2026-02-16", amount: 34800, category: "revenue", description: "Week 3 February sales", source: "quickbooks", is_recurring: false },
  { id: "cf-12", entry_date: "2026-02-23", amount: 31200, category: "revenue", description: "Week 4 February sales", source: "quickbooks", is_recurring: false },
  { id: "cf-13", entry_date: "2026-02-28", amount: -38000, category: "payroll", description: "February 28 payroll", source: "quickbooks", is_recurring: true },
  { id: "cf-14", entry_date: "2026-02-28", amount: -8500, category: "rent", description: "March rent", source: "quickbooks", is_recurring: true },
  { id: "cf-15", entry_date: "2026-02-28", amount: -22000, category: "supplies", description: "Sysco monthly food order", source: "quickbooks", is_recurring: true },
  { id: "cf-16", entry_date: "2026-03-02", amount: 29400, category: "revenue", description: "Week 1 March sales (declining)", source: "quickbooks", is_recurring: false },
  { id: "cf-17", entry_date: "2026-03-09", amount: 27800, category: "revenue", description: "Week 2 March sales", source: "quickbooks", is_recurring: false },
  { id: "cf-18", entry_date: "2026-03-15", amount: -38000, category: "payroll", description: "March 15 payroll", source: "quickbooks", is_recurring: true },
  { id: "cf-19", entry_date: "2026-03-16", amount: 28100, category: "revenue", description: "Week 3 March sales", source: "quickbooks", is_recurring: false },
  { id: "cf-20", entry_date: "2026-03-23", amount: 26300, category: "revenue", description: "Week 4 March sales", source: "quickbooks", is_recurring: false },
  { id: "cf-21", entry_date: "2026-03-25", amount: -3200, category: "utilities", description: "Gas + electric", source: "quickbooks", is_recurring: true },
  { id: "cf-22", entry_date: "2026-03-25", amount: -1800, category: "insurance", description: "Business insurance premium", source: "quickbooks", is_recurring: true },
  { id: "cf-23", entry_date: "2026-03-28", amount: -22000, category: "supplies", description: "Sysco monthly food order", source: "quickbooks", is_recurring: true },
];

export const DEMO_FORECASTS: ForecastPoint[] = [
  { forecast_date: "2026-04-05", period: "30", scenario: "worst", predicted_balance: -14200, predicted_inflow: 24000, predicted_outflow: 62047, confidence: 0.8, crisis_flag: true, crisis_description: "Payroll shortfall: Cannot cover April 5 payroll without action. Gap: ~$14,200." },
  { forecast_date: "2026-04-05", period: "30", scenario: "likely", predicted_balance: 3800, predicted_inflow: 28000, predicted_outflow: 48047, confidence: 0.75, crisis_flag: true, crisis_description: "Dangerously thin. One bad week tips negative." },
  { forecast_date: "2026-04-05", period: "30", scenario: "best", predicted_balance: 18200, predicted_inflow: 35000, predicted_outflow: 41647, confidence: 0.6, crisis_flag: false, crisis_description: null },
  { forecast_date: "2026-05-05", period: "60", scenario: "worst", predicted_balance: -31400, predicted_inflow: 52000, predicted_outflow: 107247, confidence: 0.7, crisis_flag: true, crisis_description: "Two missed payrolls if revenue doesn't recover. Critical." },
  { forecast_date: "2026-05-05", period: "60", scenario: "likely", predicted_balance: -8600, predicted_inflow: 68000, predicted_outflow: 100447, confidence: 0.65, crisis_flag: true, crisis_description: "Still negative. AR collection is the lifeline." },
  { forecast_date: "2026-05-05", period: "60", scenario: "best", predicted_balance: 22400, predicted_inflow: 82000, predicted_outflow: 83447, confidence: 0.5, crisis_flag: false, crisis_description: null },
  { forecast_date: "2026-06-05", period: "90", scenario: "worst", predicted_balance: -52800, predicted_inflow: 78000, predicted_outflow: 154647, confidence: 0.6, crisis_flag: true, crisis_description: "Business cannot survive 90 days at current trajectory without intervention." },
  { forecast_date: "2026-06-05", period: "90", scenario: "likely", predicted_balance: -12400, predicted_inflow: 112000, predicted_outflow: 148247, confidence: 0.55, crisis_flag: true, crisis_description: "Recoverable if hidden resources are activated. $127K identified." },
  { forecast_date: "2026-06-05", period: "90", scenario: "best", predicted_balance: 38600, predicted_inflow: 142000, predicted_outflow: 127247, confidence: 0.4, crisis_flag: false, crisis_description: null },
];

export const DEMO_RESERVE: Reserve = {
  balance: 8200,
  target_balance: 45000,
  auto_sweep_enabled: false,
  sweep_threshold: 50000,
  sweep_percentage: 10,
};

export const DEMO_RESERVE_TRANSACTIONS: ReserveTransaction[] = [
  { id: "rt-1", amount: 3000, transaction_type: "manual_deposit", description: "Initial reserve deposit", created_at: "2026-01-15T10:00:00Z" },
  { id: "rt-2", amount: 2500, transaction_type: "manual_deposit", description: "Good week — added to reserves", created_at: "2026-01-28T10:00:00Z" },
  { id: "rt-3", amount: 4000, transaction_type: "manual_deposit", description: "Catering deposit surplus", created_at: "2026-02-10T10:00:00Z" },
  { id: "rt-4", amount: -1300, transaction_type: "emergency_withdrawal", description: "Emergency equipment repair — walk-in cooler", created_at: "2026-03-05T15:00:00Z" },
];

export const DEMO_ALERTS: Alert[] = [
  {
    id: "alert-1",
    alert_type: "cash_crisis",
    severity: "critical",
    title: "Payroll Crisis in 8 Days",
    message:
      "At current burn rate, you'll be $14,200 short for April 5 payroll. But you have $47,350 in collectible invoices and a $62K unused credit line. Action required now.",
    dismissed: false,
    created_at: "2026-03-28T06:00:00Z",
  },
  {
    id: "alert-2",
    alert_type: "resource_found",
    severity: "info",
    title: "$42,000 in Unclaimed Tax Credits",
    message:
      "Your payroll records suggest eligibility for Employee Retention Credits. This won't help cash flow immediately but is significant money left on the table.",
    dismissed: false,
    created_at: "2026-03-27T08:00:00Z",
  },
  {
    id: "alert-3",
    alert_type: "invoice_aging",
    severity: "warning",
    title: "3 Invoices Past 30 Days — $47,350",
    message:
      "Downtown Corp ($18,400 — 67 days), Greenfield Schools ($14,200 — 52 days), Henderson ($14,750 — 38 days). Every day these age increases collection risk.",
    dismissed: false,
    created_at: "2026-03-26T10:00:00Z",
  },
  {
    id: "alert-4",
    alert_type: "reserve_low",
    severity: "warning",
    title: "Reserve at 18% of Target",
    message:
      "Your emergency reserve is $8,200 against a $45,000 target. That's 1.5 days of operating expenses. Recommend enabling auto-sweep.",
    dismissed: false,
    created_at: "2026-03-25T12:00:00Z",
  },
];

export const DEMO_CONNECTED_ACCOUNTS: ConnectedAccount[] = [
  { id: "ca-1", provider: "quickbooks", status: "active", last_synced_at: "2026-03-28T05:30:00Z" },
];

export const RESOURCE_TYPE_LABELS: Record<string, string> = {
  aging_invoice: "Aging Invoice",
  tax_credit: "Tax Credit",
  unused_credit_line: "Unused Credit Line",
  renegotiable_contract: "Renegotiable Contract",
  liquidatable_inventory: "Liquidatable Inventory",
  duplicate_payment: "Duplicate Payment",
  early_payment_discount: "Early Payment Discount",
};

export const RESOURCE_TYPE_COLORS: Record<string, string> = {
  aging_invoice: "bg-orange-100 text-orange-800",
  tax_credit: "bg-green-100 text-green-800",
  unused_credit_line: "bg-blue-100 text-blue-800",
  renegotiable_contract: "bg-purple-100 text-purple-800",
  liquidatable_inventory: "bg-stone-100 text-stone-800",
  duplicate_payment: "bg-red-100 text-red-800",
  early_payment_discount: "bg-teal-100 text-teal-800",
};

export const STATUS_COLORS: Record<string, string> = {
  discovered: "border-l-elisha-500",
  in_progress: "border-l-blue-500",
  recovered: "border-l-green-500",
  dismissed: "border-l-stone-300",
};
