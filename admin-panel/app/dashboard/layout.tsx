'use client'

import { useState } from "react"
import { Sidebar } from "../components/LateralMenu/Sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string>("")

  return (
    <div className="flex h-screen bg-[#f0f0f0] text-[#2c3e50]">
      <Sidebar email={email} />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}
