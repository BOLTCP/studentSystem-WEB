import React from 'react';

class Courses {
  constructor({
    courseId,
    courseName,
    courseCode,
    courseType,
    courseYear,
    totalCredits,
    majorId,
    description,
    courseSeason,
    timesPerWeek,
  }) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.courseCode = courseCode;
    this.courseType = courseType;
    this.courseYear = courseYear;
    this.totalCredits = totalCredits;
    this.majorId = majorId;
    this.description = description;
    this.courseSeason = courseSeason;
    this.timesPerWeek = timesPerWeek;
  }

  static fromJsonCourse(json) {
    return new Courses({
      courseId: json.course_id,
      courseName: json.course_name,
      courseCode: json.course_code,
      courseType: json.course_type,
      courseYear: json.course_year,
      totalCredits: json.total_credits,
      majorId: json.majorId,
      description: json.description,
      courseSeason: json.course_season,
      timesPerWeek: json.times_per_week,
    });
  } catch (error) {
    console.error('Error parsing AuthUser from JSON:', error);
    return null;
  }
}
export default Courses;