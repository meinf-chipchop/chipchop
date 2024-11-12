// components/DashboardCharts.tsx
import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

const fetchData = async () => {
  const response = await fetch('/api/stats');
  return await response.json();
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
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
      const mapDayNumber = (n: number): string => {
        switch (n) {
          case 0: return 'Sun';
          case 1: return 'Mon';
          case 2: return 'Tue';
          case 3: return 'Wed';
          case 4: return 'Thu';
          case 5: return 'Fri';
          case 6: return 'Sat';
          default: return '';
        }
      }

      const mapMonthNumber = (n: number): string => {
        switch (n) {
          case 1: return 'Jan';
          case 2: return 'Feb';
          case 3: return 'Mar';
          case 4: return 'Apr';
          case 5: return 'May';
          case 6: return 'Jun';
          case 7: return 'Jul';
          case 8: return 'Aug';
          case 9: return 'Sep';
          case 10: return 'Oct';
          case 11: return 'Nov';
          case 12: return 'Dec';
          default: return '';
        }
      }

      setMonthlyData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: data.new_cooks.map((entry: number[]) => entry[1]),
          },
          {
            ...prevData.datasets[1],
            data: data.new_deliverers.map((entry: number[]) => entry[1]),
          },
        ],
      }));

      setOrderData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: data.orders_by_week_day.map((entry: number[]) => entry[1]),
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
              <p className="text-sm text-white">Total Users</p>
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
