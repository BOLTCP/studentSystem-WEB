class DepartmentsOfEducation {
    constructor({
      departmentsOfEducationId,
      edDepartmentName,
      edDepartmentCode,
      teachers = [],
    }) {
      this.departmentsOfEducationId = departmentsOfEducationId;
      this.edDepartmentName = edDepartmentName;
      this.edDepartmentCode = edDepartmentCode;
      this.teachers = Array.isArray(teachers) ? teachers : []; // JSONB assumed to be an array
    }
  
    static fromJsonDepartmentsOfEducation(json) {
      try {
        return new DepartmentsOfEducation({
          departmentsOfEducationId: json.departments_of_education_id,
          edDepartmentName: json.ed_department_name,
          edDepartmentCode: json.ed_department_code,
          teachers: json.teachers ?? [],
        });
      } catch (error) {
        console.error('Error parsing DepartmentsOfEducation from DB JSON:', error);
        return null;
      }
    }
  
    static fromJsonInApp(json) {
      try {
        return new DepartmentsOfEducation({
          departmentsOfEducationId: json.departmentsOfEducationId ?? 0,
          edDepartmentName: json.edDepartmentName ?? '',
          edDepartmentCode: json.edDepartmentCode ?? '',
          teachers: json.teachers ?? [],
        });
      } catch (error) {
        console.error('Error parsing DepartmentsOfEducation from app JSON:', error);
        return null;
      }
    }
  
    static toJson(DepartmentsOfEducation) {
      return {
        departments_of_education_id: DepartmentsOfEducation.departmentsOfEducationId,
        ed_department_name: DepartmentsOfEducation.edDepartmentName,
        ed_department_code: DepartmentsOfEducation.edDepartmentCode,
        teachers: DepartmentsOfEducation.teachers,
      };
    }
  
    toString() {
      return `DepartmentsOfEducation(departmentsOfEducationId: ${this.departmentsOfEducationId}, edDepartmentName: ${this.edDepartmentName}, edDepartmentCode: ${this.edDepartmentCode}, teachers: ${JSON.stringify(this.teachers)})`;
    }
  }
  
  export default DepartmentsOfEducation;
  