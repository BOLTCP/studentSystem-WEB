
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

exports.Prisma.AnnouncementScalarFieldEnum = {
  announcement_id: 'announcement_id',
  student_id: 'student_id',
  major_id: 'major_id',
  course_id: 'course_id',
  teacher_id: 'teacher_id',
  status: 'status',
  announcement: 'announcement',
  announcement_options: 'announcement_options',
  sent_at: 'sent_at'
};

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

exports.Prisma.BasecurriculumScalarFieldEnum = {
  base_curriculum_id: 'base_curriculum_id',
  major_id: 'major_id',
  course_id: 'course_id',
  curriculum_year: 'curriculum_year',
  semester_year: 'semester_year'
};

exports.Prisma.CalendarScalarFieldEnum = {
  calendar_id: 'calendar_id',
  teacher_id: 'teacher_id',
  calendar_title: 'calendar_title',
  calendar_access: 'calendar_access',
  calendar_purpose: 'calendar_purpose',
  event_timestamp: 'event_timestamp',
  ringer: 'ringer',
  files: 'files',
  created_at: 'created_at'
};

exports.Prisma.CalendaraccessScalarFieldEnum = {
  calendar_id: 'calendar_id',
  teacher_id: 'teacher_id',
  to_course_id: 'to_course_id',
  access_types: 'access_types'
};

exports.Prisma.ClassroompropertiesScalarFieldEnum = {
  classroom_properties_id: 'classroom_properties_id',
  classroom_id: 'classroom_id',
  classroom_type: 'classroom_type',
  number_of_desks_chairs: 'number_of_desks_chairs',
  number_of_pcs: 'number_of_pcs',
  desks_chairs_json: 'desks_chairs_json',
  pcs_json: 'pcs_json',
  created_at: 'created_at'
};

exports.Prisma.ClassroomsScalarFieldEnum = {
  classroom_id: 'classroom_id',
  department_id: 'department_id',
  classroom_type: 'classroom_type',
  classroom_number: 'classroom_number',
  projector: 'projector',
  tv: 'tv',
  created_at: 'created_at',
  capacity: 'capacity'
};

exports.Prisma.ClubmembersScalarFieldEnum = {
  club_member_id: 'club_member_id',
  student_club_id: 'student_club_id',
  student_id: 'student_id',
  volunteer_hours: 'volunteer_hours',
  volunteer_hours_attendance: 'volunteer_hours_attendance',
  join_date: 'join_date'
};

exports.Prisma.ContractsScalarFieldEnum = {
  contract_id: 'contract_id',
  contract_name: 'contract_name',
  contracts_year: 'contracts_year',
  contract: 'contract',
  to_user: 'to_user',
  major_id: 'major_id',
  to_student_year: 'to_student_year',
  to_student_id: 'to_student_id',
  created_at: 'created_at',
  send_at: 'send_at'
};

exports.Prisma.CoursematerialScalarFieldEnum = {
  course_material_id: 'course_material_id',
  course_id: 'course_id',
  week: 'week',
  material_type: 'material_type',
  material_name: 'material_name',
  material_url: 'material_url',
  description: 'description',
  is_submission_required: 'is_submission_required',
  submission_url: 'submission_url',
  points: 'points',
  allowed_attempts: 'allowed_attempts',
  due_date: 'due_date',
  available_from: 'available_from',
  available_until: 'available_until',
  major_id: 'major_id',
  teacher_id: 'teacher_id',
  created_at: 'created_at'
};

