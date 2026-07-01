import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | Leafy Bites",
  description: "Complete your purchase securely and get instant access to your download.",
};

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
