class UserDetailsTeacher {
    constructor({
      user,
      userpreferences = null,
      teacher = null,
      major = null,
      department = null,
      departmentOfEducation = null,
      teachersMajorPlanning = null,
      teachersCoursePlanning = null,
      teachersSchedule = null,
    }) {
      this.user = user;
      this.userpreferences = userpreferences;
      this.teacher = teacher;
      this.major = major;
      this.department = department;
      this.departmentOfEducation = departmentOfEducation;
      this.teachersMajorPlanning = teachersMajorPlanning;
      this.teachersCoursePlanning = teachersCoursePlanning;
      this.teachersSchedule = teachersSchedule;
    }
  }
  
  export default UserDetailsTeacher;