import React from 'react'; // React import is good practice for JSX files, though not strictly used in a pure data model class

class TeacherCoursePlanning {
  constructor({
    teacherCoursePlanningId,
    teacherId,
    majorName,
    majorId,
    courseName,
    credit,
    courseId,
    departmentId,
    createdAt,
    departmentOfEduId,
    courseCode,
    teacherMajorId,
  }) {
    this.teacherCoursePlanningId = teacherCoursePlanningId;
    this.teacherId = teacherId;
    this.majorName = majorName;
    this.majorId = majorId;
    this.courseName = courseName;
    this.credit = credit;
    this.courseId = courseId;
    this.departmentId = departmentId;
    this.createdAt = createdAt;
    this.departmentOfEduId = departmentOfEduId;
    this.courseCode = courseCode;
    this.teacherMajorId = teacherMajorId;
  }

  /**
   * Creates a TeacherCoursePlanning instance from a JSON object (e.g., from a database response).
   * Assumes keys are in snake_case as per your PostgreSQL table.
   * @param {Object} json - The JSON object from the backend.
   * @returns {TeacherCoursePlanning | null} A new TeacherCoursePlanning instance, or null if parsing fails.
   */
  static fromJsonTeacherCoursePlanning(json) {
    if (!json) {
      console.warn('TeacherCoursePlanning.fromJson received null or undefined JSON.');
      return null;
    }
    try {
      return new TeacherCoursePlanning({
        teacherCoursePlanningId: json.teacher_course_planning_id,
        teacherId: json.teacher_id,
        majorName: json.major_name,
        majorId: json.major_id,
        courseName: json.course_name,
        credit: json.credit,
        courseId: json.course_id,
        departmentId: json.department_id,
        createdAt: json.created_at ? new Date(json.created_at) : null, // Convert to Date object
        departmentOfEduId: json.department_of_edu_id,
        courseCode: json.course_code,
        teacherMajorId: json.teacher_major_id,
      });
    } catch (error) {
      console.error('Error parsing TeacherCoursePlanning from JSON:', error);
      return null;
    }
  }

  /**
   * Converts a TeacherCoursePlanning instance to a JSON object for sending to a backend API.
   * Assumes the backend expects snake_case keys.
   * @param {TeacherCoursePlanning} instance - The TeacherCoursePlanning instance.
   * @returns {Object} A JSON object with snake_case keys.
   */
  static toJson(instance) {
    if (!instance) {
      console.warn('TeacherCoursePlanning.toJson received null or undefined instance.');
      return null;
    }
    return {
      teacher_course_planning_id: instance.teacherCoursePlanningId,
      teacher_id: instance.teacherId,
      major_name: instance.majorName,
      major_id: instance.majorId,
      course_name: instance.courseName,
      credit: instance.credit,
      course_id: instance.courseId,
      department_id: instance.departmentId,
      created_at: instance.createdAt ? instance.createdAt.toISOString() : null, // Convert Date to ISO string
      department_of_edu_id: instance.departmentOfEduId,
      course_code: instance.courseCode,
      teacher_major_id: instance.teacherMajorId,
    };
  }

  /**
   * Converts a TeacherCoursePlanning instance to a JSON object using camelCase keys,
   * typically for internal app usage if preferred, or for APIs expecting camelCase.
   * @param {TeacherCoursePlanning} instance - The TeacherCoursePlanning instance.
   * @returns {Object} A JSON object with camelCase keys.
   */
  static toJsonButInApp(instance) {
    if (!instance) {
      console.warn('TeacherCoursePlanning.toJsonButInApp received null or undefined instance.');
      return null;
    }
    return {
      teacherCoursePlanningId: instance.teacherCoursePlanningId,
      teacherId: instance.teacherId,
      majorName: instance.majorName,
      majorId: instance.majorId,
      courseName: instance.courseName,
      credit: instance.credit,
      courseId: instance.courseId,
      departmentId: instance.departmentId,
      createdAt: instance.createdAt,
      departmentOfEduId: instance.departmentOfEduId,
      courseCode: instance.courseCode,
      teacherMajorId: instance.teacherMajorId,
    };
  }
}

export default TeacherCoursePlanning;