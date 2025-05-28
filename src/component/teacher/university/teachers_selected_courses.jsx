import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './teachers_courses.css';
import axios from 'axios';
import getApiUrl from '../../../../api/get_Api_Url';
import UserDetailsTeacher from '../../../models/userDetailsTeacher';
import MajorClass from '../../../models/major';
import Courses from '../../../models/courses';
import TeacherCoursePlanning from '../../../models/teacher_course_planning';
import TeachersMajorPlanning from '../../../models/teacher_major_planning';
import getUserDetailsFromLocalStorage from '../../../utils/userDetailsTeacher_util';

const TeachersSelectedCourses = ({ user }) => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(getUserDetailsFromLocalStorage());
  const hasFetched = useRef(false);
  const [responseCode, setResponseCode] = useState(null);
  const [isCourseRemoveSuccessful, setIsCourseRemoveSuccessful] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [teachersCourses, setTeachersCourses] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState(null);
  const [totalCredits, setTotalCredits] = useState(null);
  const [removedCourse, setRemovedCourse] = useState(null);
  const [maxRows, setMaxRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

		const fetchTeachersSelectedCourses= async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const response = await axios.post(getApiUrl('/Get/Teachers/Selected/Courses/'), 
          { 
            teacher: userDetails.teacher,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
          });

          if (response.status === 200) {
            setTeachersCourses(Array.from(response.data.teachersCoursePlanning).map((course) => TeacherCoursePlanning.fromJsonTeacherCoursePlanning(course)));
            setSelectedCourses(Array.from(response.data.totalCredits).map((course) =>  Courses.fromJsonCourse(course)));
            setTotalCredits(Array.from(response.data.totalCredits).reduce((sum, course) => sum + parseInt(course.total_credits), 0));
            setResponseCode(200);
          } else {
            localStorage.removeItem('addingCourseToCurriculum');
            setResponseCode(404);
            console.log('Error fetching curriculum:', response.status, response.data);
            setError('Failed to fetch curriculum.');
          }
      } catch (err) {
        console.error('Error fetching curriculum:', err);
        setError('Network error occurred.');
      } finally {
        setLoading(false);
      }
		};
  
		fetchTeachersSelectedCourses();
	}, []);

  const handleMajorChange = (event) => {
    const newlySelectedMajor = event.target.value;
    setSelectedMajor(newlySelectedMajor); 
  };

  const handleRemovingCourses = async (event) => {

    try {
      const response = await axios.post(getApiUrl('/Remove/Course/From/Teachers/Course/Planning/'), 
        { 
          course: event,
          teacher: userDetails.teacher,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        });

        if (response.status === 200) {

          setUserDetails(prevDetails => {
            let updateDetails = prevDetails;
            updateDetails.teachersCoursePlanning = Array.from(updateDetails.teachersCoursePlanning)
              .filter((coursePlanning) => coursePlanning.courseId !== event.courseId);
            return updateDetails;
          });

          setTeachersCourses(prevCourses => {
            let updatedCourses = prevCourses;
            updatedCourses = Array.from(updatedCourses).filter((coursePlanning) => coursePlanning.courseId !== event.courseId);
            return updatedCourses;
          });

          setRemovedCourse(event);
          setIsCourseRemoveSuccessful(true);
          setResponseCode(200);
        } else {
          setResponseCode(404);
          console.log('Error fetching curriculum:', response.status, response.data);
          setError('Failed to fetch curriculum.');
        }
    } catch (err) {
      console.error('Error fetching curriculum:', err);
      setError('Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const closeMessage = () => {
    setIsCourseRemoveSuccessful(false);
    const removeCredit = Array.from(selectedCourses).filter((course) => course.courseId === removedCourse.courseId)[0].totalCredits;
    setTotalCredits(totalCredits - removeCredit);
    setRemovedCourse(null);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }

  if (!userDetails) {
			return <div className="no-data">Хэрэглэгч олдсонгүй.</div>;
	}
  
  const { student, major, department } = userDetails;

	if ( responseCode === 200 ) {
		return (
			<>

        { isCourseRemoveSuccessful === true ?
        
          (
          <div onClick={() => {closeMessage()}}
               className={`course-add-overlay ${isCourseRemoveSuccessful === true ? 'visible' : ''}`}
          >
            <div className="add-modal">
              <div className="success-message">
                <p><strong>{removedCourse.majorName}</strong> хичээлийг амжилттай хаслаа!</p>
              </div>
            </div>
          </div>
          ) : null

        }

				<div className="curriculum-container">

          <div className="tables-container">
            <div className="curriculum-table">
              <div className="personal-curriculum-overheader-container">
                <div className="personal-curriculum-overheader">
                  Салбар сургууль: {userDetails.departmentOfEducation.edDepartmentName}
                </div>
                <div className="personal-curriculum-overheader">
                  Тэнхим: {userDetails.department.departmentName}
                </div>  
                <div className="personal-curriculum-overheader">
                  Зэрэг: {userDetails.teacher.academicDegree}
                </div>
                <div className="personal-curriculum-overheader">
                  Багшийн код: {userDetails.teacher.teacherCode.toUpperCase()}
                </div>
                <div className="personal-curriculum-overheader">
                  Овог нэр: {`${userDetails.user.fname} ${userDetails.user.lname}`}
                </div>
                <div className="personal-curriculum-overheader">
                  Регистрийн дугаар: {userDetails.user.registryNumber}
                </div>
                <div className="personal-curriculum-overheader">
                  Хөтөлбөр сонгох:
                  <select
                    className='selection-for-major-years'
                    value={selectedMajor}
                    onChange={handleMajorChange}
                  >
                    <option value="">Хөтөлбөр сонгоно уу</option>
                    {Array.from(userDetails.teachersMajorPlanning).map((major) => {
                      return (
                        <option key={major.majorId} value={major.majorName}>
                          {major.majorName}
                        </option>
                      );
                    })}

                  </select>
                </div>
                <div className="personal-curriculum-overheader">
                  Нийт хичээл кредит: {totalCredits}
                </div>
              </div>
              
              <table>
                <thead>
                    <tr className="table-header">
                      <th>№</th>
                      <th>Хичээлийн нэр</th>
                      <th>Хичээлийн код</th>
                      <th>Төрөл</th>
                      <th>Кредит</th>
                      <th className='min-width'></th>
                    </tr>
                    
                    {
                      teachersCourses !== null
                      ?
                      (
                        Array.from(teachersCourses).filter((course) => course !== 'Хавар' && course.majorName === selectedMajor).map((course, index) => {
                          return (
                            <tr className="table-row" key={course.id || Math.random()}> 
                                <th>{index + 1}</th> 
                                <th>{course.courseName}</th>
                                <th>{course.courseCode}</th>
                                <th>{selectedCourses.filter((coursePlanning) => coursePlanning.courseId === course.courseId)[0].courseType}</th>
                                <th>{selectedCourses.filter((coursePlanning) => coursePlanning.courseId === course.courseId)[0].totalCredits}</th>
                                <th onClick={() => { 
                                    userDetails.teacher.isCoursePlanningClosed === false ? handleRemovingCourses(course) : ''
                                    }}>
                                    {userDetails.teacher.isCoursePlanningClosed === false 
                                      && Array.from(userDetails.teachersCoursePlanning).filter((addedMajor) => addedMajor.majorId === course.couresId).length === 0
                                        ?
                                        <img className="add-icon"
                                            src="/src/assets/minus.png"
                                        />
                                        :
                                        null
                                    }
                                </th>
                            </tr>
                          );
                        })
                      ) 
                      :
                      (
                        ''
                      )
                    }
                    
                </thead>
              </table>
            </div>
          </div>
				</div>

			</>
		);
	} else {
		return <div className="placeholder">Хөтөлбөрийн санал болгох төлөвлөгөө олдсонгүй</div>;
	}
};
    
export default TeachersSelectedCourses;