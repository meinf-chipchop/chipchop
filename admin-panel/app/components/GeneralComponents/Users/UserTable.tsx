// components/GeneralComponents/Users/UserTable.tsx

import { User, Check, X } from "lucide-react";
import UserTableRow from "../Users/UserTableRow";

interface User {
  id: number;
  name: string;
  email: string;
  status: "Allowed" | "Banned";
  totalOrders: number;
}

interface UserTableProps {
  users: User[];
  onStatusChange: (id: number, newStatus: "Allowed" | "Banned") => void;
}

export default function UserTable({ users, onStatusChange }: UserTableProps) {
  return (
    <table className="min-w-full divide-y divide-[#e0e0e0]">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-[#2c3e50] uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-[#2c3e50] uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-[#2c3e50] uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-[#2c3e50] uppercase tracking-wider">
            Total Orders
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-[#2c3e50] uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-[#e0e0e0]">
        {users.map((user) => (
          <UserTableRow key={user.id} user={user} onStatusChange={onStatusChange} />
        ))}
      </tbody>
    </table>
  );
}
