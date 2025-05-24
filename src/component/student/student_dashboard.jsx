import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';
import UserDetails from '../../models/user_details';
import StudentUser from '../../models/student_user';
import StudentsSchedule from '../../models/student_schedule';
import Courses from '../../models/courses';
import MajorClass from '../../models/major';
import Department from '../../models/department';
import DepartmentsOfEducation from '../../models/departmentsofeducation';
import UserPreferences from '../../models/auth_user_preferences';
import { RenderSidebar, RenderSidebarRight } from './side_bars';
import './student_dashboard.css';
import '../profile_screen';

const StudentDashboard = () => {
  const location = useLocation();
  const user = location.state?.user;
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [studentsCourses, setStudentsCourses] = useState(null);
  localStorage.removeItem('addingCourseToCurriculum');
  localStorage.removeItem('yearClassification');
  localStorage.removeItem('semesterSpecification');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchDetails = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      if (user?.userId) {
        try {
          const response = await axios.post(getApiUrl('/User/Login/Student'), { userId: user.userId }, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
          });

          if (response.status === 200) {
            console.log('User data fetched!', response.data);
            const student = StudentUser.fromJsonStudent(response.data.student);
            const userpreferences = UserPreferences.fromJsonUserPreferences(response.data.userpreferences);
            const major = MajorClass.fromJsonMajor(response.data.major);
            const department = Department.fromJsonDepartment(response.data.department);
            const departmentOfEducation = DepartmentsOfEducation.fromJsonDepartmentsOfEducation(response.data.departmentsofeducation);

            setStudentsCourses(Array.from(response.data.studentsCourses).map((course) => Courses.fromJsonCourse(course)));
            let studentsSchedule = new Map();
            const tempScheduleArray = Array.from(response.data.studentsSchedule).length > 0 
            ?
            Array.from(response.data.studentsSchedule)
            : 
            null;

            if (tempScheduleArray !== null) {
              for ( let i = 0; i < tempScheduleArray.length; i++) {
                const schedulesTimetablePosition = tempScheduleArray[i][0];
                const scheduleOfThePosition = StudentsSchedule.fromJsonStudentsSchedule(tempScheduleArray[i][1]);
                
                studentsSchedule.set(schedulesTimetablePosition, scheduleOfThePosition);
              }
            }

            setUserDetails(new UserDetails({ user, userpreferences, student, studentsSchedule, major, department, departmentOfEducation }));
            
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
  }, []);

  const serializedUserDetails = JSON.stringify(userDetails);
  localStorage.setItem('userDetails', serializedUserDetails);

  const buildDashboardCourses = (course) => (
    <div className="dashboard-courses-card">
      <img src="src/assets/curriculum.png" alt="courses-picture" className="dashboard-courses-picture" />
      <h6 className="dashboard-courses-card-label">{course.courseName} {course.courseCode}</h6>
      <p className="dashboard-courses-card-value">{userDetails.student.yearClassification}, 1-р семестэр</p> 
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
          <div className="dashboard-courses-card-grid">
            {Array.from(studentsCourses).map((course) => 
              <React.Fragment key={course.courseId || course.courseCode}>
                {buildDashboardCourses(course)}
              </React.Fragment>
            )}
              
            </div>
        </div>
      );
    }

    return <div className="no-data-container">Unable to load user details.</div>;
  };

  return (
    <div className="student-dashboard-container-layout">
      <nav className="dashboard-nav">
        <div className="student-nav-container">
          <h1 className="nav-title">Сурагчийн Хянах Самбар</h1>
        </div>
      </nav>

      
      <div className="dashboard-main-content">
        
        {userDetails && <RenderSidebar user = {userDetails} />}

        <div className="dashboard-body">
          {renderBody()}
        </div>

        {userDetails && <RenderSidebarRight user = {userDetails} />}

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