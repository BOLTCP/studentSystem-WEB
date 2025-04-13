import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale'; // Or your preferred locale


const ProfileScreen = ({ userDetailsPromise }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // You'll need to be within a Router context

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await userDetailsPromise;
        setUserDetails(data);
      } catch (err) {
        setError('Failed to load user details.');
        console.error('Error loading user details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userDetailsPromise]);

  const buildProfileCard = (label, value) => (
    <div className="bg-white shadow-md rounded-md p-4 mb-3">
      <h6 className="font-semibold text-gray-700">{label}</h6>
      <p className="text-gray-600">{value}</p>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading user information...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">{error}</div>;
  }

  if (!userDetails) {
    return <div className="flex justify-center items-center h-full">No user information available.</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen py-6">
      <div className="container mx-auto max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Хэрэглэгчийн мэдээлэл
        </h2>
        <div className="bg-white rounded-md shadow-md p-6">
          {userDetails.user.userRole === 'Багш' ? (
            <>
              {buildProfileCard('Нэр', `${userDetails.user.fname} ${userDetails.user.lname}`)}
              {buildProfileCard('Хэрэглэгч нь:', userDetails.user.userRole)}
              {userDetails.teacher?.teacherCode && buildProfileCard('Хэрэглэгч / Багшийн код:', userDetails.teacher.teacherCode)}
              {buildProfileCard('Хэрэглэгчийн И-мэйл', userDetails.user.email)}
              {userDetails.teacher?.academicDegree && buildProfileCard('Түвшин', userDetails.teacher.academicDegree)}
              {userDetails.departmentOfEducation?.edDepartmentName && buildProfileCard('Салбар сургууль', userDetails.departmentOfEducation.edDepartmentName)}
              {userDetails.teacher?.isActive !== undefined && buildProfileCard('Төлөв', userDetails.teacher.isActive ? 'Идэвхтэй' : 'Идэвхгүй')}
              {buildProfileCard('Хүйс', userDetails.user.gender)}
              {buildProfileCard('Регистрийн дугаар', userDetails.user.registryNumber)}
              {userDetails.user.birthday && buildProfileCard('Төрсөн өдөр', format(new Date(userDetails.user.birthday), 'yyyy-MM-dd', { locale: enGB }))}
              {buildProfileCard('Утасны дугаар', userDetails.user.phoneNumber)}
              {userDetails.teacher?.teacherEmail && buildProfileCard('Багшийн И-мэйл', userDetails.teacher.teacherEmail)}
              {buildProfileCard('Өмнөх боловсрол', userDetails.user.education)}
              {userDetails.user.createdAt && buildProfileCard('Created At', format(new Date(userDetails.user.createdAt), 'yyyy-MM-dd HH:mm:ss', { locale: enGB }))}
            </>
          ) : userDetails.user.userRole === 'Оюутан' ? (
            <>
              {buildProfileCard('Нэр', `${userDetails.user.fname} ${userDetails.user.lname}`)}
              {buildProfileCard('Хэрэглэгч нь:', userDetails.user.userRole)}
              {userDetails.student?.studentCode && buildProfileCard('Хэрэглэгч / Оюутны код:', userDetails.student.studentCode)}
              {buildProfileCard('Хэрэглэгчийн И-мэйл', userDetails.user.email)}
              {userDetails.student?.currentAcademicDegree && buildProfileCard('Түвшин', userDetails.student.currentAcademicDegree)}
              {userDetails.department?.departmentName && buildProfileCard('Салбар сургууль', userDetails.department.departmentName)}
              {userDetails.student?.isActive !== undefined && buildProfileCard('Төлөв', userDetails.student.isActive)}
              {buildProfileCard('Хүйс', userDetails.user.gender)}
              {buildProfileCard('Регистрийн дугаар', userDetails.user.registryNumber)}
              {userDetails.user.birthday && buildProfileCard('Төрсөн өдөр', format(new Date(userDetails.user.birthday), 'yyyy-MM-dd', { locale: enGB }))}
              {buildProfileCard('Утасны дугаар', userDetails.user.phoneNumber)}
              {userDetails.student?.studentEmail && buildProfileCard('Оюутны И-мэйл', userDetails.student.studentEmail)}
              {buildProfileCard('Өмнөх боловсрол', userDetails.user.education)}
              {userDetails.user.createdAt && buildProfileCard('Created At', format(new Date(userDetails.user.createdAt), 'yyyy-MM-dd HH:mm:ss', { locale: enGB }))}
            </>
          ) : (
            <div className="text-center text-gray-500">Unknown user role.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;