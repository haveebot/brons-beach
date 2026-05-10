import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bronsbeach.com"),
  title: {
    default: "Bron's Beach Rentals — Port Aransas, TX",
    template: "%s · Bron's Beach Rentals",
  },
  description:
    "Beach rentals in Port Aransas — chairs, umbrellas, cabanas, coolers. Setup and pickup handled. Reserve in 30 seconds.",
  applicationName: "Bron's Beach Rentals",
  keywords: [
    "Port Aransas beach rentals",
    "beach chair umbrella rental",
    "cabana rental Port A",
    "Port Aransas Texas",
    "Bron's Beach Carts",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    siteName: "Bron's Beach Rentals",
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
