import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // for tailwind layout

import { COLORS } from "@/lib/styles";
import SiteHeader from "@/components/header";
import SiteFooter from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Magical Cards",
  description: "Silly tools made for purveyors of fine collectable goods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: COLORS.MAIN_BG,
          color: COLORS.FONT_READABLE,
        }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />

        <div className="grid grid-rows-[1fr] items-start justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col p-8 items-center sm:items-start">
            {children}
          </main>
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
