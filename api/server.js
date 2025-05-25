import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '../src/generated/prisma/index.js';
import cors from 'cors'
import bcrypt from 'bcrypt';
import pkg from 'prop-types';
const { array } = pkg;


const prisma = new PrismaClient();
const app = express();
const port = 5001;

app.use(express.json());
app.use(cors());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//src login_screen
app.post('/login', async (req, res) => {

  const { login_name, password_hash } = req.body;
  if (!login_name || !password_hash) {
    return res.status(400).json({ error: 'Нэр болон нууц үгээ оруулна уу!' });
  }

  try {
    const authUser = await prisma.auth_user.findUnique({
      where: { login_name: login_name,
       },
    });

    if (authUser) {
      const passwordMatch = await bcrypt.compare(password_hash, authUser.password_hash);

      if (passwordMatch) {
        const userRole = authUser.user_role;
        const fname = authUser.fname;
        console.log(`${userRole}: ${fname} амжилттай нэвтэрлээ.`);
        res.status(200).json({ message: `${userRole}: ${fname} амжилттай нэвтэрлээ.`,
           authUser: authUser });
      } else {
        res.status(401).json({ error: 'Нэр эсвэл нууц үг буруу байна!' });
      }
    } else {
      res.status(401).json({ error: 'Нэр эсвэл нууц үг буруу байна!' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

//app/student/student_dashboard
app.post('/User/Login/Student', async (req, res) => {
  const { userId } = req.body;
  console.log("/User/Login/Student Received user_id:", userId);

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {

    const student = await prisma.student.findUnique({
      where: { user_id: userId }, 
    });

      console.log(student);
    const userpreferences = await prisma.userpreferences.findUnique({
      where: { user_id: userId }, 
    });

    const department = await prisma.department.findUnique({
      where: { department_id: student.department_id },
    });

    const departmentsofeducation = await prisma.departmentsofeducation.findUnique({
      where: { departments_of_education_id: department.department_of_edu_id },
    });

    const major = await prisma.major.findUnique({
      where: { major_id: student.major_id },
    });

    let schedulesOntoTimetable = new Map();
    const studentsSchedule = await prisma.studentsschedule.findMany({
      where: { student_id: student.student_id },
      orderBy: {
        schedule_type: 'desc',
      },
    });

    let studentsCourses = [];
    const studentCurriculum = await prisma.studentcurriculum.findFirst({
      where: { 
        student_id: student.student_id 
      },
      select: {
        students_curriculum: true
      },
    });

    if (studentCurriculum) {
      const yearClassification = student.year_classification === 'freshman' ? 'first_year' 
              : student.year_classification === 'junior' ? 'second_year' 
              : student.year_classification === 'sophomore' ? 'third_year' 
              : 'fourth_year';
              
      for (let i = 0; i < studentCurriculum.students_curriculum[yearClassification]['first_semester'].length; i++) {
        const getStudentsCourses = await prisma.courses.findFirst({
          where: { 
            course_id: studentCurriculum.students_curriculum[yearClassification]['first_semester'][i] 
          }
        });
        studentsCourses.push(getStudentsCourses);
      }
    }
    
    if (studentsSchedule && student) {

      for (let i = 0; i < studentsSchedule.length; i++) {
        schedulesOntoTimetable.set(studentsSchedule[i].schedules_timetable_position, studentsSchedule[i]);
      }

      console.log(`Мэдээллийг амжилттай авлаа.`);
        res.status(200).json({ student: student, userpreferences: userpreferences, department: department, 
          departmentsofeducation: departmentsofeducation, major: major, studentsSchedule: Array.from(schedulesOntoTimetable),
          studentsCourses: studentsCourses,
        });
    } else {
      res.status(401).json({ error: 'Мэдээлэл олдсонгүй!' });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

//src/component/side_bars.jsx
app.post('/Save/User/Preferences', async (req, res) => {
  const { userId, appTheme } = req.body;
  console.log("Received user_id for Saving preferences of :", userId);

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const userpreferences = await prisma.userpreferences.update({
      where:  { user_id: userId },
      data: {
        app_theme: appTheme
      },
    });

    console.log(userpreferences);
    if (userpreferences) {
        console.log(`Мэдээллийг амжилттай хадгаллаа.`);
        res.status(200).json({ userpreferences: userpreferences});
      } else {
        res.status(401).json({ error: 'Мэдээлэл хадгалсангүй!' });
      }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Operation Failed' });
  }
});

//src/component/university/curriculum.jsx
app.post('/Get/Majors/Curriculum', async (req, res) => {
  const { majorId } = req.body;
  console.log("/Get/Majors/Curriculum Received major_id:", majorId);

  if (!majorId) {
    return res.status(400).json({ message: 'Major ID is required' });
  }

  try {
    const courses = await prisma.courses.findMany({
      where: { major_id: majorId }, 
      orderBy: [
        { course_year: 'asc' }, 
        { course_type: 'asc' },
        { course_code: 'asc'}
      ]
    });
    if (courses) {
      console.log(`Мэдээллийг амжилттай авлаа.`);
      res.status(200).json({ courses: courses });
      } else {
        res.status(401).json({ error: 'Мэдээлэл олдсонгүй!' });
      }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server failed' });
  }
});

//src/component/university/recommended_curriculum.jsx
app.post('/Get/Majors/Recommended/Curriculum', async (req, res) => {
  const { majorId } = req.body;
  console.log('/Get/Majors/Recommended/Curriculum Received major_id:', majorId);

  if (!majorId) {
    return res.status(400).json({ message: 'Major ID is required' });
  }

  try {

    const recommended_courses = await prisma.major.findUnique({
      where: { major_id: majorId },
    });

    if (recommended_courses.recommended_curriculum === null) {
      console.log('Хөтөлбөрт санал болгох төлөвлөгөө байхгүй')
      return res.status(404).json({ error: 'Recommended courses not found' });
    } else {

      const firstYearCourses = recommended_courses.recommended_curriculum['first_year'].first_semester;
      const firstYearCoursesSecondSemester = recommended_courses.recommended_curriculum['first_year'].second_semester;
      const secondYearCourses = recommended_courses.recommended_curriculum['second_year'].first_semester;
      const secondYearCoursesSecondSemester = recommended_courses.recommended_curriculum['second_year'].second_semester;

      let firstYearCoursesOfMajor = new Set();
      for (let i = 0;  i < firstYearCourses.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: firstYearCourses[i] }
        });
        firstYearCoursesOfMajor.add(courseQuery);
      }

      firstYearCoursesOfMajor.add('Хавар');

      for (let i = 0;  i < firstYearCoursesSecondSemester.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: firstYearCoursesSecondSemester[i] }
        });
        firstYearCoursesOfMajor.add(courseQuery);
      }

      let secondYearCoursesOfMajor = new Set();
      for (let i = 0;  i < secondYearCourses.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: secondYearCourses[i] },
        })
        if (courseQuery) {
          secondYearCoursesOfMajor.add(courseQuery);
        }
      }

      secondYearCoursesOfMajor.add('Хавар');

      for (let i = 0;  i < secondYearCoursesSecondSemester.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: secondYearCoursesSecondSemester[i] },
        })
        if (courseQuery) {
          secondYearCoursesOfMajor.add(courseQuery);
        }
      }

      let thirdYearCoursesOfMajor = new Set();
      if (recommended_courses.recommended_curriculum['third_year']) {
        const thirdYearCourses = recommended_courses.recommended_curriculum['third_year'].first_semester;
        const thirdYearCoursesSecondSemester = recommended_courses.recommended_curriculum['third_year'].second_semester;
        for (let i = 0;  i < thirdYearCourses.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: thirdYearCourses[i] },
          })
          if (courseQuery) {
            thirdYearCoursesOfMajor.add(courseQuery);
          }
        }
        thirdYearCoursesOfMajor.add('Хавар');

        for (let i = 0;  i < thirdYearCoursesSecondSemester.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: thirdYearCoursesSecondSemester[i] },
          })
          if (courseQuery) {
            thirdYearCoursesOfMajor.add(courseQuery);
          }
        }

      }

      let fourthYearCoursesOfMajor = new Set();
      if (recommended_courses.recommended_curriculum['fourth_year']) {
        const fourthYearCourses = recommended_courses.recommended_curriculum['fourth_year'].first_semester;
        const fourthYearCoursesSecondSemester = recommended_courses.recommended_curriculum['fourth_year'].second_semester;
        for (let i = 0;  i < fourthYearCourses.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: fourthYearCourses[i] },
          })
          if (courseQuery) {
            fourthYearCoursesOfMajor.add(courseQuery);
          }
        }
        fourthYearCoursesOfMajor.add('Хавар');

        for (let i = 0;  i < fourthYearCoursesSecondSemester.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: fourthYearCoursesSecondSemester[i] },
          })
          if (courseQuery) {
            fourthYearCoursesOfMajor.add(courseQuery);
          }
        }

      }
      
      const firstYearCoursesArray = Array.from(firstYearCoursesOfMajor);
      const secondYearCoursesArray = Array.from(secondYearCoursesOfMajor);
      const thirdYearCoursesArray = Array.from(thirdYearCoursesOfMajor);
      const fourthYearCoursesArray = Array.from(fourthYearCoursesOfMajor);


      return res.status(200).json({ message: 'Санал болгох хөтөлбөрийг амжилттай татлаа!',
                                    recommended_curriculum: {
                                      first: firstYearCoursesArray,
                                      second: secondYearCoursesArray,
                                      third: thirdYearCoursesArray !== undefined
                                      ? thirdYearCoursesArray
                                      : null,
                                      fourth: fourthYearCoursesArray !== undefined
                                      ? fourthYearCoursesArray
                                      : null,
                                    }
      })

    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server failed' });
  }

});

