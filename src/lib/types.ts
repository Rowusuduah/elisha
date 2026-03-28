export type ResourceType =
  | "aging_invoice"
  | "tax_credit"
  | "unused_credit_line"
  | "renegotiable_contract"
  | "liquidatable_inventory"
  | "duplicate_payment"
  | "early_payment_discount";

export type ResourceStatus = "discovered" | "in_progress" | "recovered" | "dismissed";
export type Confidence = "high" | "medium" | "low";
export type Scenario = "best" | "likely" | "worst";
export type AlertSeverity = "info" | "warning" | "critical";
export type AlertType =
  | "cash_crisis"
  | "resource_found"
  | "invoice_aging"
  | "reserve_low"
  | "sweep_completed"
  | "credit_expiring";

export type DiscoveredResource = {
  id: string;
  resource_type: ResourceType;
  title: string;
  description: string;
  estimated_amount: number;
  confidence: Confidence;
  status: ResourceStatus;
  action_steps: string[];
  recovered_amount: number | null;
  discovered_at: string;
};

export type CashFlowEntry = {
  id: string;
  entry_date: string;
  amount: number;
  category: string;
  description: string;
  source: string;
  is_recurring: boolean;
};

export type ForecastPoint = {
  forecast_date: string;
  period: "30" | "60" | "90";
  scenario: Scenario;
  predicted_balance: number;
  predicted_inflow: number;
  predicted_outflow: number;
  confidence: number;
  crisis_flag: boolean;
  crisis_description: string | null;
};

export type Reserve = {
  balance: number;
  target_balance: number;
  auto_sweep_enabled: boolean;
  sweep_threshold: number;
  sweep_percentage: number;
};

export type ReserveTransaction = {
  id: string;
  amount: number;
  transaction_type: "auto_sweep" | "manual_deposit" | "manual_withdrawal" | "emergency_withdrawal";
  description: string;
  created_at: string;
};

export type Alert = {
  id: string;
  alert_type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  dismissed: boolean;
  created_at: string;
};

export type DashboardSummary = {
  cash_position: number;
  hidden_resources_total: number;
  hidden_resources_count: number;
  upcoming_crises: number;
  reserve_balance: number;
  reserve_target: number;
  monthly_burn_rate: number;
  runway_days: number;
};

export type ConnectedAccount = {
  id: string;
  provider: "quickbooks" | "xero" | "freshbooks" | "plaid";
  status: "active" | "expired" | "revoked" | "error";
  last_synced_at: string | null;
};
