-- Elisha — Small Business Cash Flow Discovery
-- "What do you have in your house?" — 2 Kings 4:2

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'dashboard' check (plan in ('dashboard', 'discovery', 'autopilot')),
  industry text not null default 'other' check (
    industry in ('restaurant', 'construction', 'agency', 'retail', 'services', 'manufacturing', 'other')
  ),
  annual_revenue numeric(12,2),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz not null default now()
);

create table public.members (
  id uuid references auth.users on delete cascade primary key,
  org_id uuid references public.organizations(id) on delete cascade not null,
  email text not null,
  full_name text not null default '',
  role text not null default 'viewer' check (role in ('owner', 'admin', 'analyst', 'viewer')),
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;
create policy "Members can read own org" on public.members
  for select using (
    org_id in (select org_id from public.members where id = auth.uid())
  );

create table public.connected_accounts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id) on delete cascade not null,
  provider text not null check (provider in ('quickbooks', 'xero', 'freshbooks', 'plaid')),
  provider_account_id text not null,
  access_token_encrypted text,
  refresh_token_encrypted text,
  status text not null default 'active' check (status in ('active', 'expired', 'revoked', 'error')),
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  unique(org_id, provider, provider_account_id)
);

alter table public.connected_accounts enable row level security;
create policy "Org members can read connected accounts" on public.connected_accounts
  for select using (
    org_id in (select org_id from public.members where id = auth.uid())
  );
create policy "Admins can manage connected accounts" on public.connected_accounts
  for insert with check (
    org_id in (
      select org_id from public.members
      where id = auth.uid() and role in ('owner', 'admin')
    )
  );

create table public.discovered_resources (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id) on delete cascade not null,
  resource_type text not null check (
    resource_type in ('aging_invoice', 'tax_credit', 'unused_credit_line', 'renegotiable_contract', 'liquidatable_inventory', 'duplicate_payment', 'early_payment_discount')
  ),
  title text not null,
  description text not null default '',
  estimated_amount numeric(12,2) not null,
  confidence text not null default 'medium' check (confidence in ('high', 'medium', 'low')),
  status text not null default 'discovered' check (
    status in ('discovered', 'in_progress', 'recovered', 'dismissed')
  ),
  action_steps text[] not null default '{}',
  recovered_amount numeric(12,2),
  source_ref text,
  discovered_at timestamptz not null default now(),
  acted_on_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.discovered_resources enable row level security;
create policy "Org members can read resources" on public.discovered_resources
  for select using (
    org_id in (select org_id from public.members where id = auth.uid())
  );
create policy "Analysts can update resources" on public.discovered_resources
  for update using (
    org_id in (
      select org_id from public.members
      where id = auth.uid() and role in ('owner', 'admin', 'analyst')
    )
  );

create table public.cash_flow_entries (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id) on delete cascade not null,
  entry_date date not null,
  amount numeric(12,2) not null,
  category text not null check (
    category in ('revenue', 'payroll', 'rent', 'supplies', 'taxes', 'loan_payment', 'utilities', 'insurance', 'marketing', 'equipment', 'other_income', 'other_expense')
  ),
  description text not null default '',
  source text not null default 'manual' check (source in ('manual', 'quickbooks', 'xero', 'plaid', 'projected')),
  is_recurring boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.cash_flow_entries enable row level security;
create policy "Org members can read cash flow" on public.cash_flow_entries
  for select using (
    org_id in (select org_id from public.members where id = auth.uid())
  );

create table public.forecasts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id) on delete cascade not null,
  forecast_date date not null,
  period text not null check (period in ('30', '60', '90')),
  scenario text not null default 'likely' check (scenario in ('best', 'likely', 'worst')),
  predicted_balance numeric(12,2) not null,
  predicted_inflow numeric(12,2) not null,
  predicted_outflow numeric(12,2) not null,
  confidence numeric(5,2) not null default 0.75,
  crisis_flag boolean not null default false,
  crisis_description text,
  generated_at timestamptz not null default now()
);

alter table public.forecasts enable row level security;
create policy "Org members can read forecasts" on public.forecasts
  for select using (
    org_id in (select org_id from public.members where id = auth.uid())
  );

create table public.reserves (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id) on delete cascade not null unique,
  balance numeric(12,2) not null default 0,
  target_balance numeric(12,2) not null default 0,
  auto_sweep_enabled boolean not null default false,
  sweep_threshold numeric(12,2) not null default 0,
  sweep_percentage numeric(5,2) not null default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.reserves enable row level security;
create policy "Org members can read reserves" on public.reserves
  for select using (
    org_id in (select org_id from public.members where id = auth.uid())
  );

create table public.reserve_transactions (
  id uuid primary key default gen_random_uuid(),
  reserve_id uuid references public.reserves(id) on delete cascade not null,
  amount numeric(12,2) not null,
  transaction_type text not null check (
    transaction_type in ('auto_sweep', 'manual_deposit', 'manual_withdrawal', 'emergency_withdrawal')
  ),
  description text not null default '',
  created_at timestamptz not null default now()
);

alter table public.reserve_transactions enable row level security;
create policy "Org members can read reserve transactions" on public.reserve_transactions
  for select using (
    reserve_id in (
      select r.id from public.reserves r
      join public.members m on m.org_id = r.org_id
      where m.id = auth.uid()
    )
  );

create table public.alerts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id) on delete cascade not null,
  alert_type text not null check (
    alert_type in ('cash_crisis', 'resource_found', 'invoice_aging', 'reserve_low', 'sweep_completed', 'credit_expiring')
  ),
  severity text not null default 'info' check (severity in ('info', 'warning', 'critical')),
  title text not null,
  message text not null,
  dismissed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.alerts enable row level security;
create policy "Org members can read alerts" on public.alerts
  for select using (
    org_id in (select org_id from public.members where id = auth.uid())
  );

-- Indexes
create index idx_members_org on public.members(org_id);
create index idx_connected_accounts_org on public.connected_accounts(org_id);
create index idx_discovered_resources_org on public.discovered_resources(org_id);
create index idx_discovered_resources_type on public.discovered_resources(resource_type);
create index idx_discovered_resources_status on public.discovered_resources(status);
create index idx_cash_flow_org_date on public.cash_flow_entries(org_id, entry_date desc);
create index idx_cash_flow_category on public.cash_flow_entries(category);
create index idx_forecasts_org_date on public.forecasts(org_id, forecast_date);
create index idx_alerts_org_dismissed on public.alerts(org_id, dismissed);
create index idx_reserve_transactions_reserve on public.reserve_transactions(reserve_id);