//src/component/university/personal_curriculum.jsx
app.post('/Get/Students/Personal/Curriculum', async (req, res) => {

  const { majorId, recommendedCurriculum, studentId, studentCode } = req.body;
  console.log('/Get/Students/Personal/Curriculum: ', studentId);

  if ( !studentId || !majorId || !recommendedCurriculum ) {
    return res.status(400).json({ message: 'Bad request!' });
  }
  try {

    const check_for_students_curriculum = await prisma.studentcurriculum.findUnique({
      where: { student_id: studentId }
    });

    if (check_for_students_curriculum === null) {
      let dateValue = new Date();
      const insert_recommended_curriculum_to_student = await 
      prisma.studentcurriculum.create({
        data: {
          student_id: studentId,
          student_curriculum_year: dateValue.toISOString(),
          modified_at: dateValue.toISOString(),
          students_curriculum: recommendedCurriculum,
          student_code: studentCode
        }
      });
      const studentsCurriculum = insert_recommended_curriculum_to_student.students_curriculum;

      const firstYearCourses = studentsCurriculum['first_year'].first_semester;
      const firstYearCoursesSecondSemester = studentsCurriculum['first_year'].second_semester;
      const secondYearCourses = studentsCurriculum['second_year'].first_semester;
      const secondYearCoursesSecondSemester = studentsCurriculum['second_year'].second_semester;

      let firstYearCoursesOfMajor = new Set();
      for (let i = 0;  i < firstYearCourses.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: firstYearCourses[i] }
        });
        firstYearCoursesOfMajor.add(courseQuery);
      }

      firstYearCoursesOfMajor.add('Хавар');

      for (let i = 0;  i < firstYearCoursesSecondSemester.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: firstYearCoursesSecondSemester[i] }
        });
        firstYearCoursesOfMajor.add(courseQuery);
      }

      let secondYearCoursesOfMajor = new Set();
      for (let i = 0;  i < secondYearCourses.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: secondYearCourses[i] },
        })
        if (courseQuery) {
          secondYearCoursesOfMajor.add(courseQuery);
        }
      }

      secondYearCoursesOfMajor.add('Хавар');

      for (let i = 0;  i < secondYearCoursesSecondSemester.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: secondYearCoursesSecondSemester[i] },
        })
        if (courseQuery) {
          secondYearCoursesOfMajor.add(courseQuery);
        }
      }

      let thirdYearCoursesOfMajor = new Set();
      if (studentsCurriculum['third_year']) {
        const thirdYearCourses = studentsCurriculum['third_year'].first_semester;
        const thirdYearCoursesSecondSemester = studentsCurriculum['third_year'].second_semester;
        for (let i = 0;  i < thirdYearCourses.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: thirdYearCourses[i] },
          })
          if (courseQuery) {
            thirdYearCoursesOfMajor.add(courseQuery);
          }
        }
        thirdYearCoursesOfMajor.add('Хавар');

        for (let i = 0;  i < thirdYearCoursesSecondSemester.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: thirdYearCoursesSecondSemester[i] },
          })
          if (courseQuery) {
            thirdYearCoursesOfMajor.add(courseQuery);
          }
        }

      }

      let fourthYearCoursesOfMajor = new Set();
      if (studentsCurriculum['fourth_year']) {
        const fourthYearCourses = studentsCurriculum['fourth_year'].first_semester;
        const fourthYearCoursesSecondSemester = studentsCurriculum['fourth_year'].second_semester;
        for (let i = 0;  i < fourthYearCourses.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: fourthYearCourses[i] },
          })
          if (courseQuery) {
            fourthYearCoursesOfMajor.add(courseQuery);
          }
        }
        fourthYearCoursesOfMajor.add('Хавар');

        for (let i = 0;  i < fourthYearCoursesSecondSemester.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: fourthYearCoursesSecondSemester[i] },
          })
          if (courseQuery) {
            fourthYearCoursesOfMajor.add(courseQuery);
          }
        }

      }
      
      const firstYearCoursesArray = Array.from(firstYearCoursesOfMajor);
      const secondYearCoursesArray = Array.from(secondYearCoursesOfMajor);
      const thirdYearCoursesArray = Array.from(thirdYearCoursesOfMajor);
      const fourthYearCoursesArray = Array.from(fourthYearCoursesOfMajor);

      return res.status(200).json({ message: 'Оюутанд ганцаарчилсан төлөвлөгөөг автоматаар оноов.',
                                    student_curriculum: insert_recommended_curriculum_to_student,
                                  });
    } else {

      const recommended_curriculum_of_student = await 
      prisma.studentcurriculum.findUnique({
        where: { student_id: studentId }
      });

      const studentsCurriculum = check_for_students_curriculum.students_curriculum;
      const firstYearCourses = studentsCurriculum['first_year'].first_semester;
      const firstYearCoursesSecondSemester = studentsCurriculum['first_year'].second_semester;
      const secondYearCourses = studentsCurriculum['second_year'].first_semester;
      const secondYearCoursesSecondSemester = studentsCurriculum['second_year'].second_semester;

      let firstYearCoursesOfMajor = new Set();
      for (let i = 0;  i < firstYearCourses.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: firstYearCourses[i] }
        });
        firstYearCoursesOfMajor.add(courseQuery);
      }

      firstYearCoursesOfMajor.add('Хавар');

      for (let i = 0;  i < firstYearCoursesSecondSemester.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: firstYearCoursesSecondSemester[i] }
        });
        firstYearCoursesOfMajor.add(courseQuery);
      }

      let secondYearCoursesOfMajor = new Set();
      for (let i = 0;  i < secondYearCourses.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: secondYearCourses[i] },
        })
        if (courseQuery) {
          secondYearCoursesOfMajor.add(courseQuery);
        }
      }

      secondYearCoursesOfMajor.add('Хавар');

      for (let i = 0;  i < secondYearCoursesSecondSemester.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: secondYearCoursesSecondSemester[i] },
        })
        if (courseQuery) {
          secondYearCoursesOfMajor.add(courseQuery);
        }
      }

      let thirdYearCoursesOfMajor = new Set();
      if (studentsCurriculum['third_year']) {
        const thirdYearCourses = studentsCurriculum['third_year'].first_semester;
        const thirdYearCoursesSecondSemester = studentsCurriculum['third_year'].second_semester;
        for (let i = 0;  i < thirdYearCourses.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: thirdYearCourses[i] },
          })
          if (courseQuery) {
            thirdYearCoursesOfMajor.add(courseQuery);
          }
        }
        thirdYearCoursesOfMajor.add('Хавар');

        for (let i = 0;  i < thirdYearCoursesSecondSemester.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: thirdYearCoursesSecondSemester[i] },
          })
          if (courseQuery) {
            thirdYearCoursesOfMajor.add(courseQuery);
          }
        }

      }

      let fourthYearCoursesOfMajor = new Set();
      if (studentsCurriculum['fourth_year']) {
        const fourthYearCourses = studentsCurriculum['fourth_year'].first_semester;
        const fourthYearCoursesSecondSemester = studentsCurriculum['fourth_year'].second_semester;
        for (let i = 0;  i < fourthYearCourses.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: fourthYearCourses[i] },
          })
          if (courseQuery) {
            fourthYearCoursesOfMajor.add(courseQuery);
          }
        }
        fourthYearCoursesOfMajor.add('Хавар');

        for (let i = 0;  i < fourthYearCoursesSecondSemester.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: fourthYearCoursesSecondSemester[i] },
          })
          if (courseQuery) {
            fourthYearCoursesOfMajor.add(courseQuery);
          }
        }

      }
      
      const firstYearCoursesArray = Array.from(firstYearCoursesOfMajor);
      const secondYearCoursesArray = Array.from(secondYearCoursesOfMajor);
      const thirdYearCoursesArray = Array.from(thirdYearCoursesOfMajor);
      const fourthYearCoursesArray = Array.from(fourthYearCoursesOfMajor);

      return res.status(200).json({ message: 'Оюутанд ганцаарчилсан төлөвлөгөөг автоматаар оноов.',
        student_curriculum: recommended_curriculum_of_student,
      });
    }

  } catch (error) {
    console.log('Server error:', error);
    res.status(500).json({ error: 'Server failed '});
  }

});

