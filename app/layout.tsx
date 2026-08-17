import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.nhtaxconsultancy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "NH Tax Consultancy | GST, Income Tax, TDS & Accounting Services",
    template: "%s | NH Tax Consultancy",
  },

  description:
    "NH Tax Consultancy provides professional GST, Income Tax, TDS, accounting, bookkeeping, audit, business registration and compliance services for businesses, startups, freelancers and individuals.",

  applicationName: "NH Tax Consultancy",

  keywords: [
    "NH Tax Consultancy",
    "tax consultant",
    "tax consultancy",
    "GST consultant",
    "GST filing",
    "GST registration",
    "income tax consultant",
    "income tax filing",
    "ITR filing",
    "TDS filing",
    "TDS consultant",
    "accounting services",
    "bookkeeping services",
    "audit services",
    "business registration",
    "company registration",
    "LLP registration",
    "MSME registration",
    "tax services in India",
  ],

  authors: [
    {
      name: "NH Tax Consultancy",
    },
  ],

  creator: "NH Tax Consultancy",
  publisher: "NH Tax Consultancy",

  category: "Finance and Tax Services",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,

    siteName: "NH Tax Consultancy",

    title:
      "NH Tax Consultancy | GST, Income Tax, TDS & Accounting Services",

    description:
      "Professional GST, Income Tax, TDS, accounting, bookkeeping, audit and business registration services.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NH Tax Consultancy - Tax & Accounting Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "NH Tax Consultancy | GST, Income Tax, TDS & Accounting",

    description:
      "Professional tax, GST, accounting, TDS, audit and business registration services.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],

    apple: "/apple-icon.png",
  },

  verification: {
    // Google Search Console verification
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}