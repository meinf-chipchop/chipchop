'use client'

import { Sidebar } from "@/app/components/LateralMenu/Sidebar"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { me } from "@/lib/api/me";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { email, error: emailError } = useOwnEmail();

  if (emailError) {
    // Go back to the login page if there is an error fetching the user's email
    router.push("/");
  }

  function useOwnEmail() {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      async function fetchEmail() {
        try {
          const data = await me();

          setEmail(data.email);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Error fetching user data");
        }
      }

      fetchEmail();
    }, []);

    return { email, error };
  }

  return (
    <div className="flex h-screen bg-[#f0f0f0] text-[#2c3e50]">
      <Sidebar email={email} />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}
