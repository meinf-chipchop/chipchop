import { menuItems } from "./menuData"
import { MenuItem } from "./MenuItem"
import { UserEmailDisplay } from "./UserEmailDisplay"
import { LogoutButton } from "./LogoutButton"

export function Sidebar({ email }: { email: string }) {
  return (
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
        <UserEmailDisplay email={email} />
        <LogoutButton />
      </div>
    </aside>
  )
}