//src/component/university/personal_curriculum.jsx
app.post('/CRUD/Students/Personal/Curriculum/', async (req, res) => {

  const { majorId, recommendedCurriculum, studentId, studentCode } = req.body;
  console.log('/Get/Students/Personal/Curriculum: ', studentId);

  if ( !studentId || !majorId || !recommendedCurriculum ) {
    return res.status(200).json({ message: 'Bad request!' });
  }
  try {

    const check_for_students_curriculum = await prisma.studentcurriculum.findUnique({
      where: { student_id: studentId }
    });

    if (check_for_students_curriculum === null) {
      let dateValue = new Date();
      const insert_recommended_curriculum_to_student = await 
      prisma.studentcurriculum.create({
        data: {
          student_id: studentId,
          student_curriculum_year: dateValue.toISOString(),
          modified_at: dateValue.toISOString(),
          students_curriculum: recommendedCurriculum,
          student_code: studentCode
        }
      });
      const studentsCurriculum = insert_recommended_curriculum_to_student.students_curriculum;

      const firstYearCourses = studentsCurriculum['first_year'].first_semester;
      const firstYearCoursesSecondSemester = studentsCurriculum['first_year'].second_semester;
      const secondYearCourses = studentsCurriculum['second_year'].first_semester;
      const secondYearCoursesSecondSemester = studentsCurriculum['second_year'].second_semester;

      let firstYearCoursesOfMajor = new Set();
      for (let i = 0;  i < firstYearCourses.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: firstYearCourses[i] }
        });
        firstYearCoursesOfMajor.add(courseQuery);
      }

      firstYearCoursesOfMajor.add('Хавар');

      for (let i = 0;  i < firstYearCoursesSecondSemester.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: firstYearCoursesSecondSemester[i] }
        });
        firstYearCoursesOfMajor.add(courseQuery);
      }

      let secondYearCoursesOfMajor = new Set();
      for (let i = 0;  i < secondYearCourses.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: secondYearCourses[i] },
        })
        if (courseQuery) {
          secondYearCoursesOfMajor.add(courseQuery);
        }
      }

      secondYearCoursesOfMajor.add('Хавар');

      for (let i = 0;  i < secondYearCoursesSecondSemester.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: secondYearCoursesSecondSemester[i] },
        })
        if (courseQuery) {
          secondYearCoursesOfMajor.add(courseQuery);
        }
      }

      let thirdYearCoursesOfMajor = new Set();
      if (studentsCurriculum['third_year']) {
        const thirdYearCourses = studentsCurriculum['third_year'].first_semester;
        const thirdYearCoursesSecondSemester = studentsCurriculum['third_year'].second_semester;
        for (let i = 0;  i < thirdYearCourses.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: thirdYearCourses[i] },
          })
          if (courseQuery) {
            thirdYearCoursesOfMajor.add(courseQuery);
          }
        }
        thirdYearCoursesOfMajor.add('Хавар');

        for (let i = 0;  i < thirdYearCoursesSecondSemester.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: thirdYearCoursesSecondSemester[i] },
          })
          if (courseQuery) {
            thirdYearCoursesOfMajor.add(courseQuery);
          }
        }

      }

      let fourthYearCoursesOfMajor = new Set();
      if (studentsCurriculum['fourth_year']) {
        const fourthYearCourses = studentsCurriculum['fourth_year'].first_semester;
        const fourthYearCoursesSecondSemester = studentsCurriculum['fourth_year'].second_semester;
        for (let i = 0;  i < fourthYearCourses.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: fourthYearCourses[i] },
          })
          if (courseQuery) {
            fourthYearCoursesOfMajor.add(courseQuery);
          }
        }
        fourthYearCoursesOfMajor.add('Хавар');

        for (let i = 0;  i < fourthYearCoursesSecondSemester.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: fourthYearCoursesSecondSemester[i] },
          })
          if (courseQuery) {
            fourthYearCoursesOfMajor.add(courseQuery);
          }
        }

      }
      
      const firstYearCoursesArray = Array.from(firstYearCoursesOfMajor);
      const secondYearCoursesArray = Array.from(secondYearCoursesOfMajor);
      const thirdYearCoursesArray = Array.from(thirdYearCoursesOfMajor);
      const fourthYearCoursesArray = Array.from(fourthYearCoursesOfMajor);

      return res.status(200).json({ message: 'Оюутанд ганцаарчилсан төлөвлөгөөг автоматаар оноов.',
                                    recommended_curriculum: {
                                      first: firstYearCoursesArray,
                                      second: secondYearCoursesArray,
                                      third: thirdYearCoursesArray !== undefined
                                      ? thirdYearCoursesArray
                                      : null,
                                      fourth: fourthYearCoursesArray !== undefined
                                      ? fourthYearCoursesArray
                                      : null,
                                    }
                                  });
    } else {

      const studentsCurriculum = check_for_students_curriculum.students_curriculum;
      const firstYearCourses = studentsCurriculum['first_year'].first_semester;
      const firstYearCoursesSecondSemester = studentsCurriculum['first_year'].second_semester;
      const secondYearCourses = studentsCurriculum['second_year'].first_semester;
      const secondYearCoursesSecondSemester = studentsCurriculum['second_year'].second_semester;

      let firstYearCoursesOfMajor = new Set();
      for (let i = 0;  i < firstYearCourses.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: firstYearCourses[i] }
        });
        firstYearCoursesOfMajor.add(courseQuery);
      }

      firstYearCoursesOfMajor.add('Хавар');

      for (let i = 0;  i < firstYearCoursesSecondSemester.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: firstYearCoursesSecondSemester[i] }
        });
        firstYearCoursesOfMajor.add(courseQuery);
      }

      let secondYearCoursesOfMajor = new Set();
      for (let i = 0;  i < secondYearCourses.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: secondYearCourses[i] },
        })
        if (courseQuery) {
          secondYearCoursesOfMajor.add(courseQuery);
        }
      }

      secondYearCoursesOfMajor.add('Хавар');

      for (let i = 0;  i < secondYearCoursesSecondSemester.length; i++) {
        let courseQuery = await prisma.courses.findUnique({
          where: { course_id: secondYearCoursesSecondSemester[i] },
        })
        if (courseQuery) {
          secondYearCoursesOfMajor.add(courseQuery);
        }
      }

      let thirdYearCoursesOfMajor = new Set();
      if (studentsCurriculum['third_year']) {
        const thirdYearCourses = studentsCurriculum['third_year'].first_semester;
        const thirdYearCoursesSecondSemester = studentsCurriculum['third_year'].second_semester;
        for (let i = 0;  i < thirdYearCourses.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: thirdYearCourses[i] },
          })
          if (courseQuery) {
            thirdYearCoursesOfMajor.add(courseQuery);
          }
        }
        thirdYearCoursesOfMajor.add('Хавар');

        for (let i = 0;  i < thirdYearCoursesSecondSemester.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: thirdYearCoursesSecondSemester[i] },
          })
          if (courseQuery) {
            thirdYearCoursesOfMajor.add(courseQuery);
          }
        }

      }

      let fourthYearCoursesOfMajor = new Set();
      if (studentsCurriculum['fourth_year']) {
        const fourthYearCourses = studentsCurriculum['fourth_year'].first_semester;
        const fourthYearCoursesSecondSemester = studentsCurriculum['fourth_year'].second_semester;
        for (let i = 0;  i < fourthYearCourses.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: fourthYearCourses[i] },
          })
          if (courseQuery) {
            fourthYearCoursesOfMajor.add(courseQuery);
          }
        }
        fourthYearCoursesOfMajor.add('Хавар');

        for (let i = 0;  i < fourthYearCoursesSecondSemester.length; i++) {
          let courseQuery = await prisma.courses.findUnique({
            where: { course_id: fourthYearCoursesSecondSemester[i] },
          })
          if (courseQuery) {
            fourthYearCoursesOfMajor.add(courseQuery);
          }
        }

      }
      
      const firstYearCoursesArray = Array.from(firstYearCoursesOfMajor);
      const secondYearCoursesArray = Array.from(secondYearCoursesOfMajor);
      const thirdYearCoursesArray = Array.from(thirdYearCoursesOfMajor);
      const fourthYearCoursesArray = Array.from(fourthYearCoursesOfMajor);

      return res.status(201).json({ message: 'Оюутны ганцаарчилсан төлөвлөгөөг татсан.', 
                                    first: firstYearCoursesArray,
                                    second: secondYearCoursesArray,
                                    third: thirdYearCoursesArray !== undefined
                                    ? thirdYearCoursesArray
                                    : null,
                                    fourth: fourthYearCoursesArray !== undefined
                                    ? fourthYearCoursesArray
                                    : null,
                                  });
    }

  } catch (error) {
    console.log('Server error:', error);
    res.status(500).json({ error: 'Server failed '});
  }

});