exports.Prisma.CoursesScalarFieldEnum = {
  course_id: 'course_id',
  course_name: 'course_name',
  course_code: 'course_code',
  course_type: 'course_type',
  course_year: 'course_year',
  total_credits: 'total_credits',
  major_id: 'major_id',
  description: 'description',
  course_season: 'course_season',
  times_per_week: 'times_per_week'
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

exports.Prisma.DepartmentsofeducationScalarFieldEnum = {
  departments_of_education_id: 'departments_of_education_id',
  ed_department_name: 'ed_department_name',
  ed_department_code: 'ed_department_code',
  teachers: 'teachers'
};

exports.Prisma.GradesScalarFieldEnum = {
  grade_id: 'grade_id',
  student_id: 'student_id',
  course_id: 'course_id',
  course_grade: 'course_grade',
  grade_letter: 'grade_letter',
  finals_grade: 'finals_grade',
  graded_date: 'graded_date',
  calculated_credit_grade: 'calculated_credit_grade',
  net_credit_of_semester: 'net_credit_of_semester',
  credits_collected_of_semester: 'credits_collected_of_semester',
  semester_gpa: 'semester_gpa',
  semester_average: 'semester_average',
  prelimenary_grade: 'prelimenary_grade',
  overall_credits: 'overall_credits',
  overall_credits_collected: 'overall_credits_collected',
  overall_gpa: 'overall_gpa',
  overall_average: 'overall_average'
};

exports.Prisma.InternalmessagingclubScalarFieldEnum = {
  internal_messaging_id: 'internal_messaging_id',
  student_club_id: 'student_club_id',
  club_member_id: 'club_member_id',
  student_id: 'student_id',
  club_member_message: 'club_member_message',
  mention_someone: 'mention_someone',
  replied_to: 'replied_to',
  created_at: 'created_at'
};

exports.Prisma.InventoryofteacherScalarFieldEnum = {
  inventory_of_teacher_id: 'inventory_of_teacher_id',
  teacher_id: 'teacher_id',
  inventory_name: 'inventory_name',
  inventory_number: 'inventory_number',
  unit: 'unit',
  quantity: 'quantity',
  unit_cost: 'unit_cost',
  net_cost: 'net_cost',
  returned_quantity: 'returned_quantity',
  returned_unit_cost: 'returned_unit_cost',
  returned_net_cost: 'returned_net_cost',
  department_id: 'department_id',
  created_at: 'created_at'
};

exports.Prisma.InvitationsScalarFieldEnum = {
  invitation_id: 'invitation_id',
  student_id: 'student_id',
  major_id: 'major_id',
  course_id: 'course_id',
  teacher_id: 'teacher_id',
  status: 'status',
  invite: 'invite',
  sent_at: 'sent_at'
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
  department_id: 'department_id',
  recommended_curriculum: 'recommended_curriculum',
  recommended_curriculum1: 'recommended_curriculum1'
};

exports.Prisma.NotificationstudentsScalarFieldEnum = {
  notification_students_id: 'notification_students_id',
  teacher_id: 'teacher_id',
  course_id: 'course_id',
  to_student: 'to_student',
  notification_message: 'notification_message',
  course_material_id: 'course_material_id',
  created_at: 'created_at'
};

exports.Prisma.PaymentinformationScalarFieldEnum = {
  payment_information_id: 'payment_information_id',
  payment_to_pay: 'payment_to_pay',
  payed_payments: 'payed_payments',
  gross_payment: 'gross_payment',
  balance: 'balance',
  payment_unit_credit: 'payment_unit_credit',
  student_id: 'student_id',
  major_id: 'major_id'
};

exports.Prisma.PaymentlessonsselectionScalarFieldEnum = {
  lesson_selection_id: 'lesson_selection_id',
  student_id: 'student_id',
  payment_information_id: 'payment_information_id',
  student_curriculum_id: 'student_curriculum_id',
  course_payment: 'course_payment',
  credit_unit_payment: 'credit_unit_payment',
  course_credits: 'course_credits',
  discount: 'discount',
  created_at: 'created_at',
  net_credit: 'net_credit',
  gross_payment: 'gross_payment',
  gross_discount: 'gross_discount'
};

exports.Prisma.PropertyofteacherScalarFieldEnum = {
  property_of_teacher_id: 'property_of_teacher_id',
  teacher_id: 'teacher_id',
  property_number: 'property_number',
  property_category: 'property_category',
  property_code: 'property_code',
  property_name_and_model: 'property_name_and_model',
  started_using: 'started_using',
  state_of_usage: 'state_of_usage',
  price: 'price',
  location: 'location',
  department_id: 'department_id',
  created_at: 'created_at'
};

exports.Prisma.RulesScalarFieldEnum = {
  rule_id: 'rule_id',
  rule_category: 'rule_category',
  rule_name: 'rule_name',
  rule_pdf: 'rule_pdf',
  created_at: 'created_at'
};

exports.Prisma.SignedcontractsScalarFieldEnum = {
  singed_contract_id: 'singed_contract_id',
  contract_id: 'contract_id',
  user_id: 'user_id',
  student_id: 'student_id',
  contract: 'contract',
  signed_at: 'signed_at'
};

exports.Prisma.StaffScalarFieldEnum = {
  staff_id: 'staff_id',
  user_id: 'user_id',
  staff_role: 'staff_role',
  staff_code: 'staff_code',
  staff_email: 'staff_email',
  family_description: 'family_description',
  cv: 'cv',
  certificate: 'certificate',
  department_id: 'department_id',
  job_position: 'job_position',
  job_location: 'job_location',
  job_description: 'job_description'
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
  department_id: 'department_id',
  is_curriculum_closed: 'is_curriculum_closed',
  semester_specification: 'semester_specification'
};

exports.Prisma.StudentansweredsurveyScalarFieldEnum = {
  answered_survey_id: 'answered_survey_id',
  survey_id: 'survey_id',
  major_id: 'major_id',
  student_id: 'student_id',
  recieved_at: 'recieved_at',
  answers_json: 'answers_json'
};

exports.Prisma.StudentattendanceScalarFieldEnum = {
  attendance_id: 'attendance_id',
  course_id: 'course_id',
  course_material_id: 'course_material_id',
  week_title: 'week_title',
  student_attendance: 'student_attendance',
  student_balance: 'student_balance',
  gross_transaction_amount: 'gross_transaction_amount',
  student_id: 'student_id',
  created_at: 'created_at'
};

exports.Prisma.StudentbalanceScalarFieldEnum = {
  student_balance_id: 'student_balance_id',
  student_id: 'student_id',
  transaction_info_id: 'transaction_info_id',
  student_code: 'student_code',
  registry_number: 'registry_number',
  student_balance: 'student_balance',
  gross_transaction_amount: 'gross_transaction_amount',
  created_at: 'created_at'
};

exports.Prisma.StudentclubeventScalarFieldEnum = {
  club_event_id: 'club_event_id',
  student_club_id: 'student_club_id',
  club_type: 'club_type',
  event_type: 'event_type',
  timestamp: 'timestamp',
  description: 'description',
  files: 'files',
  title: 'title',
  attendees: 'attendees',
  created_at: 'created_at'
};

exports.Prisma.StudentclubsScalarFieldEnum = {
  student_club_id: 'student_club_id',
  club_code: 'club_code',
  club_name: 'club_name',
  club_members: 'club_members',
  club_type: 'club_type',
  club_major_id: 'club_major_id',
  club_primary_leader_id: 'club_primary_leader_id',
  club_assistant_leader_id: 'club_assistant_leader_id',
  club_advisor_teacher_id: 'club_advisor_teacher_id',
  club_logo: 'club_logo',
  club_moto: 'club_moto',
  created_at: 'created_at'
};

exports.Prisma.StudentcurriculumScalarFieldEnum = {
  student_curriculum_id: 'student_curriculum_id',
  student_id: 'student_id',
  credit: 'credit',
  student_curriculum_year: 'student_curriculum_year',
  modified_at: 'modified_at',
  students_curriculum: 'students_curriculum',
  student_code: 'student_code'
};

exports.Prisma.StudentsscheduleScalarFieldEnum = {
  students_schedule_id: 'students_schedule_id',
  student_id: 'student_id',
  course_id: 'course_id',
  classroom_number: 'classroom_number',
  class_group: 'class_group',
  modified_at: 'modified_at',
  schedules_timetable_position: 'schedules_timetable_position',
  course_name: 'course_name',
  time: 'time',
  teachers_email: 'teachers_email',
  teachers_name: 'teachers_name',
  schedule_type: 'schedule_type',
  days: 'days',
  student_code: 'student_code',
  teacher_code: 'teacher_code'
};

exports.Prisma.StudentstoadviseScalarFieldEnum = {
  students_to_advise_id: 'students_to_advise_id',
  teacher_id: 'teacher_id',
  academic_degree_of_major: 'academic_degree_of_major',
  major_id: 'major_id',
  course_id: 'course_id',
  student_id: 'student_id',
  students_full_name: 'students_full_name',
  student_phone_numbers: 'student_phone_numbers',
  department_id: 'department_id',
  created_at: 'created_at'
};

exports.Prisma.SubmissionScalarFieldEnum = {
  submission_id: 'submission_id',
  course_material_id: 'course_material_id',
  submitted_at: 'submitted_at',
  submission_file: 'submission_file',
  student_id: 'student_id',
  graded_points: 'graded_points',
  grade_status: 'grade_status',
  grader_comment: 'grader_comment',
  teacher_id: 'teacher_id',
  graded_at: 'graded_at',
  created_at: 'created_at'
};

exports.Prisma.SurveysScalarFieldEnum = {
  surveys_id: 'surveys_id',
  survey_name: 'survey_name',
  due_date: 'due_date',
  created_at: 'created_at',
  major_id: 'major_id',
  to_student_year: 'to_student_year',
  to_student_id: 'to_student_id',
  questions_json: 'questions_json'
};

exports.Prisma.TeacherScalarFieldEnum = {
  teacher_id: 'teacher_id',
  user_id: 'user_id',
  teacher_code: 'teacher_code',
  teacher_email: 'teacher_email',
  certificate: 'certificate',
  profession: 'profession',
  academic_degree: 'academic_degree',
  job_title: 'job_title',
  is_active: 'is_active',
  job_description: 'job_description',
  departments_of_education_id: 'departments_of_education_id',
  department_id: 'department_id',
  is_major_planning_closed: 'is_major_planning_closed',
  is_course_planning_closed: 'is_course_planning_closed'
};

exports.Prisma.TeacherscourseplanningScalarFieldEnum = {
  teacher_course_planning_id: 'teacher_course_planning_id',
  teacher_id: 'teacher_id',
  major_name: 'major_name',
  major_id: 'major_id',
  course_name: 'course_name',
  credit: 'credit',
  course_id: 'course_id',
  department_id: 'department_id',
  created_at: 'created_at',
  department_of_edu_id: 'department_of_edu_id',
  course_code: 'course_code',
  teacher_major_id: 'teacher_major_id'
};

exports.Prisma.TeachersmajorplanningScalarFieldEnum = {
  teacher_major_id: 'teacher_major_id',
  teacher_id: 'teacher_id',
  academic_degree_of_major: 'academic_degree_of_major',
  major_name: 'major_name',
  major_id: 'major_id',
  credit: 'credit',
  department_id: 'department_id',
  created_at: 'created_at',
  department_of_educations_id: 'department_of_educations_id'
};

exports.Prisma.TeachersscheduleScalarFieldEnum = {
  classroom_id: 'classroom_id',
  students: 'students',
  teacher_id: 'teacher_id',
  course_id: 'course_id',
  major_id: 'major_id',
  teacher_name: 'teacher_name',
  teachers_email: 'teachers_email',
  schedule_type: 'schedule_type',
  time: 'time',
  course_planning_id: 'course_planning_id',
  days: 'days',
  teachers_schedule_id: 'teachers_schedule_id',
  created_at: 'created_at',
  course_name: 'course_name',
  classroom_capacity: 'classroom_capacity',
  classroom_type: 'classroom_type',
  classroom_number: 'classroom_number',
  schedules_timetable_position: 'schedules_timetable_position',
  course_code: 'course_code'
};

exports.Prisma.TransactioninformationScalarFieldEnum = {
  transaction_info_id: 'transaction_info_id',
  student_id: 'student_id',
  reciept: 'reciept',
  recipient_bank: 'recipient_bank',
  transaction_string: 'transaction_string',
  transaction_amount: 'transaction_amount',
  parsed_string: 'parsed_string',
  created_at: 'created_at'
};

exports.Prisma.UsercardScalarFieldEnum = {
  user_card_id: 'user_card_id',
  card_code: 'card_code',
  user_id: 'user_id',
  user_role: 'user_role',
  user_information: 'user_information',
  valid_from: 'valid_from',
  valid_until: 'valid_until',
  recieved: 'recieved',
  signature: 'signature',
  created_at: 'created_at'
};

exports.Prisma.UserpreferencesScalarFieldEnum = {
  user_preferences_id: 'user_preferences_id',
  app_theme: 'app_theme',
  user_id: 'user_id'
};

exports.Prisma.UserprofilesScalarFieldEnum = {
  profile_id: 'profile_id',
  user_id: 'user_id',
  user_code: 'user_code',
  user_role: 'user_role',
  profile_picture: 'profile_picture',
  description: 'description',
  department_id: 'department_id',
  created_at: 'created_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.announcement_status_enum = exports.$Enums.announcement_status_enum = {
  has_read: 'has_read',
  has_not_read: 'has_not_read'
};

exports.announcement_options_enum = exports.$Enums.announcement_options_enum = {
  mandatory: 'mandatory',
  is_not_mandatory: 'is_not_mandatory'
};

exports.user_role_enum = exports.$Enums.user_role_enum = {
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
  teacher_assistant: 'teacher_assistant'
};

exports.gender_enum = exports.$Enums.gender_enum = {
  male: 'male',
  female: 'female',
  other: 'other'
};

exports.married_enum = exports.$Enums.married_enum = {
  married: 'married',
  not_married: 'not_married'
};

exports.military_service_enum = exports.$Enums.military_service_enum = {
  served: 'served',
  not_served: 'not_served'
};

exports.disabled_enum = exports.$Enums.disabled_enum = {
  yes: 'yes',
  no: 'no'
};

exports.calendar_purpose_enum = exports.$Enums.calendar_purpose_enum = {
  important: 'important',
  statement: 'statement',
  notification: 'notification'
};

exports.classroom_type_enum = exports.$Enums.classroom_type_enum = {
  computerLaboratory: 'computerLaboratory',
  seminar: 'seminar',
  students_dev: 'students_dev',
  lecture: 'lecture',
  tv_classroom: 'tv_classroom'
};

exports.projector_enum = exports.$Enums.projector_enum = {
  yes: 'yes',
  no: 'no'
};

exports.tv_enum = exports.$Enums.tv_enum = {
  yes: 'yes',
  no: 'no'
};

exports.material_type_enum = exports.$Enums.material_type_enum = {
  assignment: 'assignment',
  discussion: 'discussion',
  attendance_question: 'attendance_question',
  lecture_material: 'lecture_material',
  exam: 'exam',
  exam_entry: 'exam_entry',
  exam_exit: 'exam_exit',
  exam_final: 'exam_final'
};

exports.course_type_enum = exports.$Enums.course_type_enum = {
  bachelors: 'bachelors',
  masters: 'masters',
  doctors: 'doctors',
  professors: 'professors',
  selective: 'selective',
  mandatory: 'mandatory'
};

exports.course_season_type_enum = exports.$Enums.course_season_type_enum = {
  AutumnWinterSpringSummer: 'AutumnWinterSpringSummer',
  AutumnWinterSummer: 'AutumnWinterSummer',
  Autumn: 'Autumn',
  Spring: 'Spring',
  AutumnSpring: 'AutumnSpring',
  WinterSpringSummer: 'WinterSpringSummer'
};

exports.invitation_status_enum = exports.$Enums.invitation_status_enum = {
  pending: 'pending',
  accepted: 'accepted',
  denied: 'denied'
};

exports.major_type_enum = exports.$Enums.major_type_enum = {
  afternoon: 'afternoon',
  evening: 'evening'
};

exports.sign_ups_enum = exports.$Enums.sign_ups_enum = {
  admissions_closed: 'admissions_closed',
  admissions_open: 'admissions_open'
};

exports.property_category_enum = exports.$Enums.property_category_enum = {
  offices: 'offices',
  computer: 'computer',
  office_utilities: 'office_utilities'
};

exports.state_of_usage_enum = exports.$Enums.state_of_usage_enum = {
  normal: 'normal',
  broken: 'broken',
  needs_service: 'needs_service'
};

exports.rule_category_enum = exports.$Enums.rule_category_enum = {
  university_academic_procedures: 'university_academic_procedures',
  tuition_payment_procedures: 'tuition_payment_procedures',
  laboratory_rules: 'laboratory_rules',
  library_rules: 'library_rules',
  user_guide_canvas: 'user_guide_canvas'
};

exports.staff_role_enum = exports.$Enums.staff_role_enum = {
  security: 'security',
  cleaner: 'cleaner',
  electrician: 'electrician',
  inventory_manager: 'inventory_manager',
  manager: 'manager'
};

exports.additional_roles_enum = exports.$Enums.additional_roles_enum = {
  club_primary_leader: 'club_primary_leader',
  club_assistant_leader: 'club_assistant_leader',
  none: 'none',
  laborant: 'laborant'
};

exports.year_classification_enum = exports.$Enums.year_classification_enum = {
  freshman: 'freshman',
  junior: 'junior',
  sophomore: 'sophomore',
  senior: 'senior'
};

exports.student_is_active_enum = exports.$Enums.student_is_active_enum = {
  graduated: 'graduated',
  transfered: 'transfered',
  expelled: 'expelled',
  studying: 'studying'
};

exports.semester_specification_enum = exports.$Enums.semester_specification_enum = {
  firstSemester: 'firstSemester',
  secondSemester: 'secondSemester',
  thirdSemester: 'thirdSemester',
  fourthSemester: 'fourthSemester'
};

exports.student_attendance_enum = exports.$Enums.student_attendance_enum = {
  arrived: 'arrived',
  absent: 'absent',
  excused: 'excused',
  ill: 'ill'
};

exports.event_type_enum = exports.$Enums.event_type_enum = {
  mandatory: 'mandatory',
  non_mandatory: 'non_mandatory',
  recreational: 'recreational',
  outside_event: 'outside_event'
};

exports.club_type_enum = exports.$Enums.club_type_enum = {
  professional_club: 'professional_club',
  amatuer_club: 'amatuer_club'
};

exports.schedule_time_type_enum = exports.$Enums.schedule_time_type_enum = {
  firstPeriod: 'firstPeriod',
  secondPeriod: 'secondPeriod',
  thirdPeriod: 'thirdPeriod',
  fourthPeriod: 'fourthPeriod',
  fifthPeriod: 'fifthPeriod',
  sixthPeriod: 'sixthPeriod',
  seventhPeriod: 'seventhPeriod',
  eightPeriod: 'eightPeriod',
  ninthPeriod: 'ninthPeriod'
};

exports.schedule_type_enum = exports.$Enums.schedule_type_enum = {
  Lecture: 'Lecture',
  Seminar: 'Seminar',
  Laboratory: 'Laboratory',
  computerLaboratory: 'computerLaboratory',
  seminar: 'seminar'
};

exports.days_type_enum = exports.$Enums.days_type_enum = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday'
};

