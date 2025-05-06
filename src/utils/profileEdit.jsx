import React, { useState, useRef, useMemo } from 'react';
import axios from 'axios';
import moment from 'moment';
import getApiUrl from '../../api/get_Api_Url';
import getUserDetailsFromLocalStorage from './userDetails_util';
import AuthUser from '../models/auth_user';
import StudentUser from '../models/student_user';
import Department from '../models/department';
import '../../src/styles/profile_screen.css';

const ProfileEdit = ({ visibility, editUser, editStudent, editDepartment, onClose }) => {
  const userDetails = getUserDetailsFromLocalStorage();
  const [isProfileEditVisible, setIsProfileEditVisible] = useState(visibility);
  const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);
  const [editing, setEditing] = useState(false);
  const hasFetched = useRef(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState({ ...editUser });
  const [student, setStudent] = useState({ ...editStudent });
  const [department, setDepartment] = useState({ ...editDepartment });
  const [showProfileEditPrompt, setProfileEditPrompt] = useState(false);

  const handleOverlayClick = () => {
    setProfileEditPrompt(true);
  };

  const handleCancel = () => {
    setShowConfirmPrompt(false);
  };

  const HandleSaveConfirm = ({ showConfirmPrompt, isSuccess, user, student, department, handleCancel, userDetails }) => {
    const compareUser = JSON.stringify(AuthUser.fromJsonButInApp(userDetails.user));
    const compareStudent = JSON.stringify(StudentUser.fromJsonButInApp(userDetails.student));
    const compareDepartment = JSON.stringify(Department.fromJsonButInApp(userDetails.department));
    let noChangeDetected = false;

    console.log(student);
    if ( JSON.stringify(user) === compareUser 
          && JSON.stringify(student) === compareStudent
          && JSON.stringify(department) === compareDepartment ) {
        noChangeDetected = true;
				setLoading(false)
    }

    const saveNewProfile = async () => {
      
      if(hasFetched.current) return;
      hasFetched.current = false;

      if ( JSON.stringify(user) === compareUser 
          && JSON.stringify(student) === compareStudent
          && JSON.stringify(department) === compareDepartment ) {
        setError('Өөрчлөлт хийгдээгүй байна!');
				setLoading(false);
			} else {
				try {
					const response = await axios.post(getApiUrl('/Save/Edited/User/Profile'), 
						{ 
              user: AuthUser.toJson(user),
              student: StudentUser.toJson(student),
              department: Department.toJson(department),
            },
						{
							headers: { 'Content-Type': 'application/json' },
							timeout: 30000,
						});

            if (response.status === 200) {
              setIsSuccess(true);
              setResponseCode(200);
              
            } else {
              setIsSuccess(false);
              setResponseCode(404);
							console.log('Error fetching curriculum:', response.status, response.data);
							setError('Failed to fetch curriculum.');
						}
				} catch (err) {
					console.error('Error fetching curriculum:', err);
					setError('Network error occurred.');
				} finally {
					setLoading(false);
				}
			}
		};
    console.log(noChangeDetected);
    return (
      <>
      
        <div className={`profile-edit-overlay ${showConfirmPrompt === true ? 'visible' : ''}`}
             onClick={handleOverlayClick}
        >

          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            {isSuccess === false && noChangeDetected === false ? (
              <>
                <p>Хувийн мэдээллийг засах?</p>
                <div className="profile-edit-group">
                  <button onClick={() => saveNewProfile()}>Тийм</button>
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
      student: setStudent,
      department: setDepartment,
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
    { model: 'student', field: 'studentCode', label: 'Хэрэглэгчийн код', editable: false },
    { model: 'student', field: 'additionalRoles', label: 'Нэмэлт', editable: true },
    { model: 'user', field: 'email', label: 'И-мэйл', editable: true },
    { model: 'student', field: 'currentAcademicDegree', label: 'Эрдмийн зэрэг', editable: false },
    { model: 'student', field: 'yearClassification', label: 'Түвшин', editable: false },
    { model: 'department', field: 'departmentName', label: 'Салбар сургууль', editable: false },
    { model: 'student', field: 'isActive', label: 'Төлөв', editable: false, },
    { model: 'user', field: 'gender', label: 'Хүйс', editable: true },
    { model: 'user', field: 'registryNumber', label: 'Регистрийн дугаар', editable: true },
    { model: 'user', field: 'birthday', label: 'Төрсөн өдөр', editable: false, transform: (v) => moment(v).format('YYYY-MM-DD') },
    { model: 'user', field: 'phoneNumber', label: 'Утасны дугаар', editable: true },
    { model: 'student', field: 'studentEmail', label: 'Оюутны имэйл', editable: false },
    { model: 'user', field: 'education', label: 'Өмнөх боловсрол', editable: true },
    { model: 'user', field: 'createdAt', label: 'Бүртгүүлсэн огноо', editable: false, transform: (v) => moment(v).format('YYYY-MM-DD HH:mm') },
  ];

  const getValue = (model, field) => {
    const source = { user, student, department }[model];
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
          student={student}
          department={department}
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
                  <div className='profile-card-edit'>
                    <div key={`${model}-${field}`}>
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

export default ProfileEdit;
