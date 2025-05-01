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
      additionalRoles: json.additional_roles ?? 'none',
      studentCode: json.student_code,
      studentEmail: json.student_email,
      studentFile: json.student_file ? { ...json.student_file } : {},
      enrollmentNumber: json.enrollment_number,
      enrollmentYear: json.enrollment_year,
      yearClassification: json.year_classification,
      isActive: json.is_active,
      currentAcademicDegree: json.current_academic_degree,
      academicDegreeFile: json.academic_degree_file,
      majorId: json.major_id,
      createdAt: json.created_at,
      departmentId: json.department_id,
      isCurriculumClosed: json.is_curriculum_closed,
    });
  }

  toJson() {
    return {
      student_id: this.studentId,
      user_id: this.userId,
      student_club_id: this.studentClubId,
      additional_roles: this.additionalRoles,
      student_code: this.studentCode,
      student_email: this.studentEmail,
      student_file: this.studentFile,
      enrollment_number: this.enrollmentNumber,
      enrollment_year: this.enrollmentYear,
      year_classification: this.yearClassification,
      is_active: this.isActive,
      current_academic_degree: this.currentAcademicDegree,
      academic_degree_file: this.academicDegreeFile,
      major_id: this.majorId,
      created_at: this.createdAt ? this.createdAt.toISOString() : new Date().toISOString(),
      department_id: this.departmentId,
      is_curriculum_closed: this.isCurriculumClosed,
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