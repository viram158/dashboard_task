import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area, AreaChart, ComposedChart } from 'recharts';

const data = [
  { period: '5k', sales: 25000 },
  { period: '10k', sales: 30000 },
  { period: '15k', sales: 45000 },
  { period: '20k', sales: 50000 },
  { period: '25k', sales: 35000 },
  { period: '30k', sales: 40000 },
  { period: '35k', sales: 55000 },
  { period: '40k', sales: 48000 },
  { period: '45k', sales: 52000 },
  { period: '50k', sales: 58000 },
  { period: '55k', sales: 85000 }, // Peak point for tooltip
  { period: '60k', sales: 45000 },
  { period: '65k', sales: 38000 },
  { period: '70k', sales: 42000 },
  { period: '75k', sales: 65000 },
  { period: '80k', sales: 58000 },
  { period: '85k', sales: 62000 },
  { period: '90k', sales: 60000 },
  { period: '95k', sales: 55000 },
  { period: '100k', sales: 58000 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#4285f4',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '500',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        ${payload[0].value.toLocaleString()}
      </div>
    );
  }
  return null;
};

const SalesDetailsChart = () => {
  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e8eaed',
    padding: '24px',
    width: '100%',
    maxWidth: '900px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '500',
    color: '#202124',
    margin: 0
  };

  const selectStyle = {
    fontSize: '14px',
    color: '#5f6368',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    padding: '6px 12px',
    backgroundColor: 'white',
    outline: 'none',
    cursor: 'pointer'
  };

  const chartContainerStyle = {
    height: '280px',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>Sales Details</h2>
        <select style={selectStyle}>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </div>

      {/* Chart */}
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 40,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4285f4" stopOpacity={0.3}/>
                <stop offset="100%" stopColor="#4285f4" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="none" 
              stroke="#f1f3f4" 
              horizontal={true}
              vertical={false}
            />
            
            <XAxis 
              dataKey="period" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#5f6368' }}
              interval={1}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#5f6368' }}
              domain={[20000, 100000]}
              tickFormatter={(value) => `${value/1000}k`}
            />
            
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#4285f4', strokeWidth: 1, strokeDasharray: '2 2' }}
            />
            
            {/* Area fill */}
            <Area
              type="monotone"
              dataKey="sales"
              stroke="none"
              fill="url(#salesGradient)"
              fillOpacity={1}
            />
            
            {/* Line with dots */}
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4285f4"
              strokeWidth={2}
              dot={{ 
                fill: 'white',
                stroke: '#4285f4',
                strokeWidth: 2,
                r: 3
              }}
              activeDot={{ 
                r: 5, 
                fill: 'white',
                stroke: '#4285f4',
                strokeWidth: 3
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesDetailsChart;