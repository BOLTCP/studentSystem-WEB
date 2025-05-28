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
      courseType: json.course_type === 'mandatory' ? 'Заавал судлах' :
        'Сонгон судлах',
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

  static toJson(Courses) {
    return {
      course_id: Courses.course_id,
      course_name: Courses.course_name,
      course_code: Courses.course_code,
      course_type: Courses.course_type,
      course_year: Courses.course_year,
      total_credits: Courses.total_credits,
      major_id: Courses.major_id,
      description: Courses.description,
      course_season: Courses.course_season,
      times_per_week: Courses.times_per_week,
    };
  }

  static toJsonButInApp(Courses) {
    return {
      course_id: Courses.courseId,
      course_name: Courses.courseName,
      course_code: Courses.courseCode,
      course_type: Courses.courseType,
      course_year: Courses.courseYear,
      total_credits: Courses.totalCredits,
      major_id: Courses.majorId,
      description: Courses.description,
      course_season: Courses.courseSeason,
      times_per_week: Courses.timesPerWeek,
    };
  }


}
export default Courses;