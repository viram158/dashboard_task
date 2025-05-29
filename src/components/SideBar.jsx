import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
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
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, hasSubmenu = false, isActive = false, onClick, to, children, isSubmenuOpen }) => (
  <div>
    <div
      className={`sidebar-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={{ cursor: hasSubmenu ? 'pointer' : 'default' }}
    >
      <div className="sidebar-item-content">
        {Icon && <Icon className="sidebar-icon" />}
        {to ? (
          <Link to={to} className="sidebar-label">
            {label}
          </Link>
        ) : (
          <span className="sidebar-label">{label}</span>
        )}
      </div>
      {hasSubmenu && <ChevronDown className={`submenu-icon ${isSubmenuOpen ? 'rotate' : ''}`} />}
    </div>
    {hasSubmenu && isSubmenuOpen && <div className="submenu">{children}</div>}
  </div>
);

export default function SideBar() {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();
  const toggleSubmenu = (label) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };
  const isPathActive = (path) => location.pathname.startsWith(path);
  return (
    <div className="sidebar" style={{ position: 'relative', zIndex: 2 }}>
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
      <SidebarItem icon={BarChart3} label="Dashboard" isActive={isPathActive('/dashboard')} to="/dashboard" />
        <SidebarItem icon={FileText} label="Article" isActive={isPathActive('/articles')} to="/articles" />
        <SidebarItem icon={Car} label="Auto dealership" isActive={isPathActive('/autodealership')} to="/autodealership" />

        <SidebarItem
          icon={BookOpen}
          label="Blog"
          hasSubmenu
          onClick={() => toggleSubmenu('Blog')}
          isSubmenuOpen={openSubmenu === 'Blog'}
          isActive={['/blog/category', '/blog/page'].some(isPathActive)}
        >
          <Link to="/blog/category" className="submenu-item">Blog Category</Link>
          <Link to="/blog/page" className="submenu-item">Blog Page</Link>
          <Link  className="submenu-item">Blog</Link>
        </SidebarItem>

        <SidebarItem icon={Briefcase} label="Career" hasSubmenu />
        <SidebarItem icon={MapPin} label="Country, state, city" />
        <SidebarItem icon={HelpCircle} label="FAQ's" isActive={isPathActive('/faqs')}  to="/faqs"/>
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
  );
}
