import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlockKube Explorer",
  description: "BlockKube Explorer is a lightweight, fast, and modern explorer for the Ethereum blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200 dark:bg-gray-900`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}