//src/component/university/personal_curriculum.jsx
app.delete('/Delete/Students/Course/From/Personal/Curriculum', async (req, res) => {
  const { courseId, studentId, yearSpecification, semesterSpecification } = req.body;
  console.log("/Delete/Students/Course/From/Personal/Curriculum' Received courseId and studentId of:", courseId, studentId, yearSpecification, semesterSpecification);

  if (!courseId || !studentId || !yearSpecification) {
    return res.status(400).json({ message: 'Course ID is required' });
  }

  const yearSpec = yearSpecification === '1' 
                    ? 'first_year'
                 : yearSpecification === '2'
                    ? 'second_year'
                 : yearSpecification === '3'
                    ? 'third_year'
                 : yearSpecification === '4'
                    ? 'fourth_year'
                 : null
  
  try {

    let getExistingCurriculum = await prisma.studentcurriculum.findUnique({
      where: { student_id: studentId }, 
    });
    
    const updatedCurriculum = getExistingCurriculum.students_curriculum[yearSpec][semesterSpecification].filter(course => course !== courseId);
    getExistingCurriculum.students_curriculum[yearSpec][semesterSpecification] = updatedCurriculum;

    const updatePersonalCurriculum = await prisma.studentcurriculum.update({
      where: { student_id: studentId }, 
      data: {
        students_curriculum: getExistingCurriculum.students_curriculum
      }
    });
    if (updatePersonalCurriculum) {
      console.log(`Хичээлийг амжилттай хаслаа.`);
      res.status(200).json({ message: 'Хичээлийг амжилттай хаслаа.' });
      } else {
        res.status(401).json({ error: 'Хичээл олдсонгүй!' });
      }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server failed' });
  }
});

