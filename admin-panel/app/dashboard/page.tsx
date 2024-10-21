'use client'


import { useRouter } from "next/navigation";

import * as dotenv from "dotenv";

import Link from "next/link"

import { me } from "@/lib/api/me";

import { getAccountApprovals } from "@/lib/api/account-approvals";

import { mapState } from "@/lib/api/state-mapper";

import { Line, Bar } from "react-chartjs-2"

import React, { useState, useEffect } from "react"
import {
  HomeIcon,
  UsersIcon,
  ChefHat,
  Truck,
  SettingsIcon,
  BarChartIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  User,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Search,
  UserIcon,
} from "lucide-react"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

dotenv.config();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface User {
  id: number
  name: string
  status: "pending" | "approved" | "rejected"
}

interface Approvals {
  deliverers: User[];
  cooks: User[];
}

const initialApprovals: Approvals = {
  deliverers: [],
  cooks: [],
};

interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>
  text: string
  isActive: boolean
  onClick: () => void
  subItems?: MenuItemProps[]
  isExpanded?: boolean
}



interface Permissions {
  deliverers: User[]
  cooks: User[]
}

const initialPermissions: Permissions = {
  deliverers: [
    { id: 1, name: "John Doe", status: "pending" },
    { id: 2, name: "Jane Smith", status: "approved" },
    { id: 3, name: "Mike Johnson", status: "pending" },
    { id: 4, name: "Emily Brown", status: "rejected" },
    { id: 5, name: "David Lee", status: "approved" },
    { id: 6, name: "Sarah Parker", status: "pending" },
    { id: 7, name: "Chris Evans", status: "approved" },
    { id: 8, name: "Olivia Johnson", status: "rejected" },
    { id: 9, name: "Robert Smith", status: "pending" },
    { id: 10, name: "Sophia Garcia", status: "approved" },
    { id: 11, name: "James Williams", status: "pending" },
    { id: 12, name: "Isabella Brown", status: "approved" },
    { id: 13, name: "Liam Jones", status: "rejected" },
    { id: 14, name: "Mia Davis", status: "pending" },
    { id: 15, name: "Noah Miller", status: "approved" },
    { id: 16, name: "Ava Wilson", status: "pending" },
    { id: 17, name: "Elijah Moore", status: "rejected" },
    { id: 18, name: "Charlotte Taylor", status: "approved" },
    { id: 19, name: "William Anderson", status: "pending" },
    { id: 20, name: "Amelia Thomas", status: "approved" },
    { id: 21, name: "Ethan Jackson", status: "pending" },
    { id: 22, name: "Harper White", status: "approved" },
    { id: 23, name: "Lucas Harris", status: "rejected" },
    { id: 24, name: "Ella Martin", status: "pending" },
    { id: 25, name: "Mason Thompson", status: "approved" },
    { id: 26, name: "Aiden Garcia", status: "pending" },
    { id: 27, name: "Scarlett Martinez", status: "approved" },
    { id: 28, name: "Jacob Robinson", status: "rejected" },
    { id: 29, name: "Sofia Clark", status: "pending" },
    { id: 30, name: "Michael Rodriguez", status: "approved" },
    { id: 31, name: "Benjamin Lewis", status: "pending" },
    { id: 32, name: "Aria Lee", status: "approved" },
    { id: 33, name: "Jackson Walker", status: "rejected" },
    { id: 34, name: "Chloe Hall", status: "pending" },
    { id: 35, name: "James Young", status: "approved" },
    { id: 36, name: "Grace King", status: "pending" },
    { id: 37, name: "Daniel Wright", status: "approved" },
    { id: 38, name: "Lily Scott", status: "rejected" },
    { id: 39, name: "Samuel Green", status: "pending" },
    { id: 40, name: "Victoria Adams", status: "approved" },
    { id: 41, name: "Henry Baker", status: "pending" },
    { id: 42, name: "Samantha Nelson", status: "approved" },
  ],
  cooks: [
    { id: 1, name: "Alice Brown", status: "pending" },
    { id: 2, name: "Bob Wilson", status: "rejected" },
    { id: 3, name: "Carol Davis", status: "approved" },
    { id: 4, name: "Eva Martinez", status: "pending" },
    { id: 5, name: "Frank Thomas", status: "approved" },
    { id: 6, name: "Megan White", status: "pending" },
    { id: 7, name: "Oliver Harris", status: "approved" },
    { id: 8, name: "Sophia Clark", status: "rejected" },
    { id: 9, name: "David Lewis", status: "pending" },
    { id: 10, name: "Chloe King", status: "approved" },
    { id: 11, name: "Lucas Scott", status: "pending" },
    { id: 12, name: "Ella Adams", status: "approved" },
    { id: 13, name: "Noah Baker", status: "rejected" },
    { id: 14, name: "Liam Young", status: "pending" },
    { id: 15, name: "Amelia Thompson", status: "approved" },
    { id: 16, name: "Aiden Roberts", status: "pending" },
    { id: 17, name: "Emma Turner", status: "rejected" },
    { id: 18, name: "Mason Rodriguez", status: "approved" },
    { id: 19, name: "Aria Edwards", status: "pending" },
    { id: 20, name: "Ethan Walker", status: "approved" },
    { id: 21, name: "Scarlett Hall", status: "pending" },
    { id: 22, name: "Oliver Lewis", status: "approved" },
    { id: 23, name: "Jack Wilson", status: "rejected" },
    { id: 24, name: "Lily Johnson", status: "pending" },
    { id: 25, name: "Samuel Brown", status: "approved" },
    { id: 26, name: "Chloe Martin", status: "pending" },
    { id: 27, name: "Grace Garcia", status: "approved" },
    { id: 28, name: "Henry Thompson", status: "rejected" },
    { id: 29, name: "Ava Martinez", status: "pending" },
    { id: 30, name: "Daniel Hall", status: "approved" },
    { id: 31, name: "Ella Johnson", status: "pending" },
    { id: 32, name: "James Wilson", status: "approved" },
    { id: 33, name: "Sofia Davis", status: "rejected" },
    { id: 34, name: "Liam Robinson", status: "pending" },
    { id: 35, name: "Emily Lee", status: "approved" },
    { id: 36, name: "Lucas Martinez", status: "pending" },
    { id: 37, name: "Mia Young", status: "approved" },
    { id: 38, name: "Jack White", status: "rejected" },
    { id: 39, name: "Oliver King", status: "pending" },
    { id: 40, name: "Aiden Baker", status: "approved" },
    { id: 41, name: "Harper Scott", status: "pending" },
    { id: 42, name: "Sophia Clark", status: "approved" },
  ],
};

interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>
  text: string
  isActive: boolean
  onClick: () => void
  subItems?: MenuItemProps[]
  isExpanded?: boolean
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

function useApprovals(
  pageNumber: number,
  pageSize: number
): [Approvals, React.Dispatch<React.SetStateAction<Approvals>>] {
  const [approvals, setApprovals] = useState<Approvals>(initialApprovals);

  useEffect(() => {
    async function fetchApprovals() {
      try {
        const allData: Approvals = { deliverers: [], cooks: [] };
        let currentPage = 1;
        let hasMoreData = true;

        while (hasMoreData) {
          const data = await getAccountApprovals(currentPage, pageSize);

          data.forEach((approval) => {
            const lst: User[] =
              approval.user.role === "C" ? allData.cooks : allData.deliverers;

            lst.push({
              id: approval.user.id,
              name: approval.user.email,
              status: mapState(approval.state),
            });
          });

          if (allData.deliverers.length + allData.cooks.length < pageSize) {
            hasMoreData = false;
          } else {
            currentPage++;
          }
        }

        setApprovals(allData);
      } catch (error) {
        console.error("Error fetching approvals:", error);
      }
    }

    fetchApprovals();
  }, []);

  return [approvals, setApprovals];
}


// Mock data for charts
const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'New Cooks',
      data: [10, 15, 8, 12, 20, 18, 25, 30, 28, 35, 40, 45],
      borderColor: '#b89d6a',
      backgroundColor: 'rgba(184, 157, 106, 0.5)',
    },
    {
      label: 'New Deliverers',
      data: [8, 10, 12, 15, 18, 22, 20, 25, 28, 30, 35, 38],
      borderColor: '#6a9fad',
      backgroundColor: 'rgba(106, 159, 173, 0.5)',
    },
  ],
}

const orderData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Orders',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(184, 157, 106, 0.6)',
    },
  ],
}



