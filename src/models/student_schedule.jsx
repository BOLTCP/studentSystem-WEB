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
    teachersScheduleId,
  }) {
    this.studentsScheduleId = studentsScheduleId;
    this.studentId = studentId;
    this.courseId = courseId;
    this.classroomNumber = classroomNumber;
    this.classGroup = classGroup;
    this.modifiedAt = modifiedAt;
    this.schedulesTimetablePosition = schedulesTimetablePosition;
    this.courseName = courseName;
    this.time = time;
    this.teachersEmail = teachersEmail;
    this.teachersName = teachersName;
    this.days = days;
    this.studentCode = studentCode;
    this.scheduleType = scheduleType;
    this.teacherCode = teacherCode;
    this.teachersScheduleId = teachersScheduleId;
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
        time: json.time === 'firstPeriod' ? '1-р цаг' :
          json.time === 'secondPeriod' ? '2-р цаг' :
          json.time === 'thirdPeriod' ? '3-р цаг' :
          json.time === 'fourthPeriod' ? '4-р цаг' :
          json.time === 'fifthPeriod' ? '5-р цаг' :
          json.time === 'sixthPeriod' ? '6-р цаг' :
          json.time === 'seventhPeriod' ? '7-р цаг' :
          json.time === 'eightPeriod' ? '8-р цаг' :
          json.time === 'ninthPeriod' ? '9-р цаг' : 
          '',
        teachersEmail: json.teachers_email,
        teachersName: json.teachers_name,
        days: json.days,
        studentCode: json.student_code,
        scheduleType: json.schedule_type,
        teacherCode: json.teacher_code,
        teachersScheduleId: json.teachers_schedule_id,
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
      modified_at: studentsSchedule.modifiedAt,
      schedules_timetable_position: studentsSchedule.schedulesTimetablePosition,
      course_name: studentsSchedule.courseName,
      time: studentsSchedule.time,
      teachers_email: studentsSchedule.teachersEmail,
      teachers_name: studentsSchedule.teachersName,
      days: studentsSchedule.days,
      student_code: studentsSchedule.studentCode,
      schedule_type: studentsSchedule.scheduleType,
      teacher_code: studentsSchedule.teacherCode,
      teachers_schedule_id: studentsSchedule.teachersScheduleId,
    };
  }

  static fromJsonButInApp(studentsSchedule) {
    return {
      studentsScheduleId: studentsSchedule.studentsScheduleId,
      studentId: studentsSchedule.studentId,
      courseId: studentsSchedule.courseId,
      classroomNumber: studentsSchedule.classroomNumber,
      classGroup: studentsSchedule.classGroup,
      modifiedAt: studentsSchedule.modifiedAt,
      schedulesTimetablePosition: studentsSchedule.schedulesTimetablePosition,
      courseName: studentsSchedule.courseName,
      time: studentsSchedule.time,
      teachersEmail: studentsSchedule.teachersEmail,
      teachersName: studentsSchedule.teachersName,
      days: studentsSchedule.days,
      studentCode: studentsSchedule.studentCode,
      scheduleType: studentsSchedule.scheduleType,
      teacherCode: studentsSchedule.teacherCode,
      teachersScheduleId: studentsSchedule.teachersScheduleId,
    };
  }

  static convertDays(days) {
    const convertedDays = days === 'Monday' ? 'Даваа'
      : days === 'Tuesday' ? 'Мягмар'
      : days === 'Wednesday' ? 'Лхагва'
      : days === 'Thursday' ? 'Пүрэв'
      : days === 'Friday' ? 'Баасан'
      : days === 'Saturday' ? 'Бямба'
      : 'Ням';
    return convertedDays;
  }

}

export default StudentsSchedule;