//src/component/university/recommended_curriculum.jsx
app.post('/Add/Majors/Curriculum/Course/To/Student', async (req, res) => {
  const { user, student, course, yearClassification, semesterSpecification } = req.body;
  console.log('/Add/Majors/Curriculum/Course/To/Student Received datas of:', 
    user.user_id, student.student_code, course.course_name, yearClassification, semesterSpecification);
  
  if ( user.user_id === undefined || student.student_id === undefined ) {
    console.log('Шаардлагатай өгөгдөл олдсонгүй');
    return res.status(400).json({ message: 'Хичээлийг нэмэхэд алдаа гарлаа!' });
  }
  const year = yearClassification.slice(1, -1);
  const semester = semesterSpecification.slice(1, -1)
  try {

    let getStudentsCurriculum = await prisma.studentcurriculum.findUnique({
      where: { student_id: student.student_id },
    });
    console.log(year, semester);
    console.log(getStudentsCurriculum.students_curriculum[year]);
    let curriculum = (getStudentsCurriculum.students_curriculum[year][semester]);
    curriculum = [...curriculum, course.course_id];
    const updatedCurriculum = new Set(curriculum);

    if ( updatedCurriculum.size !== curriculum.length ) {
      console.log('Улирлын хичээл давхцаж байна!');
      return res.status(401).json({
        message: 'Улирлын хичээл давхцаж байна!',
        duplicatedCourse: course        
      });
    } else {

      getStudentsCurriculum.students_curriculum[year][semester] = Array.from(updatedCurriculum);
      const update = getStudentsCurriculum.students_curriculum;
      const saveUpdatedCurriculum = await prisma.studentcurriculum.update({
        where: { student_id: student.student_id },
        data: { students_curriculum: update }, 
      }); 

      if (saveUpdatedCurriculum) {
        console.log('Шинэ ганцаарчилсан төлөвлөгөөг амжилттай хадгаллаа!');
        return res.status(200).json({
          message: 'Шинэ ганцаарчилсан төлөвлөгөөг амжилттай хадгаллаа!',
          courseAdded: course
        });
      }

    }

  } catch (err) {
    console.log('Error: ', err);
    return res.status(500).json({ message: 'Server Error' });
  }
  
});

