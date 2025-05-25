import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/profile_screen.css';
import { TeacherRenderSidebar, TeacherRenderSidebarRight } from './teacher/teacher_side_bars';
import { RenderSidebar, RenderSidebarRight } from '../component/student/side_bars';
import ProfileEdit from '../utils/profileEdit';
import TeacherProfileEdit from '../utils/teacherProfileEdit';
import getUserDetailsFromLocalStorage from '../utils/userDetails_util';
import getUserDetailsTeacherFromLocalStorage from '../utils/userDetailsTeacher_util';
import moment from 'moment';

const ProfileScreen = () => {
  const userType = JSON.parse(localStorage.getItem('userDetails')).user.userRole;
  const [userDetails, setUserDetails] = useState(userType === 'Сурагч' ? getUserDetailsFromLocalStorage() : getUserDetailsTeacherFromLocalStorage());

  const location = useLocation();
  const [refreshSideBar, setRefreshSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showProfileEditPrompt, setShowProfileEditPrompt] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {

    const storedPromptValue = localStorage.getItem('showProfileEditPrompt');
    
    if (storedPromptValue === 'true') {
      setShowProfileEditPrompt('true');
    } else {
      setShowProfileEditPrompt(null);
    }
  }, []);

  const handleEditButtonClick = () => {
    localStorage.setItem('showProfileEditPrompt', 'true');
    setShowProfileEditPrompt('true'); 
  };

  const handleEditClose = () => {
    localStorage.setItem('showProfileEditPrompt', 'false');
    setUserDetails(userType === 'Сурагч' ? getUserDetailsFromLocalStorage() : getUserDetailsTeacherFromLocalStorage());
    setShowProfileEditPrompt(null);  
  };

  if (!userDetails) {
      return <div className="no-data">Хэрэглэгч олдсонгүй.</div>;
  }

  const ProfileCard = ({ label, value }) => (
    <div className='profile-card'>
        <h3 className='profile-card-label'>{label}</h3>
        <p className='profile-card-value'>{value}</p>
    </div>
  );
  
if (userDetails.user.userRole === 'Багш') {
  return (
      <>
        
        <div className="profile-container-layout">
          <div className="profile-nav">
            <div className="nav-container">
              <h2 className="profile-title">Багш {userDetails.user.fname} - н хувийн мэдээлэл</h2>
            </div>
          </div>

          <TeacherRenderSidebar user = {userDetails} />
          <TeacherRenderSidebarRight user = {userDetails} />
          <div className="profile-content">
            
            {showProfileEditPrompt === 'true' &&
              <TeacherProfileEdit visibility = {showProfileEditPrompt}
                editUser = {userDetails.user} 
                editTeacher = {userDetails.teacher}
                editDepartment = {userDetails.department}
                editDepartmentOfEducation = {userDetails.departmentOfEducation}
                onClose={handleEditClose} 
              />
            }

            {showProfileEditPrompt === null 
              && 
              <div className="profile-container">
                <div
                    className="profile-edit-buttton"
                    onClick={handleEditButtonClick}
                >
                  <p>Хувийн мэдээллийг өөрчлөх</p>
                </div>
                <div className="profile-card-grid">
                <ProfileCard label="Нэр" value={`${userDetails.user.fname} ${userDetails.user.lname}`} />
                <ProfileCard label="Хэрэглэгч нь:" value={userDetails.user.userRole} />
                <ProfileCard label="Багшийн код:" value={userDetails.teacher?.teacherCode} />
                <ProfileCard label="И-мэйл:" value={userDetails.user.email} />
                <ProfileCard label="Багшийн и-мэйл:" value={userDetails.teacher?.teacherEmail} />
                <ProfileCard label="Эрдмийн зэрэг:" value={userDetails.teacher?.academicDegree} />
                <ProfileCard label="Ажил:" value={userDetails.teacher?.jobTitle} />
                <ProfileCard label="Салбар сургууль:" value={userDetails.departmentOfEducation?.edDepartmentName} />
                <ProfileCard label="Тэнхим анги:" value={userDetails.department?.departmentName} />
                <ProfileCard label="Төлөв:" value={userDetails.teacher?.isActive} />
                <ProfileCard label="Хүйс:" value={userDetails.user.gender} />
                <ProfileCard label="Регистрийн дугаар:" value={userDetails.user.registryNumber} />
                <ProfileCard label="Төрсөн өдөр:" value={moment(userDetails.user.birthday).format('YYYY-MM-DD')} />
                <ProfileCard label="Утасны дугаар:" value={userDetails.user.phoneNumber} />
                <ProfileCard label="Өмнөх боловсрол:" value={userDetails.user.education} />
                <ProfileCard label="Created At:" value={moment(userDetails.user.createdAt).local().toString()} />
                </div>
              </div>

            }
            
          </div>
        </div>
        
      </>
    );
  } else if (userDetails.user.userRole === 'Сурагч') {
    return (
      <>
        
        <div className="profile-container-layout">
          <div className="profile-nav">
            <div className="nav-container">
              <h2 className="profile-title">Оюутан {userDetails.user.fname} - н хувийн мэдээлэл</h2>
            </div>
          </div>

          <RenderSidebar user = {userDetails} />
          <RenderSidebarRight user = {userDetails} />
          <div className="profile-content">
            
            {showProfileEditPrompt === 'true'
              && <ProfileEdit visibility = {showProfileEditPrompt}
                            editUser = {userDetails.user} 
                            editStudent = {userDetails.student}
                            editDepartment = {userDetails.department}
                            onClose={handleEditClose} />}

            {showProfileEditPrompt === null 
              && 
              <div className="profile-container">
                <div
                    className="profile-edit-buttton"
                    onClick={handleEditButtonClick}
                >
                  <p>Хувийн мэдээллийг өөрчлөх</p>
                </div>
                <div className="profile-card-grid">
                <ProfileCard label="Нэр" value={`${userDetails.user.fname} ${userDetails.user.lname}`} />
                <ProfileCard label="Хэрэглэгч нь:" value={userDetails.user.userRole} />
                <ProfileCard label="Оюутны код:" value={userDetails.student?.studentCode} />
                <ProfileCard label="И-мэйл:" value={userDetails.user.email} />
                <ProfileCard label="Оюутны и-мэйл:" value={userDetails.student?.studentEmail} />
                <ProfileCard label="Суралцах Эрдмийн зэрэг:" value={userDetails.student?.currentAcademicDegree} />
                <ProfileCard label="Түвшин:" value={userDetails.student?.yearClassification?.toString()} />
                <ProfileCard label="" value={userDetails.student?.semesterSpecification} />
                <ProfileCard label="Салбар сургууль:" value={userDetails.department?.departmentName} />
                <ProfileCard label="Төлөв:" value={userDetails.student?.isActive} />
                <ProfileCard label="Хүйс:" value={userDetails.user.gender} />
                <ProfileCard label="Регистрийн дугаар:" value={userDetails.user.registryNumber} />
                <ProfileCard label="Төрсөн өдөр:" value={moment(userDetails.user.birthday).format('YYYY-MM-DD')} />
                <ProfileCard label="Утасны дугаар:" value={userDetails.user.phoneNumber} />
                <ProfileCard label="Өмнөх боловсрол:" value={userDetails.user.education} />
                <ProfileCard label="Created At:" value={moment(userDetails.user.createdAt).local().toString()} />
                </div>
              </div>

            }
            
          </div>
        </div>
        
      </>
    );
  } else {
    return <div className="placeholder">Unknown User Role</div>;
  }
};
    
export default ProfileScreen;