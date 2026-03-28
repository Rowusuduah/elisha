import { NextResponse } from "next/server";
import { DEMO_DASHBOARD } from "@/lib/demo-data";

export async function GET() {
  // Production: query Supabase for org's dashboard summary
  // const { data } = await supabase.from('...').select('...')
  return NextResponse.json(DEMO_DASHBOARD);
}
