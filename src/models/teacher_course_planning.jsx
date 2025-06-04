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
    courseLength,
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
    this.courseLength = courseLength;
  }

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
        courseLength: json.course_length,
      });
    } catch (error) {
      console.error('Error parsing TeacherCoursePlanning from JSON:', error);
      return null;
    }
  }

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
      course_length: instance.courseLength,
    };
  }

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
      courseLength: instance.courseLength,
    };
  }
}

export default TeacherCoursePlanning;