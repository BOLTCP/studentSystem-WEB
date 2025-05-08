import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import getApiUrl from '../../../api/get_Api_Url';
import axios from 'axios';
import Curriculum from './curriculum';
import StudentCurriculum from '../../models/student_curriculum';
import RecommendedCurriculum from './recommended_curriculum';
import PersonalCurriculum from './personal_curriculum';
import { RenderSidebar, RenderSidebarRight } from './uni_side_bars';
import UserDetailsUtil from '../../utils/userDetails_util';
import '../../styles/university/university_dashboard.css';
import '../profile_screen';

const University = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(() => UserDetailsUtil());
  const [loading, setLoading] = useState(true);
  const [firstYear, setFirstYear] = useState();
  const [secondYear, setSecondYear] = useState(null);
  const [thirdYear, setThirdYear] = useState(null);
  const [fourthYear, setFourthYear] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const hasFetched = useRef(false);
  const condRender = location.state?.condRender;

  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.condRender !== condRender) {
      setCondRender(location.state?.condRender);
    }

    const fetchDetails = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      if (userDetails.user.userId || userDetails.major ) {
        try {
          const response = await axios.post(getApiUrl('/Get/Students/Personal/Curriculum'), 
          { 
            majorId: userDetails.major.majorId,
            recommendedCurriculum: userDetails.major.recommendedCurriculum,
            studentId: userDetails.student.studentId,
            studentCode: userDetails.student.studentCode
          }, 
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
          });

          if (response.status === 200) {
            localStorage.setItem('studentCurriculumModel', JSON.stringify(StudentCurriculum.fromJsonStudentCurriculum(response.data.student_curriculum)));
            console.log(StudentCurriculum.fromJsonButInApp(JSON.parse(localStorage.getItem('studentCurriculumModel'))));
            const stud = StudentCurriculum.fromJsonButInApp(JSON.parse(localStorage.getItem('studentCurriculumModel')));
            console.log(stud);
            setResponseCode(200);
            
          } else if (response.status === 201) {
            localStorage.setItem('studentCurriculumModel', JSON.stringify(StudentCurriculum.fromJsonStudentCurriculum(response.data.student_curriculum)));
            setResponseCode(201);

          } else {
            setResponseCode(404);
            console.log('Error fetching curriculum:', response.status, response.data);
            setError('Failed to fetch curriculum.');
          }
        } catch (err) {
          console.error('Error fetching user details:', err);
          setError('Network error occurred.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Хэрэглэгчийн эсвэл хөтөлбөрийн мэдээлэл байхгүй байна!.');
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    console.log("University: Render. condRender:", condRender);
  }, []);
  
  console.log(condRender);

  return (
    <div className="university-dashboard-container-layout">
      <nav className="university-dashboard-nav">
        <div className="university-nav-container">
          <h1 className="university-nav-title">Их Сургууль</h1>
        </div>
      </nav>

      
      <div className="dashboard-main-content">
        {userDetails && <RenderSidebar />}
        <div className="dashboard-body">
          {condRender === 0 && <Curriculum user={userDetails} />}
          {condRender === 1 && <RecommendedCurriculum user={userDetails} />}
          {condRender === 2 && <PersonalCurriculum user={userDetails} />}
        </div>
        {userDetails && <RenderSidebarRight user = {userDetails} />}
        
      </div>

      <div id="hover-attribution" className="hover-attribution hidden">
      </div>
      
    </div>
  );
};

export default University;
