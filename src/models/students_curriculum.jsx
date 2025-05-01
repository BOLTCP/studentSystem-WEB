class StudentCurriculum {
  constructor({
    studentCurriculumId,
    studentId,
    credit,
    studentCurriculumYear,
    semesterYear,
    modifiedAt,
    semesterSeason,
    studentsCurriculum,
  }) {
    this.studentCurriculumId = studentCurriculumId;
    this.studentId = studentId;
    this.credit = credit;
    this.studentCurriculumYear = studentCurriculumYear ? new Date(studentCurriculumYear) : null;
    this.semesterYear = semesterYear;
    this.modifiedAt = modifiedAt ? new Date(modifiedAt) : new Date();
    this.semesterSeason = semesterSeason;
    this.studentsCurriculum = studentsCurriculum;
  }

  // Static method to create an instance from JSON
  static fromJsonStudentCurriculum(json) {
    try {
      return new StudentCurriculum({
        studentCurriculumId: json.student_curriculum_id,
        studentId: json.student_id,
        credit: json.credit,
        studentCurriculumYear: json.student_curriculum_year,
        semesterYear: json.semester_year,
        modifiedAt: json.modified_at,
        semesterSeason: json.semester_season,
        studentsCurriculum: json.students_curriculum,
      });
    } catch (error) {
      console.error('Error parsing StudentCurriculum from JSON:', error);
      return null;
    }
  }

  // Convert the instance to JSON for sending to the backend
  toJson() {
    return {
      student_curriculum_id: this.studentCurriculumId,
      student_id: this.studentId,
      credit: this.credit,
      student_curriculum_year: this.studentCurriculumYear ? this.studentCurriculumYear.toISOString() : null,
      semester_year: this.semesterYear,
      modified_at: this.modifiedAt.toISOString(),
      semester_season: this.semesterSeason,
      students_curriculum: this.studentsCurriculum,
    };
  }

  // String representation of the object
  toString() {
    return `StudentCurriculum(studentCurriculumId: ${this.studentCurriculumId}, studentId: ${this.studentId}, credit: ${this.credit}, studentCurriculumYear: ${this.studentCurriculumYear}, semesterYear: ${this.semesterYear}, semesterSeason: ${this.semesterSeason})`;
  }
}

export default StudentCurriculum;
