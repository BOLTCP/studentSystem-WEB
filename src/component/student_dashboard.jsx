import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import getApiUrl from '../../api/get_Api_Url';
import UserDetails from '../models/user_details';
import StudentUser from '../models/student_user';
import MajorClass from '../models/major';
import Department from '../models/department';
import '../styles/student_dashboard.css';
import './profile_screen';

const StudentDashboard = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            let student = StudentUser.fromJsonStudent(response.data.student);
            const major = MajorClass.fromJsonMajor(response.data.major);
            const department = Department.fromJsonDepartment(response.data.department);
            const year_classification_fix = student.yearClassification === 'freshman' 
            ? '1-р курс' 
            : student.yearClassification === 'junior'
            ? '2-р курс'
            : student.yearClassification === 'sophomore'
            ? '3-р курс'
            : '4-р курс';

            student.yearClassification = year_classification_fix;

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

  const handleLogout = () => {
    console.log('Logout clicked');
    navigate('/login');
  };

  const showAttribution = (attributionComment, attrLink) => {
    const el = document.getElementById("hover-attribution");
    if (el) {
      el.textContent = attributionComment + attrLink;
      el.classList.remove("hidden");
      el.classList.add("visible");
    }
    console.log('oroh');
  }
  
  const hideAttribution = () => {
    const el = document.getElementById("hover-attribution");
    if (el) {
      el.classList.remove("visible");
      el.classList.add("hidden");
    }
    console.log('garah');
  }

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
          <div className="placeholder-body">
            <p>Main dashboard content will go here.</p>
          </div>
        </div>
      );
    }

    return <div className="no-data-container">Unable to load user details.</div>;
  };

  const renderSidebar = () => (
    <div className="dashboard-sidebar">
      <div className="sidebar-header">
        <img src="public/StudentSystemLoginScreenLogo.png"
             alt="Logo"
             className="sidebar-header-logo"
        />
      </div>
      <div className="users-brief-details">
        <h3 className="sidebar-title">
          {userDetails?.user?.fname}
        </h3>
        <h3 className="sidebar-title">
          {userDetails?.user?.userRole}
        </h3>
        <h3 className="sidebar-title">
          {userDetails?.major?.majorName}
        </h3>
        <h3 className="sidebar-title">
          {userDetails?.student?.yearClassification}
        </h3>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "User icons created by Freepik - Flaticon",
                  " https://www.flaticon.com/free-icon/user_1144760?term=user&page=1&position=2&origin=search&related_id=1144760"
                  )} 
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/profile_screen', { state: { userDetails: userDetails } })} 
                  className="sidebar-link">

          <img src="public/user.png"
          //Icon source from 
          //https://www.flaticon.com/free-icon/user_1144760?term=user&page=1&position=2&origin=search&related_id=1144760
              title="Icon by Freepik - Flaticon"
              alt="UserIcon"
              className="sidebar-list-logo"
          />
            Сурагчийн бүртгэл
          </button>
        </li>
        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Degree icons created by Pixel perfect - Flaticon",
                  " https://www.flaticon.com/free-icon/degrees_3424711?term=university+program&page=1&position=4&origin=search&related_id=3424711"
                  )}
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/clubs', { state: { userDetails: userDetails } })} 
                  className="sidebar-link">
            <img src="public/degrees.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/degrees_3424711?term=university+program&page=1&position=4&origin=search&related_id=342471
            //Degree icons created by Pixel perfect - Flaticon
            alt="IntoUniversity"
            className="sidebar-list-logo"
            /> 
            Их Сургууль
          </button>
        </li>
        <li className="sidebar-item">
        <button onMouseEnter={() => showAttribution(
                  "Semester icons created by kmg design - Flaticon",
                  " https://www.flaticon.com/free-icon/calendar_3172207?term=semester&page=1&position=6&origin=tag&related_id=3172207")}
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/courses', { state: { userDetails: userDetails } })} 
                  className="sidebar-link">
          <img src="public/calendar.png"
          //Icon source from 
          //https://www.flaticon.com/free-icon/calendar_3172207?term=semester&page=1&position=6&origin=tag&related_id=3172207
          //Semester icons created by kmg design - Flaticon
              alt="Calendar"
              className="sidebar-list-logo"
          /> 
            Календарь
          </button>
        </li>
        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "University icons created by Freepik - Flaticon",
                  " https://www.flaticon.com/free-icon/university_2825156?term=university+clubs&page=1&position=8&origin=search&related_id=2825156"
                  )}
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/clubs', { state: { userDetails: userDetails } })} 
                  className="sidebar-link">
            <img src="public/universityClubs.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/university_2825156?term=university+clubs&page=1&position=8&origin=search&related_id=2825156
            //University icons created by Freepik - Flaticon
            alt="StudentClubs"
            className="sidebar-list-logo"
            /> 
            Клубууд
          </button>
        </li>
        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Notification bell icons created by Mayor Icons - Flaticon",
                  " https://www.flaticon.com/free-icon/notification-bell_7322146?term=school+bell&page=1&position=6&origin=search&related_id=7322146"
                  )}      
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/notifications', { state: { userDetails: userDetails } })} 
                  className="sidebar-link">
            <img src="public/notification-bell.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/notification-bell_7322146?term=school+bell&page=1&position=6&origin=search&related_id=7322146
            //Notification bell icons created by Mayor Icons - Flaticon
            alt="Notifications"
            className="sidebar-list-logo"
            /> 
            Сонордуулага
          </button>
        </li>
        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Notification bell icons created by Mayor Icons - Flaticon",
                  "https://www.flaticon.com/free-icon/chat_134808?term=messages&page=1&position=3&origin=search&related_id=134808"
                  )}    
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/messages', { state: { userDetails: userDetails } })} 
                  className="sidebar-link">
            <img src="public/chat.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/chat_134808?term=messages&page=1&position=3&origin=search&related_id=134808
            //Notification bell icons created by Mayor Icons - Flaticon
            alt="Messages"
            className="sidebar-list-logo"
            /> 
            Мессежүүд
          </button>
        </li>
        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Settings icons created by srip - Flaticon",
                  "https://www.flaticon.com/free-icon/settings_900797?term=settings&page=1&position=11&origin=search&related_id=900797"
                  )}    
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/messages', { state: { userDetails: userDetails } })} 
                  className="sidebar-link">
            <img src="public/settings.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/settings_900797?term=settings&page=1&position=11&origin=search&related_id=900797
            //Settings icons created by srip - Flaticon
            alt="Settings"
            className="sidebar-list-logo"
            /> 
            Тохиргоо
          </button>
        </li>
        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Logout icons created by Pixel perfect - Flaticon",
                  " https://www.flaticon.com/free-icon/logout_1828427?term=log+out&page=1&position=5&origin=search&related_id=1828427"
                  )}
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/clubs', { state: { userDetails: userDetails } })} 
                  className="sidebar-link">
            <img src="public/logout.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/logout_1828427?term=log+out&page=1&position=5&origin=search&related_id=1828427
            //Logout icons created by Pixel perfect - Flaticon
            alt="IntoUniversity"
            className="sidebar-list-logo"
            /> 
            Гарах
          </button>
        </li>
      </ul>
    </div>
  );

  const renderSidebarRight = () => (
    <div className="dashboard-sidebar-right">
      <div className="sidebar-header">
        <h3 className="sidebar-title">{userDetails?.user?.fname || 'Profile'}</h3>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <button onClick={() => navigate('/profile_screen', { state: { userDetails: userDetails } })} className="sidebar-link">
            Сурагчийн бүртгэл
          </button>
        </li>
        <li className="sidebar-item">
          <button onClick={() => navigate('/courses', { state: { userDetails: userDetails } })} className="sidebar-link">
            Хөтөлбөрийн хичээлүүд
          </button>
        </li>
        <li className="sidebar-item">
          <button onClick={() => navigate('/schedule', { state: { userDetails: userDetails } })} className="sidebar-link">
            Хөтөлбөрийн төлөвлөгөө
          </button>
        </li>
        <li className="sidebar-item">
          <button onClick={() => navigate('/calendar', { state: { userDetails: userDetails } })} className="sidebar-link">
            Календарь
          </button>
        </li>
        <li className="sidebar-item">
          <button onClick={() => navigate('/clubs', { state: { userDetails: userDetails } })} className="sidebar-link">
            Клубууд
          </button>
        </li>
        <li className="sidebar-item">
          <button onClick={() => navigate('/notifications', { state: { userDetails: userDetails } })} className="sidebar-link">
            Сонордуулага
          </button>
        </li>
        <li className="sidebar-item">
          <button onClick={() => navigate('/messages', { state: { userDetails: userDetails } })} className="sidebar-link">
            Мессежүүд
          </button>
        </li>
        <li className="sidebar-item">
          <button onClick={() => navigate('/settings')} className="sidebar-link">
            Settings
          </button>
        </li>
        <li className="sidebar-item">
          <button onClick={handleLogout} className="sidebar-link logout-button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="dashboard-container-layout">
      <nav className="dashboard-nav">
        <div className="nav-container">
          <h1 className="nav-title">Сурагчийн Хянах Самбар</h1>
        </div>
      </nav>

      
      <div className="dashboard-main-content">
        {userDetails && renderSidebar()}
        <div className="dashboard-body">
          {renderBody()}
        </div>
        {userDetails && renderSidebarRight()}
      </div>

      <div id="hover-attribution" className="hover-attribution hidden">
      </div>
      
    </div>
  );
};

