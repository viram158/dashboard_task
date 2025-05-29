import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SideBar from './components/SideBar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Article from './pages/article/Article';
import AutoDealership from './pages/autodealership/AutoDealership';
import BlogCategory from './pages/blogcategory/BlogCategory';
import BlogPage from './pages/blogcategory/BlogPage';
import Faqs from './pages/faqs/Faqs';

const MainLayout = () => {
  return (
    <div className="layout">
      <SideBar />
      <div className="content-area">
        <Header />
        <main className="page-content" style={{ zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/articles" element={<Article />} />
            <Route path="/autodealership" element={<AutoDealership />} />
            <Route path="/blog/category" element={<BlogCategory />} />
            <Route path="/blog/page" element={<BlogPage />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
