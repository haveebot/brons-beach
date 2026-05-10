import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bronsbeach.com"),
  title: {
    default:
      "Bron's — Beach Rentals · Golf Carts · Outdoor Bar in Port Aransas, TX",
    template: "%s · Bron's",
  },
  description:
    "Beach setups, golf carts, outdoor bar, kitchen, and shaved ice — all in one yard at 314 E Avenue G in Port Aransas. Reserve rentals online; come find the rest.",
  applicationName: "Bron's",
  keywords: [
    "Port Aransas beach rentals",
    "Port Aransas golf cart rental",
    "beach chair umbrella rental",
    "cabana rental Port A",
    "Bron's Backyard",
    "Port Aransas outdoor bar",
    "Port Aransas live music",
    "Port Aransas Texas",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    siteName: "Bron's",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe2" },
    { media: "(prefers-color-scheme: dark)", color: "#1a3a52" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
