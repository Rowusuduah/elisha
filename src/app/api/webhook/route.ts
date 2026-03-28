import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed": {
        // Production: update org plan in Supabase
        // const session = event.data.object;
        // await supabase.from('organizations').update({ plan: '...' }).eq('stripe_customer_id', session.customer)
        console.log("Checkout completed:", event.data.object);
        break;
      }
      case "customer.subscription.updated": {
        console.log("Subscription updated:", event.data.object);
        break;
      }
      case "customer.subscription.deleted": {
        // Production: downgrade org to 'dashboard' plan
        console.log("Subscription cancelled:", event.data.object);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
