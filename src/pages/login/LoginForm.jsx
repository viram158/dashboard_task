import React, { useState } from 'react';
import './LoginForm.css';
import ApiService from '../../controller/ApiController';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(true);
  const [loading, setLoading] = useState(false); // ⬅️ New state
  const navigate = useNavigate(); // ⬅️ Redirect after login
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    ApiService.login({
      email,
      password
    }).then((response)=>{
      
      localStorage.setItem('authtoken',response.data.accessToken);
      localStorage.setItem('user_id',response.data.data._id);
      Swal.fire({
        icon: 'success',
        title: 'Login Successfull',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/dashboard"); // ⬅️ Redirect on success
    }) .catch((error) => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid credentials or server error',
      });
    })
    .finally(() => {
      setLoading(false); // Stop loading
    });
   
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <div className="logo-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4V6H18C19.1 6 20 6.9 20 8V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V8C4 6.9 4.9 6 6 6H10V4C10 2.9 10.9 2 12 2ZM12 4V6H12V4ZM6 8V20H18V8H6ZM12 10C13.1 10 14 10.9 14 12S13.1 14 12 14 10 13.1 10 12 10.9 10 12 10Z" fill="#e91e63"/>
            </svg>
          </div>
          <div className="logo-text">
            <div className="logo-main">PERE SHOP</div>
            <div className="logo-sub">MANAGER</div>
          </div>
        </div>

        <div className="form-header">
          <h2>Login to Account</h2>
          <p>Please enter your email and password to continue</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot-password">Forget Password?</a>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input password-input"
              placeholder="••••••"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkmark"></span>
              Remember Password
            </label>
          </div>

          <button onClick={handleSubmit} className="sign-in-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;