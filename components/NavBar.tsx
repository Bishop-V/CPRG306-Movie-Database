// ============================================================================
// components/Navbar.tsx   →   the bar across the top of every page
// ============================================================================
// Displays page title and links
// ----------------------------------------------------------------------------
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

const buttonClasses =
  "cursor-pointer bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded shrink-0";

const linkClasses =
  "text-purple-200 hover:text-purple-400 text-xl transition-colors";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="bg-gray-800 border-b border-gray-500 px-6 py-4 w-full">
      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-4">
        <div className="lg:flex-1">
          <Link
            href="/"
            className="text-4xl font-bold text-purple-200 text-start"
          >
            Internet Movies Rental Company
          </Link>
        </div>

        <div className="flex flex-row items-center gap-6 self-end lg:self-auto">
          <Link
            href="/about"
            className={
              pathname === "/about"
                ? `${linkClasses} font-bold text-purple-400`
                : linkClasses
            }
          >
            About
          </Link>

          {loading ? (
            <div className="h-10 w-24" />
          ) : user ? (
            <button onClick={handleLogout} className={buttonClasses}>
              Log out
            </button>
          ) : (
            <Link href="/login" className={buttonClasses}>
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
