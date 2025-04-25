import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '../src/generated/prisma/index.js';
import cors from 'cors'
import bcrypt from 'bcrypt';

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
  console.log("Received user_id:", userId);

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

    const major = await prisma.major.findUnique({
      where: { major_id: student.major_id },
    });
    console.log(student, department, major, userpreferences );
    if (student) {
        console.log(`Мэдээллийг амжилттай авлаа.`);
        res.status(200).json({ student: student, userpreferences: userpreferences, department: department, major: major });
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
  console.log("Received major_id:", majorId);

  if (!majorId) {
    return res.status(400).json({ message: 'Major ID is required' });
  }

  try {
    const courses = await prisma.courses.findMany({
      where: { major_id: majorId }, 
    });

    if (courses) {
      console.log(courses.length);
      console.log(`Мэдээллийг амжилттай авлаа.`);
      res.status(200).json({ courses: courses });
      } else {
        res.status(401).json({ error: 'Мэдээлэл олдсонгүй!' });
      }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});