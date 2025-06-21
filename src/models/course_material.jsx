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
    courseMatType,
    materialOrder,
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
    this.courseMatType = courseMatType;
    this.materialOrder = materialOrder;
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
      courseMatType: json.course_mat_type === 'Laboratory' ? 'Лабораторийн хэсэг' :
        json.course_mat_type === 'Lecture' ? 'Лекцийн хэсэг' :
        json.course_mat_type === 'Seminar' ? 'Семинарын хэсэг' :
        json.course_mat_type === 'Introduction' ? 'Танилцуулга Эхлэлийн хэсэг' : 
        json.course_mat_type === 'Quiz' ? 'Өөрийгөө сорих Quiz хэсэг' :
        json.course_mat_type === 'SemiFinal' ? 'Явцын шалгалт №1' :
        json.course_mat_type === 'SemiFinal1' ? 'Явцын шалгалт №2' :
        json.course_mat_type === 'SatisfactionSurvey' ? 'Сэтгэл ханамжийн судалгаа' :
        'Улирлын шалгалт',
      materialOrder: json.material_order,
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
      course_mat_type: CourseMaterial.courseMatType === 'Лабораторийн хэсэг' ? 'Laboratory' :
        CourseMaterial.courseMatType === 'Лекцийн хэсэг' ? 'Lecture' :
        CourseMaterial.courseMatType === 'Семинарын хэсэг' ? 'Seminar' :
        CourseMaterial.courseMatType === 'Танилцуулга Эхлэлийн хэсэг' ? 'Introduction' : 
        CourseMaterial.courseMatType === 'Өөрийгөө сорих Quiz хэсэг' ? 'Quiz' :
        CourseMaterial.courseMatType === 'Явцын шалгалт №1' ? 'SemiFinal' :
        CourseMaterial.courseMatType === 'Явцын шалгалт №2' ? 'SemiFinal1' :
        CourseMaterial.courseMatType === 'Сэтгэл ханамжийн судалгаа' ? 'SatisfactionSurvey' :
        'Final',
      material_order: CourseMaterial.materialOrder,
    }
  }

}
export default CourseMaterial;