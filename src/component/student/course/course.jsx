import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import getApiUrl from '../../../../api/get_Api_Url';
import CourseWeek from '../../../models/course_week';
import CourseMaterial from '../../../models/course_material';
import CourseMaterialsFiles from '../../../models/course_materials_files';
import getUserDetailsFromLocalStorage from '../../../utils/userDetails_util';
import { RenderSidebar, RenderSidebarRight } from '../side_bars';
import './course.css';

const Course = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const studentsCourse = location.state?.studentsCourse;
  const [userDetails, setUserDetails] = useState(getUserDetailsFromLocalStorage);
  const [courseWeeks, setCourseWeeks] = useState(null);
  const [weeksMaterials, setWeeksMaterials] = useState(null);
  const [materialsFiles, setMaterialsFiles] = useState(null);

  useEffect(() => {
    const getStudentsCourse = async () => {

      if (!userDetails.user.userId) {
        return;
      }

      try {
        const response = axios.post(getApiUrl('/Get/Students/Courses/&/Materials'), 
          {
            studentsCourse: studentsCourse,
          },
          { 
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
          });

        if (response.status === 200) {
          setCourseWeeks(Array.from(response.data.courseWeeks).map((week) => CourseWeek.fromJsonCourseWeek(week)));
          setWeeksMaterials(Array.from(response.data.weeksMaterials).map((material) => CourseMaterial.fromJsonCourseMaterial(material)));
          setMaterialsFiles(Array.from((await response).data.materialsFiles).map((file) => CourseMaterialsFiles.fromJsonCourseMaterialsFiles(file)));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStudentsCourse();

  }, []);

  console.log(courseWeeks, weeksMaterials, materialsFiles);

  return (
    <div className="student-dashboard-container-layout">
      <nav className="dashboard-nav">
        <div className="student-nav-container">
          <h1 className="nav-title">Сурагчийн Хянах Самбар</h1>
        </div>
      </nav>


      <div className="dashboard-main-content">
        
        {userDetails && <RenderSidebar user = {userDetails} />}

        {userDetails && <RenderSidebarRight user = {userDetails} />}

      </div>

      <div id="hover-attribution" className="hover-attribution hidden">
      </div>
      
    </div>
  );
};

export default Course;


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