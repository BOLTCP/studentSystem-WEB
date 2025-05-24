// UserDetailsUtil.js
import UserDetails from '../../src/models/user_details';
import AuthUser from '../../src/models/auth_user';
import StudentUser from '../../src/models/student_user';
import StudentsSchedule from '../models/student_schedule';
import MajorClass from '../../src/models/major';
import Department from '../../src/models/department';
import DepartmentsOfEducation from '../models/departmentsofeducation';
import UserPreferences from '../../src/models/auth_user_preferences';

const getUserDetailsFromLocalStorage = () => {
  const storedUserDetailsString = localStorage.getItem('userDetails');

  if (storedUserDetailsString) {
    try {
      const parsedUser = JSON.parse(storedUserDetailsString);

      const user = parsedUser?.user ? AuthUser.fromJsonButInApp(parsedUser.user) : null;

      const userpreferences = parsedUser?.userpreferences ?
        UserPreferences.fromJsonButInApp(parsedUser.userpreferences) : null;

      const student = parsedUser?.student ?
        StudentUser.fromJsonButInApp(parsedUser.student) : null;

      const studentsSchedule = parsedUser?.studentsSchedule ?
        StudentsSchedule.fromJsonButInApp(parsedUser.studentsSchedule): null;
        
      const major = parsedUser?.major ?
        MajorClass.fromJsonButInApp(parsedUser.major) : null;

      const department = parsedUser?.department ?
        Department.fromJsonButInApp(parsedUser.department) : null;

      const departmentOfEducation = parsedUser?.departmentOfEducation ?
        DepartmentsOfEducation.fromJsonInApp(parsedUser.departmentOfEducation) : null;


      return new UserDetails({ user, userpreferences, student, studentsSchedule, major, department, departmentOfEducation });

    } catch (Err) {
      console.log('UserDetails parse Error:', Err);
      return null;
    }
  }
  return null;
};

export default getUserDetailsFromLocalStorage;