exports.grade_status_enum = exports.$Enums.grade_status_enum = {
  incomplete: 'incomplete',
  complete: 'complete',
  missing: 'missing',
  submitted: 'submitted',
  other: 'other'
};

exports.is_active_enum = exports.$Enums.is_active_enum = {
  is_working: 'is_working',
  vacation: 'vacation',
  left: 'left'
};

exports.recieved_enum = exports.$Enums.recieved_enum = {
  yes: 'yes',
  no: 'no'
};

exports.Prisma.ModelName = {
  announcement: 'announcement',
  auth_user: 'auth_user',
  basecurriculum: 'basecurriculum',
  calendar: 'calendar',
  calendaraccess: 'calendaraccess',
  classroomproperties: 'classroomproperties',
  classrooms: 'classrooms',
  clubmembers: 'clubmembers',
  contracts: 'contracts',
  coursematerial: 'coursematerial',
  courses: 'courses',
  department: 'department',
  departmentsofeducation: 'departmentsofeducation',
  grades: 'grades',
  internalmessagingclub: 'internalmessagingclub',
  inventoryofteacher: 'inventoryofteacher',
  invitations: 'invitations',
  major: 'major',
  notificationstudents: 'notificationstudents',
  paymentinformation: 'paymentinformation',
  paymentlessonsselection: 'paymentlessonsselection',
  propertyofteacher: 'propertyofteacher',
  rules: 'rules',
  signedcontracts: 'signedcontracts',
  staff: 'staff',
  student: 'student',
  studentansweredsurvey: 'studentansweredsurvey',
  studentattendance: 'studentattendance',
  studentbalance: 'studentbalance',
  studentclubevent: 'studentclubevent',
  studentclubs: 'studentclubs',
  studentcurriculum: 'studentcurriculum',
  studentsschedule: 'studentsschedule',
  studentstoadvise: 'studentstoadvise',
  submission: 'submission',
  surveys: 'surveys',
  teacher: 'teacher',
  teacherscourseplanning: 'teacherscourseplanning',
  teachersmajorplanning: 'teachersmajorplanning',
  teachersschedule: 'teachersschedule',
  transactioninformation: 'transactioninformation',
  usercard: 'usercard',
  userpreferences: 'userpreferences',
  userprofiles: 'userprofiles'
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
