// FilterContainer.tsx
import { Search } from "lucide-react"

type StatusFilterValue = "all" | "pending" | "approved" | "rejected";

interface FilterContainerProps {
  nameFilter: string;
  statusFilter: "all" | "pending" | "approved" | "rejected";
  onNameFilterChange: (value: string) => void;
  onStatusFilterChange: (value: StatusFilterValue) => void;
}

export function FilterContainer({
  nameFilter,
  statusFilter,
  onNameFilterChange,
  onStatusFilterChange,
}: Readonly<FilterContainerProps>) {
  return (
    <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => onNameFilterChange(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 bg-[#f0f0f0] text-[#2c3e50] rounded-md pl-10"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#6a9fad]" />
      </div>
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as StatusFilterValue)}
        className="w-full sm:w-auto px-4 py-2 bg-[#f0f0f0] text-[#2c3e50] rounded-md"
      >
        <option value="all">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
}