//src/utils/profileEdit.jsx
app.post('/Save/Edited/User/Profile', async (req, res) => {
  const { user, student, department } = req.body;
  console.log('/Save/Edited/User/Profile Received ', user.fname, student, department);

  if ( user.user_id === undefined 
        || student.student_id == undefined
        || department.department_id === undefined) {
    return res.status(400).json({ message: 'Алдаа гарлаа. Мэдээллийн индекс / индексүүд олдсонгүй!' });
  } else {

    try {

      const updateTransaction = await prisma.$transaction(async (prisma) => {
        const { user_id: userId, ...newUser } = user;
        const { student_id, user_id: studentUserId, ...newStudent } = student;
      
        try {
          const updateUser = await prisma.auth_user.update({
            where: { user_id: user.user_id },
            data: newUser,
          });
      
          const updateStudent = await prisma.student.update({
            where: { student_id: student.student_id },
            data: newStudent,
          });
      
          if (updateUser && updateStudent) {
            console.log('Хэрэглэгчийн мэдээллийг амжилттай шинэчлэлээ');
            return res.status(200).json({ message: 'Хэрэглэгчийн мэдээллийг амжилттай шинэчлэлээ' });
          }
        } catch (e) {
          if (e.code === 'P2002') {
            const violatedFields = e.meta?.target;
            console.log('Unique constraint violation on fields:', violatedFields);
            return res.status(401).json({
              message: 'Энэхүү И-мэйл аль хэдийн бүртгэгдсэн байна!',
              violatedFields,
            });
          }
        }
      });

    } catch (e) {
      console.log('Error: ', e);
      return res.status(500).json({ message: 'Server Error has Occured!' });
    }
  }
});

//src/component/university/student_scheduler.jsx
app.post('/Add/Course/To/Students/Schedule/', async (req, res) => {
  const { studentsCurriculum, student } = req.body;

  const search_year = student.yearClassification === '1-р курс' ? 'first_year'
                    : student.yearClassification === '2-р курс' ? 'second_year'
                    : student.yearClassification === '3-р курс' ? 'third_year'
                    : 'fourth_year'; 

  const search_courses = (studentsCurriculum.studentsCurriculum[search_year].first_semester);

  try {

    let students_scheduled_courses = [];
    let teachers_available_courses = [];
    for (let i = 0;  i < search_courses.length; i++) {
      const courseOfSchedule = await prisma.courses.findFirst({ 
        where: { course_id: search_courses[i] },
      });
      students_scheduled_courses.push(courseOfSchedule);

      const courseOfTeachersSchedule = await prisma.teachersschedule.findMany({
        where: {
          course_id: search_courses[i],
        },
        orderBy: {
          schedule_type: 'desc',
        },
      });
      teachers_available_courses.push(...courseOfTeachersSchedule);
    }

    if (students_scheduled_courses.length > 0) {
      return res.status(200).json({  
        message: 'Оюутны хуваарийн хичээлүүдийг татаж авлаа.',
        studentsCourses: students_scheduled_courses,
        teachersAvailableCourses: teachers_available_courses,
      });
    } else {
      console.log('Алдаа гарлаа');
      return res.status(400).json({ message: 'Алдаа гарлаа' });
    }

  } catch (err) {
    console.error('Server Error: ', err);
    return res.status(500).json({ messsage: err });
  }

});

