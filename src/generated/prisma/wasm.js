
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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

exports.GenderEnum = exports.$Enums.GenderEnum = {
  male: 'male',
  female: 'female',
  other: 'other',
  эрэгтэй: 'эрэгтэй',
  эмэгтэй: 'эмэгтэй',
  бусад: 'бусад'
};

exports.MarriedEnum = exports.$Enums.MarriedEnum = {
  married: 'married',
  not_married: 'not_married',
  Гэрлээгүй: 'Гэрлээгүй',
  Гэрлэсэн: 'Гэрлэсэн'
};

exports.MilitaryServiceEnum = exports.$Enums.MilitaryServiceEnum = {
  served: 'served',
  not_served: 'not_served',
  Тийм: 'Тийм',
  Үгүй: 'Үгүй',
  Хаасан: 'Хаасан',
  Хаагаагүй: 'Хаагаагүй'
};

exports.DisabledEnum = exports.$Enums.DisabledEnum = {
  yes: 'yes',
  no: 'no',
  Тийм: 'Тийм',
  Үгүй: 'Үгүй'
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

exports.ProjectorEnum = exports.$Enums.ProjectorEnum = {
  yes: 'yes',
  no: 'no',
  тийм: 'тийм',
  үгүй: 'үгүй'
};

exports.TvEnum = exports.$Enums.TvEnum = {
  yes: 'yes',
  no: 'no',
  тийм: 'тийм',
  үгүй: 'үгүй'
};

exports.CourseTypeEnum = exports.$Enums.CourseTypeEnum = {
  bachelors: 'bachelors',
  masters: 'masters',
  doctors: 'doctors',
  professors: 'professors',
  Заавал_судлах: 'Заавал_судлах',
  Сонгон_судлах: 'Сонгон_судлах'
};

exports.CourseSeasonTypeEnum = exports.$Enums.CourseSeasonTypeEnum = {
  Намар_Өвөл_Хавар_Зун: 'Намар_Өвөл_Хавар_Зун',
  Намар_Өвөл_Зун: 'Намар_Өвөл_Зун',
  Намар: 'Намар',
  Хавар: 'Хавар',
  Намар_Хавар: 'Намар_Хавар',
  Өвөл_Хавар_Зун: 'Өвөл_Хавар_Зун'
};

exports.IsActiveEnum = exports.$Enums.IsActiveEnum = {
  is_working: 'is_working',
  vacation: 'vacation',
  left: 'left'
};

exports.ClubTypeEnum = exports.$Enums.ClubTypeEnum = {
  professional_club: 'professional_club',
  amatuer_club: 'amatuer_club'
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

exports.MajorTypeEnum = exports.$Enums.MajorTypeEnum = {
  afternoon: 'afternoon',
  evening: 'evening',
  орой: 'орой',
  өдөр: 'өдөр'
};

exports.SignUpsEnum = exports.$Enums.SignUpsEnum = {
  бүртгэл_хаагдсан: 'бүртгэл_хаагдсан',
  бүртгэл_нээлттэй: 'бүртгэл_нээлттэй'
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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
