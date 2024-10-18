"use client";

import { useRouter } from "next/navigation";

import * as dotenv from "dotenv";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import Link from "next/link";

dotenv.config();

interface User {
  id: number;
  name: string;
  status: "pending" | "approved" | "denied";
}

interface Permissions {
  deliverers: User[];
  cooks: User[];
}

const initialPermissions: Permissions = {
  deliverers: [
    { id: 1, name: "John Doe", status: "pending" },
    { id: 2, name: "Jane Smith", status: "approved" },
    { id: 3, name: "Mike Johnson", status: "pending" },
    { id: 4, name: "Emily Brown", status: "denied" },
    { id: 5, name: "David Lee", status: "approved" },
    { id: 6, name: "Sarah Parker", status: "pending" },
    { id: 7, name: "Chris Evans", status: "approved" },
    { id: 8, name: "Olivia Johnson", status: "denied" },
    { id: 9, name: "Robert Smith", status: "pending" },
    { id: 10, name: "Sophia Garcia", status: "approved" },
    { id: 11, name: "James Williams", status: "pending" },
    { id: 12, name: "Isabella Brown", status: "approved" },
    { id: 13, name: "Liam Jones", status: "denied" },
    { id: 14, name: "Mia Davis", status: "pending" },
    { id: 15, name: "Noah Miller", status: "approved" },
    { id: 16, name: "Ava Wilson", status: "pending" },
    { id: 17, name: "Elijah Moore", status: "denied" },
    { id: 18, name: "Charlotte Taylor", status: "approved" },
    { id: 19, name: "William Anderson", status: "pending" },
    { id: 20, name: "Amelia Thomas", status: "approved" },
    { id: 21, name: "Ethan Jackson", status: "pending" },
    { id: 22, name: "Harper White", status: "approved" },
    { id: 23, name: "Lucas Harris", status: "denied" },
    { id: 24, name: "Ella Martin", status: "pending" },
    { id: 25, name: "Mason Thompson", status: "approved" },
    { id: 26, name: "Aiden Garcia", status: "pending" },
    { id: 27, name: "Scarlett Martinez", status: "approved" },
    { id: 28, name: "Jacob Robinson", status: "denied" },
    { id: 29, name: "Sofia Clark", status: "pending" },
    { id: 30, name: "Michael Rodriguez", status: "approved" },
    { id: 31, name: "Benjamin Lewis", status: "pending" },
    { id: 32, name: "Aria Lee", status: "approved" },
    { id: 33, name: "Jackson Walker", status: "denied" },
    { id: 34, name: "Chloe Hall", status: "pending" },
    { id: 35, name: "James Young", status: "approved" },
    { id: 36, name: "Grace King", status: "pending" },
    { id: 37, name: "Daniel Wright", status: "approved" },
    { id: 38, name: "Lily Scott", status: "denied" },
    { id: 39, name: "Samuel Green", status: "pending" },
    { id: 40, name: "Victoria Adams", status: "approved" },
    { id: 41, name: "Henry Baker", status: "pending" },
    { id: 42, name: "Samantha Nelson", status: "approved" },
  ],
  cooks: [
    { id: 1, name: "Alice Brown", status: "pending" },
    { id: 2, name: "Bob Wilson", status: "denied" },
    { id: 3, name: "Carol Davis", status: "approved" },
    { id: 4, name: "Eva Martinez", status: "pending" },
    { id: 5, name: "Frank Thomas", status: "approved" },
    { id: 6, name: "Megan White", status: "pending" },
    { id: 7, name: "Oliver Harris", status: "approved" },
    { id: 8, name: "Sophia Clark", status: "denied" },
    { id: 9, name: "David Lewis", status: "pending" },
    { id: 10, name: "Chloe King", status: "approved" },
    { id: 11, name: "Lucas Scott", status: "pending" },
    { id: 12, name: "Ella Adams", status: "approved" },
    { id: 13, name: "Noah Baker", status: "denied" },
    { id: 14, name: "Liam Young", status: "pending" },
    { id: 15, name: "Amelia Thompson", status: "approved" },
    { id: 16, name: "Aiden Roberts", status: "pending" },
    { id: 17, name: "Emma Turner", status: "denied" },
    { id: 18, name: "Mason Rodriguez", status: "approved" },
    { id: 19, name: "Aria Edwards", status: "pending" },
    { id: 20, name: "Ethan Walker", status: "approved" },
    { id: 21, name: "Scarlett Hall", status: "pending" },
    { id: 22, name: "Oliver Lewis", status: "approved" },
    { id: 23, name: "Jack Wilson", status: "denied" },
    { id: 24, name: "Lily Johnson", status: "pending" },
    { id: 25, name: "Samuel Brown", status: "approved" },
    { id: 26, name: "Chloe Martin", status: "pending" },
    { id: 27, name: "Grace Garcia", status: "approved" },
    { id: 28, name: "Henry Thompson", status: "denied" },
    { id: 29, name: "Ava Martinez", status: "pending" },
    { id: 30, name: "Daniel Hall", status: "approved" },
    { id: 31, name: "Ella Johnson", status: "pending" },
    { id: 32, name: "James Wilson", status: "approved" },
    { id: 33, name: "Sofia Davis", status: "denied" },
    { id: 34, name: "Liam Robinson", status: "pending" },
    { id: 35, name: "Emily Lee", status: "approved" },
    { id: 36, name: "Lucas Martinez", status: "pending" },
    { id: 37, name: "Mia Young", status: "approved" },
    { id: 38, name: "Jack White", status: "denied" },
    { id: 39, name: "Oliver King", status: "pending" },
    { id: 40, name: "Aiden Baker", status: "approved" },
    { id: 41, name: "Harper Scott", status: "pending" },
    { id: 42, name: "Sophia Clark", status: "approved" },
  ],
};

interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  isActive: boolean;
  onClick: () => void;
  subItems?: MenuItemProps[];
  isExpanded?: boolean;
}

function useOwnEmail() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmail() {
      const url = process.env.NEXT_PUBLIC_API_URL + '/api/users/me/';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const res = await response.json();
          setEmail(res.email);
        } else {
          console.error('Error fetching user data:', response);
          setError('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      }
    }

    fetchEmail();
  }, []);

  return { email, error };
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
      className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
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

  const [activeItem, setActiveItem] = useState("Dashboard");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [permissions, setPermissions] =
    useState<Permissions>(initialPermissions);
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { email, error: emailError } = useOwnEmail();

  if (emailError) {
    router.push("/login");
  }

  const usersPerPage = 11;

  const menuItems = [
    { icon: HomeIcon, text: "Dashboard" },
    {
      icon: UsersIcon,
      text: "User Settings",
      subItems: [
        { icon: ChefHat, text: "Cooks" },
        { icon: Truck, text: "Deliverers" },
      ],
    },
    { icon: BarChartIcon, text: "Analytics" },
    { icon: SettingsIcon, text: "Settings" },
  ];

  useEffect(() => {
    if (activeItem === "Cooks" || activeItem === "Deliverers") {
      const type = activeItem.toLowerCase() as "cooks" | "deliverers";
      const startIndex = (currentPage - 1) * usersPerPage;
      const endIndex = startIndex + usersPerPage;
      setVisibleUsers(permissions[type].slice(startIndex, endIndex));
    }
  }, [activeItem, permissions, currentPage]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleItemClick = (item: MenuItemProps) => {
    if (item.subItems) {
      setExpandedItems((prev) =>
        prev.includes(item.text)
          ? prev.filter((i) => i !== item.text)
          : [...prev, item.text]
      );
      if (!expandedItems.includes(item.text)) {
        setActiveItem(item.subItems[0].text);
      }
    } else {
      setActiveItem(item.text);
    }
  };

  const handlePermission = (
    type: "cooks" | "deliverers",
    id: number,
    status: "approved" | "denied"
  ) => {
    setPermissions((prev) => {
      const updatedUsers = prev[type].map((user) =>
        user.id === id ? { ...user, status } : user
      );
      return { ...prev, [type]: updatedUsers };
    });
  };

  const renderContent = () => {
    if (activeItem === "Cooks" || activeItem === "Deliverers") {
      const type = activeItem.toLowerCase() as "cooks" | "deliverers";
      const totalPages = Math.ceil(permissions[type].length / usersPerPage);

      return (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">
            {activeItem} List
          </h3>
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {visibleUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center">
                    <User className="mr-2" size={20} />
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${user.status === "approved"
                        ? "bg-green-200 text-green-900"
                        : user.status === "denied"
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
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <p className="text-gray-300">
          Welcome to the {activeItem.toLowerCase()} section of your admin panel.
          Here you can manage and view important information related to{" "}
          {activeItem.toLowerCase()}.
        </p>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Side Menu - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-800 overflow-y-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <div className="flex flex-col p-4">
          <div className="mb-4">
            <p>Welcome,</p>
            <p className="font-semibold italic text-blue-500"> {email}</p>
          </div>
          <button className="flex items-center space-x-2 text-red-300 hover:text-red" onClick={() => router.push("/logout")}>
            <LogOutIcon className="h-5 w-5" />
            <p>Log out</p>
          </button>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
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

      </aside>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-800 text-gray-300"
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
        <aside className="fixed inset-y-0 left-0 z-10 w-64 bg-gray-800 md:hidden overflow-y-auto">
          <div className="p-4 mt-14">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
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
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white">
              <LogOutIcon className="h-5 w-5" />
              <Link href="/">Logout</Link>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <h2 className="text-3xl font-semibold mb-4">{activeItem}</h2>
        {renderContent()}
      </main>
    </div>
  );
}
