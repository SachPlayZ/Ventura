import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Navbar } from "@/components/component/Navbar";
import { cn } from "@/lib/utils";
import { StateContextProvider } from "@/context";
import Head from "next/head";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Ventura",
  description:
    "Invest into your favourite startups with cryptocurrency. Get started with Ventura today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* You can also add other meta tags here */}
      </Head>
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <ThirdwebProvider>
          <StateContextProvider>
            <Navbar />
            {children}
          </StateContextProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
