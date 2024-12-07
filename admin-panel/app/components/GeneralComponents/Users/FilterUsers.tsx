import { LucideArrowDown01, LucideArrowUp10, Search } from "lucide-react";

type StatusFilterValue = "all" | "Allowed" | "Banned";

interface FilterUsersProps {
  nameFilter: string;
  statusFilter: StatusFilterValue;
  minOrders: number | null;
  maxOrders: number | null;
  onNameFilterChange: (value: string) => void;
  onStatusFilterChange: (value: StatusFilterValue) => void;
  onMinOrdersChange: (value: number | null) => void;
  onMaxOrdersChange: (value: number | null) => void;
}

export function FilterUsers({
  nameFilter,
  statusFilter,
  minOrders,
  maxOrders,
  onNameFilterChange,
  onStatusFilterChange,
  onMinOrdersChange,
  onMaxOrdersChange,
}: Readonly<FilterUsersProps>) {
  return (
    <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
      {/* Filtro de Nome */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or email"
          value={nameFilter}
          onChange={(e) => onNameFilterChange(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 bg-[#f0f0f0] text-[#2c3e50] rounded-md pl-10"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#6a9fad]" />
      </div>

      {/* Filtro de Quantidade de Pedidos (Mínimo e Máximo) */}
      <div className="flex space-x-2">
        <div className="relative">

          <input
            type="number"
            placeholder="Min Orders"
            value={minOrders ?? ""}
            onChange={(e) => onMinOrdersChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full sm:w-40 px-4 py-2 bg-[#f0f0f0] text-[#2c3e50] rounded-md pl-10"
          />
          <LucideArrowDown01 className="absolute left-3 top-2.5 h-5 w-5 text-[#6a9fad]" />
        </div>

        <div className="relative">

          <input
            type="number"
            placeholder="Max Orders"
            value={maxOrders ?? ""}
            onChange={(e) => onMaxOrdersChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full sm:w-40 px-4 py-2 bg-[#f0f0f0] text-[#2c3e50] rounded-md pl-10"
          />
          <LucideArrowUp10 className="absolute left-3 top-2.5 h-5 w-5 text-[#6a9fad]" />
        </div>


      </div>

      {/* Filtro de Status */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as StatusFilterValue)}
        className="w-full sm:w-auto px-4 py-2 bg-[#f0f0f0] text-[#2c3e50] rounded-md"
      >
        <option value="all">All Statuses</option>
        <option value="Allowed">Allowed</option>
        <option value="Banned">Banned</option>
      </select>

    </div>
  );
}
