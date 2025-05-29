// import React from "react";
// import {
//   User,
//   ShoppingCart,
//   Users,
//   DollarSign,
//   TrendingUp,
//   TrendingDown,
//   Search,
//   Bell,
//   ChevronDown,
//   BarChart3,
//   FileText,
//   Car,
//   BookOpen,
//   Briefcase,
//   MapPin,
//   HelpCircle,
//   Newspaper,
//   Settings,
//   Package,
//   Shield,
//   Building,
// } from "lucide-react";
// import "./header.css";
// export default function Header() {
//   return (
//     <div>
   
//       <header className="header">
//         <div className="header-content">
//           <h1 className="page-title">Dashboard</h1>

//           <div className="header-actions">
//             {/* Search */}
//             <div className="search-container">
//               <Search className="search-icon" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="search-input"
//               />
//             </div>

//             {/* Notifications */}
//             <div className="notification-container">
//               <Bell className="notification-icon" />
//               <div className="notification-badge"></div>
//             </div>

//             {/* Profile */}
//             <div className="profile-container">
//               <img
//                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces&auto=format"
//                 alt="Profile"
//                 className="profile-image"
//               />
//               <div className="profile-info">
//                 <p className="profile-name">Kalyani Kumar</p>
//                 <p className="profile-role">Admin</p>
//               </div>
//               <ChevronDown className="profile-dropdown" />
//             </div>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }
// import React from 'react';
// import './Header.css';
// import {
//   User,
//   ShoppingCart,
//   Users,
//   DollarSign,
//   TrendingUp,
//   TrendingDown,
//   Search,
//   Bell,
//   ChevronDown,
//   BarChart3,
//   FileText,
//   Car,
//   BookOpen,
//   Briefcase,
//   MapPin,
//   HelpCircle,
//   Newspaper,
//   Settings,
//   Package,
//   Shield,
//   Building,
// } from "lucide-react";
// const Header = () => {
//   return (
//     <header className="header">
//         <div className="search-container">
//        <Search className="search-icon" />
//              <input
//                 type="text"
//                 placeholder="Search"                
//                  className="search-input"
//               />
//               </div>
//       <div className="profile">
//                    <img
//                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces&auto=format"
//                 alt="Profile"
//                  className="profile-image"
//                />
//         <div>
//           <div className="username">Kalyani Kumar</div>
//           <div className="role">Admin</div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useEffect, useRef, useState } from 'react';
import './header.css';
import { Search, Bell, ChevronDown, User, Lock, Activity, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileRef = useRef(null); // ⬅️ Attach to the full profile section
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = (action) => {
    console.log(`${action} clicked`);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id'); // Remove user_id from localStorage
    localStorage.removeItem('authtoken'); // Remove user_id from localStorage
    navigate('/login'); // Redirect to login page
    window.location.reload();
  }
  return (
    <header className="header">
      <div className="header-center">
        <div className="search-box">
          <Search className="icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="header-right">
        <div className="notification">
          <Bell className="icon" />
          <span className="badge">9</span>
        </div>

        <div className="profile" ref={profileRef}> {/* Updated ref here */}
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces&auto=format"
            alt="Profile"
            className="profile-image"
          />
          <div className="info">
            <div className="username">Kalyani Kumar</div>
            <div className="role">Admin</div>
          </div>
          <ChevronDown
            className={`icon dropdown-icon ${isDropdownOpen ? 'rotated' : ''}`}
            onClick={toggleDropdown}
          />

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => handleMenuClick('Manage Account')}>
                <User className="dropdown-icon-small" />
                <span>Manage Account</span>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuClick('Change Password')}>
                <Lock className="dropdown-icon-small" />
                <span>Change Password</span>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuClick('Activity Log')}>
                <Activity className="dropdown-icon-small" />
                <span>Activity Log</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item logout" onClick={() => handleLogout()}>
                <LogOut className="dropdown-icon-small" />
                <span>Log out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


export default Header;
