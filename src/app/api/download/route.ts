import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/crypto";
import { getProduct } from "@/config/products";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return new NextResponse(
        "<h1>Error: Token is missing</h1><p>Please use a valid download link.</p>",
        {
          status: 400,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    // Verify token cryptographic signature and expiration
    const payload = verifyToken(token);
    if (!payload) {
      return new NextResponse(
        "<h1>Invalid or Expired Link</h1><p>For security, the download link is valid for 24 hours only. Please contact our support team.</p>",
        {
          status: 401,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    // Check order in DB
    const order = await prisma.order.findUnique({
      where: { orderId: payload.orderId },
    });

    if (!order) {
      return new NextResponse(
        "<h1>Order Not Found</h1><p>No record found for the given order.</p>",
        {
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    if (order.status !== "PAID") {
      return new NextResponse(
        "<h1>Payment Pending</h1><p>Payment for this order has not been completed yet.</p>",
        {
          status: 403,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    const prodConfig = getProduct(order.product);

    // If the product is delivered via a permanent cloud link (e.g. Google Drive),
    // simply redirect there after verifying the payment — no PDF, no download limit.
    if (prodConfig.driveUrl) {
      return NextResponse.redirect(prodConfig.driveUrl);
    }

    // Limit download count to 5
    const MAX_DOWNLOADS = 5;
    if (order.downloadCount >= MAX_DOWNLOADS) {
      return new NextResponse(
        `<h1>Download Limit Reached</h1>
         <p>For security reasons, you can download this file a maximum of ${MAX_DOWNLOADS} times.</p>
         <p>If you need to download again, please contact us at <b>support@leafybites.shop</b>.</p>`,
        {
          status: 403,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    // Increment download count in DB
    await prisma.order.update({
      where: { orderId: payload.orderId },
      data: {
        downloadCount: {
          increment: 1,
        },
      },
    });

    // Locate PDF file dynamically based on purchased product
    const filePath = path.join(process.cwd(), "private", prodConfig.pdfPath);

    if (!fs.existsSync(filePath)) {
      console.error(`E-book/Bundle file not found at expected path: ${filePath}`);
      return new NextResponse(
        `<h1>File Not Found on Server</h1>
         <p>Sorry, the product file is not available on the server. Please notify our support team.</p>`,
        {
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    // Read and stream file buffer
    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${prodConfig.pdfFilename}"`,
      },
    });
  } catch (error: any) {
    console.error("PDF download handler error:", error);
    return new NextResponse("Internal Server Error occurred during PDF download.", { status: 500 });
  }
}
