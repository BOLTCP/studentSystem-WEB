import React from 'react';

class Department {
  constructor({
    departmentId,
    departmentName,
    departmentCode,
    departmentEmail,
    numberOfStaff = 0,
    logo,
    createdAt,
    departmentOfEduId,
  }) {
    this.departmentId = departmentId;
    this.departmentName = departmentName;
    this.departmentCode = departmentCode;
    this.departmentEmail = departmentEmail;
    this.numberOfStaff = parseInt(numberOfStaff, 10);
    this.logo = logo;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.departmentOfEduId = departmentOfEduId;
  }

  static fromJsonDepartment(json) {
    try {
      return new Department({
        departmentId: json.department_id,
        departmentName: json.department_name,
        departmentCode: json.department_code,
        departmentEmail: json.department_email,
        numberOfStaff: json.number_of_staff ?? 0,
        logo: json.logo,
        createdAt: json.created_at,
        departmentOfEduId: json.department_of_edu_id,
      });
    } catch (error) {
      console.error('Error parsing Department from JSON:', error);
      return null;
    }
  }

  toJson() {
    return {
      department_id: this.departmentId,
      department_name: this.departmentName,
      department_code: this.departmentCode,
      department_email: this.departmentEmail,
      number_of_staff: this.numberOfStaff,
      logo: this.logo,
      created_at: this.createdAt ? this.createdAt.toISOString() : new Date().toISOString(),
      department_of_edu_id: this.departmentOfEduId,
    };
  }

  static fromJsonButInApp(json) {
    try {
      return new Department({
        departmentId: json.departmentId ?? 0,
        departmentName: json.departmentName ?? '',
        departmentCode: json.departmentCode ?? '',
        departmentEmail: json.departmentEmail ?? '',
        numberOfStaff: parseInt(json.numberOfStaff, 10) || 0,
        logo: json.logo ?? '',
        createdAt: json.createdAt ? new Date(json.createdAt) : null, // Convert ISO string back to Date
        departmentOfEduId: json.departmentOfEduId ?? 0,
      });
    } catch (error) {
      console.error('Error parsing Department from JSON string:', error);
      return null; // Handle errors gracefully
    }
  }

  toString() {
    return `Department(departmentId: ${this.departmentId}, departmentName: ${this.departmentName}, departmentCode: ${this.departmentCode}, departmentEmail: ${this.departmentEmail}, numberOfStaff: ${this.numberOfStaff}, logo: ${this.logo}, createdAt: ${this.createdAt}, departmentOfEduId: ${this.departmentOfEduId})`;
  }
}

export default Department;