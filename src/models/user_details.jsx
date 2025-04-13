class UserDetails {
    constructor({
      user,
      teacher = null,
      student = null,
      major = null,
      department = null,
      departmentOfEducation = null,
      teachersMajorPlanning = null,
      teachersCoursePlanning = null,
    }) {
      this.user = user;
      this.teacher = teacher;
      this.student = student;
      this.major = major;
      this.department = department;
      this.departmentOfEducation = departmentOfEducation;
      this.teachersMajorPlanning = teachersMajorPlanning;
      this.teachersCoursePlanning = teachersCoursePlanning;
    }
  }
  
  export default UserDetails;