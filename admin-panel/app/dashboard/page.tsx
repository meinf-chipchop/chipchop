
'use client'

import { useRouter } from "next/navigation";
import { me } from "@/lib/api/me";

import DashboardCharts from "../components/DashboardPage/DashboardCharts";


import React, { useState, useEffect } from "react"
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
  const router = useRouter();
  const { email, error: emailError } = useOwnEmail();

  if (emailError) {
    // Go back to the login page if there is an error fetching the user's email
    router.push("/");
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

  return (
    <div className="flex rounded-lg bg-white-200 ">
      <DashboardCharts />
    </div>
  )
}