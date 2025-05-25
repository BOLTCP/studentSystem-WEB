import React, { useState, useRef, useMemo } from 'react';
import axios from 'axios';
import moment from 'moment';
import getApiUrl from '../../api/get_Api_Url';
import getUserDetailsFromLocalStorage from '../utils/userDetailsTeacher_util';
import AuthUser from '../models/auth_user';
import teacherUser from '../models/teacher_user';
import Department from '../models/department';
import DepartmentsOfEducation from '../models/departmentsofeducation';
import '../../src/styles/profile_screen.css';

const TeacherProfileEdit = ({ visibility, editUser, editTeacher, editDepartment, editDepartmentOfEducation, onClose }) => {
  const userDetails = getUserDetailsFromLocalStorage();
  const [isProfileEditVisible, setIsProfileEditVisible] = useState(visibility);
  const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);
  const [editing, setEditing] = useState(false);
  const hasFetched = useRef(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState({ ...editUser });
  const [teacher, setTeacher] = useState({ ...editTeacher });
  const [department, setDepartment] = useState({ ...editDepartment });
  const [departmentOfEducation, setDepartmentOfEducation] = useState({ ...editDepartmentOfEducation });
  const [showProfileEditPrompt, setProfileEditPrompt] = useState(false);

  const handleOverlayClick = () => {
    setProfileEditPrompt(true);
  };

  const handleCancel = () => {
    if ( isSuccess === true ) {
      onClose();
    } else {
      setShowConfirmPrompt(false);
    }
  };

  const HandleSaveConfirm = ({ showConfirmPrompt, isSuccess, user, teacher, department, departmentOfEducation, handleCancel, userDetails }) => {
    const [noChangeDetected, setNoChangeDetected] = useState(null);
    const compareUser = JSON.stringify(AuthUser.fromJsonButInApp(userDetails.user));
    const compareteacher = JSON.stringify(teacherUser.fromJsonButInApp(userDetails.teacher));
    const compareDepartment = JSON.stringify(Department.fromJsonButInApp(userDetails.department));
    const compareDepartmentOfEducation = JSON.stringify(DepartmentsOfEducation.fromJsonInApp(userDetails.departmentOfEducation));

    const changeDetection = () => {
      setNoChangeDetected(true);
    }

    const changeDetectionToFalse = () => {
      setNoChangeDetected(401);
    }

    const saveNewProfile = async (changeDetection, changeDetectionToFalse) => {

      if(hasFetched.current) return;
      hasFetched.current = false;

      if ( JSON.stringify(user) === compareUser 
          && JSON.stringify(teacher) === compareteacher
          && JSON.stringify(department) === compareDepartment
          && JSON.stringify(departmentOfEducation) === compareDepartmentOfEducation ) {
        changeDetection();
				setLoading(false);
      } else {
				try {
					const response = await axios.post(getApiUrl('/Save/Edited/User/Profile/Teacher/'), 
						{ 
              user: AuthUser.toJson(user),
              teacher: teacherUser.toJson(teacher),
              department: Department.toJson(department),
              departmentOfEducation: DepartmentsOfEducation.toJson(departmentOfEducation),
            },
						{
							headers: { 'Content-Type': 'application/json' },
							timeout: 30000,
						});

            if (response.status === 200) {
              userDetails.teacher = teacher;
              userDetails.user = user;
              userDetails.department = department;
              userDetails.departmentOfEducation = departmentOfEducation;
              localStorage.setItem('userDetails', JSON.stringify(userDetails));
              setIsSuccess(true);
            }
				} catch (err) {
          if (err.response.status === 401) {
            console.log('lalar');
            changeDetectionToFalse();
          }
				} finally {
					setLoading(false);
				}
			}
		};

    return (
      <>
        <div className={`profile-edit-overlay ${showConfirmPrompt === true ? 'visible' : ''}`}
             onClick={handleOverlayClick}
        >

          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            {isSuccess === false && noChangeDetected === null ? (
              <>
                <p>Хувийн мэдээллийг засах?</p>
                <div className="profile-edit-group">
                  <button onClick={() => saveNewProfile(changeDetection, changeDetectionToFalse)}>Тийм</button>
                  <button onClick={() => {handleCancel()}}>Үгүй</button>

                </div>
              </>
            ) : noChangeDetected === true ? (
              <div className="profile-edit-error-message">
                <p>
                  <strong>Мэдээлэл өөрчлөгдөөгүй байна</strong>!
                </p>
                <div className="profile-edit-group">
                  <button onClick={() => {handleCancel()}}>Үгүй</button>
                </div>
              </div>
            ) : isSuccess === true ? (
              <div className="success-message">
                <p>
                  <strong>{user.fname}</strong> хэрэглэгчийн мэдээллийг амжилттай шинэчлэлээ!
                </p>
                <div className="profile-edit-group">
                  <button onClick={() => {handleCancel(), setIsSuccess(false)}}>Буцах</button>
                </div>
              </div>
            ) : noChangeDetected === 401 ? (
              <div className="success-message">
                <p>
                  <strong className="error-text">И-мэйл нь аль хэдийн бүртгэгдсэн байна!</strong> 
                </p>
                <div className="profile-edit-group">
                  <button onClick={() => {handleCancel(), setIsSuccess(false)}}>Буцах</button>
                </div>
              </div>
            ) : null }
            
          </div>
        </div>
      </>
    );
  };
  
  const handleChange = (modelType, field, value) => {
    setEditing(false);
    const updater = {
      user: setUser,
      teacher: setTeacher,
      department: setDepartment,
      departmentOfEducation: setDepartmentOfEducation,
    }[modelType];

    updater((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditClose = () => {
    onClose();
  };

  const fields = [
    { model: 'user', field: 'fname', label: 'Нэр (Өгсөн)', editable: true },
    { model: 'user', field: 'lname', label: 'Нэр (Овог)', editable: true },
    { model: 'user', field: 'userRole', label: 'Хэрэглэгч нь', editable: false },
    { model: 'teacher', field: 'teacherCode', label: 'Багшийн код', editable: false },
    { model: 'user', field: 'email', label: 'И-мэйл', editable: true },
    { model: 'teacher', field: 'teacherEmail', label: 'Багшийн и-мэйл', editable: true },
    { model: 'teacher', field: 'academicDegree', label: 'Эрдмийн зэрэг', editable: true },
    { model: 'teacher', field: 'jobTitle', label: 'Ажил', editable: false },
    { model: 'departmentOfEducation', field: 'edDepartmentName', label: 'Салбар сургууль', editable: false },
    { model: 'department', field: 'departmentName', label: 'Тэнхим анги', editable: false },
    { model: 'teacher', field: 'isActive', label: 'Төлөв', editable: false, },
    { model: 'user', field: 'gender', label: 'Хүйс', editable: true },
    { model: 'user', field: 'registryNumber', label: 'Регистрийн дугаар', editable: true },
    { model: 'user', field: 'birthday', label: 'Төрсөн өдөр', editable: false, transform: (v) => moment(v).format('YYYY-MM-DD') },
    { model: 'user', field: 'phoneNumber', label: 'Утасны дугаар', editable: true },
    { model: 'user', field: 'education', label: 'Өмнөх боловсрол', editable: true },
    { model: 'user', field: 'createdAt', label: 'Бүртгүүлсэн огноо', editable: false, transform: (v) => moment(v).format('YYYY-MM-DD HH:mm') },
  ];

  const getValue = (model, field) => {
    const source = { user, teacher, department, departmentOfEducation }[model];
    return source?.[field] ?? '';
  };

  if (isProfileEditVisible) {
  return (
    <>
      {showConfirmPrompt && (
        <HandleSaveConfirm
          showConfirmPrompt={showConfirmPrompt}
          isSuccess={isSuccess}
          user={user}
          teacher={teacher}
          department={department}
          departmentOfEducation={departmentOfEducation}
          userDetails={userDetails}
          handleCancel={handleCancel}
        />
      )}

        <div className="profile-container">
          <div className="profile-edit-options">
            <div 
                className="profile-save-buttton"
                onClick={() => {
                  setShowConfirmPrompt(true);
                }}
                >
                <p>Хадгалах</p>
            </div>
            <div
                className="close-profile-edit-button"
                onClick={handleEditClose}
                >
                <p>Буцах</p>
            </div>
          </div>
            <div className="profile-card-grid">
              {fields.map(({ model, field, label, editable, transform }) => {
                const rawValue = getValue(model, field);
                let displayValue = transform ? transform(rawValue) : rawValue;
                
                return (
                  <div key={`${model}-${field}`}
                       className='profile-card-edit'>
                    <div >
                      <h3 className="profile-card-label">{label}</h3>
                      {editable ? (
                        <input
                          type="text"
                          className="profile-card-value-edit"
                          value={displayValue}
                          onChange={(e) => {handleChange(model, field, e.target.value),
                            setEditing(true)
                          }}
                        />
                      ) : (
                        <div className="profile-card-value-readonly">{displayValue}</div>
                      )}
                    </div>
                  </div>
                );
              })}
              
          </div>
        </div>
    </>
  );
}
};

export default TeacherProfileEdit;
