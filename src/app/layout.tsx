import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClientShell } from "./layout-client";

/* ── FONTS ── */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/* ── METADATA ── */
export const metadata: Metadata = {
  title: {
    default: "BELLISSIMA — Laverie Premium 100% Digitale, Dakar",
    template: "%s — BELLISSIMA",
  },
  description:
    "Lavage et séchage premium en 1h–1h30. Réservation et paiement 100% digital. Machines professionnelles, hygiène garantie. Dakar, Sénégal.",
  keywords: [
    "laverie", "Dakar", "lavage premium", "séchage", "laverie digitale",
    "BELLISSIMA", "pressing Dakar", "laverie automatique", "Sénégal",
  ],
  authors: [{ name: "BELLISSIMA" }],
  creator: "BELLISSIMA",
  publisher: "BELLISSIMA Smart Laundry",
  metadataBase: new URL("https://bellissima.sn"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "BELLISSIMA",
    title: "BELLISSIMA — Laverie Premium 100% Digitale, Dakar",
    description: "Lavage et séchage premium en 1h–1h30. 100% digital, simple et sécurisé.",
    url: "https://bellissima.sn",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BELLISSIMA — Laverie Premium Dakar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BELLISSIMA — Laverie Premium Dakar",
    description: "Lavage et séchage premium en 1h–1h30. 100% digital.",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: "google-site-verification-code" },
  alternates: { canonical: "https://bellissima.sn" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "BELLISSIMA Smart Laundry",
  description: "Laverie premium 100% digitale à Dakar. Lavage et séchage professionnels.",
  url: "https://bellissima.sn",
  telephone: "+221770000001",
  email: "contact@bellissima.sn",
  address: { "@type": "PostalAddress", addressLocality: "Dakar", addressCountry: "SN" },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "07:00", closes: "23:00",
  }],
  priceRange: "2500-4000 FCFA",
  image: "https://bellissima.sn/og-image.jpg",
  sameAs: ["https://wa.me/221770000001"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${playfair.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/admin/favicon-BELLISSIMA.svg" />
        <link rel="alternate icon" href="/admin/favicon-BELLISSIMA.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/admin/apple-touch-icon-BELLISSIMA.png" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}
