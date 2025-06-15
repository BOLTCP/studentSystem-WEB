import React from "react";

class CourseWeek {
  constructor({
    courseWeekId,
    courseManagementId,
    week,
    activityStatus,
    title, 
    description,
  }) {
    this.courseWeekId = courseWeekId;
    this.courseManagementId = courseManagementId;
    this.week = week;
    this.activityStatus = activityStatus;
    this.title = title;
    this.description = description;
  }

  static fromJsonCourseWeek(json) {
    return new CourseWeek({
      courseWeekId: json.course_week_id,
      courseManagementId: json.course_management_id,
      week: json.week,
      activityStatus: json.activity_status,
      title: json.title,
      description: json.description,
    });
  }

  static toJson(CourseWeek) {
    return {
      course_week_id: CourseWeek.courseWeekId,
      course_management_id: CourseWeek.courseManagementId,
      week: CourseWeek.week,
      activity_status: CourseWeek.activityStatus,
      title: CourseWeek.title,
      description: CourseWeek.description,
    }
  }

}
export default CourseWeek;