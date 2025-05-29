
// import React from 'react';
// import SideBar from './components/SideBar';
// import Header from './components/Header';
// import Dashboard from './pages/Dashboard';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import './App.css';
// import Article from './pages/article/Article';
// import AutoDealership from './pages/autodealership/AutoDealership';
// import BlogCategory from './pages/blogcategory/BlogCategory';
// import BlogPage from './pages/blogcategory/BlogPage';
// import Faqs from './pages/faqs/Faqs';
// import LoginForm from './pages/login/LoginForm';

// function App() {
//   return (
//      <Router>
//     <div className="layout">
//       <SideBar />
//       <div className="content-area" >
//         <Header />
        
//         <main className="page-content" style={{  zIndex: 1 }}>
//         <Routes>
             
//               <Route path="/" element={<Navigate to="/dashboard" replace />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/articles" element={<Article />} />
//               <Route path="/autodealership" element={<AutoDealership />} />
//               <Route path="/blog/category" element={<BlogCategory />} />
//               <Route path="/blog/page" element={<BlogPage />} />
//               <Route path="/faqs" element={<Faqs />} />
//               <Route path="*" element={<h2>Page Not Found</h2>} />
//             </Routes>
//         </main>
//       </div>
//     </div>
//     </Router>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import SideBar from './components/SideBar';
// import Header from './components/Header';
// import Dashboard from './pages/Dashboard';
// import Article from './pages/article/Article';
// import AutoDealership from './pages/autodealership/AutoDealership';
// import BlogCategory from './pages/blogcategory/BlogCategory';
// import BlogPage from './pages/blogcategory/BlogPage';
// import Faqs from './pages/faqs/Faqs';
// import LoginForm from './pages/login/LoginForm';
// import './App.css';

// function isAuthenticated() {
//   return localStorage.getItem('user_id'); // or token check
// }

// // ✅ Protect routes
// const ProtectedRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<LoginForm />} />

//         {/* Protected Layout Routes */}
//         <Route
//           path="*"
//           element={
//             isAuthenticated() ? (
//               <div className="layout">
//                 <SideBar />
//                 <div className="content-area">
//                   <Header />
//                   <main className="page-content" style={{ zIndex: 1 }}>
//                     <Routes>
//                       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//                       <Route path="/dashboard" element={<Dashboard />} />
//                       <Route path="/articles" element={<Article />} />
//                       <Route path="/autodealership" element={<AutoDealership />} />
//                       <Route path="/blog/category" element={<BlogCategory />} />
//                       <Route path="/blog/page" element={<BlogPage />} />
//                       <Route path="/faqs" element={<Faqs />} />
//                       <Route path="*" element={<h2>Page Not Found</h2>} />
//                     </Routes>
//                   </main>
//                 </div>
//               </div>
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./MainLayout";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginForm />} />

        {/* Protected Routes with Layout */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
