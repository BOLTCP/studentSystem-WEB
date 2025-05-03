import React, { useState } from 'react';
import moment from 'moment';
import '../../src/styles/profile_screen.css';

const ProfileEdit = ({ visibility, editUser, editStudent, editDepartment }) => {
  const [isVisible, setIsVisible] = useState(visibility);
  const [user, setUser] = useState({ ...editUser });
  const [student, setStudent] = useState({ ...editStudent });
  const [department, setDepartment] = useState({ ...editDepartment });

  const handleChange = (modelType, field, value) => {
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

  const fields = [
    { model: 'user', field: 'fname', label: 'Нэр (Өгсөн)', editable: true },
    { model: 'user', field: 'lname', label: 'Нэр (Овог)', editable: true },
    { model: 'student', field: 'studentCode', label: 'Хэрэглэгч код', editable: false },
    { model: 'user', field: 'email', label: 'И-мэйл', editable: true },
    { model: 'student', field: 'currentAcademicDegree', label: 'Эрдмийн зэрэг', editable: true },
    { model: 'student', field: 'yearClassification', label: 'Түвшин', editable: true },
    { model: 'department', field: 'departmentName', label: 'Салбар сургууль', editable: false },
    { model: 'student', field: 'isActive', label: 'Төлөв', editable: false, transform: (v) => (v ? 'Идэвхтэй' : 'Идэвхгүй') },
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

  return (
    <div
      className={`delete-overlay ${isVisible ? 'visible' : ''}`}
      onClick={() => setIsVisible(true)}
    >
        <div className="profile-container">
          <div
              className="profile-save-buttton"
              onClick={() => {
                console.log(user, student, department);
              }}
              >
            <p>Хадгалах</p>
          </div>
            <div className="profile-card-grid">
              {fields.map(({ model, field, label, editable, transform }) => {
                const rawValue = getValue(model, field);
                const displayValue = transform ? transform(rawValue) : rawValue;

                return (
                  <div className='profile-card'>
                    <div key={`${model}-${field}`}>
                      <h3 className="profile-card-label">{label}</h3>
                      {editable ? (
                        <input
                          type="text"
                          className="profile-card-value"
                          value={displayValue}
                          onChange={(e) => handleChange(model, field, e.target.value)}
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
      </div>
  );
};

export default ProfileEdit;
