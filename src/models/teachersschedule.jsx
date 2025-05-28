import React from 'react';

class TeachersSchedule {
  constructor({
    classroomId,
    students,
    teacherId,
    courseId,
    majorId,
    teacherName,
    teachersEmail,
    scheduleType,
    time,
    coursePlanningId,
    days,
    teachersScheduleId,
    createdAt,
    courseName,
    classroomCapacity,
    classroomType,
    classroomNumber,
    schedulesTimetablePosition,
    courseCode,
  }) {
    this.classroomId = classroomId;
    this.students = students;
    this.teacherId = teacherId;
    this.courseId = courseId;
    this.majorId = majorId;
    this.teacherName = teacherName;
    this.teachersEmail = teachersEmail;
    this.scheduleType = scheduleType;
    this.time = time;
    this.coursePlanningId = coursePlanningId;
    this.days = days;
    this.teachersScheduleId = teachersScheduleId;
    this.createdAt = createdAt;
    this.courseName = courseName;
    this.classroomCapacity = classroomCapacity;
    this.classroomType = classroomType;
    this.classroomNumber = classroomNumber;
    this.schedulesTimetablePosition = schedulesTimetablePosition;
    this.courseCode = courseCode;
  }

  static fromJsonTeachersSchedule(json) {
    try {
      return new TeachersSchedule({
        classroomId: json.classroom_id,
        students: json.students,
        teacherId: json.teacher_id,
        courseId: json.course_id,
        majorId: json.major_id,
        teacherName: json.teacher_name,
        teachersEmail: json.teachers_email,
        scheduleType: json.schedule_type,
        time: json.time,
        coursePlanningId: json.course_planning_id,
        days: json.days,
        teachersScheduleId: json.teachers_schedule_id,
        createdAt: new Date(json.created_at),
        courseName: json.course_name,
        classroomCapacity: json.classroom_capacity,
        classroomType: json.classroom_type,
        classroomNumber: json.classroom_number,
        schedulesTimetablePosition: json.schedules_timetable_position,
        courseCode: json.course_code,
      });
    } catch (error) {
      console.error('Error parsing TeachersSchedule from JSON:', error);
      return null;
    }
  }

  static toJson(teachersSchedule) {
    return {
      classroom_id: teachersSchedule.classroomId,
      students: teachersSchedule.students ?? null,
      teacher_id: teachersSchedule.teacherId,
      course_id: teachersSchedule.courseId,
      major_id: teachersSchedule.majorId,
      teacher_name: teachersSchedule.teacherName,
      teachers_email: teachersSchedule.teachersEmail,
      schedule_type: teachersSchedule.scheduleType,
      time: teachersSchedule.time,
      course_planning_id: teachersSchedule.coursePlanningId,
      days: teachersSchedule.days,
      teachers_schedule_id: teachersSchedule.teachersScheduleId ?? null,
      created_at: teachersSchedule.createdAt ? teachersSchedule.createdAt.toISOString().split('T')[0] : null,
      course_name: teachersSchedule.courseName,
      classroom_capacity: teachersSchedule.classroomCapacity,
      classroom_type: teachersSchedule.classroomType,
      classroom_number: teachersSchedule.classroomNumber,
      schedules_timetable_position: teachersSchedule.schedulesTimetablePosition,
      course_code: teachersSchedule.courseCode,
    };
  }

  static toJsonButInApp(teachersSchedule) {
    return {
      classroom_id: teachersSchedule.classroomId,
      students: teachersSchedule.students,
      teacher_id: teachersSchedule.teacherId,
      course_id: teachersSchedule.courseId,
      major_id: teachersSchedule.majorId,
      teacher_name: teachersSchedule.teacherName,
      teachers_email: teachersSchedule.teachersEmail,
      schedule_type: teachersSchedule.scheduleType,
      time: teachersSchedule.time,
      course_planning_id: teachersSchedule.coursePlanningId,
      days: teachersSchedule.days,
      teachers_schedule_id: teachersSchedule.teachersScheduleId,
      created_at: teachersSchedule.createdAt ? teachersSchedule.createdAt.toISOString().split('T')[0] : null,
      course_name: teachersSchedule.courseName,
      classroom_capacity: teachersSchedule.classroomCapacity,
      classroom_type: teachersSchedule.classroomType,
      classroom_number: teachersSchedule.classroomNumber,
      schedules_timetable_position: teachersSchedule.schedulesTimetablePosition,
      course_code: teachersSchedule.courseCode,
    };
  }
}

export default TeachersSchedule;