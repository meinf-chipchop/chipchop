// pages/users/UsersPage.tsx

'use client';

import { useState, useEffect } from "react";
import { Pagination } from "../../../components/GeneralComponents/paginations";
import { FilterUsers } from "../../../components/GeneralComponents/Users/FilterUsers";
import UserTable from "../../../components/GeneralComponents/Users/UserTable";

interface User {
  id: number;
  name: string;
  email: string;
  status: "Allowed" | "Banned";
  totalOrders: number;
}

const mockUsers: User[] = Array(20)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    status: Math.random() > 0.5 ? "Allowed" : "Banned",
    totalOrders: Math.floor(Math.random() * 100) + 1,
  }));

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Allowed" | "Banned">("all");
  const [minOrders, setMinOrders] = useState<number | null>(null);
  const [maxOrders, setMaxOrders] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const usersPerPage = 11;

  useEffect(() => {
    setUsers(mockUsers);
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
