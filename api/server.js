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
      teachers_available_courses.push(Array.from(courseOfTeachersSchedule)[0]);
      teachers_available_courses.push(Array.from(courseOfTeachersSchedule)[1]);
    }

    if (students_scheduled_courses.length > 0) {

      return res.status(200).json({  
        message: 'Оюутны хуваарийн хичээлүүдийг татаж авлаа.',
        studentsCourses: students_scheduled_courses,
        teachersAvailableCourses: Array.from(teachers_available_courses),
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
  console.log('/Create/Students/Schedule/For/Courses: ', studentsPickedSchedule, 'хуваарь үүсгэх', student.studentCode);

  try {
    let successful = false;
    const scheduleType = studentsPickedSchedule.scheduleType === 'Лаборатори' 
      ? 'Laboratory'
      : studentsPickedSchedule.scheduleType === 'Лекц' 
      ? 'Lecture'
      : null;
      
    const createSchedule = await prisma.studentsschedule.create({ 
      data: { 
        classroom_number: studentsPickedSchedule.classroomNumber,
        schedules_timetable_position: parseInt(studentsPickedSchedule.schedulesTimetablePosition),
        course_name: studentsPickedSchedule.courseName,
        time: studentsPickedSchedule.time === '1-р цаг' ? 'firstPeriod' :
          studentsPickedSchedule.time === '2-р цаг' ? 'secondPeriod' :
          studentsPickedSchedule.time === '3-р цаг' ? 'thirdPeriod' :
          studentsPickedSchedule.time === '4-р цаг' ? 'fourthPeriod' :
          studentsPickedSchedule.time === '5-р цаг' ? 'fifthPeriod' :
          studentsPickedSchedule.time === '6-р цаг' ? 'sixthPeriod' :
          studentsPickedSchedule.time === '7-р цаг' ? 'seventhPeriod' :
          studentsPickedSchedule.time === '8-р цаг' ? 'eightPeriod' : 
          'ninthPeriod',
        teachers_email: studentsPickedSchedule.teachersEmail,
        teachers_name: studentsPickedSchedule.teacherName,
        schedule_type: scheduleType,
        days: studentsPickedSchedule.days,
        student_code: student.studentCode,
        teacher_code: studentsPickedSchedule.teachersEmail.split('@')[0],

        course: {
          connect: {
            course_id: studentsPickedSchedule.courseId,
          }
        },
        student: {
          connect: {
            student_id: student.studentId,
          }
        },
        teachersschedule: {
          connect: {
            teachers_schedule_id: studentsPickedSchedule.teachersScheduleId,
          }
        },
      },
    });

    const teachersScheduleId = parseInt(studentsPickedSchedule.teachersScheduleId);
    const result = await prisma.$queryRaw`SELECT increment_students_of_teachersschedule(${teachersScheduleId});`
    

    if (createSchedule) {
      successful = true;
    } else {
      successful = false;
    }

    if (successful === true) {
      return res.status(200).json({  
        message: 'Оюутны хичээлүүдийн хуваарийг амжилттай хадгаллаа.',
        createdSchedule: createSchedule,
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

    if (studentsSchedule.length > 0) {
      for (let i = 0; i < studentsSchedule.length; i++) {
        schedulesOntoTimetable.set(studentsSchedule[i].schedules_timetable_position, studentsSchedule[i]);
      }

      return res.status(200).json({ 
        message: 'Оюутны хичээлийн хуваарийг амжилттай татлаа.',
        studentsSchedule: Array.from(schedulesOntoTimetable), 
      });
    } else {
      return res.status(201).json({ 
        message: 'Оюутанд хуваарьт оруулсан хичээл байхгүй байна.',
      });
    }

  } catch (error) {
    console.log("Error: ", error);
    return res.status(400).json({ message: 'Оюутанд хичээлийн хуваарь одоогоор байхгүй байна.'});
  }
});

//src/component/student/major/student_scheduler.jsx
app.post('/Remove/Schedule/From/Student/', async (req, res) => {
  const { scheduleToRemove } = req.body;
  console.log('/Remove/Schedule/From/Student/: ', scheduleToRemove.studentsScheduleId);

  if (!scheduleToRemove.studentsScheduleId) {
    console.log('Мэдээлэл олдсонгүй.');
    return res.status(400).json({
      message: 'Мэдээлэл олдсонгүй.'
    });
  }
  try {
    const removeSchedule = await prisma.studentsschedule.delete({
      where: { 
        students_schedule_id: scheduleToRemove.studentsScheduleId,
       },
    });

    const result = await prisma.$queryRaw`SELECT decrement_students_for_schedule(${scheduleToRemove.teachersScheduleId});`


    if (removeSchedule) {
      console.log('Амжилттай хаслаа.');
      return res.status(200).json({
        message: 'Амжилттай хаслаа.'
      });
    }
  } catch (error) {
    console.log('Error: ', error);
    return res.status(500).json({
      message: 'Server Error'
    });
  }

});

//src/component/teacher/teacher_dashboard.jsx
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

    const teachersmajors = await prisma.teachersmajorplanning.findMany({
      where: { teacher_id: teacher.teacher_id },
    });

    const teacherscourseplanning = await prisma.teacherscourseplanning.findMany({
      where: { teacher_id: teacher.teacher_id }
    });

    const teachersschedule = await prisma.teachersschedule.findMany({
      where: { teacher_id: teacher.teacher_id }
    });
    
    res.status(200).json({ teacher: teacher, userpreferences: userpreferences, teachersmajors: teachersmajors, teachersschedule: teachersschedule,
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
      orderBy: [
        { classroom_type: 'asc' },
        { time: 'asc' },
      ],
    });

    if (teachersSchedule.length > 0) {
      for (let i = 0; i < teachersSchedule.length; i++) {
        schedulesOntoTimetable.set(teachersSchedule[i].schedules_timetable_position, teachersSchedule[i]);
      }
      return res.status(200).json({ 
        message: 'Багшийн хичээлийн хуваарийг амжилттай татлаа.',
        teachersSchedule: Array.from(schedulesOntoTimetable), 
      });
    } else {
      console.log('Багшид хичээлийн хуваарь байхгүй байна.');
      return res.status(201).json({ 
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
        addedMajor: addMajorToTeacher,
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


//src/component/teacher/university/teachers_courses.jsx
app.post('/Get/Majors/Courses/', async (req, res) => {
  const { majorsPlanning, teacher } = req.body;
  console.log('/Get/Majors/Courses/', majorsPlanning, teacher.teacherCode);

  if (!majorsPlanning || !teacher.teacherId) {
    return res.status(400).json({
      message: 'Хэрэглэгчийн мэдээлэл олдсонгүй.'
    });
  }
  try {
    let majorsCourses = [];
    let majors = [];
    for (let i = 0; i < majorsPlanning.length; i++){
      const getMajorCourses = await prisma.major.findFirst({
        where: {
          major_id: majorsPlanning[i].majorId,
        },
      });
      majorsCourses.push(getMajorCourses);
      majors.push(getMajorCourses);
    }

    const teachersCoursePlanning = await prisma.teacherscourseplanning.findMany({
      where: { 
        teacher_id: teacher.teacherId, 
      },
    });

    const firstYear = majorsCourses[0].recommended_curriculum['first_year'];
    const secondYear = majorsCourses[0].recommended_curriculum['second_year'];
    const thirdYear = majorsCourses[0].recommended_curriculum['third_year'];
    const fourthYear = majorsCourses[0].recommended_curriculum['fourth_year'];

    let firstYearCourses = [];
    let secondYearCourses = [];
    let thirdYearCourses = [];
    let fourthYearCourses = [];

    for (let i = 0; i < firstYear.first_semester.length; i++) {
      const getCourse = await prisma.courses.findFirst({
        where: { 
          course_id: firstYear.first_semester[i],
        }
      });
      firstYearCourses.push(getCourse);
    }
    firstYearCourses.push('Хавар');
    for (let i = 0; i < firstYear.second_semester.length; i++) {
      const getCourse = await prisma.courses.findFirst({
        where: { 
          course_id: firstYear.second_semester[i],
        }
      });
      firstYearCourses.push(getCourse);
    }

    
    for (let i = 0; i < secondYear.first_semester.length; i++) {
      const getCourse = await prisma.courses.findFirst({
        where: { 
          course_id: secondYear.first_semester[i],
        }
      });
      secondYearCourses.push(getCourse);
    }
    secondYearCourses.push('Хавар');
    for (let i = 0; i < secondYear.second_semester.length; i++) {
      const getCourse = await prisma.courses.findFirst({
        where: { 
          course_id: secondYear.second_semester[i],
        }
      });
      secondYearCourses.push(getCourse);
    }

    for (let i = 0; i < secondYear.first_semester.length; i++) {
      const getCourse = await prisma.courses.findFirst({
        where: { 
          course_id: secondYear.first_semester[i],
        }
      });
      secondYearCourses.push(getCourse);
    }
    secondYearCourses.push('Хавар');
    for (let i = 0; i < secondYear.second_semester.length; i++) {
      const getCourse = await prisma.courses.findFirst({
        where: { 
          course_id: secondYear.second_semester[i],
        }
      });
      secondYearCourses.push(getCourse);
    }

    for (let i = 0; i < thirdYear.first_semester.length; i++) {
      const getCourse = await prisma.courses.findFirst({
        where: { 
          course_id: thirdYear.first_semester[i],
        }
      });
      thirdYearCourses.push(getCourse);
    }
    thirdYearCourses.push('Хавар');
    for (let i = 0; i < thirdYear.second_semester.length; i++) {
      const getCourse = await prisma.courses.findFirst({
        where: { 
          course_id: thirdYear.second_semester[i],
        }
      });
      thirdYearCourses.push(getCourse);
    }

    for (let i = 0; i < fourthYear.first_semester.length; i++) {
      const getCourse = await prisma.courses.findFirst({
        where: { 
          course_id: fourthYear.first_semester[i],
        }
      });
      fourthYearCourses.push(getCourse);
    }
    fourthYearCourses.push('Хавар');
    for (let i = 0; i < fourthYear.second_semester.length; i++) {
      const getCourse = await prisma.courses.findFirst({
        where: { 
          course_id: fourthYear.second_semester[i],
        }
      });
      fourthYearCourses.push(getCourse);
    }

    if (majorsCourses.length > 0) {
      console.log('Хөтөлбөрүүдийн хичээлийг амжилттай татлаа.');
      return res.status(200).json({
        message: 'Багшийн хичээлүүдийг таллаа.',
        majors: majors,
        teachersCoursePlanning: teachersCoursePlanning,
        majorsCourses: majorsCourses,
        firstYearCourses: firstYearCourses,
        secondYearCourses: secondYearCourses,
        thirdYearCourses: thirdYearCourses,
        fourthYearCourses: fourthYearCourses,
        majorsLength: majorsCourses.length,
      });
    } else {
      return res.status(400).json({
        message: 'Хэрэглэгчийн мэдээлэл олдсонгүй.'
      });
    }

  } catch (error) {
    console.log("Server error: ", error);
    return res.status(500).json({
      message: "Server Error",
    })
  }

});

//src/component/teacher/university/teachers_selected_courses.jsx
app.post('/Get/Teachers/Selected/Courses/', async (req, res) => {
  const { teacher } = req.body;
  console.log('/Get/Teachers/Selected/Courses/: ', teacher.teacherCode);

  if (!teacher.teacherId) {
    return res.status(400).json({
      message: 'Хэрэглэгчийн мэдээлэл олдсонгүй. Bad Request!'
    });
  }

  try {

    const getTeachersCoursePlanning = await prisma.teacherscourseplanning.findMany({
      where: { 
        teacher_id : teacher.teacherId,
      }, 
    });

    let totalCredits = [];
    for ( let i = 0; i < getTeachersCoursePlanning.length; i++ ) {
      const getTotalCredits = await prisma.courses.findFirst({
        where: {
          course_id: getTeachersCoursePlanning[i].course_id,
        },
      });
      totalCredits.push(getTotalCredits);
    }

    if (getTeachersCoursePlanning) {
      console.log('Багшийн хичээл оноогдлыг амжилттай татлаа.');
      return res.status(200).json({
        teachersCoursePlanning: getTeachersCoursePlanning,
        totalCredits: totalCredits, 
      });
    }

  } catch (error) {
    console.log("Server Error: ", error);
    return res.status(500).json({
      message: 'Server Error has occured',
    });
  }

});


//src/component/teacher/university/teachers_selected_courses.jsx
app.post('/Add/Course/To/Teachers/Course/Planning/', async (req, res) => {
  const { course, teacher, major } = req.body;
  console.log('/Add/Course/To/Teachers/Course/Planning/: ', course.courseCode, teacher.teacherCode, major);

  if (!course.courseId || !teacher.teacherId) {
    return res.status(400).json({
      message: 'Хэрэглэгчийн мэдээлэл олдсонгүй. Bad Request!',
    });
  }

  try {

    const addCourseToTeacher = await prisma.teacherscourseplanning.create({
      data: {
        major_name: major.majorName,
        major_id: major.majorId,
        course_name: course.courseName,
        credit: course.totalCredits,
        course_code: course.courseCode,
        course_length: 16,

        courses: {
          connect: {
            course_id: course.courseId,
          },
        },

        department: {
          connect: {
            department_id: major.departmentId,
          }
        },

        departmentsofeducation: {
          connect: {
            departments_of_education_id: major.departmentOfEducationsId,
          }
        },

        teacher: {
          connect: {
            teacher_id: teacher.teacherId,
          }
        },

        teachersmajorplanning: {
          connect: {
            teacher_major_id:  major.teacherMajorId,
          }
        },

      },
    });

    const createCourseManagement = await prisma.coursemanagement.create({
      data: {
        course_name: course.courseName,
        course_length: addCourseToTeacher.course_length,
        teacher_code: teacher.teacherCode,
        teacher_id: teacher.teacherId,
        course_id: course.courseId,

        teacherscourseplanning: {
          connect: {
            teacher_course_planning_id: addCourseToTeacher.teacher_course_planning_id
          }
        },

      }
    });

    const createCourseWeek = await prisma.courseweek.create({
        data: {
          title: 'Эхлэл',
          course_management_id: createCourseManagement.course_management_id,
          week: 0,
          activity_status: true,
        }
      });

    for (let i = 0; i < addCourseToTeacher.course_length; i++) {
      const createCourseWeek = await prisma.courseweek.create({
        data: {
          course_management_id: createCourseManagement.course_management_id,
          week: i + 1,
          activity_status: true,
        }
      });
    }

    if (addCourseToTeacher) {
      console.log('Багшид хичээлийг амжилттай нэмлээ.');
      return res.status(200).json({
        message: 'Ажилттай нэмлээ.',
        addCourseToTeacher: addCourseToTeacher,
      });
    }
  } catch (error) {
    console.log('Server error: ', error);
    return res.status(500).json({
      message: 'Server Error',
    });
  }

});

//src/component/teacher/university/teachers_selected_courses.jsx
app.post('/Remove/Course/From/Teachers/Course/Planning/', async (req, res) => {
  const { course, teacher } = req.body;
  console.log('/Remove/Course/From/Teachers/Course/Planning/: ', course.courseCode, teacher.teacherCode);

  if (!course.courseId || !teacher.teacherId) {
    return res.status(400).json({
      message: 'Хэрэглэгчийн мэдээлэл олдсонгүй. Bad Request!',
    });
  }

  try {

    const removeCourseFromTeacher = await prisma.teacherscourseplanning.delete({
      where: {
          teacher_course_planning_id: course.teacherCoursePlanningId,
      }
    });
    if (removeCourseFromTeacher) {
      console.log('Багшийн хичээлийг амжилттай хаслаа.');
      return res.status(200).json({
        message: 'Ажилттай хаслаа.',
        removeCourseFromTeacher: removeCourseFromTeacher,
      });
    }
  } catch (error) {
    console.log('Server error: ', error);
    return res.status(500).json({
      message: 'Server Error',
    });
  }

});

app.post('/Get/Available/Classes/For/Timetable/Position/', async (req, res) => {
  const { teachersScheduleInstance } = req.body;
  console.log('/Get/Available/Classes/For/Timetable/Position/ :', teachersScheduleInstance);
  
  if (!teachersScheduleInstance.teacher_id) {
    console.log('Хэрэглэгчийн өгөгдөл олдсонгүй.');
    return res.status(400).json({
      message: 'Хэрэглэгчийн мэдээлэл олдсонгүй. Bad Request.',
    })
  } 

  try {

    const getPositionAvailability = await prisma.teachersschedule.findMany({
      where: {
        AND: {
          teacher_id: teachersScheduleInstance.teacher_id,
          major_id: teachersScheduleInstance.major_id,
          course_id: teachersScheduleInstance.course_id,
          schedules_timetable_position: teachersScheduleInstance.schedules_timetable_position,
        }
      }
    });

    const bookedClasses = getPositionAvailability.map((schedule) => schedule.classroom_id);

    const classroomSearchParemeter = teachersScheduleInstance.course_code.slice(0, 3) === 'КОМ' ? 'computerLaboratory' 
      : 'seminar';

    const getClassroomsForPosition = await prisma.classrooms.findMany({
      where: {
        classroom_type: classroomSearchParemeter,
      },
    });
  
    const availableClassroom = getClassroomsForPosition.filter((classroom) => !bookedClasses.includes(classroom.classroom_id));
   
    if (availableClassroom.length === 0) {
      console.log('Бэлэн анги олголт байхгүй байна.');
      return res.status(201).json({
        message: `${teachersScheduleInstance.course_name}, ${teachersScheduleInstance.schedules_timetable_position} боломжит ангийн хуваарь байхгүй байна.`
      });
    } else {
      console.log('Бэлэн анги байна.', availableClassroom.map((classroom) => console.log(classroom)));
      return res.status(200).json({
        message: 'Боломжит ангийн хуваарийг татлаа.',
        availableClassroom: availableClassroom,
      });
    }

  } catch (error) {
    console.log('Server Error: ', error);
    return res.status(500).json({
      message: 'Server Error',
    });
  }

});

app.post('/Create/Schedule/For/Teachers/Timetable/', async (req, res) => {
  const scheduleData = req.body.scheduleInstance;
  console.log('/Create/Schedule/For/Teachers/Timetable/: ', scheduleData);

  if (!scheduleData) {
    console.log('Хэрэглэгчийн өгөгдөл байхгүй эсвэл дутуу байна.');
    return res.status(400).json({
      message: 'Алдаа гарлаа. Bad Request',
    });
  }

  try {
     
    const createScheduleForTeacher = await prisma.teachersschedule.create({
      data: {
        course_id: scheduleData.course_id, 
        time: scheduleData.time,
        days: scheduleData.days,
        schedules_timetable_position: scheduleData.schedules_timetable_position,
        course_name: scheduleData.course_name,
        course_code: scheduleData.course_code,
        classroom_id: scheduleData.classroom_id,
        students: 0,
        classroom_capacity: scheduleData.classroom_capacity,
        classroom_type: scheduleData.classroom_type === 'Семинар' ? 'seminar' :
          scheduleData.classroom_type === 'Лаборатори' ? 'computerLaboratory' : 'online',
        classroom_number: scheduleData.classroom_number,
        teacher_name: scheduleData.teacher_name, 
        teachers_email: scheduleData.teachers_email,
        schedule_type: scheduleData.schedule_type,
        created_at: scheduleData.created_at ? new Date(scheduleData.created_at) : undefined, 
        major: {
          connect: {
            major_id: scheduleData.major_id, 
          }
        },
        teacher: {
          connect: {
            teacher_id: scheduleData.teacher_id, 
          }
        },
        teacherscourseplanning: {
          connect: {
            teacher_course_planning_id: scheduleData.course_planning_id,
          }
        }
      },
    });

    if (createScheduleForTeacher) {
      console.log('Багшийн хуваарийг амжилттай нэмлээ.');
      return res.status(200).json({
        scheduleData: createScheduleForTeacher,
      });
    } 

  } catch (error) {
    if (error.code === 'P2002'){

      console.log('Хуваарийн байршил давхцаж байна.');
      return res.status(201).json({
        scheduleData: scheduleData,
      });
    }
    console.log('Server Error: ', error);
    return res.status(500).json({
      message: 'Server Error',
    });
  }

});

//src/component/teacher/university/teacher_scheduler.jsx
app.post('/Remove/Schedule/From/Teacher/', async (req, res) => {
  const { scheduleToRemove } = req.body;
  console.log('/Remove/Schedule/From/Teacher/: ', scheduleToRemove.teachersScheduleId);

  if (!scheduleToRemove.teachersScheduleId) {
    console.log('Мэдээлэл олдсонгүй.');
    return res.status(400).json({
      message: 'Мэдээлэл олдсонгүй.'
    });
  }
  try {
    const removeSchedule = await prisma.teachersschedule.delete({
      where: { 
        teachers_schedule_id: scheduleToRemove.teachersScheduleId,
       },
    });
    if (removeSchedule) {
      console.log('Амжилттай хаслаа.');
      return res.status(200).json({
        message: 'Амжилттай хаслаа.'
      });
    }
  } catch (error) {
    if (error.code === 'P2003') {
      return res.status(209).json({
        failMessage: 'Тухайн хуваарь дээр оюутны хичээлийн хуваарь байрлаж байна.',
      })
    }
    console.log('Error: ', error);
    return res.status(500).json({
      message: 'Server Error'
    });
  }

});

//src/component/teacher/courseManagement/course_management.jsx
app.post('/Fetch/Teachers/CourseManagement/CourseWeeks/And/CourseMaterials/', async (req, res) => {
  const { teacher, teachersCoursePlanning } = req.body;
  console.log('/Fetch/Teachers/CourseManagement/: ', teacher.teacherCode, teachersCoursePlanning.length);

  if (!teacher.teacherId) {
    console.log('Хэрэглэгчийн мэдээлэл дутуу байна.');
    return res.status(400).json({
      message: 'Хэрэглэгчийн мэдээлэл дутуу байна. Bad Request'
    });
  }

  try {
    let courseManagements = [];

    for (let i = 0; i < teachersCoursePlanning.length; i++){
      const fetchCourseManagement = await prisma.coursemanagement.findMany({
        where: { 
          teacher_course_planning_id: teachersCoursePlanning[i].teacherCoursePlanningId,
        }
      });
      courseManagements.push(fetchCourseManagement);
    }

    let courseWeeks = [];
    for (let i = 0; i < courseManagements.length; i++) {
      const getCourseWeeks = await prisma.courseweek.findMany({
        where: {
          AND: {
            course_management_id: courseManagements[i].course_management_id,
            activity_status: true,
          },
        },
        orderBy: {
          week: 'asc',
        }
      });
      courseWeeks.push(getCourseWeeks);
    }

    let courseMaterials = [];
    for (let i = 0; i < courseWeeks.length; i++) {
      const getCourseMaterial = await prisma.coursematerial.findMany({
        where: {
          AND: {
            week: courseWeeks[i].week,
          }
        },
        orderBy: {
          course_mat_type: 'asc',
        }
      });
      console.log(getCourseMaterial);
      courseMaterials.push(getCourseMaterial);
    }
    
    return res.status(200).json({
      message: 'Багшийн хичээл удирдлагын мэдээллийг амжилттай татлаа.',
      management: courseManagements,
      courseWeeks: courseWeeks,
      courseMaterials: courseMaterials,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Server Error: ${error}`
    });
  }

});

//src/component/teacher/courseManagement/course_management.jsx
app.post('/Create/CourseMaterial/For/Course/Week/', async (req, res) => {
  const { matToCreate, courseManagement, matToCreateWeek } = req.body;
  console.log('/Create/CourseMaterial/For/Course/Week/: ', matToCreate, courseManagement, matToCreateWeek);

  if (!matToCreate || !courseManagement.teacherId || !matToCreateWeek) {
    return res.status(400).send();
  }

  try {
    const getMaterialCount = await prisma.$queryRaw`SELECT COUNT(*) FROM coursematerial WHERE course_week_id = ${matToCreateWeek.courseWeekId}`;
    
    if (Number(getMaterialCount[0].count) < 20) {

      const createMaterial = await prisma.coursematerial.create({
        data: {
          course_id: courseManagement.courseId,
          week: matToCreateWeek.week,
          teacher_id: courseManagement.teacherId,
          course_management_id: courseManagement.courseManagementId,
          course_week_id: matToCreateWeek.courseWeekId,
          title: matToCreate.title,
          course_mat_type: matToCreate.type === 'Лабораторийн хэсэг' ? 'Laboratory' :
            matToCreate.type === 'Лекцийн хэсэг' ? 'Lecture' :
            matToCreate.type === 'Семинарын хэсэг' ? 'Seminar' :
            matToCreate.type === 'Танилцуулга эхлэлийн хэсэг' ? 'Introduction' : 
            matToCreate.type === 'Өөрийгөө сорих Quiz хэсэг' ? 'Quiz' :
            matToCreate.type === 'Явцын шалгалт №1' ? 'SemiFinal' :
            matToCreate.type === 'Явцын шалгалт №2' ? 'SemiFinal1' :
            matToCreate.type === 'Сэтгэл ханамжийн судалгаа' ? 'SatisfactionSurvey' :
            'Final',
        }
      });


      console.log(createMaterial);
      if (createMaterial) {
        console.log('200');
        return res.status(200).json({createMaterial: createMaterial});
      }
    } else {
      return res.status(201).json({
        message: `${courseManagement.courseName} хичээлийн ${matToCreateWeek.title ? `${matToCreateWeek.title}, ` : '' }${matToCreateWeek.week} - р долоо хоногийн материал хэмжээ тулсан байна.`
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
});

//src/component/teacher/courseManagement/course_management.jsx
app.post('/Save/Teachers/Edited/CourseWeek/', async (req, res) => {
  const { editWeek, teacher } = req.body;
  console.log('/Save/Teachers/Edited/CourseWeek/: ', editWeek, teacher);

  if (!editWeek || !teacher) {
    return res.status(400).send();
  }
  try {
    const { course_week_id, ...updateWeekData } = editWeek
    const saveUpdatedWeek = await prisma.courseweek.update({
      where: {
        course_week_id: editWeek.course_week_id,
      },
      data: updateWeekData,
    });

    if (saveUpdatedWeek) {
      console.log('Долоо хоног амжилттай хадгалагдлаа.');
      return res.status(200).send();
    }

  } catch (error) {
    console.error('Error: ', error);
  }

});