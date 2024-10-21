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
import { me } from "@/lib/api/me";
import {
  AccountApprovalState,
  getAccountApprovals,
  setStateAccountApproval,
} from "@/lib/api/account-approvals";
import { mapState } from "@/lib/api/state-mapper";

dotenv.config();

interface User {
  id: number;
  name: string;
  status: "pending" | "approved" | "rejected";
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
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  isActive: boolean;
  onClick: () => void;
  subItems?: MenuItemProps[];
  isExpanded?: boolean;
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
        isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
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

  const usersPerPage = 20;

  const [activeItem, setActiveItem] = useState("Dashboard");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { email, error: emailError } = useOwnEmail();
  const [approvals, setApprovals] = useApprovals(1, usersPerPage);

  if (emailError) {
    // Go back to the login page if there is an error fetching the user's email
    router.push("/login");
  }

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
      const type = activeItem.toLowerCase() as "cooks" | "deliverers";
      const startIndex = (currentPage - 1) * usersPerPage;
      const endIndex = startIndex + usersPerPage;
      setVisibleUsers(approvals[type].slice(startIndex, endIndex));
    }
  }, [activeItem, approvals, currentPage]);

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
    status: AccountApprovalState
  ) => {
    setStateAccountApproval(id, status).then(() => {
      setApprovals((prev) => {
        const status_str = status === "A" ? "Approved" : "Rejected";

        const updatedUsers = prev[type].map((user) =>
          user.id === id ? { ...user, status_str } : user
        );
        return { ...prev, [type]: updatedUsers };
      });
    });
  };

  const renderContent = () => {
    if (activeItem === "Cooks" || activeItem === "Deliverers") {
      const type = activeItem.toLowerCase() as "cooks" | "deliverers";
      const totalPages = Math.ceil(approvals[type].length / usersPerPage);

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
                        handlePermission(
                          type,
                          user.id,
                          AccountApprovalState.APPROVED
                        )
                      }
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() =>
                        handlePermission(
                          type,
                          user.id,
                          AccountApprovalState.REJECTED
                        )
                      }
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
          <button
            className="flex items-center space-x-2 text-red-300 hover:text-red"
            onClick={() => router.push("/logout")}
          >
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
