import { NextRequest, NextResponse } from "next/server";
import { DEMO_RESOURCES } from "@/lib/demo-data";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");

  let resources = DEMO_RESOURCES;
  if (type) {
    resources = resources.filter((r) => r.resource_type === type);
  }

  const total_estimated = resources.reduce((sum, r) => sum + r.estimated_amount, 0);
  const by_status: Record<string, number> = {};
  for (const r of resources) {
    by_status[r.status] = (by_status[r.status] || 0) + 1;
  }

  return NextResponse.json({ resources, total_estimated, by_status });
}