//src/component/university/student_scheduler.jsx
app.post('/Create/Students/Schedule/For/Courses/', async (req, res) => {
  const { studentsPickedSchedule, student } = req.body;

  console.log('/Create/Students/Schedule/For/Courses: ', studentsPickedSchedule.length, 'хуваарь үүсгэх', student.studentCode);

  try {
    let successful = false;
    for (let i = 0;  i < studentsPickedSchedule.length; i++) {
      const createSchedule = await prisma.studentsschedule.create({ 
        data: { 
          student_id: student.studentId,
          course_id: studentsPickedSchedule[i][1].courseId,
          classroom_number: studentsPickedSchedule[i][1].classroomNumber,
          schedules_timetable_position: studentsPickedSchedule[i][1].schedulesTimetablePosition,
          course_name: studentsPickedSchedule[i][1].courseName,
          time: studentsPickedSchedule[i][1].time,
          teachers_email: studentsPickedSchedule[i][1].teachersEmail,
          teachers_name: studentsPickedSchedule[i][1].teacherName,
          schedule_type: studentsPickedSchedule[i][1].scheduleType,
          days: studentsPickedSchedule[i][1].days,
          student_code: student.studentCode,
          teacher_code: studentsPickedSchedule[i][1].teachersEmail.split('.')[0],
        },
      });
      if (createSchedule) {
        successful = true;
      } else {
        successful = false;
      }
    }

    if (successful === true) {
      return res.status(200).json({  
        message: 'Оюутны хичээлүүдийн хуваарийг амжилттай хадгаллаа.',
      });
    } else {
      console.log('Алдаа гарлаа');
      return res.status(400).json({ message: 'Алдаа гарлаа' });
    }

  } catch (err) {
    console.error('Server Error: ', err);
    return res.status(500).json({ messsage: err });
  }

});

//src/component/student/major/student_scheduler.jsx
app.post('/Get/Students/Made/Schedule/', async (req, res) => {
  const { student } = req.body;
  console.log('/Get/Students/Made/Schedule/ :', student.studentCode);

  try {
    let schedulesOntoTimetable = new Map();
    const studentsSchedule = await prisma.studentsschedule.findMany({
      where: { student_id:  student.studentId },
      orderBy: {
        time: 'asc',
      },
    });

    if (studentsSchedule) {
      for (let i = 0; i < studentsSchedule.length; i++) {
        schedulesOntoTimetable.set(studentsSchedule[i].schedules_timetable_position, studentsSchedule[i]);
      }
      return res.status(200).json({ 
        message: 'Оюутны хичээлийн хуваарийг амжилттай татлаа.',
        studentsSchedule: Array.from(schedulesOntoTimetable), 
      });
    } else {
      return res.status(400).json({ 
        message: 'Оюутанд хуваарьт оруулсан хичээл байхгүй байна.',
      });
    }

  } catch (error) {
    console.log("Error: ", error);
    return res.status(400).json({ message: 'Оюутанд хичээлийн хуваарь одоогоор байхгүй байна.'});
  }

});


