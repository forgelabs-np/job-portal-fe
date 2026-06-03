import Providers from "./providers";
import RootLayoutContent from "./RootLayoutContent";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Find Overseas Jobs in Middle East | Manpower Agency Nepal",
    template: "%s | Job Portal",
  },
  description:
    "Discover job opportunities in Qatar, Dubai, UAE, and other Middle East countries. Connect with leading manpower agencies for overseas employment. Apply now for your dream job abroad.",
  keywords: [
    "jobs in middle east",
    "jobs in qatar",
    "jobs in dubai",
    "uae jobs",
    "manpower agency nepal",
    "overseas jobs nepal",
    "foreign employment nepal",
    "gulf jobs",
    "middle east recruitment",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Job Portal",
    title: "Find Overseas Jobs in Middle East | Manpower Agency Nepal",
    description:
      "Discover job opportunities in Qatar, Dubai, UAE, and other Middle East countries. Apply now!",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Overseas Jobs in Middle East | Manpower Agency Nepal",
    description: "Discover job opportunities in Qatar, Dubai, UAE, and other Middle East countries.",
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" as="font" href="/fonts/PlusJakartaSans.woff2" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={`${plusJakartaSans.className} antialiased`}>
        <Providers>
          <RootLayoutContent>{children}</RootLayoutContent>
        </Providers>
      </body>
    </html>
  );
}
