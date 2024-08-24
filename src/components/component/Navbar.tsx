"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useStateContext } from "@/context";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const { connect, address } = useStateContext();
  const pathname = usePathname();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (address && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const balance = await provider.getBalance(address);
          setBalance(ethers.formatEther(balance));
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();
  }, [address]);

  return (
    <header
      className={`bg-transparent text-white py-4 px-6 md:px-10 ${
        pathname === "/" || pathname==="/about" ? "fixed" : ""
      } z-50 w-screen backdrop-blur-md`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="flex items-center gap-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="h-10 w-10" variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-[#1a1a1a]">
              <nav className="flex flex-col items-start gap-4 p-4 *:dark:text-white">
                <Link
                  href="/"
                  className={`text-sm font-medium hover:text-[#00d8ff] transition-colors ${
                    pathname === "/" ? "text-[#00d8ff]" : ""
                  }`}
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="/startups"
                  className={`text-sm font-medium hover:text-[#00d8ff] transition-colors ${
                    pathname.startsWith("/startups") ? "text-[#00d8ff]" : ""
                  }`}
                  prefetch={false}
                >
                  Startups
                </Link>
                <Link
                  href="/loans"
                  className={`text-sm font-medium hover:text-[#00d8ff] transition-colors ${
                    pathname.startsWith("/loans") ? "text-[#00d8ff]" : ""
                  }`}
                  prefetch={false}
                >
                  Loans
                </Link>
                <Link
                  href="/about"
                  className={`text-sm font-medium hover:text-[#00d8ff] transition-colors ${
                    pathname === "/about" ? "text-[#00d8ff]" : ""
                  }`}
                  prefetch={false}
                >
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <span className="text-xl font-bold">Venturâ</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className={`text-sm font-medium hover:text-[#00d8ff] transition-colors ${
              pathname === "/" ? "text-[#00d8ff]" : ""
            }`}
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/startups"
            className={`text-sm font-medium hover:text-[#00d8ff] transition-colors ${
              pathname.startsWith("/startups") ? "text-[#00d8ff]" : ""
            }`}
            prefetch={false}
          >
            Startups
          </Link>
          <Link
            href="/loans"
            className={`text-sm font-medium hover:text-[#00d8ff] transition-colors ${
              pathname.startsWith("/loans") ? "text-[#00d8ff]" : ""
            }`}
            prefetch={false}
          >
            Loans
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium hover:text-[#00d8ff] transition-colors ${
              pathname === "/about" ? "text-[#00d8ff]" : ""
            }`}
            prefetch={false}
          >
            About
          </Link>
        </nav>

        {/* Connect Button */}
        <Button
          onClick={() => {
            if (address) {
              // Maybe show some dropdown with wallet details here
            } else {
              connect();
            }
          }}
          className="bg-[#00d8ff] text-[#1a1a1a] font-medium px-4 py-2 rounded-md hover:bg-[#00b8e6] transition-colors flex gap-2"
        >
          <Image height={24} width={24} src="/metamask.webp" alt="logo" />
          {balance ? `${balance.substring(0, 5)} ETH` : "Connect"}
        </Button>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
