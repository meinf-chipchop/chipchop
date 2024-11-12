
import { Check, X } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  status: "Allowed" | "Banned";
  totalOrders: number;
}

interface UserTableRowProps {
  user: User;
  onStatusChange: (id: number, newStatus: "Allowed" | "Banned") => void;
}

export default function UserTableRow({ user, onStatusChange }: Readonly<UserTableRowProps>) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2c3e50] flex items-center">
        {user.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2c3e50]">{user.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2c3e50]">
        <span
          className={`px-2 py-1 rounded-full text-xs ${user.status === "Allowed" ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"
            }`}
        >
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2c3e50]">{user.totalOrders}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          className="mr-2 p-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => onStatusChange(user.id, "Allowed")}
        >
          <Check size={16} />
        </button>
        <button
          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => onStatusChange(user.id, "Banned")}
        >
          <X size={16} />
        </button>
      </td>
    </tr>
  );
}