const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  text,
  isActive,
  onClick,
  subItems,
  isExpanded,
}) => (
  <li>
    <div
  className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer ${
    isActive ? "bg-[#6ca4ac] text-white" : "text-black-300 hover:bg-[#6ca4ac]"
  }`}
  onClick={onClick}
>

      <div className="flex items-center space-x-2">
        <Icon className="h-5 w-5" />
        <span>{text}</span>
      </div>
      {subItems &&
        (isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        ))}
    </div>
    {subItems && isExpanded && (
      <ul className="ml-6 mt-2 space-y-2">
        {subItems.map((item) => (
          <MenuItem key={item.text} {...item} />
        ))}
      </ul>
    )}
  </li>
);

export default function AdminDashboard() {
  const router = useRouter();

  const usersPerPage = 10;

  const [activeItem, setActiveItem] = useState("Dashboard");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [permissions, setPermissions] = useState<Permissions>(initialPermissions)
  const [nameFilter, setNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "denied">("all")
  const { email, error: emailError } = useOwnEmail();
  const [approvals, setApprovals] = useApprovals(1, usersPerPage);

  // if (emailError) {
  //   // Go back to the login page if there is an error fetching the user's email
  //   router.push("/login");
  // }

  const menuItems: MenuItemProps[] = [
    {
      icon: HomeIcon,
      text: "Dashboard",
      isActive: false,
      onClick: function (): void {
        throw new Error("Function not implemented.");
      },
    },
    {
      icon: UsersIcon,
      text: "User Settings",
      subItems: [
        {
          icon: ChefHat,
          text: "Cooks",
          isActive: false,
          onClick: function (): void {
            throw new Error("Function not implemented.");
          },
        },
        {
          icon: Truck,
          text: "Deliverers",
          isActive: false,
          onClick: function (): void {
            throw new Error("Function not implemented.");
          },
        },
      ],
      isActive: false,
      onClick: function (): void {
        throw new Error("Function not implemented.");
      },
    },
    {
      icon: BarChartIcon,
      text: "Analytics",
      isActive: false,
      onClick: function (): void {
        throw new Error("Function not implemented.");
      },
    },
    {
      icon: SettingsIcon,
      text: "Settings",
      isActive: false,
      onClick: function (): void {
        throw new Error("Function not implemented.");
      },
    },
  ];

  useEffect(() => {
    if (activeItem === "Cooks" || activeItem === "Deliverers") {
      const type = activeItem.toLowerCase() as "cooks" | "deliverers"

      const filteredUsers = permissions[type].filter(
        (user) =>
          user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          (statusFilter === "all" || user.status === statusFilter)
      )
      const startIndex = (currentPage - 1) * usersPerPage
      const endIndex = startIndex + usersPerPage
      setVisibleUsers(filteredUsers.slice(startIndex, endIndex))
    }
  }, [activeItem, permissions, currentPage, nameFilter, statusFilter])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleItemClick = (item: MenuItemProps) => {
    if (item.subItems) {
      setExpandedItems((prev) =>
        prev.includes(item.text)
          ? prev.filter((i) => i !== item.text)
          : [...prev, item.text]
      )
      if (!expandedItems.includes(item.text)) {
        setActiveItem(item.subItems[0].text)
      }
    } else {
      setActiveItem(item.text)
    }
  }

  const handlePermission = (
    type: "cooks" | "deliverers",
    id: number,
    status: "approved" | "denied"
  ) => {
    setPermissions((prev) => {
      const updatedUsers = prev[type].map((user) =>
        user.id === id ? { ...user, status } : user
      )
      return { ...prev, [type]: updatedUsers }
    })
  }

  const renderContent = () => {
    if (activeItem === "Cooks" || activeItem === "Deliverers") {
      const type = activeItem.toLowerCase() as "cooks" | "deliverers"
      const filteredUsers = permissions[type].filter(
        (user) =>
          user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          (statusFilter === "all" || user.status === statusFilter)
      )
      const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

      return (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-[#2c3e50]">
            {activeItem} List
          </h3>
          <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 bg-[#f0f0f0] text-[#2c3e50] rounded-md pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#6a9fad]" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full sm:w-auto px-4 py-2 bg-[#f0f0f0] text-[#2c3e50] rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
            </select>
          </div>
          <table className="min-w-full divide-y divide-[#e0e0e0]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2c3e50] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2c3e50] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2c3e50] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#e0e0e0]">
              {visibleUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2c3e50] flex items-center">
                    <User className="mr-2" size={20} />
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2c3e50]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "approved"
                          ? "bg-green-200 text-green-900"
                          : user.status === "rejected"
                          ? "bg-red-200 text-red-900"
                          : "bg-yellow-200 text-yellow-900"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="mr-2 p-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() =>
                        handlePermission(type, user.id, "approved")
                      }
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handlePermission(type, user.id, "denied")}
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <button
              className="px-4 py-2 bg-[#6a9fad] text-white rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-[#2c3e50]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-[#6a9fad] text-white rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )
    } else if (activeItem === "Analytics") {
      return (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-[#2c3e50]">Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#f0f0f0] p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-[#2c3e50]">New Users (Monthly)</h4>
              <Line data={monthlyData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'New Cooks and Deliverers',
                  },
                },
              }} />
            </div>
            <div className="bg-[#f0f0f0] p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-[#2c3e50]">Orders (Weekly)</h4>
              <Bar data={orderData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Weekly Order Distribution',
                  },
                },
              }} />
            </div>
            <div className="bg-[#f0f0f0] p-4 rounded-lg col-span-1 md:col-span-2">
              <h4 className="text-lg font-semibold mb-2 text-[#2c3e50]">Key Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#6a9fad] p-4 rounded-lg">
                  <p className="text-sm text-white">Total Cooks</p>
                  <p className="text-2xl font-bold text-white">127</p>
                </div>
                <div className="bg-[#6a9fad] p-4 rounded-lg">
                  <p className="text-sm text-white">Total Deliverers</p>
                  <p className="text-2xl font-bold text-white">95</p>
                </div>
                <div className="bg-[#6a9fad] p-4 rounded-lg">
                  <p className="text-sm text-white">Orders This Month</p>
                  <p className="text-2xl font-bold text-white">3,567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <p className="text-[#2c3e50]">
          Welcome to the {activeItem.toLowerCase()} section of your admin panel.
          Here you can manage and view important information related to{" "}
          {activeItem.toLowerCase()}.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#f0f0f0] text-[#2c3e50]">
      {/* Side Menu - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#d1c4a1] overflow-y-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-[#2c3e50]">Admin Panel</h1>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 py-4">
            {menuItems.map((item) => (
              <MenuItem
                key={item.text}
                icon={item.icon}
                text={item.text}
                isActive={
                  !!(
                    activeItem === item.text ||
                    (item.subItems &&
                      item.subItems.some(
                        (subItem) => subItem.text === activeItem
                      ))
                  )
                }
                onClick={() => handleItemClick(item)}
                subItems={item.subItems?.map((subItem) => ({
                  ...subItem,
                  isActive: activeItem === subItem.text,
                  onClick: () => setActiveItem(subItem.text),
                }))}
                isExpanded={expandedItems.includes(item.text)}
              />
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <button className="flex items-center space-x-2 text-[#2c3e50] hover:text-[#6a9fad]">
            <LogOutIcon className="h-5 w-5" />
            <Link href="/">Logout</Link>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-[#d1c4a1] text-[#2c3e50]"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* Side Menu - Mobile */}
      {isMobileMenuOpen && (
        <aside className="fixed inset-y-0 left-0 z-10 w-64 bg-[#d1c4a1] md:hidden overflow-y-auto">
          <div className="p-4 mt-14">
            <h1 className="text-2xl font-bold text-[#2c3e50]">Admin Panel</h1>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2 py-4">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                  isActive={
                    !!(
                      activeItem === item.text ||
                      (item.subItems &&
                        item.subItems.some(
                          (subItem) => subItem.text === activeItem
                        ))
                    )
                  }
                  onClick={() => handleItemClick(item)}
                  subItems={item.subItems?.map((subItem) => ({
                    ...subItem,
                    isActive: activeItem === subItem.text,
                    onClick: () => setActiveItem(subItem.text),
                  }))}
                  isExpanded={expandedItems.includes(item.text)}
                />
              ))}
            </ul>
          </nav>
          <div className="p-4">
            <button className="flex items-center space-x-2 text-[#2c3e50] hover:text-[#6a9fad]">
              <LogOutIcon className="h-5 w-5" />
              <Link href="/">Logout</Link>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <h2 className="text-3xl font-semibold mb-4 text-[#2c3e50]">{activeItem}</h2>
        {renderContent()}
      </main>
    </div>
  )
} 	