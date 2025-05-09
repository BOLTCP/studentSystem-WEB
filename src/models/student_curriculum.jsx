class StudentCurriculum {
    constructor({
      studentCurriculumId,
      studentId,
      credit,
      studentCurriculumYear,
      modifiedAt,
      studentsCurriculum,
      studentCode,
    }) {
      this.studentCurriculumId = studentCurriculumId;
      this.studentId = studentId;
      this.credit = credit;
      this.studentCurriculumYear = studentCurriculumYear ? new Date(studentCurriculumYear) : null;
      this.modifiedAt = modifiedAt ? new Date(modifiedAt) : new Date();
      this.studentsCurriculum = studentsCurriculum;
      this.studentCode = studentCode;
    }
  
    static fromJsonStudentCurriculum(json) {
      try {
        return new StudentCurriculum({
          studentCurriculumId: json.student_curriculum_id,
          studentId: json.student_id,
          credit: json.credit,
          studentCurriculumYear: json.student_curriculum_year,
          modifiedAt: json.modified_at,
          studentsCurriculum: json.students_curriculum,
          studentCode: json.student_code,
        });
      } catch (error) {
        console.error('Error parsing StudentCurriculum from JSON:', error);
        return null;
      }
    }

  static fromJsonButInApp(StudentCurriculum) {
      try {
        return new StudentCurriculum({
          studentCurriculumId: StudentCurriculum.studentCurriculumId,
          studentId: StudentCurriculum.studentId,
          credit: StudentCurriculum.credit,
          studentCurriculumYear: StudentCurriculum.studentCurriculumYear,
          modifiedAt: StudentCurriculum.modifiedAt,
          studentsCurriculum: StudentCurriculum.studentsCurriculum,
          studentCode: StudentCurriculum.studentCode,
        });
      } catch (error) {
        console.error('Error parsing StudentCurriculum from JSON:', error);
        return null;
      }
    }

    static fromJsonButInAppInstance(json) {
        try {
          return new StudentCurriculum({
            studentCurriculumId: json.studentCurriculumId,
            studentId: json.studentId,
            credit: json.credit,
            studentCurriculumYear: json.studentCurriculumYear,
            modifiedAt: json.modifiedAt,
            studentsCurriculum: json.studentsCurriculum,
            studentCode: json.studentCode,
          });
        } catch (error) {
          console.error('Error parsing StudentCurriculum from JSON:', error);
          return null;
        }
      }
  
    toJson() {
      return {
        student_curriculum_id: this.studentCurriculumId,
        student_id: this.studentId,
        credit: this.credit,
        student_curriculum_year: this.studentCurriculumYear ? this.studentCurriculumYear.toISOString() : null,
        modified_at: this.modifiedAt.toISOString(),
        students_curriculum: this.studentsCurriculum,
        student_code: this.studentCode,
      };
    }
  
    toString() {
      return `StudentCurriculum(studentCurriculumId: ${this.studentCurriculumId}, studentId: ${this.studentId}, credit: ${this.credit}, studentCurriculumYear: ${this.studentCurriculumYear}, semesterYear: ${this.semesterYear}, semesterSeason: ${this.semesterSeason})`;
    }
  }
  
  export default StudentCurriculum;
  