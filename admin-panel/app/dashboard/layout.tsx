'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { UsersIcon, ChefHat, Truck, LogOutIcon, ChevronRight, ChevronDown, House } from "lucide-react"


interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>
  text: string
  href: string
  subItems?: Omit<MenuItemProps, 'subItems'>[]
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, text, href, subItems }) => {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const isActive = pathname === href || (subItems && subItems.some(item => pathname === item.href))

  return (
    <li>
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer ${
          isActive ? "bg-[#6ca4ac] text-white" : "text-black-300 hover:bg-[#6ca4ac]"
        }`}
        onClick={() => subItems ? setIsExpanded(!isExpanded) : null}
      >
        <Link href={href} className="flex items-center space-x-2 flex-1">
          <Icon className="h-5 w-5" />
          <span>{text}</span>
        </Link>
        {subItems && (
          isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        )}
      </div>
      {subItems && isExpanded && (
        <ul className="ml-6 mt-2 space-y-2">
          {subItems.map((item) => (
            <MenuItem key={item.text} {...item} />
          ))}
        </ul>
      )}
    </li>
  )
}

const menuItems: MenuItemProps[] = [
  { icon: House, text: "Home", href: "/dashboard" },
  {
    icon: UsersIcon,
    text: "User Petitions",
    href: "",
    subItems: [
      { icon: ChefHat, text: "Cooks", href: "/dashboard/user-petitions/cooks" },
      { icon: Truck, text: "Deliverers", href: "/dashboard/user-petitions/deliveres" },
    ],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string>("")

  // TODO: Implement useOwnEmail hook or fetch email from API
  // useEffect(() => {
  //   async function fetchEmail() {
  //     const data = await me();
  //     setEmail(data.email);
  //   }
  //   fetchEmail();
  // }, []);

  return (
    <div className="flex h-screen bg-[#f0f0f0] text-[#2c3e50]">
      <aside className="hidden md:flex flex-col w-64 bg-[#d1c4a1] overflow-y-auto">
        
        <div className="p-4">
          <h1 className="text-2xl font-bold text-[#2c3e50]">Admin Panel</h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2 py-4">
            {menuItems.map((item) => (
              <MenuItem key={item.text} {...item} />
            ))}
          </ul>
        </nav>

        <div className="flex flex-col p-4">
          <div className="mb-4">
            <p className="font-bold text-gray-900">{email}</p>
          </div>
          <Link
            href="/"
            className="flex items-center space-x-2 text-red-600 hover:text-red-800"
          >
            <LogOutIcon className="h-5 w-5" />
            <p>Log out</p>
          </Link>
        </div>
        
      </aside>
      
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}