export default StudentDashboard;


/*


<li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Icon made by nangicon from www.flaticon.com",
                  " https://www.flaticon.com/free-icon/curriculum_11687169?term=university+course&page=1&position=2&origin=search&related_id=11687169")}
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/courses', { state: { userDetails: userDetails } })} 
                  className="sidebar-link">

          <img src="public/curriculum.png"
          //Icon source from 
          //https://www.flaticon.com/free-icon/curriculum_11687169?term=university+course&page=1&position=2&origin=search&related_id=11687169
          //Icon made by nangicon from www.flaticon.com
              alt="Curriculum"
              className="sidebar-list-logo"
          />  
            Хөтөлбөрийн хичээлүүд
          </button>
        </li>
        <li className="sidebar-item">
        <button onMouseEnter={() => showAttribution(
                  "School icons created by Freepik - Flaticon",
                  " https://www.flaticon.com/free-icon/folder_5058564?term=university+curriculum&page=1&position=2&origin=search&related_id=5058564")}
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/courses', { state: { userDetails: userDetails } })} 
                  className="sidebar-link">

          <img src="public/majorsCourses.png"
          //Icon source from 
          //https://www.flaticon.com/free-icon/folder_5058564?term=university+curriculum&page=1&position=2&origin=search&related_id=5058564
          //School icons created by Freepik - Flaticon
              alt="CourseIcon"
              className="sidebar-list-logo"
          /> 
            Хөтөлбөрийн төлөвлөгөө
          </button>
        </li>


*/