// components/DashboardCharts.tsx
import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

const fetchData = async () => {
  const response = await fetch('/api/stats');
  return response.json();
};

export default function DashboardCharts() {
  const [monthlyData, setMonthlyData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Cooks',
        data: [],
        borderColor: '#b89d6a',
        backgroundColor: 'rgba(184, 157, 106, 0.5)',
      },
      {
        label: 'New Deliverers',
        data: [],
        borderColor: '#6a9fad',
        backgroundColor: 'rgba(106, 159, 173, 0.5)',
      },
    ],
  });

  const [orderData, setOrderData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [],
        backgroundColor: 'rgba(184, 157, 106, 0.6)',
      },
    ],
  });

  const [metrics, setMetrics] = useState({
    totalCooks: 0,
    totalDeliverers: 0,
    totalUsers: 0,
    ordersThisMonth: 0,
  });

  

  useEffect(() => {
    fetchData().then((data) => {
      setMonthlyData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: data.new_cooks.map((entry: { month: string; amount: number }) => entry.amount),
          },
          {
            ...prevData.datasets[1],
            data: data.new_deliverers.map((entry: { month: string; amount: number }) => entry.amount),
          },
        ],
      }));

      setOrderData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: data.orders.map((entry: { week_day: string; amount: number }) => entry.amount),
          },
        ],
      }));

      setMetrics({
        totalCooks: data.total_cooks,
        totalDeliverers: data.total_deliverers,
        totalUsers: data.total_users,
        ordersThisMonth: data.orders_this_month,
      });
    });
  }, []);

  return (
    <div className="bg-white w-full lg:w-4/4 p-6 mx-auto rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-left">Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">New Users (Monthly)</h3>
          <Line data={monthlyData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' as const },
              title: { display: true, text: 'New Cooks and Deliverers' },
            },
          }} />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Orders (Weekly)</h3>
          <Bar data={orderData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' as const },
              title: { display: true, text: 'Weekly Order Distribution' },
            },
          }} />
        </div>
        <div className="col-span-1 lg:col-span-2 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#6a9fad] p-4 rounded-lg">
              <p className="text-sm text-white">Total Cooks</p>
              <p className="text-2xl font-bold text-white">{metrics.totalCooks}</p>
            </div>
            <div className="bg-[#6a9fad] p-4 rounded-lg">
              <p className="text-sm text-white">Total Deliverers</p>
              <p className="text-2xl font-bold text-white">{metrics.totalUsers}</p>
            </div>
            <div className="bg-[#6a9fad] p-4 rounded-lg">
              <p className="text-sm text-white">Total Deliverers</p>
              <p className="text-2xl font-bold text-white">{metrics.totalDeliverers}</p>
            </div>
            <div className="bg-[#6a9fad] p-4 rounded-lg">
              <p className="text-sm text-white">Orders This Month</p>
              <p className="text-2xl font-bold text-white">{metrics.ordersThisMonth}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
