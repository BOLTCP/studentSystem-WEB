import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from '../src/component/login_screen';
import StudentDashboard from '../src/component/student/student_dashboard';
import ProfileScreen from '../src/component/profile_screen';
import Major from '/src/component/student/major/Major';
import Curriculum from '/src/component/student/major/curriculum';
import TeacherDashboard from './component/teacher/teacher_dashboard';
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
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);