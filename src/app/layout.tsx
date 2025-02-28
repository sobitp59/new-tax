import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ['latin'] })
import { Analytics } from "@vercel/analytics/react"


export const metadata: Metadata = {
  title: "Taxmate - Your Tax Calculator",
  description: "Taxmate - Simplify, Calculate, Save.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased `}
      >
        <Analytics/> 
        {children}

        
      </body>
    </html>
  );
}
