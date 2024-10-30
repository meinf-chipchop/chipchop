'use client'

import { useState, useEffect } from "react"
import { User, Check, X, Search } from "lucide-react"

// Mock API functions (replace with actual API calls)
const getAccountApprovals = async (page: number, pageSize: number) => {
  // Simulated API call
  return Array(pageSize).fill(null).map((_, index) => ({
    user: {
      id: page * pageSize + index + 1,
      email: `cook${page * pageSize + index + 1}@example.com`,
      role: "C"
    },
    state: Math.random() > 0.5 ? "P" : "A"
  }))
}

const setStateAccountApproval = async (id: number, state: "A" | "R") => {
  // Simulated API call
  console.log(`Setting state for user ${id} to ${state}`)
  return { success: true }
}

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

export default function CooksPage() {
  const [cooks, setCooks] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [nameFilter, setNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const usersPerPage = 10

  useEffect(() => {
    const fetchCooks = async () => {
      const data = await getAccountApprovals(currentPage, usersPerPage)
      const mappedCooks = data.map(item => ({
        id: item.user.id,
        name: item.user.email,
        status: mapState(item.state)
      }))
    //   setCooks(mappedCooks)
    }
    fetchCooks()
  }, [currentPage])

  const filteredCooks = cooks.filter(
    cook =>
      cook.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (statusFilter === "all" || cook.status === statusFilter)
  )

  const totalPages = Math.ceil(filteredCooks.length / usersPerPage)

  const handleApproval = async (id: number, newStatus: "A" | "R") => {
    await setStateAccountApproval(id, newStatus)
    setCooks(prevCooks =>
      prevCooks.map(cook =>
        cook.id === id ? { ...cook, status: newStatus === "A" ? "approved" : "rejected" } : cook
      )
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-[#2c3e50]">Cooks Approval</h2>
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
          <option value="rejected">Rejected</option>
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
          {filteredCooks.map((cook) => (
            <tr key={cook.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2c3e50] flex items-center">
                <User className="mr-2" size={20} />
                {cook.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2c3e50]">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    cook.status === "approved"
                      ? "bg-green-200 text-green-900"
                      : cook.status === "rejected"
                      ? "bg-red-200 text-red-900"
                      : "bg-yellow-200 text-yellow-900"
                  }`}
                >
                  {cook.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="mr-2 p-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleApproval(cook.id, "A")}
                >
                  <Check size={16} />
                </button>
                <button
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleApproval(cook.id, "R")}
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}