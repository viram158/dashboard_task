import React, { useState } from 'react';
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
  Building
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('October');

  // Sample data for the sales chart
  const salesData = [
    { day: '1st', value: 30 },
    { day: '5th', value: 45 },
    { day: '10th', value: 35 },
    { day: '15th', value: 40 },
    { day: '20th', value: 90 },
    { day: '25th', value: 65 },
    { day: '30th', value: 75 },
    { day: '35th', value: 80 },
    { day: '40th', value: 70 },
    { day: '45th', value: 85 },
    { day: '50th', value: 60 }
  ];

  // Sample data for revenue chart
  const revenueData = [
    { name: 'Jan', value: 20 },
    { name: 'Feb', value: 60 },
    { name: 'Mar', value: 40 },
    { name: 'Apr', value: 80 },
    { name: 'May', value: 35 },
    { name: 'Jun', value: 70 },
    { name: 'Jul', value: 55 },
    { name: 'Aug', value: 90 },
    { name: 'Sep', value: 75 }
  ];

  const StatCard = ({ title, value, change, icon: Icon, trend, className }) => (
    <div className={`stat-card ${className}`}>
      <div className="stat-content">
        <div className="stat-info">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
          <div className="stat-change">
            {trend === 'up' ? (
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

  const SidebarItem = ({ icon: Icon, label, hasSubmenu = false, isActive = false }) => (
    <div className={`sidebar-item ${isActive ? 'active' : ''}`}>
      <div className="sidebar-item-content">
        <Icon className="sidebar-icon" />
        <span className="sidebar-label">{label}</span>
      </div>
      {hasSubmenu && <ChevronDown className="submenu-icon" />}
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Logo */}
        <div className="logo-section">
          <div className="logo-container">
            <div className="logo">
              <Building className="logo-icon" />
            </div>
            <div>
              <h2 className="logo-title">Admin Panel</h2>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="navigation">
          <SidebarItem icon={BarChart3} label="Dashboard" isActive={true} />
          <SidebarItem icon={FileText} label="Article" />
          <SidebarItem icon={Car} label="Auto dealership" hasSubmenu />
          <SidebarItem icon={BookOpen} label="Blog" hasSubmenu />
          <SidebarItem icon={Briefcase} label="Career" hasSubmenu />
          <SidebarItem icon={MapPin} label="Country, state, city" />
          <SidebarItem icon={HelpCircle} label="FAQ's" />
          <SidebarItem icon={Newspaper} label="Free shop news" hasSubmenu />
          <SidebarItem icon={HelpCircle} label="Help Center" hasSubmenu />
          <SidebarItem icon={Settings} label="How it works" hasSubmenu />
          <SidebarItem icon={Briefcase} label="Jobs" hasSubmenu />
          <SidebarItem icon={FileText} label="Press" hasSubmenu />
          <SidebarItem icon={Package} label="Product" hasSubmenu />
          <SidebarItem icon={Shield} label="Privacy & Terms" />
          <SidebarItem icon={Shield} label="Trust & safety" hasSubmenu />
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1 className="page-title">Dashboard</h1>
            
            <div className="header-actions">
              {/* Search */}
              <div className="search-container">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="search-input"
                />
              </div>
              
              {/* Notifications */}
              <div className="notification-container">
                <Bell className="notification-icon" />
                <div className="notification-badge"></div>
              </div>
              
              {/* Profile */}
              <div className="profile-container">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces&auto=format" 
                  alt="Profile" 
                  className="profile-image"
                />
                <div className="profile-info">
                  <p className="profile-name">Kalyani Kumar</p>
                  <p className="profile-role">Admin</p>
                </div>
                <ChevronDown className="profile-dropdown" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboard-main">
          {/* Stats Cards */}
          <div className="stats-grid">
            <StatCard 
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
            />
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
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#3B82F6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="chart-container">
              <div className="chart-header">
                <h3 className="chart-title">Revenue</h3>
                <select className="chart-select">
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>
              
              <div className="chart-content">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8B5CF6" 
                      fill="url(#colorRevenue)" 
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;