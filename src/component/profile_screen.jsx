import React, { useState, useEffect } from 'react';
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
    const [showProfileEditPrompt, setShowProfileEditPrompt] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
    
        return () => {
          isMounted = false; 
        };
      }, []);

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

    if (user.userRole === 'teacher') {
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
            fsfs
          </div>
        );
      } else if (user.userRole === 'student') {
        return (
          <>
            <RenderSidebar user = {userDetails} />
            <div className="profile-container-layout">
              <div className="profile-nav">
                <div className="nav-container">
                  <h2 className="profile-title">Оюутан {userDetails.user.fname} - н хувийн мэдээлэл</h2>
                </div>
              </div>

              <RenderSidebarRight user = {userDetails} />

              <div className="profile-content">
                
                {showProfileEditPrompt === true
                  && <ProfileEdit visibility = {showProfileEditPrompt}
                                editUser = {user} 
                                editStudent = {student}
                                editDepartment = {department} />}

                {showProfileEditPrompt === false
                  && 
                  <div className="profile-container">
                    <div
                        className="profile-edit-buttton"
                        onClick={() => {
                        setShowProfileEditPrompt(true);
                        }}
                    >
                      <p>Хувийн мэдээллийг өөрчлөх</p>
                    </div>
                    <div className="profile-card-grid">
                    <ProfileCard label="И-мэйл:" value={user.email} />
                    <ProfileCard label="Суралцах Эрдмийн зэрэг:" value={student?.currentAcademicDegree} />
                    <ProfileCard label="Түвшин:" value={student?.yearClassification?.toString()} />
                    <ProfileCard label="Салбар сургууль:" value={department?.departmentName} />
                    <ProfileCard label="Төлөв:" value={student?.isActive ? 'Идэвхтэй' : 'Идэвхгүй'} />
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