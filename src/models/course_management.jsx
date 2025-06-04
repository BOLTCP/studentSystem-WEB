import React from 'react'; // Still good practice, though not strictly needed for a data model class

class CourseManagement{
  constructor({
    courseManagementId,
    courseName,
    description,
    courseLength,
    teacherId,
    teacherCode,
    createdAt,
    teacherCoursePlanningId,
  }) {
    this.courseManagementId = courseManagementId;
    this.courseName = courseName;
    this.description = description;
    this.courseLength = courseLength;
    this.teacherId = teacherId;
    this.teacherCode = teacherCode;
    this.createdAt = createdAt;
    this.teacherCoursePlanningId = teacherCoursePlanningId;
  }

  static fromJsonCourseManagement(json) {
    try {
      return new CourseManagement({
        courseManagementId: json.course_management_id,
        courseName: json.course_name,
        description: json.description,
        courseLength: json.course_length,
        teacherId: json.teacher_id,
        teacherCode: json.teacher_code,
        createdAt: json.created_at,
        teacherCoursePlanningId: json.teacher_course_planning_id,
      });
    } catch (error) {
      console.error('Error parsing CourseManagement from JSON:', error);
      return null;
    }
  }

  static toJson(CourseManagement) {
    return {
      course_management_id: CourseManagement.courseManagementId,
      course_name: CourseManagement.courseName,
      description: CourseManagement.description,
      course_length: CourseManagement.courseLength,
      teache_id: CourseManagement.teacherId,
      teacher_code: CourseManagement.teacherCode,
      created_at: CourseManagement.createdAt,
      teacher_course_planning_id: CourseManagement.teacherCoursePlanningId,
    };
  }

}
export default CourseManagement;