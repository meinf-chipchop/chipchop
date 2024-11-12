// pages/users/UsersPage.tsx

'use client';

import { useState, useEffect } from "react";
import { Pagination } from "../../../components/GeneralComponents/paginations";
import { FilterUsers } from "../../../components/GeneralComponents/Users/FilterUsers";
import UserTable from "../../../components/GeneralComponents/Users/UserTable";
import { getUsers } from "@/lib/api/users";

interface User {
  id: number;
  name: string;
  email: string;
  status: "Allowed" | "Banned";
  totalOrders: number;
}

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Allowed" | "Banned">("all");
  const [minOrders, setMinOrders] = useState<number | null>(null);
  const [maxOrders, setMaxOrders] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const usersPerPage = 11;

  useEffect(() => {
    const data = async () => {
      const mapStatus = (status: boolean) => {
        return status ? "Banned" : "Allowed";
      }

      const res = await getUsers();
      const users: any[] = res.results;

      const mappedUsers = users.map((user) => ({
        id: user.id,
        name: user.first_name,
        email: user.email,
        status: mapStatus(user.banned),
        totalOrders: user.total_orders,
      }) as User);

      setUsers(mappedUsers);
    }
    data();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesNameOrEmail =
      user.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
      user.email.toLowerCase().includes(nameFilter.toLowerCase());

    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    const matchesMinOrders = minOrders === null || user.totalOrders >= minOrders;
    const matchesMaxOrders = maxOrders === null || user.totalOrders <= maxOrders;

    return matchesNameOrEmail && matchesStatus && matchesMinOrders && matchesMaxOrders;
  });

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleStatusChange = (id: number, newStatus: "Allowed" | "Banned") => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-[#2c3e50]">Users Approval</h2>

      <FilterUsers
        nameFilter={nameFilter}
        statusFilter={statusFilter}
        minOrders={minOrders}
        maxOrders={maxOrders}
        onNameFilterChange={setNameFilter}
        onStatusFilterChange={setStatusFilter}
        onMinOrdersChange={setMinOrders}
        onMaxOrdersChange={setMaxOrders}
      />

      <UserTable users={paginatedUsers} onStatusChange={handleStatusChange} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
