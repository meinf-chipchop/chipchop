import Link from "next/link"
import { LogOutIcon } from "lucide-react"

export function LogoutButton() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-red-600 hover:text-red-800"
    >
      <LogOutIcon className="h-5 w-5" />
      <p>Log out</p>
    </Link>
  )
}
