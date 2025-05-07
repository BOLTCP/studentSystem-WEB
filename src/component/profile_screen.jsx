import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserDetailsUtil from '../utils/userDetails_util';
import '../styles/profile_screen.css';
import { RenderSidebar, RenderSidebarRight } from './side_bars';
import ProfileEdit from '../utils/profileEdit';
import UserDetails from '../models/user_details';
import moment from 'moment';


const ProfileScreen = ( ) => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(() => UserDetailsUtil());
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
    window.location.reload(); 
    setUserDetails(UserDetailsUtil()); 
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
  

const { user, student, major, department } = userDetails;

if (user.userRole === 'Багш') {
    return (
      <div className="profile-container-layout">
        <div className="profile-nav">
          <div className="nav-container">
            <h2 className="profile-title">Багш {userDetails.user.fname} -н хувийн мэдээлэл</h2>
            <div className="profile-card-grid">
              <ProfileCard label="Нэр" value={`${user.fname} ${user.lname}`} />
              <ProfileCard label="Хэрэглэгч нь:" value={user.userRole} />
              <ProfileCard label="Хэрэглэгч / Багшийн код:" value={teacher?.teacherCode} />
              <ProfileCard label="Хэрэглэгчийн И-мэйл" value={user.email} />
              <ProfileCard label="Түвшин" value={teacher?.academicDegree} />
              <ProfileCard label="Салбар сургууль" value={departmentOfEducation?.edDepartmentName} />
              <ProfileCard label="Төлөв" value={teacher?.isActive ? 'Идэвхтэй' : 'Идэвхгүй'} />
              <ProfileCard label="Хүйс" value={user.gender} />
              <ProfileCard label="Регистрийн дугаар" value={user.registryNumber} />
              <ProfileCard label="Төрсөн өдөр" value={moment(user.birthday).format('YYYY-MM-DD')} />
              <ProfileCard label="Утасны дугаар" value={user.phoneNumber} />
              <ProfileCard label="Багшийн И-мэйл" value={teacher?.teacherEmail} />
              <ProfileCard label="Өмнөх боловсрол" value={user.education} />
              <ProfileCard label="Created At" value={moment(user.createdAt).local().toString()} />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (user.userRole === 'Сурагч') {
    return (
      <>
        
        <div className="profile-container-layout">
          <div className="profile-nav">
            <div className="nav-container">
              <h2 className="profile-title">Оюутан {userDetails.user.fname} - н хувийн мэдээлэл</h2>
            </div>
          </div>

          <RenderSidebar user={userDetails} />
          <RenderSidebarRight user = {userDetails} />
          <div className="profile-content">
            
            {showProfileEditPrompt === 'true'
              && <ProfileEdit visibility = {showProfileEditPrompt}
                            editUser = {user} 
                            editStudent = {student}
                            editDepartment = {department}
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
                <ProfileCard label="Нэр" value={`${user.fname} ${user.lname}`} />
                <ProfileCard label="Хэрэглэгч нь:" value={user.userRole} />
                <ProfileCard label="Хэрэглэгчийн код:" value={student?.studentCode} />
                <ProfileCard label="И-мэйл:" value={user.email} />
                <ProfileCard label="Суралцах Эрдмийн зэрэг:" value={student?.currentAcademicDegree} />
                <ProfileCard label="Түвшин:" value={student?.yearClassification?.toString()} />
                <ProfileCard label="Салбар сургууль:" value={department?.departmentName} />
                <ProfileCard label="Төлөв:" value={student?.isActive} />
                <ProfileCard label="Хүйс:" value={user.gender} />
                <ProfileCard label="Регистрийн дугаар:" value={user.registryNumber} />
                <ProfileCard label="Төрсөн өдөр:" value={moment(user.birthday).format('YYYY-MM-DD')} />
                <ProfileCard label="Утасны дугаар:" value={user.phoneNumber} />
                <ProfileCard label="И-мэйл:" value={student?.studentEmail} />
                <ProfileCard label="Өмнөх боловсрол:" value={user.education} />
                <ProfileCard label="Created At:" value={moment(user.createdAt).local().toString()} />
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