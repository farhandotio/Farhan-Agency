import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart, // NEW
  Pie,      // NEW
  Cell,     // NEW
} from "recharts";
import {
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiTrendingUp,
  FiEye, 
} from "react-icons/fi";

// --- 1. Dummy Data ---
const allChartData = [
  { name: "Jan", Sales: 4000 },
  { name: "Feb", Sales: 3000 },
  { name: "Mar", Sales: 2000 },
  { name: "Apr", Sales: 2780 },
  { name: "May", Sales: 1890 },
  { name: "Jun", Sales: 2390 },
  { name: "Jul", Sales: 3490 },
];

// Sales data for the last 6 months (Feb to Jul)
const chartData = allChartData.slice(-6); 
// chartData will now be: [{ name: "Feb", Sales: 3000 }, { name: "Mar", Sales: 2000 }, { name: "Apr", Sales: 2780 }, { name: "May", Sales: 1890 }, { name: "Jun", Sales: 2390 }, { name: "Jul", Sales: 3490 }]


const ordersData = [
  {
    id: "#1001",
    customer: "Alice Johnson",
    date: "2025-12-01",
    total: "$149.99",
    status: "Delivered",
  },
  {
    id: "#1002",
    customer: "Bob Smith",
    date: "2025-12-02",
    total: "$75.50",
    status: "Pending",
  },
  {
    id: "#1003",
    customer: "Charlie Brown",
    date: "2025-12-03",
    total: "$320.00",
    status: "Shipped",
  },
  {
    id: "#1004",
    customer: "Diana Prince",
    date: "2025-12-04",
    total: "$12.99",
    status: "Delivered",
  },
];

// New Dummy Data for User Activity (Unchanged)
const activityData = [
  {
    user: "Guest-123",
    time: "2 mins ago",
    details: "Viewed Product: T-Shirt Pro",
    country: "US",
    device: "Desktop",
  },
  {
    user: "user@example.com",
    time: "5 mins ago",
    details: "Added item to cart",
    country: "CA",
    device: "Mobile",
  },
  {
    user: "Guest-456",
    time: "10 mins ago",
    details: "Visited Homepage",
    country: "IN",
    device: "Tablet",
  },
  {
    user: "new_reg_01",
    time: "15 mins ago",
    details: "Completed registration",
    country: "DE",
    device: "Desktop",
  },
  {
    user: "user@example.com",
    time: "20 mins ago",
    details: "Viewed Checkout Page",
    country: "CA",
    device: "Mobile",
  },
];

// New Data for Regional Pie/Doughnut Chart (Unchanged)
const regionData = [
  { name: "North America (50%)", value: 50, color: "#4f46e5" }, // Indigo/Blue
  { name: "Europe (30%)", value: 30, color: "#10b981" },        // Green
  { name: "Asia (20%)", value: 20, color: "#f59e0b" },          // Amber/Yellow
];


// --- 2. Components ---

// Metric Card Component (Unchanged)
const MetricCard = ({ title, value, icon: Icon, color, className }) => (
  <div
    className={`p-5 rounded-lg shadow-lg flex items-center justify-between bg-cardBg ${className}`}
  >
    <div>
      <p className="text-sm font-medium text-mutedText">{title}</p>
      <p className="text-3xl font-bold mt-1 text-text">{value}</p>
    </div>
    <div
      className={`p-3 rounded-full bg-opacity-20 ${
        color.includes("blue") || color.includes("indigo")
          ? "bg-blue-200 text-blue-600"
          : color.includes("green")
          ? "bg-green-200 text-green-600"
          : color.includes("red")
          ? "bg-red-200 text-red-600"
          : color.includes("yellow")
          ? "bg-yellow-200 text-yellow-600"
          : "bg-gray-200 text-gray-600" // Fallback
      }`}
    >
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

// Recent Orders Table Component (Unchanged)
const RecentOrders = () => (
  <div className="bg-cardBg p-5 rounded-lg shadow-lg col-span-2">
    <h3 className="text-xl font-semibold mb-4 text-text">Recent Orders</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-bg">
        <thead className="bg-cardBg">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-mutedText uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-mutedText uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-mutedText uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-mutedText uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-mutedText uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-cardBg divide-y divide-cardBg">
          {ordersData.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">
                {order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-mutedText">
                {order.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-mutedText">
                {order.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-mutedText">
                {order.total}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
);

// Sales Chart Component (UPDATED to show last 6 months)
const SalesChart = () => (
  <div className="bg-cardBg rounded-lg shadow-lg py-6 h-[400px]">
    <h3 className="text-xl font-semibold mb-4 px-6 text-text">
      Monthly Sales Trend (Last 6 Months)
    </h3>
    <ResponsiveContainer width="100%" height="85%">
      <LineChart
        data={chartData} // Uses the sliced 6-month data
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
          labelStyle={{ color: "#333" }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="Sales"
          stroke="#4f46e5"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// --- New Component: Users by Region Doughnut Chart (Unchanged) ---
const UsersByRegionChart = () => (
  <div className="bg-cardBg p-5 rounded-lg shadow-lg h-[400px] flex flex-col">
    <h3 className="text-xl font-semibold mb-2 text-text">
      🗺️ Users by Region
    </h3>
    <ResponsiveContainer width="100%" height="100%" className="grow">
      <PieChart>
        <Pie
          data={regionData}
          dataKey="value"
          nameKey="name"
          cx="50%" 
          cy="50%" 
          innerRadius={80} 
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
        >
          {regionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right" 
            wrapperStyle={{ paddingLeft: '10px' }} 
            // Custom formatter to show the name with percentage
            formatter={(value, entry) => (
              <span className="text-mutedText">{entry.payload.name}</span>
            )}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);


// --- Updated Component: User Activity Log (Responsive) ---
const UserActivityLog = () => (
  <div className="bg-cardBg p-5 rounded-lg shadow-lg lg:col-span-3">
    <h3 className="text-xl font-semibold mb-4 text-text">
      👤 Live User Activity & Details
    </h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-bg table-auto">
        {/* Hide table header on small screens */}
        <thead className="hidden sm:table-header-group bg-cardBg">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-mutedText uppercase tracking-wider">
              User ID/Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-mutedText uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-mutedText uppercase tracking-wider">
              Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-mutedText uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-mutedText uppercase tracking-wider">
              Device
            </th>
          </tr>
        </thead>
        <tbody className="bg-cardBg divide-y divide-cardBg text-sm">
          {activityData.map((activity, index) => (
            // Change display to 'block' on small screens for better vertical flow
            <tr key={index} className="hover:bg-gray-50/50 block sm:table-row py-2 border-b-2 sm:border-b-0">
              <td className="px-6 py-2 block sm:table-cell text-text font-medium border-t sm:border-t-0">
                {/* Show label on small screen */}
                <span className="sm:hidden font-bold text-xs text-mutedText block mb-1">User ID/Email: </span>
                {activity.user}
              </td>
              <td className="px-6 py-2 block sm:table-cell text-mutedText">
                <span className="sm:hidden font-bold text-xs text-mutedText block mb-1">Time: </span>
                {activity.time}
              </td>
              <td className="px-6 py-2 block sm:table-cell text-mutedText">
                <span className="sm:hidden font-bold text-xs text-mutedText block mb-1">Details: </span>
                {activity.details}
              </td>
              <td className="px-6 py-2 block sm:table-cell text-mutedText">
                <span className="sm:hidden font-bold text-xs text-mutedText block mb-1">Country: </span>
                {activity.country}
              </td>
              <td className="px-6 py-2 block sm:table-cell text-mutedText">
                <span className="sm:hidden font-bold text-xs text-mutedText block mb-1">Device: </span>
                {activity.device}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


// --- 3. Main Dashboard Component ---

const Dashboard = () => {
  return (
    // Simple layout wrapper for a dashboard structure
    <div className="min-h-screen bg-bg">
      <h1 className="text-3xl font-bold text-text mb-6">
        Dashboard
      </h1>

      {/* Metric Cards Grid - Simplified to 3 columns for better look*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value="$85,450"
          icon={FiDollarSign}
          color="bg-blue" // Icon container will be blue
        />
        <MetricCard
          title="Total Orders"
          value="1,248"
          icon={FiShoppingBag}
          color="bg-green" // Icon container will be green
        />
        <MetricCard
          title="Total Sales"
          value="5,102"
          icon={FiTrendingUp}
          color="bg-red" // Icon container will be red
        />
        <MetricCard
          title="Total Users"
          value="452"
          icon={FiUsers}
          color="bg-yellow" // Icon container will be yellow
        />
        <MetricCard
          title="Website Views"
          value="15,870"
          icon={FiEye}
          color="bg-purple" // Using 'bg-purple' for a different color icon
        />
        {/* Placeholder/Extra space - add a simple colored card */}
         <MetricCard
          title="Conversion Rate"
          value="2.5%"
          icon={FiTrendingUp}
          color="bg-indigo"
          
        />
      </div>

      {/* Charts and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart (Takes 2/3 width on large screens) */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Users by Region (Now the Doughnut Chart) */}
        <UsersByRegionChart />
      </div>

      {/* New Feature: User Activity Log (Full Width) - Now responsive */}
      <div className="mt-6">
        <UserActivityLog />
        </div>

      {/* Recent Orders Feature (Full Width) */}
      <div className="mt-6">
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;