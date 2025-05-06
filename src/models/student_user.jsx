import React from 'react';

class StudentUser {
  constructor({
    studentId,
    userId,
    studentClubId,
    additionalRoles = 'none',
    studentCode,
    studentEmail,
    studentFile = {},
    enrollmentNumber,
    enrollmentYear,
    yearClassification,
    isActive,
    currentAcademicDegree,
    academicDegreeFile,
    majorId,
    createdAt,
    departmentId,
    isCurriculumClosed,
  }) {
    this.studentId = studentId;
    this.userId = userId;
    this.studentClubId = studentClubId;
    this.additionalRoles = additionalRoles;
    this.studentCode = studentCode;
    this.studentEmail = studentEmail;
    this.studentFile = studentFile;
    this.enrollmentNumber = enrollmentNumber;
    this.enrollmentYear = enrollmentYear;
    this.yearClassification = yearClassification;
    this.isActive = isActive;
    this.currentAcademicDegree = currentAcademicDegree;
    this.academicDegreeFile = academicDegreeFile;
    this.majorId = majorId;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.departmentId = departmentId;
    this.isCurriculumClosed = isCurriculumClosed;
  }

  static fromJsonStudent(json) {
    return new StudentUser({
      studentId: json.student_id,
      userId: json.user_id,
      studentClubId: json.student_club_id,
      additionalRoles: json.additional_roles === 'none' ? 'байхгүй' : 
        json.additional_roles === 'laborant' ? 'Лаборант' : 
        json.additional_roles === 'club_primary_leader' ? 'Клубын тэргүүн' :
        'Клубын дэд тэргүүн',
      studentCode: json.student_code,
      studentEmail: json.student_email,
      studentFile: json.student_file ? { ...json.student_file } : {},
      enrollmentNumber: json.enrollment_number,
      enrollmentYear: json.enrollment_year,
      yearClassification: json.year_classification === 'freshman' ? '1-р курс' :
        json.year_classification === 'junior' ? '2-р курс' :
        json.year_classification === 'sophomore' ? '3-р курс' :
        '4-р курс',
      isActive: json.is_active === 'studying' ? 'Суралцаж байгаа' :
        json.is_active === 'graduated' ? 'Төгссөн' :
        json.is_active === 'expelled' ? 'Хөөгдсөн' :
        'Шилжсэн',
      currentAcademicDegree: json.current_academic_degree,
      academicDegreeFile: json.academic_degree_file,
      majorId: json.major_id,
      createdAt: json.created_at,
      departmentId: json.department_id,
      isCurriculumClosed: json.is_curriculum_closed,
    });
  }

  static toJson (StudentUser) {
    return {
      student_id: StudentUser.studentId,
      user_id: StudentUser.userId,
      student_club_id: StudentUser.studentClubId,
      additional_roles: StudentUser.additionalRoles === 'байхгүй' ? 'none' : 
       StudentUser.additionalRoles === 'Лаборант' ? 'laborant' : 
       StudentUser.additionalRoles === 'Клубын тэргүүн' ? 'club_primary_leader' :
        'club_assistant_leader',
      student_code: StudentUser.studentCode,
      student_email: StudentUser.studentEmail,
      student_file: StudentUser.studentFile,
      enrollment_number: StudentUser.enrollmentNumber,
      enrollment_year: StudentUser.enrollmentYear,
      year_classification: StudentUser.yearClassification === '1-р курс' ? 'freshman' :
       StudentUser.yearClassification === '2-р курс' ? 'junior' :
       StudentUser.yearClassification === '3-р курс' ? 'sophomore' :
        'senior',
      is_active: StudentUser.isActive === 'Суралцаж байгаа' ? 'studying' :
       StudentUser.isActive === 'Төгссөн' ? 'graduated' :
       StudentUser.isActive === 'Хөөгдсөн' ? 'expelled' :
        'transfered',
      current_academic_degree: StudentUser.currentAcademicDegree,
      academic_degree_file: StudentUser.academicDegreeFile,
      major_id: StudentUser.majorId,
      created_at: StudentUser.createdAt ? StudentUser.createdAt.toISOString() : new Date().toISOString(),
      department_id: StudentUser.departmentId,
      is_curriculum_closed: StudentUser.isCurriculumClosed,
    };
  }

  static fromJsonButInApp(json) {
    try {
      return new StudentUser({
        studentId: json.studentId ?? 0,
        userId: json.userId ?? 0,
        studentClubId: json.studentClubId ?? null,
        additionalRoles: json.additionalRoles ?? 'none',
        studentCode: json.studentCode ?? '',
        studentEmail: json.studentEmail ?? '',
        studentFile: json.studentFile ? { ...json.studentFile } : {},
        enrollmentNumber: json.enrollmentNumber ?? '',
        enrollmentYear: json.enrollmentYear ?? '',
        yearClassification: json.yearClassification ?? '',
        isActive: json.isActive ?? true,
        currentAcademicDegree: json.currentAcademicDegree ?? '',
        academicDegreeFile: json.academicDegreeFile ?? null,
        majorId: json.majorId ?? 0,
        createdAt: json.createdAt ? new Date(json.createdAt) : null, // Convert ISO string back to Date
        departmentId: json.departmentId,
        isCurriculumClosed: json.isCurriculumClosed,
      });
    } catch (error) {
      console.error('Error parsing StudentUser from JSON string:', error);
      return null; // Handle errors gracefully
    }
  }

  static fromJson(source) {
    try {
      const map = JSON.parse(source);
      return StudentUser.fromMap(map);
    } catch (error) {
      console.error('Error parsing StudentUser from JSON:', error);
      return null;
    }
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }
}

export default StudentUser;