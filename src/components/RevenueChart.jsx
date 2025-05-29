import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: '5k', sales: 25, profit: 45 },
  { month: '10k', sales: 30, profit: 55 },
  { month: '15k', sales: 28, profit: 35 },
  { month: '20k', sales: 35, profit: 40 },
  { month: '25k', sales: 32, profit: 50 },
  { month: '30k', sales: 45, profit: 65 },
  { month: '35k', sales: 55, profit: 45 },
  { month: '40k', sales: 48, profit: 55 },
  { month: '45k', sales: 42, profit: 35 },
  { month: '50k', sales: 50, profit: 70 },
  { month: '55k', sales: 45, profit: 85 },
  { month: '60k', sales: 52, profit: 75 }
];

const RevenueChart = () => {
  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    padding: '24px',
    width: '100%',
    maxWidth: '800px'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const selectStyle = {
    fontSize: '14px',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '4px',
    padding: '4px 12px',
    backgroundColor: 'white',
    outline: 'none'
  };

  const chartContainerStyle = {
    height: '320px'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>Revenue</h2>
        <select style={selectStyle}>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </div>

      {/* Chart */}
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            
            {/* Sales Area */}
            <Area
              type="monotone"
              dataKey="sales"
              stackId="1"
              stroke="#ff9580"
              fill="#ff9580"
              fillOpacity={0.8}
              strokeWidth={2}
            />
            
            {/* Profit Area */}
            <Area
              type="monotone"
              dataKey="profit"
              stackId="2"
              stroke="#c084fc"
              fill="#c084fc"
              fillOpacity={0.7}
              strokeWidth={2}
            />
            
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px'
              }}
              formatter={(value) => (
                <span style={{ 
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  {value === 'sales' ? 'Sales' : 'Profit'}
                </span>
              )}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;