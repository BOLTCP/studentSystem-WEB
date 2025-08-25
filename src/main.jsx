import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from '../src/component/login_screen';
import ProfileScreen from '../src/component/profile_screen';

//STUDENT
import StudentDashboard from '../src/component/student/student_dashboard';
import Major from '/src/component/student/major/Major';
import Curriculum from '/src/component/student/major/curriculum';
import TeacherDashboard from './component/teacher/teacher_dashboard';
//STUDENT ---> COURSE
import Course from './component/student/course/course';


//TEACHER
import Department from './component/teacher/university/department_of_university';
import Majors from './component/teacher/university/majors';
import TeachersCourses from './component/teacher/university/teachers_courses';
import TeachersSelectedCourses from './component/teacher/university/teachers_selected_courses';

//TEACHER ---> COURSEMANAGEMENT
import CourseBuilder from './component/teacher/courseManagement/course_management';

//src\component\university\university.jsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} /> {/* Main login route */}
        <Route path="/student_dashboard" element={<StudentDashboard />} /> {/* Absolute path for dashboard */}
        <Route path="/profile_screen" element={<ProfileScreen />} /> {/* Absolute path for profile */}
        <Route path="/major" element={<Major />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/teacher_dashboard" element={<TeacherDashboard />} />
        <Route path="/department_of_university" element={<Department />} />
        <Route path="/majors" element={<Majors />} />
        <Route path="/teachers_courses" element={<TeachersCourses />} />
        <Route path="/teachers_selected_courses" element={<TeachersSelectedCourses />} />
        <Route path="/course_management" element={<CourseBuilder />} />
        <Route path="/students_course" element={<Course />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);