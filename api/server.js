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

    if (student) {
        console.log(`Мэдээллийг амжилттай авлаа.`);
        res.status(200).json({ student: student, userpreferences: userpreferences, department: department, 
          departmentsofeducation: departmentsofeducation, major: major });
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

app.post('/Add/Course/To/Students/Schedule/', async (req, res) => {
  const { studentsCurriculum, student } = req.body;

  const search_year = student.yearClassification === '1-р курс' ? 'first_year'
                    : student.yearClassification === '2-р курс' ? 'second_year'
                    : student.yearClassification === '3-р курс' ? 'third_year'
                    : 'fourth_year'; 

  const search_courses = (studentsCurriculum.studentsCurriculum[search_year].first_semester);

  try {
    let students_scheduled_courses = [];
    for (let i = 0;  i < search_courses.length; i++) {
      const courseOfSchedule = await prisma.courses.findFirst({ 
        where: { course_id: search_courses[i] },
      });
      students_scheduled_courses.push(courseOfSchedule);
    }

    if (students_scheduled_courses.length > 0) {
      return res.status(200).json({  
        message: 'Оюутны хуваарийн хичээлүүдийг татаж авлаа.',
        studentsCourses: students_scheduled_courses,
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