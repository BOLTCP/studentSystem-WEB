import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import getApiUrl from '../../api/get_Api_Url';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthUser from '../models/auth_user'
import '../styles/login_screen.css';

const LoginScreen = () => {
  const [loginName, setLoginName] = useState('');
  const hasFetched = useRef(false);
  const [passwordHash, setPasswordHash] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    if (!loginName.trim() || !passwordHash.trim()) {
      setErrorMessage('Please enter your login name and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const data = {
      login_name: loginName,
      password_hash: passwordHash,
    };

    try {
      const response = await axios.post(`${getApiUrl('/login')}`, data, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000,
      });

      if (response.status === 200) {
        console.log('Login successful!');
        const userType = response.data.authUser;

       if (rememberMe) {
        localStorage.setItem('username', loginName);
        localStorage.setItem('password', passwordHash);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
        
        const user = AuthUser.fromJson(userType);

        if (user.userRole === 'student') {
          navigate('/student_dashboard', { state: { user: user }});
        } else if (userType.userRole === 'teacher') {
          navigate('/teacher/dashboard/', { state: { user: user }});
        }
         
      } else if (response.status === 401) {
        console.log(response.data);
        setErrorMessage('Буруу нэр эсвэл нууц үг байна');
        return <LoginScreen />
      } else {
        setErrorMessage('Нэвтрэх үед алдаа гарлаа. Дахин оролдоно уу.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Сүлжээний алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setLoginName(storedUsername);
      setPasswordHash(storedPassword);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="login-background"> {/* You might want a specific class for the background in body */}
      <div className="login-container">
        <h2 className="login-title">Нэвтрэх цонх</h2>
        {errorMessage && (
          <div className="error-message" role="alert">
            <strong className="error-strong">Алдаа!</strong>
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="loginName" className="form-label">
            Нэвтрэх нэр :
          </label>
          <input
            type="text"
            id="loginName"
            className="form-input"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Нууц код :
          </label>
          <div className="password-input-wrapper">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              className="form-input"
              value={passwordHash}
              onChange={(e) => setPasswordHash(e.target.value)}
            />
            <div className="password-toggle-button">
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>
        </div>
        <div className="remember-me-group">
          <input
            id="rememberMe"
            type="checkbox"
            className="remember-me-input"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="rememberMe" className="remember-me-label">
            Намайг санах
          </label>
        </div>
        <div className="login-button-group">
          <button
            className="login-button"
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? <div className="animate-spin"></div> : 'Нэвтрэх'}
          </button>
          <button
            className="contact-button"
            type="button"
            onClick={() => navigate('/contact_us')}
          >
            Холбогдох
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            className="signup-button"
            type="button"
            onClick={() => navigate('/admission_courses')}
          >
            Хөтөлбөрт бүртгүүлэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;