import React from 'react';

class TeacherUser {
  constructor({
    teacherId,
    userId,
    teacherCode,
    teacherEmail,
    certificate,
    profession,
    academicDegree,
    jobTitle,
    jobDescription,
    isActive,
    departmentsOfEducation,
    departmentId,
  }) {
    this.teacherId = teacherId;
    this.userId = userId;
    this.teacherCode = teacherCode;
    this.teacherEmail = teacherEmail;
    this.certificate = certificate;
    this.profession = profession;
    this.academicDegree = academicDegree;
    this.jobTitle = jobTitle;
    this.isActive = isActive;
    this.jobDescription = jobDescription;
    this.departmentsOfEducation = departmentsOfEducation;
    this.departmentId = departmentId;
  }

  static fromJsonTeacher(json) {
    return new TeacherUser({
      teacherId: json.teacher_d,
      userId: json.user_id,
      teacherCode: json.teacher_code,
      teacherEmail: json.teacher_email,
      certificate: json.certificate,
      profession: json.profession,
      academicDegree: json.academic_degree,
      jobTitle: json.job_title,
      isActive: json.is_active === 'is_working' ? 'Ажиллаж байгаа' :
        json.is_active === 'vacation' ? 'Амралт' :
        'Ажлаас гарсан',
      jobDescription: json.job_description,
      departmentsOfEducation: json.departments_of_education,
      departmentId: json.department_id,
    });
  }

  static toJson (TeacherUser) {
    return {
      teacher_d: TeacherUser.teacherId,
      user_id: TeacherUser.userId,
      teacher_code: TeacherUser.teacherCode,
      additional_roles: TeacherUser.teacherEmail,
      student_code: TeacherUser.certificate,
      student_email: TeacherUser.profession,
      student_file: TeacherUser.academicDegree,
      job_title: TeacherUser.jobTitle,
      is_active: TeacherUser.isActive,
      job_description: TeacherUser.jobDescription,
      departments_of_education: TeacherUser.departmentsOfEducation,
      department_id: TeacherUser.departmentId,
    };
  }

  static fromJsonButInApp(json) {
    try {
      return new TeacherUser({
        teacherId: json.teacherId,
        userId: json.userId,
        teacherCode: json.teacherCode ?? null,
        teacherEmail: json.teacherEmail ?? 'none',
        certificate: json.certificate ?? '',
        profession: json.profession ?? '',
        academicDegree: json.academicDegree,
        jobTitle: json.jobTitle ?? '',
        isActive: json.isActive ?? '',
        jobDescription: json.jobDescription ?? '',
        departmentsOfEducation: json.departmentsOfEducation ?? '',
        departmentId: json.departmentId ?? null,
      });
    } catch (error) {
      console.error('Error parsing TeacherUser from JSON string:', error);
      return null; // Handle errors gracefully
    }
  }

  static fromJson(source) {
    try {
      const map = JSON.parse(source);
      return TeacherUser.fromMap(map);
    } catch (error) {
      console.error('Error parsing TeacherUser from JSON:', error);
      return null;
    }
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }
}

export default TeacherUser;