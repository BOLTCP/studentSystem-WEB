
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Auth_userScalarFieldEnum = {
  user_id: 'user_id',
  login_name: 'login_name',
  password_hash: 'password_hash',
  profile_picture: 'profile_picture',
  registry_number: 'registry_number',
  user_role: 'user_role',
  fname: 'fname',
  lname: 'lname',
  birthday: 'birthday',
  gender: 'gender',
  citizenship: 'citizenship',
  state_city: 'state_city',
  town_district: 'town_district',
  valid_address: 'valid_address',
  state_city_living: 'state_city_living',
  town_district_living: 'town_district_living',
  valid_address_living: 'valid_address_living',
  postal_address: 'postal_address',
  home_phone_number: 'home_phone_number',
  phone_number: 'phone_number',
  phone_number_emergency: 'phone_number_emergency',
  country: 'country',
  ethnicity: 'ethnicity',
  social_background: 'social_background',
  state_city_of_birth: 'state_city_of_birth',
  town_district_of_birth: 'town_district_of_birth',
  place_of_birth: 'place_of_birth',
  education: 'education',
  current_academic_degree: 'current_academic_degree',
  profession: 'profession',
  profession_certification: 'profession_certification',
  f_passport_number: 'f_passport_number',
  married: 'married',
  military_service: 'military_service',
  pensions_established: 'pensions_established',
  additional_notes: 'additional_notes',
  blood_type: 'blood_type',
  drivers_certificate: 'drivers_certificate',
  drivers_certificate_number: 'drivers_certificate_number',
  disabled: 'disabled',
  is_active: 'is_active',
  email: 'email',
  created_at: 'created_at',
  family_tree_name: 'family_tree_name'
};

exports.Prisma.TeacherScheduleScalarFieldEnum = {
  teacherScheduleId: 'teacherScheduleId',
  teacherId: 'teacherId',
  weekDay: 'weekDay',
  periodOfClass: 'periodOfClass',
  classroomId: 'classroomId',
  classGroup: 'classGroup',
  courseName: 'courseName',
  credit: 'credit',
  numberOfStudents: 'numberOfStudents',
  courseId: 'courseId',
  departmentId: 'departmentId',
  createdAt: 'createdAt'
};

exports.Prisma.TeachersCoursePlanningScalarFieldEnum = {
  teacherCoursePlanningId: 'teacherCoursePlanningId',
  teacherId: 'teacherId',
  majorName: 'majorName',
  majorId: 'majorId',
  courseName: 'courseName',
  credit: 'credit',
  courseId: 'courseId',
  departmentId: 'departmentId',
  createdAt: 'createdAt',
  departmentOfEduId: 'departmentOfEduId',
  courseCode: 'courseCode',
  teacherMajorId: 'teacherMajorId'
};

exports.Prisma.ClassroomsScalarFieldEnum = {
  classroom_id: 'classroom_id',
  department_id: 'department_id',
  classroom_type: 'classroom_type',
  classroom_number: 'classroom_number',
  projector: 'projector',
  tv: 'tv',
  createdAt: 'createdAt',
  capacity: 'capacity'
};

exports.Prisma.CoursesScalarFieldEnum = {
  courseId: 'courseId',
  courseName: 'courseName',
  courseCode: 'courseCode',
  courseType: 'courseType',
  courseYear: 'courseYear',
  totalCredits: 'totalCredits',
  majorId: 'majorId',
  description: 'description',
  courseSeason: 'courseSeason',
  timesPerWeek: 'timesPerWeek',
  departmentId: 'departmentId'
};

exports.Prisma.TeachersMajorPlanningScalarFieldEnum = {
  teacherMajorId: 'teacherMajorId',
  teacherId: 'teacherId',
  academicDegreeOfMajor: 'academicDegreeOfMajor',
  majorName: 'majorName',
  majorId: 'majorId',
  credit: 'credit',
  departmentId: 'departmentId',
  createdAt: 'createdAt',
  departmentOfEducationsId: 'departmentOfEducationsId'
};

exports.Prisma.TeacherScalarFieldEnum = {
  teacherId: 'teacherId',
  userId: 'userId',
  teacherCode: 'teacherCode',
  teacherEmail: 'teacherEmail',
  certificate: 'certificate',
  profession: 'profession',
  academicDegree: 'academicDegree',
  jobTitle: 'jobTitle',
  isActive: 'isActive',
  jobDescription: 'jobDescription',
  departmentsOfEducationId: 'departmentsOfEducationId',
  departmentId: 'departmentId'
};

exports.Prisma.StudentClubsScalarFieldEnum = {
  studentClubId: 'studentClubId',
  clubCode: 'clubCode',
  clubName: 'clubName',
  clubMembers: 'clubMembers',
  clubType: 'clubType',
  clubMajorId: 'clubMajorId',
  clubPrimaryLeaderId: 'clubPrimaryLeaderId',
  clubAssistantLeaderId: 'clubAssistantLeaderId',
  clubAdvisorTeacherId: 'clubAdvisorTeacherId',
  clubLogo: 'clubLogo',
  clubMoto: 'clubMoto',
  createdAt: 'createdAt'
};

exports.Prisma.StudentScalarFieldEnum = {
  student_id: 'student_id',
  user_id: 'user_id',
  student_club_id: 'student_club_id',
  additional_roles: 'additional_roles',
  student_code: 'student_code',
  student_email: 'student_email',
  student_file: 'student_file',
  enrollment_number: 'enrollment_number',
  enrollment_year: 'enrollment_year',
  year_classification: 'year_classification',
  is_active: 'is_active',
  current_academic_degree: 'current_academic_degree',
  academic_degree_file: 'academic_degree_file',
  major_id: 'major_id',
  created_at: 'created_at',
  contracts: 'contracts',
  department_id: 'department_id'
};

exports.Prisma.MajorScalarFieldEnum = {
  major_id: 'major_id',
  major_name: 'major_name',
  majors_year: 'majors_year',
  majors_type: 'majors_type',
  credit_unit_rate: 'credit_unit_rate',
  major_tuition: 'major_tuition',
  academic_degree: 'academic_degree',
  total_years: 'total_years',
  total_credits_per_year: 'total_credits_per_year',
  department_of_edu_id: 'department_of_edu_id',
  created_at: 'created_at',
  exam1: 'exam1',
  exam2: 'exam2',
  majors_description: 'majors_description',
  description_brief: 'description_brief',
  qualifications: 'qualifications',
  qualifications1: 'qualifications1',
  qualifications2: 'qualifications2',
  sign_ups: 'sign_ups',
  department_id: 'department_id'
};

exports.Prisma.DepartmentsOfEducationScalarFieldEnum = {
  departmentsOfEducationId: 'departmentsOfEducationId',
  edDepartmentName: 'edDepartmentName',
  edDepartmentCode: 'edDepartmentCode',
  teachers: 'teachers'
};

exports.Prisma.DepartmentScalarFieldEnum = {
  department_id: 'department_id',
  department_name: 'department_name',
  department_code: 'department_code',
  department_email: 'department_email',
  number_of_staff: 'number_of_staff',
  logo: 'logo',
  created_at: 'created_at',
  department_of_edu_id: 'department_of_edu_id'
};

