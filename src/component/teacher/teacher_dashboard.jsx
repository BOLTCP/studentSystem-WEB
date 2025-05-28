import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';
import UserDetailsTeacher from '../../models/userDetailsTeacher'; 
import TeacherUser from '../../models/teacher_user';
import TeacherCoursePlanning from '../../models/teacher_course_planning';
import TeachersMajorPlanning from '../../models/teacher_major_planning';
import TeachersSchedule from '../../models/teachersschedule';
import Department from '../../models/department';
import DepartmentsOfEducation from '../../models/departmentsofeducation';
import UserPreferences from '../../models/auth_user_preferences';
import { TeacherRenderSidebar, TeacherRenderSidebarRight } from './teacher_side_bars';
import './teacher_dashboard.css';
import '../profile_screen';
import MajorClass from '../../models/major';

const TeacherDashboard = () => {
  const location = useLocation();
  const user = location.state?.user;
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [teachersCourses, setTeachersCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchDetails = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      if (user?.userId) {
        try {
          const response = await axios.post(getApiUrl('/User/Login/Teacher'), { userId: user.userId }, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
          });

          if (response.status === 200) {
            console.log('User data fetched!', response.data);
            const teacher = TeacherUser.fromJsonTeacher(response.data.teacher);
            const userpreferences = UserPreferences.fromJsonUserPreferences(response.data.userpreferences);
            const department = Department.fromJsonDepartment(response.data.department);
            const departmentOfEducation = DepartmentsOfEducation.fromJsonDepartmentsOfEducation(response.data.departmentsofeducation);
            const teachersMajorPlanning = (Array.from(response.data.teachersmajors)
              .map((major) => TeachersMajorPlanning.fromJsonPlanning(major)));
            const teachersCoursePlanning = (Array.from(response.data.teacherscourseplanning)
              .map((course) => TeacherCoursePlanning.fromJsonTeacherCoursePlanning(course)));
            const teachersSchedule = (Array.from(response.data.teachersschedule)
              .map((schedule) => TeachersSchedule.fromJsonTeachersSchedule(schedule)));

            setTeachersCourses(teachersCoursePlanning);
            setUserDetails(new UserDetailsTeacher({ user, userpreferences, teacher, department, 
                departmentOfEducation, teachersCoursePlanning, teachersMajorPlanning, teachersSchedule }));
            
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
      <p className="dashboard-courses-card-value">{course.majorName}</p> 
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
            {Array.from(teachersCourses).map((course) => 
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
          <h1 className="nav-title">Багшийн Хянах Самбар</h1>
        </div>
      </nav>

      
      <div className="dashboard-main-content">
        
        {userDetails && <TeacherRenderSidebar user = {userDetails} />}

        <div className="dashboard-body">
          {renderBody()}
        </div>

        {userDetails && <TeacherRenderSidebarRight user = {userDetails} />}

      </div>

      <div id="hover-attribution" className="hover-attribution hidden">
      </div>
      
    </div>
  );
};

export default TeacherDashboard;

