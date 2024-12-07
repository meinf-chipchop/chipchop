import { House, UsersIcon, ChefHat, Truck, User2Icon } from "lucide-react"

export const menuItems = [
  { icon: House, text: "Home", href: "/dashboard" },
  {
    icon: UsersIcon,
    text: "User Petitions",
    href: "",
    subItems: [
      { icon: ChefHat, text: "Cooks", href: "/dashboard/user-petitions/cooks" },
      { icon: Truck, text: "Deliverers", href: "/dashboard/user-petitions/deliverers" },
      { icon: User2Icon, text: "Users", href: "/dashboard/user-petitions/users" },
    ],
  },
]
