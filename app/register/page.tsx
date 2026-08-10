"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className=" w-full min-h-screen flex items-center justify-center">
      <div className="bg-gray-700 rounded-lg p-8 w-[90%] max-w-md flex flex-col  items-center">
        <h2 className="text-purple-400 text-3xl font-bold">Sign up</h2>

        <form
          onSubmit={handleLogin}
          className="mt-7 gap-6 justify-between flex flex-col"
        >
          <div>
            <input
              className="border-2 border-purple-200 rounded-2xl placeholder:text-gray-400 text-center"
              type="text"
              id="email"
              value={email}
              placeholder=" Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border-2 border-purple-200 rounded-2xl placeholder:text-gray-400 text-center"
              type="password"
              id="pass"
              value={password}
              placeholder=" Password"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="justify-center flex ">
            <input
              type="submit"
              value="Submit"
              className="bg-purple-300 px-2 py-1 rounded-lg hover:bg-purple-200 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </main>
  );
}
