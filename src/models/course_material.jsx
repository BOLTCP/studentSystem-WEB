import React from "react";

class CourseMaterial {
  constructor ({
    courseMaterialId,
    courseId,
    week,
    description,
    teacherId,
    createdAt,
    courseManagementId,
    courseWeekId,
    title,
    file,
  }) {
    this.courseMaterialId = courseMaterialId;
    this.courseId = courseId;
    this.week = week;
    this.description = description;
    this.teacherId = teacherId;
    this.createdAt = createdAt;
    this.courseManagementId = courseManagementId;
    this.courseWeekId = courseWeekId;
    this.title = title;
    this.file = file;
  }

  static fromJsonCourseMaterial(json) {
    return new CourseMaterial({
      courseMaterialId: json.course_material_id,
      courseId: json.course_id,
      week: json.week,
      description: json.description,
      teacherId: json.teacher_id,
      createdAt: json.created_at,
      courseManagementId: json.course_management_id,
      courseWeekId: json.course_week_id,
      title: json.title,
      file: json.file,
    });
  }

  static toJson(CourseMaterial) {
    return {
      course_material_id: CourseMaterial.courseMaterialId,
      course_id: CourseMaterial.courseId,
      week: CourseMaterial.week,
      description: CourseMaterial.description,
      teacher_id: CourseMaterial.teacherId,
      created_at: CourseMaterial.createdAt,
      course_management_id: CourseMaterial.courseManagementId,
      course_week_id: CourseMaterial.courseWeekId,
      title: CourseMaterial.title,
      file: CourseMaterial.file,
    }
  }

}
export default CourseMaterial;