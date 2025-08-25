import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import getApiUrl from '../../../../api/get_Api_Url';
import axios from 'axios';
import Majors from './majors';
import StudentCurriculum from '../../../models/student_curriculum';
import TeachersCourses from './teachers_courses';
import TeachersSelectedCourses from './teachers_selected_courses';
import Timetable from './teacher_scheduler';
import { RenderSidebar, RenderSidebarRight } from '../../teacher/university/teacher_university_sidebar';
import getUserDetailsFromLocalStorage from '../../../utils/userDetailsTeacher_util';
import './department_of_university.css';
import '../../profile_screen';

const Department = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(() => getUserDetailsFromLocalStorage());
  const [schedulesRefresh, setSchedulesRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const condRender = location.state?.condRender;
  const [error, setError] = useState(null);
  useEffect(() => {
    if (location.state?.condRender !== condRender) {
      setCondRender(location.state?.condRender);
    }
  }, []);

  const refresh = () => {
    setSchedulesRefresh(true);
  }

  return (
    
      <div className="university-dashboard-container-layout">
        <nav className="university-dashboard-nav">
          <div className="university-nav-container">
            <h1 className="university-nav-title">Тэнхим</h1>
          </div>
        </nav>

        <div className="dashboard-main-content">
          {userDetails && <RenderSidebar user = {userDetails} />}
          <div className="dashboard-body">
            {condRender === 0 && <Majors user={userDetails} />}
            {condRender === 1 && <TeachersCourses user={userDetails} />}
            {condRender === 2 && <TeachersSelectedCourses user={userDetails} />}
            {condRender === 3 && <Timetable user={userDetails} refresh={refresh} />}
          </div>
          {userDetails && <RenderSidebarRight user = {userDetails} schedulesRefresh={schedulesRefresh} setSchedulesRefresh={setSchedulesRefresh}/>}
          
        </div>

        <div id="hover-attribution" className="hover-attribution hidden">
        </div>
        
      </div>
  );
};

export default Department;
