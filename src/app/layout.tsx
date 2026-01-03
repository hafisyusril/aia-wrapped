import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { UserFlowProvider } from "../contexts/UserFlowContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '500', '600'],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIA Vitality Wrapped",
  description: "See your health journey and achievements with AIA Vitality Wrapped",
  keywords: ["AIA", "Vitality", "Health", "Fitness", "Wellness", "Steps", "Challenges"],
  authors: [{ name: "AIA Vitality", url: "https://www.aia.com/" }],
  openGraph: {
    title: "AIA Vitality Wrapped",
    description: "See your health journey and achievements with AIA Vitality Wrapped",
    url: "https://www.aia.com/vitality-wrapped",
    siteName: "AIA Vitality Wrapped",
    images: [
      {
        url: "/intro/aia-vitality-wrapped.svg",
        width: 800,
        height: 600,
        alt: "AIA Vitality Wrapped",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <UserFlowProvider>
          {children}
        </UserFlowProvider>
      </body>
    </html>
  );
}
