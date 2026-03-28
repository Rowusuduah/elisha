import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const PLANS = {
  dashboard: {
    name: "Dashboard",
    price: 4900,
    features: [
      "Cash position visibility",
      "30-day trend analysis",
      "Plain-English alerts",
      "Monthly cash flow report",
      "Email support",
    ],
  },
  discovery: {
    name: "Discovery",
    price: 14900,
    features: [
      "Everything in Dashboard",
      "Asset Discovery Engine",
      "Aging invoice scanner",
      "Tax credit identification",
      "Credit line analysis",
      "Contract renegotiation flags",
      "Priority support",
    ],
  },
  autopilot: {
    name: "Autopilot",
    price: 34900,
    features: [
      "Everything in Discovery",
      "Automated reserve building",
      "Invoice acceleration workflows",
      "CFO-level insights",
      "Custom alert rules",
      "Dedicated account manager",
      "API access",
    ],
  },
} as const;
