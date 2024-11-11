import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, ChevronDown } from "lucide-react"

interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>
  text: string
  href: string
  subItems?: Omit<MenuItemProps, 'subItems'>[]
}

export const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, text, href, subItems }) => {
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
