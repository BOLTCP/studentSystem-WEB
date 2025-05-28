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

const TeachersCourses = ({ user }) => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(() => getUserDetailsFromLocalStorage());
  const hasFetched = useRef(false);
  const [responseCode, setResponseCode] = useState(null);
  const [majors, setMajors] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState('Хөтөлбөр сонгоно уу');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedMajorsYear, setSelectedMajorsYear] = useState(0);
  const [selectedYearCourses, setSelectedYearCourses] = useState(null);
  const [majorsYear, setMajorsYear] = useState(0);
  const [majorsCourses, setMajorsCourses] = useState(null);
  const [teachersCourses, setTeachersCourses] = useState(null);
  const [isCourseAddSuccess, setIsCourseAddSuccess] = useState(false);
  const [isCourseRemoveSuccess, setIsCourseRemoveSuccess] = useState(false);
  const [firstYear, setFirstYear] = useState(null);
  const [secondYear, setSecondYear] = useState(null);
  const [thirdYear, setThirdYear] = useState(null);
  const [fourthYear, setFourthYear] = useState(null);
  const [yearSelection, setYearSelection] = useState(null);
  const [maxRows, setMaxRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

		const fetchMajorsCourses = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const response = await axios.post(getApiUrl('/Get/Majors/Courses/'), 
          { 
            majorsPlanning: Array.from(userDetails.teachersMajorPlanning),
            teacher: userDetails.teacher,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
          });

          if (response.status === 200) {
            setMajors(Array.from(response.data.majors).map((major) => MajorClass.fromJsonMajor(major)));
            setTeachersCourses(Array.from(response.data.teachersCoursePlanning).map((course) => TeacherCoursePlanning.fromJsonTeacherCoursePlanning(course)));
            setMajorsCourses(response.data.majorsLength === 1 ? MajorClass.fromJsonMajor(Array.from(response.data.majorsCourses)[0]) :
              Array.from(response.data.majorsCourses).map((major) => MajorClass.fromJsonMajor(major)));
            setFirstYear(Array.from(response.data.firstYearCourses).map((course) => course.course_id === undefined ? 'Хавар' : Courses.fromJsonCourse(course)));
            setSecondYear(Array.from(response.data.secondYearCourses).map((course) => course.course_id === undefined ? 'Хавар' : Courses.fromJsonCourse(course)));
            setThirdYear(Array.from(response.data.thirdYearCourses).map((course) => course.course_id === undefined ? 'Хавар' : Courses.fromJsonCourse(course)));
            setFourthYear(Array.from(response.data.fourthYearCourses).map((course) => course.course_id === undefined ? 'Хавар' : Courses.fromJsonCourse(course)));

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
  
		fetchMajorsCourses();
	}, []);

  const handleAddingCourses = async (course, selectedMajor) => {
    setSelectedCourse(course);
    try {
        const response = await axios.post(getApiUrl('/Add/Course/To/Teachers/Course/Planning/'), 
          { 
            course: course,
            teacher: userDetails.teacher,
            major: Array.from(userDetails.teachersMajorPlanning).filter((major) => major.majorName === selectedMajor)[0],
          },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
          });

          if (response.status === 200) {
            const addedCourse = Array.from(userDetails.teachersCoursePlanning)
              .concat(TeacherCoursePlanning.toJsonButInApp(TeacherCoursePlanning.fromJsonTeacherCoursePlanning(response.data.addCourseToTeacher)));
           
            setUserDetails(prevDetails => {
              let updateDetails = prevDetails;
              updateDetails.teachersCoursePlanning = addedCourse;
              return updateDetails;
            });
            setIsCourseAddSuccess(true);
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

  const handleMajorChange = (event) => {
    const newlySelectedMajor = event.target.value;
    setSelectedMajorsYear(Array.from(majors).filter((major) => major.majorName === newlySelectedMajor)[0]?.totalYears);
    setSelectedMajor(newlySelectedMajor); 
  };

  const closeMessage = () => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    setIsCourseAddSuccess(false);
  }

  const handleYearChange = (event) => {
    const newlySelectedYear = event.target.value;
    const pickYearsCourses = newlySelectedYear === '1' ? firstYear
      : newlySelectedYear === '2' ? secondYear
      : newlySelectedYear === '3' ? thirdYear
      : fourthYear;

    setSelectedYearCourses(pickYearsCourses);
    setMajorsYear(newlySelectedYear);
  };

  if (!userDetails) {
			return <div className="no-data">Хэрэглэгч олдсонгүй.</div>;
	}
  
  const { student, major, department } = userDetails;

	if ( responseCode === 200 ) {
		return (
			<>

        { isCourseAddSuccess === true ?
        
          (
          <div onClick={() => {closeMessage()}}
               className={`course-add-overlay ${isCourseAddSuccess === true ? 'visible' : ''}`}
          >
            <div className="add-modal">
              <div className="success-message">
                <p><strong>{selectedCourse.courseName}</strong> хичээлийг амжилттай нэмлээ!</p>
              </div>
            </div>
          </div>
          ) : null

        }

        { isCourseRemoveSuccess === true ?
        
          (
          <div onClick={() => {closeMessage()}}
               className={`course-add-overlay ${isCourseRemoveSuccess === true ? 'visible' : ''}`}
          >
            <div className="add-modal">
              <div className="success-message">
                <p><strong>{removedMajor.majorName}</strong> хөтөлбөрийг амжилттай хаслаа!</p>
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
                        <option 
                          key={major.majorId} value={major.majorName}>
                          {major.majorName}
                        </option>
                      );
                    })}
                    
                  </select>
                </div>
                {selectedMajor &&
                  <div className="personal-curriculum-overheader">
                    Хичээлийн жил сонгох
                    <select
                      className='selection-for-major-years'
                      value={majorsYear}
                      onChange={handleYearChange} 
                    >
                      <option value="">Хөтөлбөрийн жил сонгоно уу</option>
                      {Array.from({ length: selectedMajorsYear }, (_, i) => i + 1).map((year) => {
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                }
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
                      selectedYearCourses !== null 
                      ?
                      (
                        Array.from(selectedYearCourses).filter((course) => course !== 'Хавар')
                          .map((course, index) => {
                          return (
                            <tr className="table-row" key={course.id || Math.random()}> 
                                <th>{index + 1}</th> 
                                <th>{course.courseName}</th>
                                <th>{course.courseCode}</th>
                                <th>{course.courseType}</th>
                                <th>{course.totalCredits}</th>
                                <th onClick={() => {handleAddingCourses(course, selectedMajor)}}>
                                    {userDetails.teacher.isCoursePlanningClosed === false 
                                      && Array.from(teachersCourses).filter((addedMajor) => addedMajor.majorId === majors.majorId).length === 0
                                      && !Array.from(userDetails.teachersCoursePlanning).map((course) => course.courseId).includes(course.courseId)
                                        ?
                                        <img className="add-icon"
                                             src="/src/assets/add.png"
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
    
export default TeachersCourses;