exports.Prisma.StudentCurriculumScalarFieldEnum = {
  studentCurriculumId: 'studentCurriculumId',
  studentId: 'studentId',
  courseId: 'courseId',
  credit: 'credit',
  studentYear: 'studentYear',
  semesterYear: 'semesterYear',
  modifiedAt: 'modifiedAt',
  courseCode: 'courseCode'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.AdditionalRolesEnum = exports.$Enums.AdditionalRolesEnum = {
  club_primary_leader: 'club_primary_leader',
  club_assistant_leader: 'club_assistant_leader',
  none: 'none',
  laborant: 'laborant',
  Клубын_тэргүүн: 'Клубын_тэргүүн',
  Клубын_туслах_тэргүүн: 'Клубын_туслах_тэргүүн',
  байхгүй: 'байхгүй',
  Лаборант: 'Лаборант'
};

exports.AnnouncementOptionsEnum = exports.$Enums.AnnouncementOptionsEnum = {
  mandatory: 'mandatory',
  is_not_mandatory: 'is_not_mandatory'
};

exports.AnnouncementStatusEnum = exports.$Enums.AnnouncementStatusEnum = {
  has_read: 'has_read',
  has_not_read: 'has_not_read'
};

exports.CalendarPurposeEnum = exports.$Enums.CalendarPurposeEnum = {
  important: 'important',
  statement: 'statement',
  notification: 'notification'
};

exports.ClassroomTypeEnum = exports.$Enums.ClassroomTypeEnum = {
  computer_laboratory: 'computer_laboratory',
  students_dev: 'students_dev',
  lecture: 'lecture',
  tv_classroom: 'tv_classroom',
  Компьютерийн_лаборатори_анги: 'Компьютерийн_лаборатори_анги',
  Оюутны_хөгжлийн_төв: 'Оюутны_хөгжлийн_төв',
  Лекцийн_анги: 'Лекцийн_анги',
  Семинар_анги: 'Семинар_анги',
  Семинар_Лекцийн_анги: 'Семинар_Лекцийн_анги',
  Телевизортой_анги: 'Телевизортой_анги',
  Биеийн_тамирын_заал: 'Биеийн_тамирын_заал'
};

exports.ClubTypeEnum = exports.$Enums.ClubTypeEnum = {
  professional_club: 'professional_club',
  amatuer_club: 'amatuer_club'
};

exports.CourseSeasonTypeEnum = exports.$Enums.CourseSeasonTypeEnum = {
  Намар_Өвөл_Хавар_Зун: 'Намар_Өвөл_Хавар_Зун',
  Намар_Өвөл_Зун: 'Намар_Өвөл_Зун',
  Намар: 'Намар',
  Хавар: 'Хавар',
  Намар_Хавар: 'Намар_Хавар',
  Өвөл_Хавар_Зун: 'Өвөл_Хавар_Зун'
};

exports.CourseTypeEnum = exports.$Enums.CourseTypeEnum = {
  bachelors: 'bachelors',
  masters: 'masters',
  doctors: 'doctors',
  professors: 'professors',
  Заавал_судлах: 'Заавал_судлах',
  Сонгон_судлах: 'Сонгон_судлах'
};

exports.DaysTypeEnum = exports.$Enums.DaysTypeEnum = {
  Даваа_гараг: 'Даваа_гараг',
  Мягмар_гараг: 'Мягмар_гараг',
  Лхагва_гараг: 'Лхагва_гараг',
  Пүрэв_гараг: 'Пүрэв_гараг',
  Баасан_гараг: 'Баасан_гараг',
  Бямба_гараг: 'Бямба_гараг',
  Ням_гараг: 'Ням_гараг'
};

exports.DisabledEnum = exports.$Enums.DisabledEnum = {
  yes: 'yes',
  no: 'no',
  Тийм: 'Тийм',
  Үгүй: 'Үгүй'
};

exports.EventTypeEnum = exports.$Enums.EventTypeEnum = {
  mandatory: 'mandatory',
  non_mandatory: 'non_mandatory',
  recreational: 'recreational',
  outside_event: 'outside_event'
};

exports.GenderEnum = exports.$Enums.GenderEnum = {
  male: 'male',
  female: 'female',
  other: 'other',
  эрэгтэй: 'эрэгтэй',
  эмэгтэй: 'эмэгтэй',
  бусад: 'бусад'
};

exports.GradeStatusEnum = exports.$Enums.GradeStatusEnum = {
  incomplete: 'incomplete',
  complete: 'complete',
  missing: 'missing',
  submitted: 'submitted',
  other: 'other'
};

exports.InvitationStatusEnum = exports.$Enums.InvitationStatusEnum = {
  pending: 'pending',
  accepted: 'accepted',
  denied: 'denied'
};

exports.IsActiveEnum = exports.$Enums.IsActiveEnum = {
  is_working: 'is_working',
  vacation: 'vacation',
  left: 'left'
};

exports.MajorTypeEnum = exports.$Enums.MajorTypeEnum = {
  afternoon: 'afternoon',
  evening: 'evening',
  орой: 'орой',
  өдөр: 'өдөр'
};

exports.MarriedEnum = exports.$Enums.MarriedEnum = {
  married: 'married',
  not_married: 'not_married',
  Гэрлээгүй: 'Гэрлээгүй',
  Гэрлэсэн: 'Гэрлэсэн'
};

exports.MaterialTypeEnum = exports.$Enums.MaterialTypeEnum = {
  assignment: 'assignment',
  discussion: 'discussion',
  attendance_question: 'attendance_question',
  lecture_material: 'lecture_material',
  exam: 'exam',
  exam_entry: 'exam_entry',
  exam_exit: 'exam_exit',
  exam_final: 'exam_final'
};

exports.MilitaryServiceEnum = exports.$Enums.MilitaryServiceEnum = {
  served: 'served',
  not_served: 'not_served',
  Тийм: 'Тийм',
  Үгүй: 'Үгүй',
  Хаасан: 'Хаасан',
  Хаагаагүй: 'Хаагаагүй'
};

exports.ProjectorEnum = exports.$Enums.ProjectorEnum = {
  yes: 'yes',
  no: 'no',
  тийм: 'тийм',
  үгүй: 'үгүй'
};

exports.PropertyCategoryEnum = exports.$Enums.PropertyCategoryEnum = {
  offices: 'offices',
  computer: 'computer',
  office_utilities: 'office_utilities'
};

exports.RecievedEnum = exports.$Enums.RecievedEnum = {
  yes: 'yes',
  no: 'no'
};

exports.RuleCategoryEnum = exports.$Enums.RuleCategoryEnum = {
  university_academic_procedures: 'university_academic_procedures',
  tuition_payment_procedures: 'tuition_payment_procedures',
  laboratory_rules: 'laboratory_rules',
  library_rules: 'library_rules',
  user_guide_canvas: 'user_guide_canvas'
};

exports.ScheduleTimeTypeEnum = exports.$Enums.ScheduleTimeTypeEnum = {
  value_1_р_цаг: 'value_1_р_цаг',
  value_2_р_цаг: 'value_2_р_цаг',
  value_3_р_цаг: 'value_3_р_цаг',
  value_4_р_цаг: 'value_4_р_цаг',
  value_5_р_цаг: 'value_5_р_цаг',
  value_6_р_цаг: 'value_6_р_цаг',
  value_7_р_цаг: 'value_7_р_цаг',
  value_8_р_цаг: 'value_8_р_цаг',
  value_9_р_цаг: 'value_9_р_цаг'
};

exports.ScheduleTypeEnum = exports.$Enums.ScheduleTypeEnum = {
  Лекц: 'Лекц',
  Семинар: 'Семинар',
  Лаборатори: 'Лаборатори'
};

exports.SignUpsEnum = exports.$Enums.SignUpsEnum = {
  бүртгэл_хаагдсан: 'бүртгэл_хаагдсан',
  бүртгэл_нээлттэй: 'бүртгэл_нээлттэй'
};

exports.StaffRoleEnum = exports.$Enums.StaffRoleEnum = {
  security: 'security',
  cleaner: 'cleaner',
  electrician: 'electrician',
  inventory_manager: 'inventory_manager',
  manager: 'manager'
};

exports.StateOfUsageEnum = exports.$Enums.StateOfUsageEnum = {
  normal: 'normal',
  broken: 'broken',
  needs_service: 'needs_service'
};

exports.StudentAttendanceEnum = exports.$Enums.StudentAttendanceEnum = {
  arrived: 'arrived',
  absent: 'absent',
  excused: 'excused',
  ill: 'ill'
};

exports.StudentIsActiveEnum = exports.$Enums.StudentIsActiveEnum = {
  graduated: 'graduated',
  transfered: 'transfered',
  expelled: 'expelled',
  studying: 'studying',
  төгссөн: 'төгссөн',
  шилжсэн: 'шилжсэн',
  хөөгдсөн: 'хөөгдсөн',
  суралцаж_байгаа: 'суралцаж_байгаа',
  чөлөө_авсан: 'чөлөө_авсан'
};

exports.TvEnum = exports.$Enums.TvEnum = {
  yes: 'yes',
  no: 'no',
  тийм: 'тийм',
  үгүй: 'үгүй'
};

exports.TypeEnum = exports.$Enums.TypeEnum = {
  computer_science: 'computer_science',
  business: 'business',
  social_studies: 'social_studies',
  foriegn_language: 'foriegn_language',
  administration: 'administration',
  financial: 'financial',
  admission_committee: 'admission_committee',
  journalism: 'journalism'
};

exports.UserRoleEnum = exports.$Enums.UserRoleEnum = {
  student: 'student',
  teacher: 'teacher',
  administration: 'administration',
  staff: 'staff',
  principal: 'principal',
  hr: 'hr',
  department_chair: 'department_chair',
  admissions_officer: 'admissions_officer',
  mental_health_counselor: 'mental_health_counselor',
  librarian: 'librarian',
  marketing: 'marketing',
  teacher_assistant: 'teacher_assistant',
  Оюутан: 'Оюутан',
  Багш: 'Багш',
  Удирдлага: 'Удирдлага',
  Ажилтан: 'Ажилтан',
  Захирал: 'Захирал',
  Хүний_Нөөц: 'Хүний_Нөөц',
  Салбар_Сургуулийн_Захирал: 'Салбар_Сургуулийн_Захирал',
  Элсэлтийн_Комисс: 'Элсэлтийн_Комисс',
  Сэтгэл_Зүйч: 'Сэтгэл_Зүйч',
  Номын_Санч: 'Номын_Санч',
  Маркетинг: 'Маркетинг'
};

exports.YearClassificationEnum = exports.$Enums.YearClassificationEnum = {
  freshman: 'freshman',
  junior: 'junior',
  sophomore: 'sophomore',
  senior: 'senior',
  value_1_р_курс: 'value_1_р_курс',
  value_2_р_курс: 'value_2_р_курс',
  value_3_р_курс: 'value_3_р_курс',
  value_4_р_курс: 'value_4_р_курс'
};

exports.Prisma.ModelName = {
  auth_user: 'auth_user',
  TeacherSchedule: 'TeacherSchedule',
  TeachersCoursePlanning: 'TeachersCoursePlanning',
  Classrooms: 'Classrooms',
  Courses: 'Courses',
  TeachersMajorPlanning: 'TeachersMajorPlanning',
  Teacher: 'Teacher',
  StudentClubs: 'StudentClubs',
  Student: 'Student',
  Major: 'Major',
  DepartmentsOfEducation: 'DepartmentsOfEducation',
  Department: 'Department',
  StudentCurriculum: 'StudentCurriculum'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/ariunbold/Downloads/studentSystem-WEB/src/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "windows"
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/Users/ariunbold/Downloads/studentSystem-WEB/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider      = \"prisma-client-js\"\n  output        = \"../src/generated/prisma\"\n  binaryTargets = [\"native\", \"windows\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum AdditionalRolesEnum {\n  club_primary_leader\n  club_assistant_leader\n  none\n  laborant\n  Клубын_тэргүүн\n  Клубын_туслах_тэргүүн\n  байхгүй\n  Лаборант\n}\n\nenum AnnouncementOptionsEnum {\n  mandatory\n  is_not_mandatory\n}\n\nenum AnnouncementStatusEnum {\n  has_read\n  has_not_read\n}\n\nenum CalendarPurposeEnum {\n  important\n  statement\n  notification\n}\n\nenum ClassroomTypeEnum {\n  computer_laboratory\n  students_dev\n  lecture\n  tv_classroom\n  Компьютерийн_лаборатори_анги\n  Оюутны_хөгжлийн_төв\n  Лекцийн_анги\n  Семинар_анги\n  Семинар_Лекцийн_анги\n  Телевизортой_анги\n  Биеийн_тамирын_заал\n}\n\nenum ClubTypeEnum {\n  professional_club\n  amatuer_club\n}\n\nenum CourseSeasonTypeEnum {\n  Намар_Өвөл_Хавар_Зун\n  Намар_Өвөл_Зун\n  Намар\n  Хавар\n  Намар_Хавар\n  Өвөл_Хавар_Зун\n}\n\nenum CourseTypeEnum {\n  bachelors\n  masters\n  doctors\n  professors\n  Заавал_судлах\n  Сонгон_судлах\n}\n\nenum DaysTypeEnum {\n  Даваа_гараг\n  Мягмар_гараг\n  Лхагва_гараг\n  Пүрэв_гараг\n  Баасан_гараг\n  Бямба_гараг\n  Ням_гараг\n}\n\nenum DisabledEnum {\n  yes\n  no\n  Тийм\n  Үгүй\n}\n\nenum EventTypeEnum {\n  mandatory\n  non_mandatory\n  recreational\n  outside_event\n}\n\nenum GenderEnum {\n  male\n  female\n  other\n  эрэгтэй\n  эмэгтэй\n  бусад\n}\n\nenum GradeStatusEnum {\n  incomplete\n  complete\n  missing\n  submitted\n  other\n}\n\nenum InvitationStatusEnum {\n  pending\n  accepted\n  denied\n}\n\nenum IsActiveEnum {\n  is_working\n  vacation\n  left\n}\n\nenum MajorTypeEnum {\n  afternoon\n  evening\n  орой\n  өдөр\n}\n\nenum MarriedEnum {\n  married\n  not_married\n  Гэрлээгүй\n  Гэрлэсэн\n}\n\nenum MaterialTypeEnum {\n  assignment\n  discussion\n  attendance_question\n  lecture_material\n  exam\n  exam_entry\n  exam_exit\n  exam_final\n}\n\nenum MilitaryServiceEnum {\n  served\n  not_served\n  Тийм\n  Үгүй\n  Хаасан\n  Хаагаагүй\n}\n\nenum ProjectorEnum {\n  yes\n  no\n  тийм\n  үгүй\n}\n\nenum PropertyCategoryEnum {\n  offices\n  computer\n  office_utilities\n}\n\nenum RecievedEnum {\n  yes\n  no\n}\n\nenum RuleCategoryEnum {\n  university_academic_procedures\n  tuition_payment_procedures\n  laboratory_rules\n  library_rules\n  user_guide_canvas\n}\n\nenum ScheduleTimeTypeEnum {\n  value_1_р_цаг @map(\"1-р_цаг\")\n  value_2_р_цаг @map(\"2-р_цаг\")\n  value_3_р_цаг @map(\"3-р_цаг\")\n  value_4_р_цаг @map(\"4-р_цаг\")\n  value_5_р_цаг @map(\"5-р_цаг\")\n  value_6_р_цаг @map(\"6-р_цаг\")\n  value_7_р_цаг @map(\"7-р_цаг\")\n  value_8_р_цаг @map(\"8-р_цаг\")\n  value_9_р_цаг @map(\"9-р_цаг\")\n}\n\nenum ScheduleTypeEnum {\n  Лекц\n  Семинар\n  Лаборатори\n}\n\nenum SignUpsEnum {\n  бүртгэл_хаагдсан\n  бүртгэл_нээлттэй\n}\n\nenum StaffRoleEnum {\n  security\n  cleaner\n  electrician\n  inventory_manager\n  manager\n}\n\nenum StateOfUsageEnum {\n  normal\n  broken\n  needs_service\n}\n\nenum StudentAttendanceEnum {\n  arrived\n  absent\n  excused\n  ill\n}\n\nenum StudentIsActiveEnum {\n  graduated\n  transfered\n  expelled\n  studying\n  төгссөн\n  шилжсэн\n  хөөгдсөн\n  суралцаж_байгаа\n  чөлөө_авсан\n}\n\nenum TvEnum {\n  yes\n  no\n  тийм\n  үгүй\n}\n\nenum TypeEnum {\n  computer_science\n  business\n  social_studies\n  foriegn_language\n  administration\n  financial\n  admission_committee\n  journalism\n}\n\nenum UserRoleEnum {\n  student\n  teacher\n  administration\n  staff\n  principal\n  hr\n  department_chair\n  admissions_officer\n  mental_health_counselor\n  librarian\n  marketing\n  teacher_assistant\n  Оюутан\n  Багш\n  Удирдлага\n  Ажилтан\n  Захирал\n  Хүний_Нөөц\n  Салбар_Сургуулийн_Захирал\n  Элсэлтийн_Комисс\n  Сэтгэл_Зүйч\n  Номын_Санч\n  Маркетинг\n}\n\nenum YearClassificationEnum {\n  freshman\n  junior\n  sophomore\n  senior\n  value_1_р_курс @map(\"1-р_курс\")\n  value_2_р_курс @map(\"2-р_курс\")\n  value_3_р_курс @map(\"3-р_курс\")\n  value_4_р_курс @map(\"4-р_курс\")\n}\n\nmodel auth_user {\n  user_id                    Int                 @id @default(autoincrement())\n  login_name                 String              @unique(map: \"login_name\") @db.VarChar(10)\n  password_hash              String              @db.Text\n  profile_picture            String?             @db.Text\n  registry_number            String              @db.VarChar(10)\n  user_role                  UserRoleEnum\n  fname                      String              @db.VarChar(50)\n  lname                      String              @db.VarChar(50)\n  birthday                   DateTime            @db.Date\n  gender                     GenderEnum\n  citizenship                String              @db.VarChar(50)\n  state_city                 String              @db.VarChar(100)\n  town_district              String              @db.VarChar(100)\n  valid_address              String              @db.VarChar(100)\n  state_city_living          String              @db.VarChar(100)\n  town_district_living       String              @db.VarChar(100)\n  valid_address_living       String              @db.VarChar(100)\n  postal_address             String?             @db.VarChar(50)\n  home_phone_number          String?             @db.VarChar(20)\n  phone_number               String              @db.VarChar(20)\n  phone_number_emergency     String              @db.VarChar(20)\n  country                    String              @db.VarChar(50)\n  ethnicity                  String              @db.VarChar(50)\n  social_background          String              @db.VarChar(50)\n  state_city_of_birth        String              @db.VarChar(100)\n  town_district_of_birth     String              @db.VarChar(100)\n  place_of_birth             String              @db.VarChar(150)\n  education                  String              @db.VarChar(50)\n  current_academic_degree    String              @db.VarChar(50)\n  profession                 String?             @db.VarChar(150)\n  profession_certification   String?             @db.Text\n  f_passport_number          String?             @db.VarChar(50)\n  married                    MarriedEnum\n  military_service           MilitaryServiceEnum\n  pensions_established       String?             @db.VarChar(50)\n  additional_notes           String?             @db.VarChar(150)\n  blood_type                 String?             @db.VarChar(5)\n  drivers_certificate        String?             @db.VarChar(50)\n  drivers_certificate_number String?             @db.VarChar(25)\n  disabled                   DisabledEnum\n  is_active                  Boolean             @default(true)\n  email                      String?             @unique(map: \"auth_user_email_key\") @db.Text\n  created_at                 DateTime            @default(now()) @db.Timestamp(6)\n  family_tree_name           String              @default(\"Халх\") @db.VarChar\n  Teacher                    Teacher[]\n  assistantLeaderIn          StudentClubs[]      @relation(name: \"clubAssistantLeader\")\n  primaryLeaderIn            StudentClubs[]      @relation(name: \"clubPrimaryLeader\")\n  Student                    Student[]\n\n  @@index([user_role, email], map: \"login_name_key\")\n  @@map(\"auth_user\")\n}\n\nmodel TeacherSchedule {\n  teacherScheduleId Int        @id @default(autoincrement()) @map(\"teacher_schedule_id\")\n  teacherId         Int        @map(\"teacher_id\")\n  weekDay           String     @map(\"week_day\") @db.VarChar(20)\n  periodOfClass     String     @map(\"period_of_class\") @db.VarChar(50)\n  classroomId       Int        @map(\"classroom_id\")\n  classGroup        String     @map(\"class_group\") @db.VarChar(10)\n  courseName        String     @map(\"course_name\") @db.VarChar(50)\n  credit            Int        @map(\"credit\")\n  numberOfStudents  Int        @map(\"number_of_students\")\n  courseId          Int        @map(\"course_id\")\n  departmentId      Int        @map(\"department_id\")\n  createdAt         DateTime?  @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  classroom         Classrooms @relation(fields: [classroomId], references: [classroom_id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_classroom\")\n  course            Courses    @relation(fields: [courseId], references: [courseId], onDelete: Cascade, onUpdate: NoAction, map: \"fk_course\")\n  department        Department @relation(fields: [departmentId], references: [department_id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_department\")\n  teacher           Teacher    @relation(fields: [teacherId], references: [teacherId], onDelete: NoAction, onUpdate: NoAction, map: \"fk_teacher\")\n}\n\nmodel TeachersCoursePlanning {\n  teacherCoursePlanningId Int                    @id @default(autoincrement()) @map(\"teacher_course_planning_id\")\n  teacherId               Int                    @map(\"teacher_id\")\n  majorName               String                 @map(\"major_name\") @db.VarChar(50)\n  majorId                 Decimal?               @map(\"major_id\") @db.Decimal\n  courseName              String                 @map(\"course_name\") @db.VarChar(50)\n  credit                  Int                    @map(\"credit\")\n  courseId                Int                    @map(\"course_id\")\n  departmentId            Int                    @map(\"department_id\")\n  createdAt               DateTime?              @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  departmentOfEduId       Int                    @map(\"department_of_edu_id\")\n  courseCode              String                 @map(\"course_code\") @db.VarChar(6)\n  teacherMajorId          Int                    @map(\"teacher_major_id\")\n  course                  Courses                @relation(fields: [courseId], references: [courseId], onDelete: NoAction, onUpdate: NoAction, map: \"fk_course\")\n  department              Department             @relation(fields: [departmentId], references: [department_id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_department\")\n  departmentOfEducation   DepartmentsOfEducation @relation(fields: [departmentOfEduId], references: [departmentsOfEducationId], onDelete: NoAction, onUpdate: NoAction, map: \"fk_departments_of_edu\")\n  teacher                 Teacher                @relation(fields: [teacherId], references: [teacherId], onDelete: Cascade, onUpdate: NoAction, map: \"fk_teacher\")\n  teachersMajorPlanning   TeachersMajorPlanning  @relation(fields: [teacherMajorId], references: [teacherMajorId], onDelete: Cascade, onUpdate: Cascade, map: \"fk_teacher_major\")\n\n  @@unique([teacherId, majorId, courseId], map: \"teachers_id_and_course_id_uq\")\n}\n\nmodel Classrooms {\n  classroom_id          Int                     @id @default(autoincrement()) @map(\"classroom_id\")\n  department_id         Int?                    @map(\"department_id\")\n  classroom_type        ClassroomTypeEnum       @map(\"classroom_type\")\n  classroom_number      String                  @unique @map(\"classroom_number\") @db.Char(5)\n  projector             ProjectorEnum           @default(yes) @map(\"projector\")\n  tv                    TvEnum                  @default(yes) @map(\"tv\")\n  createdAt             DateTime?               @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  capacity              Int                     @map(\"capacity\")\n  departmentOfEducation DepartmentsOfEducation? @relation(fields: [department_id], references: [departmentsOfEducationId], onDelete: NoAction, onUpdate: NoAction, map: \"fk_department\")\n  TeacherSchedule       TeacherSchedule[]\n\n  Department Department[]\n}\n\nmodel Courses {\n  courseId               Int                      @id @default(autoincrement()) @map(\"course_id\")\n  courseName             String                   @unique(map: \"course_name_unique_constraint\") @map(\"course_name\") @db.VarChar(50)\n  courseCode             String                   @map(\"course_code\") @db.Char(6)\n  courseType             CourseTypeEnum           @map(\"course_type\")\n  courseYear             String                   @map(\"course_year\") @db.VarChar(10)\n  totalCredits           Int                      @map(\"total_credits\")\n  majorId                Int                      @map(\"major_id\")\n  description            String                   @default(\"*\") @map(\"description\") @db.VarChar(100)\n  courseSeason           CourseSeasonTypeEnum     @default(Намар_Өвөл_Хавар_Зун) @map(\"course_season\")\n  timesPerWeek           Int?                     @default(0) @map(\"times_per_week\")\n  major                  Major                    @relation(fields: [majorId], references: [major_id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_major\")\n  TeacherSchedule        TeacherSchedule[]\n  TeachersCoursePlanning TeachersCoursePlanning[]\n  departmentId           Int?                     @map(\"department_id\")\n  department             Department?              @relation(fields: [departmentId], references: [department_id])\n\n  StudentCurriculum StudentCurriculum[] @relation(map: \"studentcurriculum_course_id_fkey\")\n}\n\nmodel TeachersMajorPlanning {\n  teacherMajorId           Int                      @id @default(autoincrement()) @map(\"teacher_major_id\")\n  teacherId                Int                      @map(\"teacher_id\")\n  academicDegreeOfMajor    String                   @map(\"academic_degree_of_major\") @db.VarChar(20)\n  majorName                String                   @map(\"major_name\") @db.VarChar(50)\n  majorId                  Decimal?                 @map(\"major_id\") @db.Decimal\n  credit                   Int                      @map(\"credit\")\n  departmentId             Int                      @map(\"department_id\")\n  createdAt                DateTime?                @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  departmentOfEducationsId Int                      @map(\"department_of_educations_id\")\n  department               Department               @relation(fields: [departmentId], references: [department_id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_department\")\n  departmentOfEducation    DepartmentsOfEducation   @relation(fields: [departmentOfEducationsId], references: [departmentsOfEducationId], onDelete: NoAction, onUpdate: NoAction, map: \"fk_departments_of_edu\")\n  teacher                  Teacher                  @relation(fields: [teacherId], references: [teacherId], onDelete: Cascade, onUpdate: NoAction, map: \"fk_teacher\")\n  TeachersCoursePlanning   TeachersCoursePlanning[]\n\n  @@unique([teacherId, majorId], map: \"unique_teacher_major\")\n}\n\nmodel Teacher {\n  teacherId                Int                      @id @default(autoincrement()) @map(\"teacher_id\")\n  userId                   Int                      @unique(map: \"uq_teacher_user_id\") @map(\"user_id\")\n  teacherCode              String                   @map(\"teacher_code\") @db.VarChar(10)\n  teacherEmail             String                   @map(\"teacher_email\") @db.VarChar(50)\n  certificate              String?                  @map(\"certificate\") @db.Text\n  profession               String                   @map(\"profession\") @db.Char(25)\n  academicDegree           String                   @map(\"academic_degree\") @db.Char(25)\n  jobTitle                 String?                  @map(\"job_title\") @db.Text\n  isActive                 IsActiveEnum             @default(is_working) @map(\"is_active\")\n  jobDescription           String                   @default(\"Багшлах\") @map(\"job_description\") @db.Char(100)\n  departmentsOfEducationId Int                      @map(\"departments_of_education_id\")\n  departmentId             Int?                     @map(\"department_id\")\n  auth_user                auth_user?               @relation(fields: [userId], references: [user_id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_user\")\n  department               Department?              @relation(fields: [departmentId], references: [department_id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_department\")\n  departmentsOfEducation   DepartmentsOfEducation   @relation(fields: [departmentsOfEducationId], references: [departmentsOfEducationId], onDelete: NoAction, onUpdate: NoAction, map: \"fk_departments_of_edu\")\n  TeacherSchedule          TeacherSchedule[]\n  TeachersCoursePlanning   TeachersCoursePlanning[]\n  TeachersMajorPlanning    TeachersMajorPlanning[]\n  StudentClubs             StudentClubs[]\n\n  @@map(\"teacher\")\n}\n\nmodel StudentClubs {\n  studentClubId         Int          @id @default(autoincrement()) @map(\"student_club_id\")\n  clubCode              String       @unique @map(\"club_code\") @db.VarChar(10)\n  clubName              String       @map(\"club_name\") @db.VarChar(50)\n  clubMembers           Int          @default(0) @map(\"club_members\")\n  clubType              ClubTypeEnum @default(professional_club) @map(\"club_type\")\n  clubMajorId           Int          @map(\"club_major_id\")\n  clubPrimaryLeaderId   Int          @map(\"club_primary_leader_id\")\n  clubAssistantLeaderId Int          @map(\"club_assistant_leader_id\")\n  clubAdvisorTeacherId  Int          @map(\"club_advisor_teacher_id\")\n  clubLogo              String       @map(\"club_logo\") @db.Text\n  clubMoto              String       @map(\"club_moto\") @db.VarChar(100)\n  createdAt             DateTime?    @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  club_advisor_teacher  Teacher      @relation(fields: [clubAdvisorTeacherId], references: [teacherId], onDelete: NoAction, onUpdate: NoAction, map: \"studentclubs_club_advisor_teacher_id_fkey\")\n  clubAssistantLeader   auth_user    @relation(name: \"clubAssistantLeader\", fields: [clubAssistantLeaderId], references: [user_id], onDelete: NoAction, onUpdate: NoAction, map: \"studentclubs_club_assistant_leader_id_fkey\")\n  clubMajor             Major        @relation(fields: [clubMajorId], references: [major_id], onDelete: NoAction, onUpdate: NoAction, map: \"studentclubs_club_major_id_fkey\")\n  clubPrimaryLeader     auth_user    @relation(name: \"clubPrimaryLeader\", fields: [clubPrimaryLeaderId], references: [user_id], onDelete: NoAction, onUpdate: NoAction, map: \"studentclubs_club_primary_leader_id_fkey\")\n  Student               Student[]\n}\n\nmodel Student {\n  student_id              Int                    @id @default(autoincrement())\n  user_id                 Int                    @unique(map: \"uq_student_user_id\")\n  student_club_id         Int?\n  additional_roles        AdditionalRolesEnum    @default(байхгүй)\n  student_code            String                 @db.Char(8)\n  student_email           String                 @db.VarChar(50)\n  student_file            Json?\n  enrollment_number       Int                    @unique(map: \"student_enrollment_number_key\") @default(autoincrement())\n  enrollment_year         Int\n  year_classification     YearClassificationEnum\n  is_active               StudentIsActiveEnum?   @default(суралцаж_байгаа)\n  current_academic_degree String                 @db.Char(25)\n  academic_degree_file    String?                @db.Text\n  major_id                Int\n  created_at              DateTime?              @default(now()) @db.Timestamp(6)\n  contracts               Json?\n  department_id           Int?\n  auth_user               auth_user?             @relation(fields: [user_id], references: [user_id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_user\")\n  major                   Major                  @relation(fields: [major_id], references: [major_id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_major\")\n  student_clubs           StudentClubs?          @relation(fields: [student_club_id], references: [studentClubId], onDelete: NoAction, onUpdate: NoAction, map: \"fk_student_club\")\n  department              Department?            @relation(fields: [department_id], references: [department_id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_student_department\")\n  StudentCurriculum       StudentCurriculum[]    @relation(map: \"studentcurriculum_student_id_fkey\")\n\n  @@map(\"student\")\n}\n\nmodel Major {\n  major_id               Int            @id @default(autoincrement())\n  major_name             String         @unique @db.VarChar(50)\n  majors_year            DateTime       @db.Date\n  majors_type            MajorTypeEnum\n  credit_unit_rate       Decimal        @db.Money\n  major_tuition          Decimal        @db.Money\n  academic_degree        String         @db.VarChar(20)\n  total_years            Int\n  total_credits_per_year Int\n  department_of_edu_id   Int\n  created_at             DateTime?      @default(now()) @db.Timestamp(6)\n  exam1                  Float          @db.DoublePrecision\n  exam2                  Float          @db.DoublePrecision\n  majors_description     String         @db.VarChar(700)\n  description_brief      String?        @db.VarChar(50)\n  qualifications         Json?\n  qualifications1        String?        @db.Text\n  qualifications2        String?        @db.Text\n  sign_ups               SignUpsEnum    @default(бүртгэл_нээлттэй)\n  department_id          Int            @default(1)\n  department             Department     @relation(name: \"Department\", fields: [department_id], references: [department_id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_department_id\")\n  departmentOfEdu        Department     @relation(name: \"DepartmentsOfEducation\", fields: [department_of_edu_id], references: [department_id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_departments_of_edu\")\n  Courses                Courses[]\n  Student                Student[]\n  StudentClubs           StudentClubs[]\n\n  @@map(\"major\")\n}\n\nmodel DepartmentsOfEducation {\n  departmentsOfEducationId Int                      @id @default(autoincrement()) @map(\"departments_of_education_id\")\n  edDepartmentName         String                   @map(\"ed_department_name\") @db.VarChar(50)\n  edDepartmentCode         String                   @map(\"ed_department_code\") @db.VarChar(10)\n  teachers                 Json?                    @map(\"teachers\")\n  Classrooms               Classrooms[]\n  Teacher                  Teacher[]\n  TeachersCoursePlanning   TeachersCoursePlanning[]\n  TeachersMajorPlanning    TeachersMajorPlanning[]\n  Department               Department[]\n}\n\nmodel Department {\n  department_id          Int                      @id @default(autoincrement())\n  department_name        String                   @db.VarChar(50)\n  department_code        String                   @db.VarChar(10)\n  department_email       String                   @db.VarChar(50)\n  number_of_staff        Int?\n  logo                   String                   @db.Text\n  created_at             DateTime?                @default(now()) @db.Timestamp(6)\n  department_of_edu_id   Int\n  departmentOfEducation  DepartmentsOfEducation   @relation(fields: [department_of_edu_id], references: [departmentsOfEducationId], onDelete: NoAction, onUpdate: NoAction, map: \"departmentsofedu_fkey\")\n  Classrooms             Classrooms[]\n  Courses                Courses[]\n  majors                 Major[]                  @relation(name: \"Department\", map: \"department_majors\")\n  majorsOfEducation      Major[]                  @relation(name: \"DepartmentsOfEducation\", map: \"department_majors_edu\")\n  Student                Student[]\n  Teacher                Teacher[]\n  TeachersCoursePlanning TeachersCoursePlanning[]\n  TeachersMajorPlanning  TeachersMajorPlanning[]\n  teacherSchedules       TeacherSchedule[]\n\n  @@map(\"department\")\n}\n\nmodel StudentCurriculum {\n  studentCurriculumId Int       @id @default(autoincrement()) @map(\"student_curriculum_id\")\n  studentId           Int       @map(\"student_id\")\n  courseId            Int       @map(\"course_id\")\n  credit              Int       @map(\"credit\")\n  studentYear         DateTime  @map(\"student_year\") @db.Date\n  semesterYear        String    @map(\"semester_year\") @db.Char(25)\n  modifiedAt          DateTime? @default(now()) @map(\"modified_at\") @db.Timestamp(6)\n  courseCode          String    @map(\"course_code\") @db.VarChar(6)\n  student             Student   @relation(fields: [studentId], references: [student_id], onDelete: Cascade, onUpdate: NoAction, map: \"studentcurriculum_student_id_fkey\")\n  course              Courses   @relation(fields: [courseId], references: [courseId], onDelete: Cascade, onUpdate: NoAction, map: \"studentcurriculum_course_id_fkey\")\n\n  @@map(\"studentcurriculum\")\n}\n",
  "inlineSchemaHash": "2936fe1182d2fe9b7b3b28c62fc7623a381dc4ad722b9647c7796be9c08579b7",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/generated/prisma",
    "generated/prisma",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"auth_user\":{\"dbName\":\"auth_user\",\"schema\":null,\"fields\":[{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"login_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"registry_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserRoleEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fname\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lname\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"birthday\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gender\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GenderEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"citizenship\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state_city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"town_district\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"valid_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state_city_living\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"town_district_living\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"valid_address_living\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postal_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"home_phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone_number_emergency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ethnicity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"social_background\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state_city_of_birth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"town_district_of_birth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"place_of_birth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"education\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"current_academic_degree\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profession\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profession_certification\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"f_passport_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"married\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MarriedEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"military_service\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MilitaryServiceEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pensions_established\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"additional_notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blood_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"5\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"drivers_certificate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"drivers_certificate_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"25\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"disabled\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DisabledEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"family_tree_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[]],\"default\":\"Халх\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Teacher\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Teacher\",\"nativeType\":null,\"relationName\":\"TeacherToauth_user\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assistantLeaderIn\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StudentClubs\",\"nativeType\":null,\"relationName\":\"clubAssistantLeader\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"primaryLeaderIn\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StudentClubs\",\"nativeType\":null,\"relationName\":\"clubPrimaryLeader\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Student\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Student\",\"nativeType\":null,\"relationName\":\"StudentToauth_user\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TeacherSchedule\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"teacherScheduleId\",\"dbName\":\"teacher_schedule_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teacherId\",\"dbName\":\"teacher_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weekDay\",\"dbName\":\"week_day\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"periodOfClass\",\"dbName\":\"period_of_class\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"classroomId\",\"dbName\":\"classroom_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"classGroup\",\"dbName\":\"class_group\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseName\",\"dbName\":\"course_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"credit\",\"dbName\":\"credit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numberOfStudents\",\"dbName\":\"number_of_students\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentId\",\"dbName\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"classroom\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Classrooms\",\"nativeType\":null,\"relationName\":\"ClassroomsToTeacherSchedule\",\"relationFromFields\":[\"classroomId\"],\"relationToFields\":[\"classroom_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courses\",\"nativeType\":null,\"relationName\":\"CoursesToTeacherSchedule\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"courseId\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"DepartmentToTeacherSchedule\",\"relationFromFields\":[\"departmentId\"],\"relationToFields\":[\"department_id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teacher\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Teacher\",\"nativeType\":null,\"relationName\":\"TeacherToTeacherSchedule\",\"relationFromFields\":[\"teacherId\"],\"relationToFields\":[\"teacherId\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TeachersCoursePlanning\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"teacherCoursePlanningId\",\"dbName\":\"teacher_course_planning_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teacherId\",\"dbName\":\"teacher_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"majorName\",\"dbName\":\"major_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"majorId\",\"dbName\":\"major_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseName\",\"dbName\":\"course_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"credit\",\"dbName\":\"credit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentId\",\"dbName\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentOfEduId\",\"dbName\":\"department_of_edu_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseCode\",\"dbName\":\"course_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teacherMajorId\",\"dbName\":\"teacher_major_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courses\",\"nativeType\":null,\"relationName\":\"CoursesToTeachersCoursePlanning\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"courseId\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"DepartmentToTeachersCoursePlanning\",\"relationFromFields\":[\"departmentId\"],\"relationToFields\":[\"department_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentOfEducation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DepartmentsOfEducation\",\"nativeType\":null,\"relationName\":\"DepartmentsOfEducationToTeachersCoursePlanning\",\"relationFromFields\":[\"departmentOfEduId\"],\"relationToFields\":[\"departmentsOfEducationId\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teacher\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Teacher\",\"nativeType\":null,\"relationName\":\"TeacherToTeachersCoursePlanning\",\"relationFromFields\":[\"teacherId\"],\"relationToFields\":[\"teacherId\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teachersMajorPlanning\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeachersMajorPlanning\",\"nativeType\":null,\"relationName\":\"TeachersCoursePlanningToTeachersMajorPlanning\",\"relationFromFields\":[\"teacherMajorId\"],\"relationToFields\":[\"teacherMajorId\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"teacherId\",\"majorId\",\"courseId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"teacherId\",\"majorId\",\"courseId\"]}],\"isGenerated\":false},\"Classrooms\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"classroom_id\",\"dbName\":\"classroom_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department_id\",\"dbName\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"classroom_type\",\"dbName\":\"classroom_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ClassroomTypeEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"classroom_number\",\"dbName\":\"classroom_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"5\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projector\",\"dbName\":\"projector\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ProjectorEnum\",\"nativeType\":null,\"default\":\"yes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tv\",\"dbName\":\"tv\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TvEnum\",\"nativeType\":null,\"default\":\"yes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"capacity\",\"dbName\":\"capacity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentOfEducation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DepartmentsOfEducation\",\"nativeType\":null,\"relationName\":\"ClassroomsToDepartmentsOfEducation\",\"relationFromFields\":[\"department_id\"],\"relationToFields\":[\"departmentsOfEducationId\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TeacherSchedule\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeacherSchedule\",\"nativeType\":null,\"relationName\":\"ClassroomsToTeacherSchedule\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Department\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"ClassroomsToDepartment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Courses\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseName\",\"dbName\":\"course_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseCode\",\"dbName\":\"course_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseType\",\"dbName\":\"course_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CourseTypeEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseYear\",\"dbName\":\"course_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalCredits\",\"dbName\":\"total_credits\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"majorId\",\"dbName\":\"major_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"dbName\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"default\":\"*\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseSeason\",\"dbName\":\"course_season\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CourseSeasonTypeEnum\",\"nativeType\":null,\"default\":\"Намар_Өвөл_Хавар_Зун\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timesPerWeek\",\"dbName\":\"times_per_week\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"major\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Major\",\"nativeType\":null,\"relationName\":\"CoursesToMajor\",\"relationFromFields\":[\"majorId\"],\"relationToFields\":[\"major_id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TeacherSchedule\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeacherSchedule\",\"nativeType\":null,\"relationName\":\"CoursesToTeacherSchedule\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TeachersCoursePlanning\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeachersCoursePlanning\",\"nativeType\":null,\"relationName\":\"CoursesToTeachersCoursePlanning\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentId\",\"dbName\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"CoursesToDepartment\",\"relationFromFields\":[\"departmentId\"],\"relationToFields\":[\"department_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"StudentCurriculum\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StudentCurriculum\",\"nativeType\":null,\"relationName\":\"CoursesToStudentCurriculum\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TeachersMajorPlanning\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"teacherMajorId\",\"dbName\":\"teacher_major_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teacherId\",\"dbName\":\"teacher_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"academicDegreeOfMajor\",\"dbName\":\"academic_degree_of_major\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"majorName\",\"dbName\":\"major_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"majorId\",\"dbName\":\"major_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"credit\",\"dbName\":\"credit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentId\",\"dbName\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentOfEducationsId\",\"dbName\":\"department_of_educations_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"DepartmentToTeachersMajorPlanning\",\"relationFromFields\":[\"departmentId\"],\"relationToFields\":[\"department_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentOfEducation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DepartmentsOfEducation\",\"nativeType\":null,\"relationName\":\"DepartmentsOfEducationToTeachersMajorPlanning\",\"relationFromFields\":[\"departmentOfEducationsId\"],\"relationToFields\":[\"departmentsOfEducationId\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teacher\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Teacher\",\"nativeType\":null,\"relationName\":\"TeacherToTeachersMajorPlanning\",\"relationFromFields\":[\"teacherId\"],\"relationToFields\":[\"teacherId\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TeachersCoursePlanning\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeachersCoursePlanning\",\"nativeType\":null,\"relationName\":\"TeachersCoursePlanningToTeachersMajorPlanning\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"teacherId\",\"majorId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"teacherId\",\"majorId\"]}],\"isGenerated\":false},\"Teacher\":{\"dbName\":\"teacher\",\"schema\":null,\"fields\":[{\"name\":\"teacherId\",\"dbName\":\"teacher_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teacherCode\",\"dbName\":\"teacher_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teacherEmail\",\"dbName\":\"teacher_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"certificate\",\"dbName\":\"certificate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profession\",\"dbName\":\"profession\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"25\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"academicDegree\",\"dbName\":\"academic_degree\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"25\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jobTitle\",\"dbName\":\"job_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"IsActiveEnum\",\"nativeType\":null,\"default\":\"is_working\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jobDescription\",\"dbName\":\"job_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Char\",[\"100\"]],\"default\":\"Багшлах\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentsOfEducationId\",\"dbName\":\"departments_of_education_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentId\",\"dbName\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auth_user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"auth_user\",\"nativeType\":null,\"relationName\":\"TeacherToauth_user\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"DepartmentToTeacher\",\"relationFromFields\":[\"departmentId\"],\"relationToFields\":[\"department_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentsOfEducation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DepartmentsOfEducation\",\"nativeType\":null,\"relationName\":\"DepartmentsOfEducationToTeacher\",\"relationFromFields\":[\"departmentsOfEducationId\"],\"relationToFields\":[\"departmentsOfEducationId\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TeacherSchedule\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeacherSchedule\",\"nativeType\":null,\"relationName\":\"TeacherToTeacherSchedule\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TeachersCoursePlanning\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeachersCoursePlanning\",\"nativeType\":null,\"relationName\":\"TeacherToTeachersCoursePlanning\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TeachersMajorPlanning\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeachersMajorPlanning\",\"nativeType\":null,\"relationName\":\"TeacherToTeachersMajorPlanning\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"StudentClubs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StudentClubs\",\"nativeType\":null,\"relationName\":\"StudentClubsToTeacher\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"StudentClubs\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"studentClubId\",\"dbName\":\"student_club_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubCode\",\"dbName\":\"club_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubName\",\"dbName\":\"club_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubMembers\",\"dbName\":\"club_members\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubType\",\"dbName\":\"club_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ClubTypeEnum\",\"nativeType\":null,\"default\":\"professional_club\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubMajorId\",\"dbName\":\"club_major_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubPrimaryLeaderId\",\"dbName\":\"club_primary_leader_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubAssistantLeaderId\",\"dbName\":\"club_assistant_leader_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubAdvisorTeacherId\",\"dbName\":\"club_advisor_teacher_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubLogo\",\"dbName\":\"club_logo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubMoto\",\"dbName\":\"club_moto\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"club_advisor_teacher\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Teacher\",\"nativeType\":null,\"relationName\":\"StudentClubsToTeacher\",\"relationFromFields\":[\"clubAdvisorTeacherId\"],\"relationToFields\":[\"teacherId\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubAssistantLeader\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"auth_user\",\"nativeType\":null,\"relationName\":\"clubAssistantLeader\",\"relationFromFields\":[\"clubAssistantLeaderId\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubMajor\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Major\",\"nativeType\":null,\"relationName\":\"MajorToStudentClubs\",\"relationFromFields\":[\"clubMajorId\"],\"relationToFields\":[\"major_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubPrimaryLeader\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"auth_user\",\"nativeType\":null,\"relationName\":\"clubPrimaryLeader\",\"relationFromFields\":[\"clubPrimaryLeaderId\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Student\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Student\",\"nativeType\":null,\"relationName\":\"StudentToStudentClubs\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Student\":{\"dbName\":\"student\",\"schema\":null,\"fields\":[{\"name\":\"student_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_club_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"additional_roles\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AdditionalRolesEnum\",\"nativeType\":null,\"default\":\"байхгүй\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"8\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_file\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"enrollment_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"enrollment_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"year_classification\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"YearClassificationEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_active\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"StudentIsActiveEnum\",\"nativeType\":null,\"default\":\"суралцаж_байгаа\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"current_academic_degree\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"25\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"academic_degree_file\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"major_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contracts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auth_user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"auth_user\",\"nativeType\":null,\"relationName\":\"StudentToauth_user\",\"relationFromFields\":[\"user_id\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"major\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Major\",\"nativeType\":null,\"relationName\":\"MajorToStudent\",\"relationFromFields\":[\"major_id\"],\"relationToFields\":[\"major_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_clubs\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StudentClubs\",\"nativeType\":null,\"relationName\":\"StudentToStudentClubs\",\"relationFromFields\":[\"student_club_id\"],\"relationToFields\":[\"studentClubId\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"DepartmentToStudent\",\"relationFromFields\":[\"department_id\"],\"relationToFields\":[\"department_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"StudentCurriculum\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StudentCurriculum\",\"nativeType\":null,\"relationName\":\"StudentToStudentCurriculum\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Major\":{\"dbName\":\"major\",\"schema\":null,\"fields\":[{\"name\":\"major_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"major_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"majors_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"majors_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MajorTypeEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"credit_unit_rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Money\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"major_tuition\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Money\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"academic_degree\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"total_years\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"total_credits_per_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department_of_edu_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"exam1\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"DoublePrecision\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"exam2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"DoublePrecision\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"majors_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"700\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description_brief\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"qualifications\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"qualifications1\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"qualifications2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sign_ups\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"SignUpsEnum\",\"nativeType\":null,\"default\":\"бүртгэл_нээлттэй\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"Department\",\"relationFromFields\":[\"department_id\"],\"relationToFields\":[\"department_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentOfEdu\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"DepartmentsOfEducation\",\"relationFromFields\":[\"department_of_edu_id\"],\"relationToFields\":[\"department_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Courses\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courses\",\"nativeType\":null,\"relationName\":\"CoursesToMajor\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Student\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Student\",\"nativeType\":null,\"relationName\":\"MajorToStudent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"StudentClubs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StudentClubs\",\"nativeType\":null,\"relationName\":\"MajorToStudentClubs\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"DepartmentsOfEducation\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"departmentsOfEducationId\",\"dbName\":\"departments_of_education_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"edDepartmentName\",\"dbName\":\"ed_department_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"edDepartmentCode\",\"dbName\":\"ed_department_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teachers\",\"dbName\":\"teachers\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Classrooms\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Classrooms\",\"nativeType\":null,\"relationName\":\"ClassroomsToDepartmentsOfEducation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Teacher\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Teacher\",\"nativeType\":null,\"relationName\":\"DepartmentsOfEducationToTeacher\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TeachersCoursePlanning\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeachersCoursePlanning\",\"nativeType\":null,\"relationName\":\"DepartmentsOfEducationToTeachersCoursePlanning\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TeachersMajorPlanning\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeachersMajorPlanning\",\"nativeType\":null,\"relationName\":\"DepartmentsOfEducationToTeachersMajorPlanning\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Department\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"DepartmentToDepartmentsOfEducation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Department\":{\"dbName\":\"department\",\"schema\":null,\"fields\":[{\"name\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"number_of_staff\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"logo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department_of_edu_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentOfEducation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DepartmentsOfEducation\",\"nativeType\":null,\"relationName\":\"DepartmentToDepartmentsOfEducation\",\"relationFromFields\":[\"department_of_edu_id\"],\"relationToFields\":[\"departmentsOfEducationId\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Classrooms\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Classrooms\",\"nativeType\":null,\"relationName\":\"ClassroomsToDepartment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Courses\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courses\",\"nativeType\":null,\"relationName\":\"CoursesToDepartment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"majors\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Major\",\"nativeType\":null,\"relationName\":\"Department\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"majorsOfEducation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Major\",\"nativeType\":null,\"relationName\":\"DepartmentsOfEducation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Student\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Student\",\"nativeType\":null,\"relationName\":\"DepartmentToStudent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Teacher\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Teacher\",\"nativeType\":null,\"relationName\":\"DepartmentToTeacher\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TeachersCoursePlanning\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeachersCoursePlanning\",\"nativeType\":null,\"relationName\":\"DepartmentToTeachersCoursePlanning\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TeachersMajorPlanning\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeachersMajorPlanning\",\"nativeType\":null,\"relationName\":\"DepartmentToTeachersMajorPlanning\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teacherSchedules\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeacherSchedule\",\"nativeType\":null,\"relationName\":\"DepartmentToTeacherSchedule\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"StudentCurriculum\":{\"dbName\":\"studentcurriculum\",\"schema\":null,\"fields\":[{\"name\":\"studentCurriculumId\",\"dbName\":\"student_curriculum_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studentId\",\"dbName\":\"student_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"credit\",\"dbName\":\"credit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studentYear\",\"dbName\":\"student_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"semesterYear\",\"dbName\":\"semester_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"25\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"modifiedAt\",\"dbName\":\"modified_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseCode\",\"dbName\":\"course_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Student\",\"nativeType\":null,\"relationName\":\"StudentToStudentCurriculum\",\"relationFromFields\":[\"studentId\"],\"relationToFields\":[\"student_id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courses\",\"nativeType\":null,\"relationName\":\"CoursesToStudentCurriculum\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"courseId\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"AdditionalRolesEnum\":{\"values\":[{\"name\":\"club_primary_leader\",\"dbName\":null},{\"name\":\"club_assistant_leader\",\"dbName\":null},{\"name\":\"none\",\"dbName\":null},{\"name\":\"laborant\",\"dbName\":null},{\"name\":\"Клубын_тэргүүн\",\"dbName\":null},{\"name\":\"Клубын_туслах_тэргүүн\",\"dbName\":null},{\"name\":\"байхгүй\",\"dbName\":null},{\"name\":\"Лаборант\",\"dbName\":null}],\"dbName\":null},\"AnnouncementOptionsEnum\":{\"values\":[{\"name\":\"mandatory\",\"dbName\":null},{\"name\":\"is_not_mandatory\",\"dbName\":null}],\"dbName\":null},\"AnnouncementStatusEnum\":{\"values\":[{\"name\":\"has_read\",\"dbName\":null},{\"name\":\"has_not_read\",\"dbName\":null}],\"dbName\":null},\"CalendarPurposeEnum\":{\"values\":[{\"name\":\"important\",\"dbName\":null},{\"name\":\"statement\",\"dbName\":null},{\"name\":\"notification\",\"dbName\":null}],\"dbName\":null},\"ClassroomTypeEnum\":{\"values\":[{\"name\":\"computer_laboratory\",\"dbName\":null},{\"name\":\"students_dev\",\"dbName\":null},{\"name\":\"lecture\",\"dbName\":null},{\"name\":\"tv_classroom\",\"dbName\":null},{\"name\":\"Компьютерийн_лаборатори_анги\",\"dbName\":null},{\"name\":\"Оюутны_хөгжлийн_төв\",\"dbName\":null},{\"name\":\"Лекцийн_анги\",\"dbName\":null},{\"name\":\"Семинар_анги\",\"dbName\":null},{\"name\":\"Семинар_Лекцийн_анги\",\"dbName\":null},{\"name\":\"Телевизортой_анги\",\"dbName\":null},{\"name\":\"Биеийн_тамирын_заал\",\"dbName\":null}],\"dbName\":null},\"ClubTypeEnum\":{\"values\":[{\"name\":\"professional_club\",\"dbName\":null},{\"name\":\"amatuer_club\",\"dbName\":null}],\"dbName\":null},\"CourseSeasonTypeEnum\":{\"values\":[{\"name\":\"Намар_Өвөл_Хавар_Зун\",\"dbName\":null},{\"name\":\"Намар_Өвөл_Зун\",\"dbName\":null},{\"name\":\"Намар\",\"dbName\":null},{\"name\":\"Хавар\",\"dbName\":null},{\"name\":\"Намар_Хавар\",\"dbName\":null},{\"name\":\"Өвөл_Хавар_Зун\",\"dbName\":null}],\"dbName\":null},\"CourseTypeEnum\":{\"values\":[{\"name\":\"bachelors\",\"dbName\":null},{\"name\":\"masters\",\"dbName\":null},{\"name\":\"doctors\",\"dbName\":null},{\"name\":\"professors\",\"dbName\":null},{\"name\":\"Заавал_судлах\",\"dbName\":null},{\"name\":\"Сонгон_судлах\",\"dbName\":null}],\"dbName\":null},\"DaysTypeEnum\":{\"values\":[{\"name\":\"Даваа_гараг\",\"dbName\":null},{\"name\":\"Мягмар_гараг\",\"dbName\":null},{\"name\":\"Лхагва_гараг\",\"dbName\":null},{\"name\":\"Пүрэв_гараг\",\"dbName\":null},{\"name\":\"Баасан_гараг\",\"dbName\":null},{\"name\":\"Бямба_гараг\",\"dbName\":null},{\"name\":\"Ням_гараг\",\"dbName\":null}],\"dbName\":null},\"DisabledEnum\":{\"values\":[{\"name\":\"yes\",\"dbName\":null},{\"name\":\"no\",\"dbName\":null},{\"name\":\"Тийм\",\"dbName\":null},{\"name\":\"Үгүй\",\"dbName\":null}],\"dbName\":null},\"EventTypeEnum\":{\"values\":[{\"name\":\"mandatory\",\"dbName\":null},{\"name\":\"non_mandatory\",\"dbName\":null},{\"name\":\"recreational\",\"dbName\":null},{\"name\":\"outside_event\",\"dbName\":null}],\"dbName\":null},\"GenderEnum\":{\"values\":[{\"name\":\"male\",\"dbName\":null},{\"name\":\"female\",\"dbName\":null},{\"name\":\"other\",\"dbName\":null},{\"name\":\"эрэгтэй\",\"dbName\":null},{\"name\":\"эмэгтэй\",\"dbName\":null},{\"name\":\"бусад\",\"dbName\":null}],\"dbName\":null},\"GradeStatusEnum\":{\"values\":[{\"name\":\"incomplete\",\"dbName\":null},{\"name\":\"complete\",\"dbName\":null},{\"name\":\"missing\",\"dbName\":null},{\"name\":\"submitted\",\"dbName\":null},{\"name\":\"other\",\"dbName\":null}],\"dbName\":null},\"InvitationStatusEnum\":{\"values\":[{\"name\":\"pending\",\"dbName\":null},{\"name\":\"accepted\",\"dbName\":null},{\"name\":\"denied\",\"dbName\":null}],\"dbName\":null},\"IsActiveEnum\":{\"values\":[{\"name\":\"is_working\",\"dbName\":null},{\"name\":\"vacation\",\"dbName\":null},{\"name\":\"left\",\"dbName\":null}],\"dbName\":null},\"MajorTypeEnum\":{\"values\":[{\"name\":\"afternoon\",\"dbName\":null},{\"name\":\"evening\",\"dbName\":null},{\"name\":\"орой\",\"dbName\":null},{\"name\":\"өдөр\",\"dbName\":null}],\"dbName\":null},\"MarriedEnum\":{\"values\":[{\"name\":\"married\",\"dbName\":null},{\"name\":\"not_married\",\"dbName\":null},{\"name\":\"Гэрлээгүй\",\"dbName\":null},{\"name\":\"Гэрлэсэн\",\"dbName\":null}],\"dbName\":null},\"MaterialTypeEnum\":{\"values\":[{\"name\":\"assignment\",\"dbName\":null},{\"name\":\"discussion\",\"dbName\":null},{\"name\":\"attendance_question\",\"dbName\":null},{\"name\":\"lecture_material\",\"dbName\":null},{\"name\":\"exam\",\"dbName\":null},{\"name\":\"exam_entry\",\"dbName\":null},{\"name\":\"exam_exit\",\"dbName\":null},{\"name\":\"exam_final\",\"dbName\":null}],\"dbName\":null},\"MilitaryServiceEnum\":{\"values\":[{\"name\":\"served\",\"dbName\":null},{\"name\":\"not_served\",\"dbName\":null},{\"name\":\"Тийм\",\"dbName\":null},{\"name\":\"Үгүй\",\"dbName\":null},{\"name\":\"Хаасан\",\"dbName\":null},{\"name\":\"Хаагаагүй\",\"dbName\":null}],\"dbName\":null},\"ProjectorEnum\":{\"values\":[{\"name\":\"yes\",\"dbName\":null},{\"name\":\"no\",\"dbName\":null},{\"name\":\"тийм\",\"dbName\":null},{\"name\":\"үгүй\",\"dbName\":null}],\"dbName\":null},\"PropertyCategoryEnum\":{\"values\":[{\"name\":\"offices\",\"dbName\":null},{\"name\":\"computer\",\"dbName\":null},{\"name\":\"office_utilities\",\"dbName\":null}],\"dbName\":null},\"RecievedEnum\":{\"values\":[{\"name\":\"yes\",\"dbName\":null},{\"name\":\"no\",\"dbName\":null}],\"dbName\":null},\"RuleCategoryEnum\":{\"values\":[{\"name\":\"university_academic_procedures\",\"dbName\":null},{\"name\":\"tuition_payment_procedures\",\"dbName\":null},{\"name\":\"laboratory_rules\",\"dbName\":null},{\"name\":\"library_rules\",\"dbName\":null},{\"name\":\"user_guide_canvas\",\"dbName\":null}],\"dbName\":null},\"ScheduleTimeTypeEnum\":{\"values\":[{\"name\":\"value_1_р_цаг\",\"dbName\":\"1-р_цаг\"},{\"name\":\"value_2_р_цаг\",\"dbName\":\"2-р_цаг\"},{\"name\":\"value_3_р_цаг\",\"dbName\":\"3-р_цаг\"},{\"name\":\"value_4_р_цаг\",\"dbName\":\"4-р_цаг\"},{\"name\":\"value_5_р_цаг\",\"dbName\":\"5-р_цаг\"},{\"name\":\"value_6_р_цаг\",\"dbName\":\"6-р_цаг\"},{\"name\":\"value_7_р_цаг\",\"dbName\":\"7-р_цаг\"},{\"name\":\"value_8_р_цаг\",\"dbName\":\"8-р_цаг\"},{\"name\":\"value_9_р_цаг\",\"dbName\":\"9-р_цаг\"}],\"dbName\":null},\"ScheduleTypeEnum\":{\"values\":[{\"name\":\"Лекц\",\"dbName\":null},{\"name\":\"Семинар\",\"dbName\":null},{\"name\":\"Лаборатори\",\"dbName\":null}],\"dbName\":null},\"SignUpsEnum\":{\"values\":[{\"name\":\"бүртгэл_хаагдсан\",\"dbName\":null},{\"name\":\"бүртгэл_нээлттэй\",\"dbName\":null}],\"dbName\":null},\"StaffRoleEnum\":{\"values\":[{\"name\":\"security\",\"dbName\":null},{\"name\":\"cleaner\",\"dbName\":null},{\"name\":\"electrician\",\"dbName\":null},{\"name\":\"inventory_manager\",\"dbName\":null},{\"name\":\"manager\",\"dbName\":null}],\"dbName\":null},\"StateOfUsageEnum\":{\"values\":[{\"name\":\"normal\",\"dbName\":null},{\"name\":\"broken\",\"dbName\":null},{\"name\":\"needs_service\",\"dbName\":null}],\"dbName\":null},\"StudentAttendanceEnum\":{\"values\":[{\"name\":\"arrived\",\"dbName\":null},{\"name\":\"absent\",\"dbName\":null},{\"name\":\"excused\",\"dbName\":null},{\"name\":\"ill\",\"dbName\":null}],\"dbName\":null},\"StudentIsActiveEnum\":{\"values\":[{\"name\":\"graduated\",\"dbName\":null},{\"name\":\"transfered\",\"dbName\":null},{\"name\":\"expelled\",\"dbName\":null},{\"name\":\"studying\",\"dbName\":null},{\"name\":\"төгссөн\",\"dbName\":null},{\"name\":\"шилжсэн\",\"dbName\":null},{\"name\":\"хөөгдсөн\",\"dbName\":null},{\"name\":\"суралцаж_байгаа\",\"dbName\":null},{\"name\":\"чөлөө_авсан\",\"dbName\":null}],\"dbName\":null},\"TvEnum\":{\"values\":[{\"name\":\"yes\",\"dbName\":null},{\"name\":\"no\",\"dbName\":null},{\"name\":\"тийм\",\"dbName\":null},{\"name\":\"үгүй\",\"dbName\":null}],\"dbName\":null},\"TypeEnum\":{\"values\":[{\"name\":\"computer_science\",\"dbName\":null},{\"name\":\"business\",\"dbName\":null},{\"name\":\"social_studies\",\"dbName\":null},{\"name\":\"foriegn_language\",\"dbName\":null},{\"name\":\"administration\",\"dbName\":null},{\"name\":\"financial\",\"dbName\":null},{\"name\":\"admission_committee\",\"dbName\":null},{\"name\":\"journalism\",\"dbName\":null}],\"dbName\":null},\"UserRoleEnum\":{\"values\":[{\"name\":\"student\",\"dbName\":null},{\"name\":\"teacher\",\"dbName\":null},{\"name\":\"administration\",\"dbName\":null},{\"name\":\"staff\",\"dbName\":null},{\"name\":\"principal\",\"dbName\":null},{\"name\":\"hr\",\"dbName\":null},{\"name\":\"department_chair\",\"dbName\":null},{\"name\":\"admissions_officer\",\"dbName\":null},{\"name\":\"mental_health_counselor\",\"dbName\":null},{\"name\":\"librarian\",\"dbName\":null},{\"name\":\"marketing\",\"dbName\":null},{\"name\":\"teacher_assistant\",\"dbName\":null},{\"name\":\"Оюутан\",\"dbName\":null},{\"name\":\"Багш\",\"dbName\":null},{\"name\":\"Удирдлага\",\"dbName\":null},{\"name\":\"Ажилтан\",\"dbName\":null},{\"name\":\"Захирал\",\"dbName\":null},{\"name\":\"Хүний_Нөөц\",\"dbName\":null},{\"name\":\"Салбар_Сургуулийн_Захирал\",\"dbName\":null},{\"name\":\"Элсэлтийн_Комисс\",\"dbName\":null},{\"name\":\"Сэтгэл_Зүйч\",\"dbName\":null},{\"name\":\"Номын_Санч\",\"dbName\":null},{\"name\":\"Маркетинг\",\"dbName\":null}],\"dbName\":null},\"YearClassificationEnum\":{\"values\":[{\"name\":\"freshman\",\"dbName\":null},{\"name\":\"junior\",\"dbName\":null},{\"name\":\"sophomore\",\"dbName\":null},{\"name\":\"senior\",\"dbName\":null},{\"name\":\"value_1_р_курс\",\"dbName\":\"1-р_курс\"},{\"name\":\"value_2_р_курс\",\"dbName\":\"2-р_курс\"},{\"name\":\"value_3_р_курс\",\"dbName\":\"3-р_курс\"},{\"name\":\"value_4_р_курс\",\"dbName\":\"4-р_курс\"}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin.dylib.node");
path.join(process.cwd(), "src/generated/prisma/libquery_engine-darwin.dylib.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "src/generated/prisma/query_engine-windows.dll.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/generated/prisma/schema.prisma")
