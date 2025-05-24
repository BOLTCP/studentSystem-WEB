class UserDetails {
    constructor({
      user,
      userpreferences = null,
      teacher = null,
      student = null,
      studentsSchedule = null,
      major = null,
      department = null,
      departmentOfEducation = null,
      teachersMajorPlanning = null,
      teachersCoursePlanning = null,
    }) {
      this.user = user;
      this.userpreferences = userpreferences;
      this.teacher = teacher;
      this.student = student;
      this.studentsSchedule = studentsSchedule;
      this.major = major;
      this.department = department;
      this.departmentOfEducation = departmentOfEducation;
      this.teachersMajorPlanning = teachersMajorPlanning;
      this.teachersCoursePlanning = teachersCoursePlanning;
    }
  }
  
  export default UserDetails;