// ============================================================================
// components/Navbar.tsx   →   the bar across the top of every page
// ============================================================================
// Display's page title and links
// ----------------------------------------------------------------------------
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  console.log("Pathname", pathname);
  return (
    <nav className="bg-purple-50 border-b border-gray-200 px-6 py-4 w-full">
      <div className="flex lg:flex-row flex-col lg:justify-between">
        <div className="lg:flex-1 w-full">
          <Link
            key="/"
            href="/"
            className="text-4xl font-bold text-black text-start"
          >
            Movies110
          </Link>
        </div>
        <Link
          href="/login"
          className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded shrink-0 self-end lg:self-center"
        >
          Log in
        </Link>
      </div>{" "}
    </nav>
  );
}
