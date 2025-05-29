import React from 'react';
import { Users, Package, Clock, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

const DashboardCard = () => {
  const cardData = [
    {
      title: "Active Users",
      value: "40,689",
      change: "8.5% Up from yesterday",
      isPositive: true,
      icon: Users,
      iconBg: "#e3f2fd",
      iconColor: "#1976d2"
    },
    {
      title: "Total Buyers",
      value: "10293",
      change: "1.3% Up from past week",
      isPositive: true,
      icon: Package,
      iconBg: "#fff3e0",
      iconColor: "#f57c00"
    },
    {
      title: "Total Sellers",
      value: "2040",
      change: "1.8% Up from yesterday",
      isPositive: true,
      icon: Clock,
      iconBg: "#fce4ec",
      iconColor: "#c2185b"
    },
    {
      title: "Total Sales",
      value: "$89,000",
      change: "4.3% Down from yesterday",
      isPositive: false,
      icon: TrendingUp,
      iconBg: "#e8f5e8",
      iconColor: "#388e3c"
    }
  ];

  const containerStyle = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    padding: '20px',
    
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    minWidth: '200px',
    flex: '1',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '1px solid #f0f0f0'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  };

  const titleStyle = {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    margin: 0
  };

  const iconContainerStyle = (bgColor) => ({
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  const valueStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '8px 0 12px 0'
  };

  const changeStyle = (isPositive) => ({
    fontSize: '12px',
    color: isPositive ? '#10b981' : '#ef4444',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: '500'
  });

  return (
    <div style={containerStyle}>
      {cardData.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div key={index} style={cardStyle}>
            <div style={headerStyle}>
              <h3 style={titleStyle}>{card.title}</h3>
              <div style={iconContainerStyle(card.iconBg)}>
                <IconComponent size={20} color={card.iconColor} />
              </div>
            </div>
            
            <div style={valueStyle}>{card.value}</div>
            
            <div style={changeStyle(card.isPositive)}>
              {card.isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {card.change}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCard;