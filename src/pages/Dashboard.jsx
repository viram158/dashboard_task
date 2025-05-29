import React, { useState } from "react";
import {
  User,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Bell,
  ChevronDown,
  BarChart3,
  FileText,
  Car,
  BookOpen,
  Briefcase,
  MapPin,
  HelpCircle,
  Newspaper,
  Settings,
  Package,
  Shield,
  Building,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import "./Dashboard.css";
import OrangeBackground from "../components/Orangebackground";
import RevenueChart from "../components/RevenueChart";
import SalesDetailsChart from "../components/SalesDetailsChart";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("October");

  // Sample data for the sales chart
  const salesData = [
    { day: "1st", value: 30 },
    { day: "5th", value: 45 },
    { day: "10th", value: 35 },
    { day: "15th", value: 40 },
    { day: "20th", value: 90 },
    { day: "25th", value: 65 },
    { day: "30th", value: 75 },
    { day: "35th", value: 80 },
    { day: "40th", value: 70 },
    { day: "45th", value: 85 },
    { day: "50th", value: 60 },
  ];

  // Sample data for revenue chart
  const revenueData = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 60 },
    { name: "Mar", value: 40 },
    { name: "Apr", value: 80 },
    { name: "May", value: 35 },
    { name: "Jun", value: 70 },
    { name: "Jul", value: 55 },
    { name: "Aug", value: 90 },
    { name: "Sep", value: 75 },
  ];

  const StatCard = ({ title, value, change, icon: Icon, trend, className }) => (
    <div className={`stat-card ${className}`}>
      <div className="stat-content">
        <div className="stat-info">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
          <div className="stat-change">
            {trend === "up" ? (
              <TrendingUp className="trend-icon" />
            ) : (
              <TrendingDown className="trend-icon" />
            )}
            <span>{change}</span>
          </div>
        </div>
        <div className="stat-icon">
          <Icon className="icon" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
       <OrangeBackground />
      {/* Sidebar */}

      {/* Main Content */}
      <div className="main-content" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
     
        {/* Dashboard Content */}
        <main className="dashboard-main">



          {/* Stats Cards */}
          <div className="stats-grid">
            {/* <StatCard
              title="Active Users"
              value="40,689"
              change="8.5% Up from yesterday"
              icon={Users}
              trend="up"
              className="stat-blue"
            />
            <StatCard
              title="Total Buyers"
              value="10293"
              change="1.3% Up from past week"
              icon={ShoppingCart}
              trend="up"
              className="stat-orange"
            />
            <StatCard
              title="Total Sellers"
              value="2040"
              change="1.8% Up from yesterday"
              icon={User}
              trend="up"
              className="stat-pink"
            />
            <StatCard
              title="Total Sales"
              value="$89,000"
              change="4.3% Down from yesterday"
              icon={DollarSign}
              trend="down"
              className="stat-green"
            /> */}
            <DashboardCard />
          </div>

          {/* Charts */}
          <div className="charts-grid">
            {/* Sales Details Chart */}
            <div className="chart-container">
              <div className="chart-header">
                <h3 className="chart-title">Sales Details</h3>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="chart-select"
                >
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>

              <div className="chart-content">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#3B82F6" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <RevenueChart/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
