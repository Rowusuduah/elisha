import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elisha — Find the Money You Didn't Know You Had",
  description:
    "Small business cash flow discovery. Before you borrow, discover what you already have. Aging invoices, unclaimed tax credits, unused credit lines — your hidden resources, found.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 antialiased">{children}</body>
    </html>
  );
}
