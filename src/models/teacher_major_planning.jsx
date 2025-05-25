import React from 'react'; // React import is common in models for consistency, even if not directly used

class TeachersMajorPlanning {
  constructor({
    teacherMajorId,
    teacherId,
    academicDegreeOfMajor,
    majorName,
    majorId,
    credit,
    departmentId,
    createdAt,
    departmentOfEducationsId,
  }) {
    this.teacherMajorId = teacherMajorId;
    this.teacherId = teacherId;
    this.academicDegreeOfMajor = academicDegreeOfMajor;
    this.majorName = majorName;
    this.majorId = majorId;
    this.credit = credit;
    this.departmentId = departmentId;
    this.createdAt = createdAt;
    this.departmentOfEducationsId = departmentOfEducationsId;
  }
 
  static fromJsonPlanning(json) { 
    try {
      if (!json) {
        console.warn('TeachersMajorPlanning.fromJsonPlanning: Input JSON is null or undefined.');
        return null;
      }
      return new TeachersMajorPlanning({
        teacherMajorId: json.teacher_major_id,
        teacherId: json.teacher_id,
        academicDegreeOfMajor: json.academic_degree_of_major,
        majorName: json.major_name,
        majorId: json.major_id,
        credit: json.credit,
        departmentId: json.department_id,
        createdAt: json.created_at,
        departmentOfEducationsId: json.department_of_educations_id,
      });
    } catch (error) {
      console.error('Error parsing TeachersMajorPlanning from JSON:', error);
      return null;
    }
  }

 
  static toJson(planning) { 
    if (!planning) return null;
    return {
      teacher_major_id: planning.teacherMajorId,
      teacher_id: planning.teacherId,
      academic_degree_of_major: planning.academicDegreeOfMajor,
      major_name: planning.majorName,
      major_id: planning.majorId,
      credit: planning.credit,
      department_id: planning.departmentId,
      created_at: planning.createdAt,
      department_of_educations_id: planning.departmentOfEducationsId,
    };
  }
 
  static toJsonButInApp(planning) { 
    if (!planning) return null;
    return {
      teacherMajorId: planning.teacherMajorId,
      teacherId: planning.teacherId,
      academicDegreeOfMajor: planning.academicDegreeOfMajor,
      majorName: planning.majorName,
      majorId: planning.majorId,
      credit: planning.credit,
      departmentId: planning.departmentId,
      createdAt: planning.createdAt,
      departmentOfEducationsId: planning.departmentOfEducationsId,
    };
  }
}

export default TeachersMajorPlanning;