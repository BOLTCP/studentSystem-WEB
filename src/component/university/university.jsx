import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Curriculum from './curriculum';
import RecommendedCurriculum from './recommended_curriculum';
import PersonalCurriculum from './personal_curriculum';
import { RenderSidebar, RenderSidebarRight } from './uni_side_bars';
import UserDetailsUtil from '../../utils/userDetails_util';
import '../../styles/university/university_dashboard.css';
import '../profile_screen';

const University = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(() => UserDetailsUtil());
  console.log(userDetails);
  const [loading, setLoading] = useState(true);
  const condRender = location.state?.condRender;
  
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.condRender !== condRender) {
      setCondRender(location.state?.condRender);
    }
  }, []);

  useEffect(() => {
    console.log("University: Render. condRender:", condRender);
  }, []);
  
  console.log(condRender);

  return (
    <div className="dashboard-container-layout">
      <nav className="dashboard-nav">
        <div className="nav-container">
          <h1 className="nav-title">Их сургууль</h1>
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
