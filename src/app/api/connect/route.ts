import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { provider } = body;

  if (!provider || !["quickbooks", "xero", "freshbooks", "plaid"].includes(provider)) {
    return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
  }

  // Production: initiate OAuth flow with provider, exchange code for tokens,
  // store encrypted tokens in connected_accounts table, trigger initial sync.

  return NextResponse.json({
    account: {
      id: `ca-${Date.now()}`,
      provider,
      status: "active",
      last_synced_at: new Date().toISOString(),
    },
  });
}
