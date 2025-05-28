// UserDetailsUtil.js
import UserDetailsTeacher from '../models/userDetailsTeacher';
import AuthUser from '../../src/models/auth_user';
import TeacherUser from '../../src/models/teacher_user';
import MajorClass from '../../src/models/major';
import TeacherCoursePlanning from '../models/teacher_course_planning';
import TeachersMajorPlanning from '../models/teacher_major_planning';
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

      const teacher = parsedUser?.teacher ?
        TeacherUser.fromJsonButInApp(parsedUser.teacher) : null;

      const department = parsedUser?.department ?
        Department.fromJsonButInApp(parsedUser.department) : null;

      const departmentOfEducation = parsedUser?.departmentOfEducation ?
        DepartmentsOfEducation.fromJsonInApp(parsedUser.departmentOfEducation) : null;

      const teachersCoursePlanning = parsedUser?.teachersCoursePlanning ?
        Array.from(parsedUser.teachersCoursePlanning).map((course) => TeacherCoursePlanning.toJsonButInApp(course)): null;

      const teachersMajorPlanning = parsedUser?.teachersMajorPlanning ?
        Array.from(parsedUser.teachersMajorPlanning).map((major) => TeachersMajorPlanning.toJsonButInApp(major)): null;

      return new UserDetailsTeacher({ user, userpreferences, teacher, department, departmentOfEducation, teachersCoursePlanning, teachersMajorPlanning });

    } catch (Err) {
      console.log('UserDetails parse Error:', Err);
      return null;
    }
  }
  return null;
};

export default getUserDetailsFromLocalStorage;