import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getApiUrl from '../../../../api/get_Api_Url';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router'
import PropTypes from 'prop-types';
import UserDetails from '../../../models/user_details';
import { StudentsScheduleUtil } from '../../../utils/studentsSchedule';
import getUserDetailsFromLocalStorage from '../../../utils/userDetails_util';
import './major.css';
import '../../profile_screen';

export const RenderSidebar = () => {
  
  const [userDetails, setUserDetails] = useState(() => getUserDetailsFromLocalStorage());
  const [theme, setTheme] = useState(
    `${userDetails.userpreferences?.appTheme === 'Light_Mode'
      ? 'light'
      : 'dark'
    }`
  );
  const [themeIcon, setThemeIcon] = useState();
  const [selectedSubmenu, setSelectedSubmenu] = useState(null);
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index); // Toggle dropdown
  };

  useEffect(() => {
    if (theme === 'light') {
      setThemeIcon("/src/assets/darkMode.png");
    } else {
      setThemeIcon("/src/assets/lightMode.png");
    }
    document.body.className = theme;
  }, [theme]);
  
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await saveUserPreferences(newTheme);
  };
  
  const saveUserPreferences = async (selectedTheme) => {
    if (userDetails?.user?.userId) {
      try {
        const response = await axios.post(
          getApiUrl('/Save/User/Preferences'),
          {
            userId: userDetails.user.userId,
            appTheme: selectedTheme === 'light' 
                                              ? 'Light_Mode'
                                              : 'Dark_Mode', 
          },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
          }
        );
  
        if (response.status === 200) {

          let parsedUser = JSON.parse(localStorage.getItem('userDetails'));
          parsedUser.userpreferences.appTheme = selectedTheme === 'light' 
                                                                        ? 'Light_Mode'
                                                                        : 'Dark_Mode';
          localStorage.setItem('userDetails', JSON.stringify(parsedUser));
          

          console.log('User preferences saved!', response.data);
        } else {
          console.error('Error saving user preferences :', response.status, response.data);
          setError('Failed to save user preferences.');
        }
      } catch (err) {
        console.error('Failed to save user preferences:', err);
        setError('Network error occurred.');
      } 
    } else {
      console.log("User not found");
    }
  };

  
  const showAttribution = (attributionComment, attrLink) => {
    const el = document.getElementById("hover-attribution");
    if (el) {
      el.textContent = attributionComment + attrLink;
      el.classList.remove("hidden");
      el.classList.add("visible");
    }
  }
  
  const hideAttribution = () => {
    const el = document.getElementById("hover-attribution");
    if (el) {
      el.classList.remove("visible");
      el.classList.add("hidden");
    }
  }

  return (
    <div className={`uni-dashboard-sidebar ${theme}`}>
      <div className="sidebar-header">
        <img src="/src/assets/StudentSystemLoginScreenLogo.png"
             alt="Logo"
             className="sidebar-header-logo"
        />
      </div>
      <div className="users-brief-details">
        <h3 className={`sidebar-title ${theme}`}>
          {userDetails?.user?.fname}
        </h3>
        <h3 className={`sidebar-title ${theme}`}>
          {userDetails?.user?.userRole}
        </h3>
        <h3 className={`sidebar-title ${theme}`}>
          {userDetails?.major?.majorName}
        </h3>
        <h3 className={`sidebar-title ${theme}`}>
          {userDetails?.student?.yearClassification}
        </h3>
      </div>
      <ul className="sidebar-list">

      <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Dashboard icons created by Those Icons - Flaticon",
                  " https://www.flaticon.com/free-icon/dashboard_481270?term=dashboard&page=1&position=60&origin=search&related_id=481270"
                  )} 
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/student_dashboard', { state: { user: userDetails.user } })} 
                  className={`sidebar-link ${theme}`}>

          <img src="/src/assets/dashboard.png"
          //Icon source from 
          //https://www.flaticon.com/free-icon/dashboard_481270?term=dashboard&page=1&position=60&origin=search&related_id=481270
              title="Icon by Freepik - Flaticon"
              alt="UserIcon"
              className={`sidebar-list-icon ${theme}`}
          />
            Хянах самбар
          </button>
        </li>

        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Degree icons created by Pixel perfect - Flaticon",
                  " https://www.flaticon.com/free-icon/degrees_3424711?term=university+program&page=1&position=4&origin=search&related_id=3424711"
                  )}
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => toggleDropdown(0)} 
                  className={`sidebar-link ${theme}`}>
            <img src="/src/assets/degrees.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/degrees_3424711?term=university+program&page=1&position=4&origin=search&related_id=342471
            //Degree icons created by Pixel perfect - Flaticon
            alt="IntoUniversity"
            className={`sidebar-list-icon ${theme}`}
            /> 
            Хөтөлбөр
          </button>
          {openDropdown === 0 && (
            <ul className="dropdown-menu">
              {/* Submenu items */}
              <li className="dropdown-item">
                <button className={`dashboard-submenu-button ${selectedSubmenu === 0 ? 'active' : ''}`} 
                        onClick={() => {
                          setSelectedSubmenu(1);
                          navigate('/major', { state: { condRender: 0 } })
                          }}>
                  Сургалтын төлөвлөгөө
                </button>
              </li>
              <li className="dropdown-item">
                <button className={`dashboard-submenu-button ${selectedSubmenu === 0 ? 'active' : ''}`} 
                        onClick={() => {
                          setSelectedSubmenu(1);
                          navigate('/major', { state: { condRender: 1 } })
                          }}>
                  Санал болгох төлөвлөгөө
                </button>
              </li>
              <li className="dropdown-item">
                <button className={`dashboard-submenu-button ${selectedSubmenu === 0 ? 'active' : ''}`} 
                        onClick={() => {
                          setSelectedSubmenu(1);
                          navigate('/major', { state: { condRender: 2 } })
                          }}>
                  Ганцаарчилсан төлөвлөгөө
                </button>
              </li>
              <li className="dropdown-item">
                <button className={`dashboard-submenu-button ${selectedSubmenu === 0 ? 'active' : ''}`} 
                        onClick={() => {
                          setSelectedSubmenu(1);
                          navigate('/major', { state: { condRender: 3 } })
                          }}>
                  Хичээл сонголт
                </button>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Notification bell icons created by Mayor Icons - Flaticon",
                  " https://www.flaticon.com/free-icon/notification-bell_7322146?term=school+bell&page=1&position=6&origin=search&related_id=7322146"
                  )}      
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/notifications', { state: { userDetails: userDetails } })} 
                  className={`sidebar-link ${theme}`}>
            <img src="/src/assets/notification-bell.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/notification-bell_7322146?term=school+bell&page=1&position=6&origin=search&related_id=7322146
            //Notification bell icons created by Mayor Icons - Flaticon
            alt="Notifications"
            className={`sidebar-list-icon ${theme}`}
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
                  className={`sidebar-link ${theme}`}>
            <img src="/src/assets/chat.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/chat_134808?term=messages&page=1&position=3&origin=search&related_id=134808
            //Notification bell icons created by Mayor Icons - Flaticon
            alt="Messages"
            className={`sidebar-list-icon ${theme}`}
            /> 
            Мессежүүд
          </button>
        </li>

        {/*
        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Settings icons created by srip - Flaticon",
                  "https://www.flaticon.com/free-icon/settings_900797?term=settings&page=1&position=11&origin=search&related_id=900797"
                  )}    
                  onMouseLeave={() => hideAttribution()}
                  onClick={() => navigate('/messages', { state: { userDetails: userDetails } })} 
                  className={`sidebar-link ${theme}`}>
            <img src="/src/assets/settings.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/settings_900797?term=settings&page=1&position=11&origin=search&related_id=900797
            //Settings icons created by srip - Flaticon
            alt="Settings"
            className={`sidebar-list-icon ${theme}`}
            /> 
            Тохиргоо
          </button>
        </li>
        */}

        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Light icons created by Freepik - Flaticon",
                  " https://www.flaticon.com/search?word=light%20mode"
                  )}
                  onMouseLeave={() => hideAttribution()}
                  onClick={()=>{toggleTheme()}} 
                  className={`sidebar-link ${theme}`}>

            <img src={themeIcon}
            //Icon source from 
            //https://www.flaticon.com/search?word=light%20mode
            //Light icons created by Freepik - Flaticon
            alt="LightModeIcon"
            className={`sidebar-theme-icon ${theme}`}
            /> 
            {theme === 'light' ? "Dark Mode" : "Ligth Mode"}
          </button>
        </li>
        
        {/*
        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Logout icons created by Pixel perfect - Flaticon",
                  " https://www.flaticon.com/free-icon/logout_1828427?term=log+out&page=1&position=5&origin=search&related_id=1828427"
                  )}
                  onMouseLeave={() => hideAttribution()}
                  onClick={()=>{handleLogout()}} 
                  className={`sidebar-link ${theme}`}>
            <img src="/src/assets/logout.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/logout_1828427?term=log+out&page=1&position=5&origin=search&related_id=1828427
            //Logout icons created by Pixel perfect - Flaticon
            alt="IntoUniversity"
            className={`sidebar-list-icon ${theme}`}
            /> 
            Гарах
          </button>
        </li>
        */}
        
      </ul>
    </div>
  );
}

export const RenderSidebarRight = ({ user, theme }) => {

  return (
    <StudentsScheduleUtil />
  );
  
}

RenderSidebar.PropTypes = {
  user: PropTypes.instanceOf(UserDetails).isRequired
}


