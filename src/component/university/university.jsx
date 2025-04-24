import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';
import UserDetails from '../../models/user_details';
import StudentUser from '../../models/student_user';
import MajorClass from '../../models/major';
import Department from '../../models/department';
import UserPreferences from '../../models/auth_user_preferences';
import { RenderSidebar, RenderSidebarRight } from './uni_side_bars';
import '../../styles/student_dashboard.css';
import '../profile_screen';

const University = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(new UserDetails(location.state?.user));
  console.log(userDetails);
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
            const userpreferences = UserPreferences.fromJsonUserPreferences(response.data.userpreferences);
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

            setUserDetails(new UserDetails({ user, userpreferences, student, major, department }));
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

  /*
  const buildDashboardCourses = (label, value) => (
    <div className="dashboard-courses-card">
      <img src="src/assets/curriculum.png" alt="courses-picture" className="dashboard-courses-picture" />
      <h6 className="dashboard-courses-card-label">{label} {value}</h6>
      <p className="dashboard-courses-card-value">{value}</p> 
      </div>
    );
  */

  /*
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
          <div className="dashboard-courses-card-grid">
              {buildDashboardCourses('Овог Нэр', `${userDetails.user?.lname} ${userDetails.user?.fname}`)}
              {buildDashboardCourses('ID', userDetails.student?.studentCode)}
              {buildDashboardCourses('Мэргэжил', userDetails.major?.majorName)}
              {buildDashboardCourses('Овог Нэр', `${userDetails.user?.lname} ${userDetails.user?.fname}`)}
              {buildDashboardCourses('ID', userDetails.student?.studentCode)}
              {buildDashboardCourses('Тэнхим', userDetails.department?.departmentName)}
            </div>
         
        </div>
      );
    }

    return <div className="no-data-container">Unable to load user details.</div>;
  };

  */

  return (
    <div className="dashboard-container-layout">
      <nav className="dashboard-nav">
        <div className="nav-container">
          <h1 className="nav-title">Их сургууль</h1>
        </div>
      </nav>

      
      <div className="dashboard-main-content">
        {userDetails && <RenderSidebar user = {userDetails} />}
        <div className="dashboard-body">
          {
            /*renderBody()*/
          }
        </div>
        {userDetails && <RenderSidebarRight user = {userDetails} />}
        
      </div>

      <div id="hover-attribution" className="hover-attribution hidden">
      </div>
      
    </div>
  );
};

export default University;


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