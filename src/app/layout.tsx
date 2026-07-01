import type { Metadata } from "next";
import { Noto_Serif_Devanagari, Noto_Sans_Devanagari } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";

const notoSerif = Noto_Serif_Devanagari({
  weight: ["400", "700", "900"],
  variable: "--font-noto-serif",
  subsets: ["devanagari"],
  display: "swap",
});

const notoSans = Noto_Sans_Devanagari({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans",
  subsets: ["devanagari"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Leafy Bites",
    template: "%s | Leafy Bites",
  },
  description: "Premium digital products, ready-to-post reels and guides — instant download, lifetime access.",
  openGraph: {
    title: "Leafy Bites",
    description: "Premium digital products with instant download and lifetime access.",
    type: "website",
    url: "https://leafybites.shop",
    siteName: "Leafy Bites",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leafy Bites",
    description: "Premium digital products with instant download and lifetime access.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <html
      lang="hi"
      className={`${notoSerif.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Facebook Pixel */}
        {fbPixelId && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${fbPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        <ThemeProvider>
          {children}
        </ThemeProvider>
        
        {/* Load Razorpay script globally for standard payments flow */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
