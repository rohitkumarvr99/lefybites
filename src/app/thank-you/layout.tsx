import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed | Leafy Bites",
  description: "Thank you for your purchase. Access your download instantly.",
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
