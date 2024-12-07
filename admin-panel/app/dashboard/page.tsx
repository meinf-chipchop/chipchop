
'use client'



import DashboardCharts from "@/app/components/DashboardPage/DashboardCharts";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard() {

  return (
    <div className="flex rounded-lg bg-white-200 ">
      <DashboardCharts />
    </div>
  )
}