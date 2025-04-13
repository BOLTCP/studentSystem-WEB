import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import getApiUrl from '../../api/get_Api_Url';
import UserDetails from '../models/user_details';
import StudentUser from '../models/student_user';
import MajorClass from '../models/major';
import Department from '../models/department';
import '../styles/student_dashboard.css'; // Import the CSS
import './profile_screen';

const StudentDashboard = () => {
  const location = useLocation();
  const user = location.state?.user; // Assuming you pass userId in state
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (user?.userId) {
        try {
          const response = await axios.post(getApiUrl('/User/Login/Student'), { userId: user.userId }, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
          });

          if (response.status === 200) {
            console.log('User data fetched!', response.data);
            const student = StudentUser.fromJsonStudent(response.data.student);
            const major = MajorClass.fromJsonMajor(response.data.major);
            const department = Department.fromJsonDepartment(response.data.department);

            setUserDetails(new UserDetails({ user, student, major, department }));
          } else {
            console.error('Error fetching user details:', response.status, response.data);
            setError('Failed to fetch user details.');
          }
        } catch (err) {
          console.error('Error fetching user details:', err);
          setError('Network error occurred.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('User ID not provided.');
        setLoading(false);
      }
    };

    fetchDetails();
  }, [user]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic (e.g., clear session, navigate to login)
    console.log('Logout clicked');
    navigate('/login'); // Example navigation to login
  };

  const buildProfileCard = (label, value) => (
    <div className="profile-card">
      <h6 className="profile-card-label">{label}</h6>
      <p className="profile-card-value">{value}</p>
    </div>
  );

  const renderBody = () => {
    if (loading) {
      return <div className="loading-container">Loading user details...</div>;
    }

    if (error) {
      return <div className="error-container">{error}</div>;
    }

    if (userDetails) {
      return (
        <div className="dashboard-content">
          <h2 className="dashboard-title">Сурагчийн Хянах Самбар</h2>
          <div className="profile-card-grid">
            {buildProfileCard('Овог Нэр', `${userDetails.user?.lname} ${userDetails.user?.fname}`)}
            {buildProfileCard('ID', userDetails.student?.studentCode)}
            {buildProfileCard('Мэргэжил', userDetails.major?.majorName)}
            {buildProfileCard('Тэнхим', userDetails.department?.departmentName)}
          </div>
          {/* Placeholder for body content */}
          <div className="placeholder-body">
            <p>Main dashboard content will go here.</p>
          </div>
        </div>
      );
    }

    return <div className="no-data-container">Unable to load user details.</div>;
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-container">
          <button onClick={toggleDrawer} className="menu-button">
            {isDrawerOpen ? (
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.586-4.586-4.586 4.586a1 1 0 0 1-1.414-1.414l4.586-4.586-4.586-4.586a1 1 0 0 1 1.414-1.414l4.586 4.586 4.586-4.586a1 1 0 0 1 1.414 1.414l-4.586 4.586z" />
              </svg>
            ) : (
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
              </svg>
            )}
          </button>
          <h1 className="nav-title">Сурагчийн Хянах Самбар</h1>
          <div /> {/* Placeholder for right side of nav */}
        </div>
      </nav>

      <div className="dashboard-body">
        {renderBody()}
      </div>

      <div className={`drawer ${isDrawerOpen ? 'drawer-open' : 'drawer-closed'}`}>
        <div className="drawer-header">
          <h3 className="drawer-title">Profile</h3>
        </div>
        <ul className="drawer-list">
          <li className="drawer-item">
            <button onClick={() => navigate('/profile_screen', { state: { userDetails: userDetails } })} className="drawer-link">
              Сурагчийн бүртгэл
            </button>
          </li>
          <li className="drawer-item">
            <button onClick={() => navigate('/courses', { state: { userDetails: userDetails } })} className="drawer-link">
              Хөтөлбөрийн хичээлүүд
            </button>
          </li>
          <li className="drawer-item">
            <button onClick={() => navigate('/schedule', { state: { userDetails: userDetails } })} className="drawer-link">
              Хөтөлбөрийн төлөвлөгөө
            </button>
          </li>
          <li className="drawer-item">
            <button onClick={() => navigate('/calendar', { state: { userDetails: userDetails } })} className="drawer-link">
              Календарь
            </button>
          </li>
          <li className="drawer-item">
            <button onClick={() => navigate('/clubs', { state: { userDetails: userDetails } })} className="drawer-link">
              Клубууд
            </button>
          </li>
          <li className="drawer-item">
            <button onClick={() => navigate('/notifications', { state: { userDetails: userDetails } })} className="drawer-link">
              Сонордуулага
            </button>
          </li>
          <li className="drawer-item">
            <button onClick={() => navigate('/messages', { state: { userDetails: userDetails } })} className="drawer-link">
              Мессежүүд
            </button>
          </li>
          <li className="drawer-item">
            <button onClick={() => navigate('/settings')} className="drawer-link">
              Settings
            </button>
          </li>
          <li className="drawer-item">
            <button onClick={handleLogout} className="drawer-link logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>
      {isDrawerOpen && <div className="overlay" onClick={toggleDrawer} />}
    </div>
  );
};

export default StudentDashboard;