//rc/component/teacher/teacher_dashboard.jsx
app.post('/User/Login/Teacher', async (req, res) => {
  const { userId } = req.body;
  console.log("/User/Login/Teacher Received user_id:", userId);

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {

    const teacher = await prisma.teacher.findUnique({
      where: { user_id: userId }, 
    });

    const userpreferences = await prisma.userpreferences.findUnique({
      where: { user_id: userId }, 
    });

    const department = await prisma.department.findUnique({
      where: { department_id: teacher.department_id },
    });

    const departmentsofeducation = await prisma.departmentsofeducation.findUnique({
      where: { departments_of_education_id: department.department_of_edu_id },
    });


    const teacherscourseplanning = await prisma.teacherscourseplanning.findMany({
      where: { teacher_id: teacher.teacher_id }
    });
    
    res.status(200).json({ teacher: teacher, userpreferences: userpreferences,
      department: department, departmentsofeducation: departmentsofeducation, teacherscourseplanning: teacherscourseplanning });
      
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

//src/utils/teacherProfileEdit.jsx
app.post('/Save/Edited/User/Profile/Teacher/', async (req, res) => {
  const { user, teacher, department, departmentOfEducation } = req.body;
  console.log('/Save/Edited/User/Profile/Teacher/ :', user.email, teacher.teacher_email, department.department_name, departmentOfEducation.ed_department_name);

  if ( user.user_id === undefined 
        || teacher.teacher_id === undefined
        || department.department_id === undefined
        || departmentOfEducation.departments_of_education_id === undefined) {
    return res.status(400).json({ message: 'Алдаа гарлаа. Мэдээллийн индекс / индексүүд олдсонгүй!' });
  } else {

    try {
      
      const updateTransaction = await prisma.$transaction(async (prisma) => {
        const { user_id: userId, ...newUser } = user;
        const { teacher_id, user_id: TeacherUserId, ...newTeacher } = teacher;

        try {
          const updateUser = await prisma.auth_user.update({
            where: { user_id: user.user_id },
            data: newUser,
          });

          const updateTeacher = await prisma.teacher.update({
            where: { teacher_id: teacher.teacher_id },
            data: newTeacher,
          });

          if (updateUser && updateTeacher) {
            console.log('Хэрэглэгчийн мэдээллийг амжилттай шинэчлэлээ');
            return res.status(200).json({ message: 'Хэрэглэгчийн мэдээллийг амжилттай шинэчлэлээ' });
          }
        } catch (e) {
          console.log(e);
          if (e.code === 'P2002') {
            const violatedFields = e.meta?.target;
            console.log('Unique constraint violation on fields:', violatedFields);
            return res.status(401).json({
              message: 'Энэхүү И-мэйл аль хэдийн бүртгэгдсэн байна!',
              violatedFields,
            });
          }
        }
      });

    } catch (e) {
      console.log('Error: ', e);
      return res.status(500).json({ message: 'Server Error has Occured!' });
    }
  }
});

//src/utils/teachersSchedule.jsx || 
app.post('/Get/Teachers/Made/Schedule/', async (req, res) => {
  const { teacher } = req.body;
  console.log('/Get/Teachers/Made/Schedule/ :', teacher.teacherCode);

  try {
    let schedulesOntoTimetable = new Map();
    const teachersSchedule = await prisma.teachersschedule.findMany({
      where: { teacher_id:  teacher.teacherId },
      orderBy: {
        classroom_type: 'asc',
      },
    });

    if (teachersSchedule) {
      for (let i = 0; i < teachersSchedule.length; i++) {
        schedulesOntoTimetable.set(teachersSchedule[i].schedules_timetable_position, teachersSchedule[i]);
      }
      return res.status(200).json({ 
        message: 'Багшийн хичээлийн хуваарийг амжилттай татлаа.',
        teachersSchedule: Array.from(schedulesOntoTimetable), 
      });
    } else {
      return res.status(400).json({ 
        message: 'Багшид хуваарьт оруулсан хичээл байхгүй байна.',
      });
    }

  } catch (error) {
    console.log("Error: ", error);
    return res.status(400).json({ message: 'Багшид хичээлийн хуваарь одоогоор байхгүй байна.'});
  }

});

//src/component/teacher/university/majors.jsx
app.post('/Get/Teachers/Majors/', async (req, res) => {
  const { teacher, department, departmentOfEducation } = req.body;
  console.log('/Get/Teachers/Majors/: ', teacher.teacherCode, department.departmentName, departmentOfEducation.edDepartmentName);

  if (!teacher.teacherId) {
    return res.status(400).json({
      message: 'Багшийн мэдээлэл олдсонгүй.',
    })
  } 

  try {

    const departmentsMajors = await prisma.major.findMany({
      where: { 
        AND: {
          department_of_edu_id: departmentOfEducation.departmentsOfEducationId,
          department_id: department.departmentId,
        },
      }
    });

    const teachersMajors = await prisma.teachersmajorplanning.findMany({
      where: { teacher_id: teacher.teacherId },
    });
    if (departmentsMajors) {
      return res.status(200).json({
        message: 'Багшийн хөтөлбөр бодлогын мэдээлллийг амжилттай татлаа.',
        departmentsMajors: departmentsMajors, teachersMajors: teachersMajors,
      });
    }

  } catch (error) {
    console.log('Error: ', error);
    return res.status(500).json({
      message: 'Server Error',
    });
  }

});

//src/component/teacher/university/majors.jsx
app.post('/Add/Major/To/Teacher/', async (req, res) => {
  const { user, teacher, major } = req.body;
  console.log('/Add/Major/To/Teacher/', user.userId, teacher.teacherCode, major);

  if (!user.userId || !teacher.teacherId || !major.majorId) {
    return res.status(400).json({
      message: 'Хэрэглэгчийн мэдээлэл олдсонгүй.'
    });
  }

  try {

    const addMajorToTeacher = await prisma.teachersmajorplanning.create({
      data: {
        academic_degree_of_major: major.academicDegree,
        major_name: major.majorName,
        major_id: major.majorId, 
        credit: major.totalCreditsPerYear,

        teacher: {
          connect: {
            teacher_id: teacher.teacherId,
          },
        },
        department: {
          connect: {
            department_id: teacher.departmentId, 
          },
        },
        departmentsofeducation: {
          connect: {
            departments_of_education_id: major.departmentsOfEducationiD,
          },
        },
      },
    });

    if (addMajorToTeacher) {
      console.log('Хөтөлбөрийг амжилттай оноов.');
      return res.status(200).json({
        message: 'Багшид хуваарийг амжилттай оноолоо.',
      });
    }

  } catch (error) {
    console.log("Server error: ", error);
    return res.status(500).json({
      message: "Server Error",
    })
  }

});


//src/component/teacher/university/majors.jsx
app.post('/Remove/Major/To/Teacher/', async (req, res) => {
  const { user, teacher, major } = req.body;
  console.log('/Remove/Major/To/Teacher/', user.userId, teacher.teacherCode, major);

  if (!user.userId || !teacher.teacherId || !major.majorId) {
    return res.status(400).json({
      message: 'Хэрэглэгчийн мэдээлэл олдсонгүй.'
    });
  }

  try {

    const addMajorToTeacher = await prisma.teachersmajorplanning.delete({
      where: {
        teacher_major_id: major.teacherMajorId,
      },
    });

    if (addMajorToTeacher) {
      console.log('Хөтөлбөрийг амжилттай хаслаа.');
      return res.status(200).json({
        message: 'Багшид хуваарийг амжилттай хаслаа.',
      });
    }

  } catch (error) {
    console.log("Server error: ", error);
    return res.status(500).json({
      message: "Server Error",
    })
  }

});