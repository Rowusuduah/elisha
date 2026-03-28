import { NextResponse } from "next/server";
import { DEMO_RESERVE, DEMO_RESERVE_TRANSACTIONS } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    reserve: DEMO_RESERVE,
    transactions: DEMO_RESERVE_TRANSACTIONS,
  });
}
