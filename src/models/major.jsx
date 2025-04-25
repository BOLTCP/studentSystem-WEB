import React from 'react';

class MajorClass {
  constructor({
    majorId,
    majorName,
    majorsYear,
    majorsType,
    creditUnitRate,
    majorTuition,
    academicDegree,
    totalYears,
    totalCreditsPerYear,
    departmentsOfEducationiD,
    createdAt,
    exam1,
    exam2,
    majorsDescription,
    descriptionBrief,
    qualifications,
    qualifications1,
    qualifications2,
    signUps,
    departmentId,
  }) {
    this.majorId = majorId;
    this.majorName = majorName;
    this.majorsYear = majorsYear ? new Date(majorsYear) : new Date();
    this.majorsType = majorsType;
    this.creditUnitRate = parseFloat(creditUnitRate);
    this.majorTuition = parseFloat(majorTuition);
    this.academicDegree = academicDegree;
    this.totalYears = totalYears;
    this.totalCreditsPerYear = totalCreditsPerYear;
    this.departmentsOfEducationiD = departmentsOfEducationiD;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.exam1 = parseFloat(exam1);
    this.exam2 = parseFloat(exam2);
    this.majorsDescription = majorsDescription || '';
    this.descriptionBrief = descriptionBrief || '';
    this.qualifications = qualifications ? { ...qualifications } : null;
    this.qualifications1 = qualifications1 || '';
    this.qualifications2 = qualifications2 || '';
    this.signUps = signUps;
    this.departmentId = departmentId;
  }

  static fromJsonMajor(json) {
    try {
      const parseCurrency = (currency) => {
        if (!currency) return 0.0;
        const parsed = String(currency).replace(/[^\d.]/g, '');
        return parseFloat(parsed) || 0.0;
      };

      return new MajorClass({
        majorId: json.major_id,
        majorName: json.major_name,
        majorsYear: json.majors_year,
        majorsType: json.majors_type,
        creditUnitRate: parseCurrency(json.credit_unit_rate),
        majorTuition: parseCurrency(json.major_tuition),
        academicDegree: json.academic_degree,
        totalYears: json.total_years,
        totalCreditsPerYear: json.total_credits_per_year,
        departmentsOfEducationiD: json.department_of_edu_id,
        createdAt: json.created_at,
        exam1: parseFloat(json.exam1),
        exam2: parseFloat(json.exam2),
        majorsDescription: json.majors_description,
        descriptionBrief: json.description_brief,
        qualifications: json.qualifications,
        qualifications1: json.qualifications1,
        qualifications2: json.qualifications2,
        signUps: json.sign_ups,
        departmentId: json.department_id,
      });
    } catch (error) {
      console.error('Error parsing Major from JSON:', error);
      return null;
    }
  }

  toJson() {
    return {
      major_id: this.majorId,
      major_name: this.majorName,
      majors_year: this.majorsYear ? this.majorsYear.toISOString() : new Date().toISOString(),
      majors_type: this.majorsType,
      credit_unit_rate: this.creditUnitRate,
      major_tuition: this.majorTuition,
      academic_degree: this.academicDegree,
      total_years: this.totalYears,
      total_credits_per_year: this.totalCreditsPerYear,
      department_of_edu_id: this.departmentsOfEducationiD,
      created_at: this.createdAt ? this.createdAt.toISOString() : new Date().toISOString(),
      exam1: this.exam1,
      exam2: this.exam2,
      majors_description: this.majorsDescription,
      description_brief: this.descriptionBrief,
      qualifications: this.qualifications,
      qualifications1: this.qualifications1,
      qualifications2: this.qualifications2,
      sign_ups: this.signUps,
      department_id: this.departmentId,
    };
  }

  static fromJsonButInApp(json) {
    try {
      return new MajorClass({
        majorId: json.majorId ?? 0,
        majorName: json.majorName ?? '',
        majorsYear: json.majorsYear ? new Date(json.majorsYear) : null, // Convert ISO string back to Date
        majorsType: json.majorsType ?? '',
        creditUnitRate: parseFloat(json.creditUnitRate) || 0.0,
        majorTuition: parseFloat(json.majorTuition) || 0.0,
        academicDegree: json.academicDegree ?? '',
        totalYears: json.totalYears ?? 0,
        totalCreditsPerYear: json.totalCreditsPerYear ?? 0,
        departmentsOfEducationiD: json.departmentsOfEducationiD ?? 0,
        createdAt: json.createdAt ? new Date(json.createdAt) : null, // Convert ISO string back to Date
        exam1: parseFloat(json.exam1) || 0.0,
        exam2: parseFloat(json.exam2) || 0.0,
        majorsDescription: json.majorsDescription ?? '',
        descriptionBrief: json.descriptionBrief ?? '',
        qualifications: json.qualifications ? { ...json.qualifications } : null,
        qualifications1: json.qualifications1 ?? '',
        qualifications2: json.qualifications2 ?? '',
        signUps: json.signUps ?? null,
        departmentId: json.departmentId ?? 0,
      });
    } catch (error) {
      console.error('Error parsing MajorClass from JSON string:', error);
      return null; // Handle errors gracefully
    }
  }

  toString() {
    return `Major: ${this.majorName}, Year: ${this.majorsYear}, Type: ${this.majorsType}, Credit Unit Rate: ${this.creditUnitRate}, Major Tuition: ${this.majorTuition}, Academic Degree: ${this.academicDegree}, Total Years: ${this.totalYears}, Total Credits per Year: ${this.totalCreditsPerYear}, Created At: ${this.createdAt}, Exam1: ${this.exam1}, Exam2: ${this.exam2}, Description: ${this.majorsDescription}, Brief Description: ${this.descriptionBrief}, Qualifications: ${JSON.stringify(this.qualifications)}, Qualifications1: ${this.qualifications1}, Qualifications2: ${this.qualifications2}, DepartmentId: ${this.departmentId}`;
  }
}


class MajorBrief {
    constructor({ majorId, majorName, majorsDescription }) {
      this.majorId = majorId;
      this.majorName = majorName;
      this.majorsDescription = majorsDescription || '';
    }
  
    static fromJson(json) {
      try {
        return new MajorBrief({
          majorId: json.major_id,
          majorName: json.major_name ?? '',
          majorsDescription: json.majors_description ?? '',
        });
      } catch (error) {
        console.error('Error parsing MajorBrief from JSON:', error);
        return null;
      }
    }
  }
  
export default MajorClass;

