import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZEYNEP ERVA CESUR",
  description: "Hikâyelerin izini süren basın mensubu",
  icons: {
    icon: [
      { url: '/favicon-v3.ico?v=5', sizes: 'any' },
      { url: '/favicon-v3.png?v=5', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon-v3.png?v=5',
    apple: [
      { url: '/apple-touch-icon.png?v=5', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png?v=5',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "ZEYNEP ERVA CESUR",
    description: "Hikâyelerin izini süren basın mensubu",
    url: 'https://zeynepervacesur.com',
    siteName: 'Zeynep Erva Cesur',
    images: [
      {
        url: '/erva-splash.jpg', // Using the existing splash image for OG
        width: 1200,
        height: 630,
        alt: 'Zeynep Erva Cesur',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
};
import BackgroundMusic from "@/components/BackgroundMusic";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-black text-white`}
      >
        <BackgroundMusic />
        {children}
      </body>
    </html>
  );
}

