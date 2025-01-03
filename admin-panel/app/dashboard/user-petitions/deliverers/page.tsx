'use client'

import { useState, useEffect } from "react"
import { User, Check, X } from "lucide-react"

import { Pagination } from "@/app/components/GeneralComponents/paginations"
import { FilterContainer } from "@/app/components/GeneralComponents/CooksDeliverers/FilterContainerCooksDeliverers"

import { AccountApprovalState, getAccountApprovals, setStateAccountApproval } from "@/lib/api/account-approvals"

interface User {
  id: number
  name: string
  status: "pending" | "approved" | "rejected"
}

const mapState = (state: string) => {
  switch (state) {
    case "A": return "approved"
    case "R": return "rejected"
    default: return "pending"
  }
}

export default function DeliverersPage() {
  const [deliverers, setDeliverers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [nameFilter, setNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const usersPerPage = 10

  useEffect(() => {
    const fetchDeliverers = async () => {
      const data = await getAccountApprovals(currentPage, usersPerPage)
      const mappedDeliverers: User[] = data.filter(i => i.role == "D").map(item => ({
        id: item.user_id,
        name: item.email,
        status: mapState(item.state)
      }))
      setDeliverers(mappedDeliverers)
    }
    fetchDeliverers()
  }, [currentPage])

  const filteredDeliverers = deliverers.filter(
    deliverer =>
      deliverer.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (statusFilter === "all" || deliverer.status === statusFilter)
  )

  const totalPages = Math.ceil(filteredDeliverers.length / usersPerPage)

  const handleApproval = async (id: number, newStatus: "A" | "R") => {
    await setStateAccountApproval(id, newStatus as AccountApprovalState)
    setDeliverers(prevDeliverers =>
      prevDeliverers.map(deliverer =>
        deliverer.id === id ? { ...deliverer, status: newStatus === "A" ? "approved" : "rejected" } : deliverer
      )
    )
  }

  const getDelivererStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-200 text-green-900"
      case "rejected":
        return "bg-red-200 text-red-900"
      default:
        return "bg-yellow-200 text-yellow-900"
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-[#2c3e50]">Deliverers Approval</h2>
      <FilterContainer
        nameFilter={nameFilter}
        statusFilter={statusFilter}
        onNameFilterChange={setNameFilter}
        onStatusFilterChange={setStatusFilter}
      />
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
          {filteredDeliverers.map((deliverer) => (
            <tr key={deliverer.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2c3e50] flex items-center">
                <User className="mr-2" size={20} />
                {deliverer.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2c3e50]">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getDelivererStatusColor(deliverer.status)}`}
                >
                  {deliverer.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="mr-2 p-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleApproval(deliverer.id, "A")}
                >
                  <Check size={16} />
                </button>
                <button
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleApproval(deliverer.id, "R")}
                >
                  <X size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}