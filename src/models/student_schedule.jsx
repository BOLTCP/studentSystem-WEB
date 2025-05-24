import React from 'react';

class StudentsSchedule {
  constructor({
    studentsScheduleId,
    studentId,
    courseId,
    classroomNumber,
    classGroup,
    modifiedAt,
    schedulesTimetablePosition,
    courseName,
    time,
    teachersEmail,
    teachersName,
    days,
    studentCode,
    scheduleType,
    teacherCode,
  }) {
    this.studentsScheduleId = studentsScheduleId;
    this.studentId = studentId;
    this.courseId = courseId;
    this.classroomNumber = classroomNumber;
    this.classGroup = classGroup;
    this.modifiedAt = modifiedAt ? new Date(modifiedAt) : null;
    this.schedulesTimetablePosition = schedulesTimetablePosition;
    this.courseName = courseName;
    this.time = time;
    this.teachersEmail = teachersEmail;
    this.teachersName = teachersName;
    this.days = days;
    this.studentCode = studentCode;
    this.scheduleType = scheduleType;
    this.teacherCode = teacherCode;
  }

  static fromJsonStudentsSchedule(json) {
    try {
      return new StudentsSchedule({
        studentsScheduleId: json.students_schedule_id,
        studentId: json.student_id,
        courseId: json.course_id,
        classroomNumber: json.classroom_number,
        classGroup: json.class_group,
        modifiedAt: json.modified_at,
        schedulesTimetablePosition: json.schedules_timetable_position,
        courseName: json.course_name,
        time: json.time,
        teachersEmail: json.teachers_email,
        teachersName: json.teachers_name,
        days: json.days,
        studentCode: json.student_code,
        scheduleType: json.schedule_type,
        teacherCode: json.teacher_code,
      });
    } catch (error) {
      console.error('Error parsing StudentsSchedule from JSON:', error);
      return null;
    }
  }

  static toJson(studentsSchedule) {
    return {
      students_schedule_id: studentsSchedule.studentsScheduleId,
      student_id: studentsSchedule.studentId,
      course_id: studentsSchedule.courseId,
      classroom_number: studentsSchedule.classroomNumber,
      class_group: studentsSchedule.classGroup,
      modified_at: studentsSchedule.modifiedAt
        ? studentsSchedule.modifiedAt.toISOString().split('T')[0]
        : null,
      schedules_timetable_position: studentsSchedule.schedulesTimetablePosition,
      course_name: studentsSchedule.courseName,
      time: studentsSchedule.time,
      teachers_email: studentsSchedule.teachersEmail,
      teachers_name: studentsSchedule.teachersName,
      days: studentsSchedule.days,
      student_code: studentsSchedule.studentCode,
      schedule_type: studentsSchedule.scheduleType,
      teacher_code: studentsSchedule.teacherCode,
    };
  }

  static fromJsonButInApp(studentsSchedule) {
    return {
      students_schedule_id: studentsSchedule.studentsScheduleId,
      student_id: studentsSchedule.studentId,
      course_id: studentsSchedule.courseId,
      classroom_number: studentsSchedule.classroomNumber,
      class_group: studentsSchedule.classGroup,
      modified_at: studentsSchedule.modifiedAt
        ? studentsSchedule.modifiedAt.toISOString().split('T')[0]
        : null,
      schedules_timetable_position: studentsSchedule.schedulesTimetablePosition,
      course_name: studentsSchedule.courseName,
      time: studentsSchedule.time,
      teachers_email: studentsSchedule.teachersEmail,
      teachers_name: studentsSchedule.teachersName,
      days: studentsSchedule.days,
      student_code: studentsSchedule.studentCode,
      schedule_type: studentsSchedule.scheduleType,
      teacher_code: studentsSchedule.teacherCode,
    };
  }
}

export default StudentsSchedule;
