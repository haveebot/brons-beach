import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
