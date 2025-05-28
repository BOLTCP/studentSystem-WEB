import React from 'react'; // Still good practice, though not strictly needed for a data model class
class Classroom {
  
  constructor({
    classroomId,
    departmentId,
    classroomType,
    classroomNumber,
    projector,
    tv,       
    createdAt,
    capacity,
  }) {
    this.classroomId = classroomId;
    this.departmentId = departmentId;
    this.classroomType = classroomType;
    this.classroomNumber = classroomNumber;
    this.projector = projector;
    this.tv = tv;
    this.createdAt = createdAt ? new Date(createdAt) : new Date(); 
    this.capacity = capacity;
  }

  static fromJsonClassroom(json) {
   
    return new Classroom({
      classroomId: json.classroom_id,
      departmentId: json.department_id,
      classroomType: json.classroom_type === 'computerLaboratory' ? 'Лаборатори' : 'Семинар',
      classroomNumber: json.classroom_number,
      projector: json.projector === 'yes' ? 'тийм' : 'үгүй', 
      tv: json.tv === 'yes' ? 'тийм' : 'үгүй',             
      createdAt: json.created_at,      
      capacity: json.capacity,
    });
  }

  
  static toJson(classroomInstance) {
    return {
      classroom_id: classroomInstance.classroomId,
      department_id: classroomInstance.departmentId,
      classroom_type: classroomInstance.classroomType === 'Лаборатори' ? 'computerLaboratory' : 'Seminar',
      classroom_number: classroomInstance.classroomNumber,
      projector: classroomInstance.projector,
      tv: classroomInstance.tv,
      created_at: classroomInstance.createdAt ? classroomInstance.createdAt.toISOString() : undefined, 
      capacity: classroomInstance.capacity,
    };
  }

 
  static fromJsonButInApp(json) {
    try {
      return new Classroom({
        classroomId: json.classroomId, 
        departmentId: json.departmentId,
        classroomType: json.classroomType, 
        classroomNumber: json.classroomNumber,
        projector: json.projector,
        tv: json.tv,
        createdAt: json.createdAt ? new Date(json.createdAt) : null, 
        capacity: json.capacity,
      });
    } catch (error) {
      console.error('Error parsing Classroom from JSON string:', error);
      return null;
    }
  }

  static fromJson(source) {
    try {
      const map = JSON.parse(source);
      return Classroom.fromJsonButInApp(map); 
    } catch (error) {
      console.error('Error parsing Classroom from JSON string:', error);
      return null;
    }
  }

  toJsonString() {
    return JSON.stringify(Classroom.toJson(this));
  }
}

export default Classroom;