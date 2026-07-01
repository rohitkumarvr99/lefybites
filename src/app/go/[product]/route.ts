import { NextResponse } from "next/server";
import { getProduct } from "@/config/products";

/**
 * Branded permanent redirect: e.g. https://leafybites.shop/go/god-reels
 * Redirects to the product's delivery link (Google Drive) while keeping the
 * visible link on our own domain — this avoids "mismatched URL" spam flags
 * and gives customers lifetime access (no token, no expiry).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ product: string }> }
) {
  const { product } = await params;
  const prodConfig = getProduct(product);

  if (prodConfig.driveUrl) {
    return NextResponse.redirect(prodConfig.driveUrl);
  }

  return new NextResponse(
    "<h1>Link not available</h1><p>Please contact support@leafybites.shop for access.</p>",
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
