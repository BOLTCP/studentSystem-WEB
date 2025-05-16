import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/university/curriculum.css';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';
import UserDetails from '../../models/user_details';
import AuthUser from '../../models/auth_user';
import StudentUser from '../../models/student_user';
import StudentCurriculum from '../../models/student_curriculum';
import Courses from '../../models/courses';
import moment from 'moment';
import { object } from 'prop-types';


const Curriculum = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userDetails = new UserDetails(user);
  const hasFetched = useRef(false);
  let studentsCurriculum = StudentCurriculum.fromJsonButInAppInstance(JSON.parse(localStorage.getItem('studentCurriculumModel')));
  const [curriculum, setCurriculum] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [majorYears, setMajorYears] = useState(parseInt(userDetails.major.totalYears));
  let courseYear = null;

  const personalCurriculum = Object.values(Object.values(StudentCurriculum
        .fromJsonButInAppInstance(JSON.parse(localStorage.getItem('studentCurriculumModel')))
        .studentsCurriculum))
        .map((curriculum) => Object.values(curriculum)).map((curriculum) => curriculum[0] + ',' + curriculum[1])
        .flatMap(curriculum => curriculum.split(','));

  const enablePlusButton = localStorage.getItem('addingCourseToCurriculum');
  const yearClassification = localStorage.getItem('addYear');
  const semesterSpecification = localStorage.getItem('addSemester');
  const [maxRows, setMaxRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

		const fetchCurriculum = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

			if( !userDetails.major ) {
				setError('Мэдээлэл олдсонгүй!');
				setLoading(false);
			} else {
				try {
					const response = await axios.post(getApiUrl('/Get/Majors/Curriculum'), 
						{ majorId: userDetails.major.majorId },
						{
							headers: { 'Content-Type': 'application/json' },
							timeout: 30000,
						});

						if (response.status === 200) {
							const courses = response.data.courses.map(course => 
								Courses.fromJsonCourse(course));
              setMaxRows(courses.length);
							setCurriculum(courses);
						} else {
							console.log('Error fetching curriculum:', response.status, response.data);
							setError('Failed to fetch curriculum.');
						}
				} catch (err) {
					console.error('Error fetching curriculum:', err);
					setError('Network error occurred.');
				} finally {
					setLoading(false);
				}
			}
		};

		fetchCurriculum();
	}, []);

  const addCourseToCurriculum = async (course, yearClassification, semesterSpecification) => {
    try {
      const response = await axios.post(getApiUrl('/Add/Majors/Curriculum/Course/To/Student'), 
        { 
          user: AuthUser.toJson(userDetails.user),
          student: StudentUser.toJson(userDetails.student),
          course: Courses.toJsonButInApp(course),
          yearClassification: yearClassification,
          semesterSpecification: semesterSpecification
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        });

        if (response.status === 200) {
          console.log(response.data.courseAdded);
          setResponseCode(200);
          localStorage.setItem('isCourseAddSuccess', JSON.stringify(true));
          localStorage.setItem('addedCourse', JSON.stringify(Courses.toJsonButInApp(course)));
          const findYear = yearClassification.slice(1, -1);
          const findSemester = semesterSpecification.slice(1, -1);
          studentsCurriculum.studentsCurriculum[findYear][findSemester].push(course.courseId);
          localStorage.setItem('studentCurriculumModel', JSON.stringify(StudentCurriculum.fromJsonButInAppInstance(studentsCurriculum)));
          navigate('/university', { state: { condRender: 2 } });
        } else if (response.status === 401) {
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
    console.log(yearClassification, semesterSpecification);
  } 

  const getTotalCredits = (i) => {

    courseYear = i === 0 ? '1-р курс' 
                                : i === 1 ? '2-р курс' 
                                : i === 2 ? '3-р курс' 
                                : i === 3 ? '4-р курс' 
                                : i === 4 ? '5-р курс' 
                                : '6-р курс';
    const totalCreditOfYear = curriculum
    .filter(course => course.courseYear === courseYear
      && course.courseType === 'mandatory') 
    .reduce((sum, course) => sum + parseInt(course.totalCredits), 0);
    
    return totalCreditOfYear;
  }

  const getTotalCreditsSelective = (i) => { 

    courseYear = i === 0 ? '1-р курс' 
                                : i === 1 ? '2-р курс' 
                                : i === 2 ? '3-р курс' 
                                : i === 3 ? '4-р курс' 
                                : i === 4 ? '5-р курс' 
                                : '6-р курс';
    const totalCreditOfYearSelective = curriculum.filter(course => course.courseYear === courseYear
      && course.courseType === 'selective')
      .reduce((sum, course) => sum + parseInt(course.totalCredits), 0);
      
    return totalCreditOfYearSelective;
  };

	if (!userDetails) {
			return <div className="no-data">Хэрэглэгч олдсонгүй.</div>;
	}
  
	const { student, major, department } = userDetails;

	if ( curriculum ) {
		return (
			<>
        <div className="all-curriculum-container">
          <div className="curriculum-container">
              {Array.from({ length: majorYears }, (_, i) => (
                <div key={i} className="tables-container">
                  <div className="curriculum-table">
                    <table>
                      <thead>
                          <tr className="table-header">
                            <th>№</th>
                            <th>Хичээлийн нэр</th>
                            <th>Код</th>
                            <th>Кредит</th>
                            <th>Дүн</th>
                            <th>Үсгэн үнэлгээ</th>
                            <th>Улирал</th>
                            <th></th>
                          </tr>
                          
                          <tr className="sub-header-row">
                            <th colSpan="3">
                              {i === 0 
                                      ? 
                                      "1-р курс"
                                      : i === 1
                                      ?
                                      "2-р курс"
                                      : i === 2
                                      ?
                                      "3-р курс"
                                      : i === 3
                                      ?
                                      "4-р курс"
                                      : i === 4
                                      ?
                                      "5-р курс"
                                      : '6-р курс'
                                      }
                                &nbsp; Заавал судлах хичээл
                            </th>
                            <th colSpan="1">
                              {getTotalCredits(i)}
                            </th>
                            <th></th>
                            <th colSpan="2"></th>
                            <th></th>
                          </tr>
                      </thead>
                              
                      <tbody>

                        {curriculum
                          .filter(course => course.courseYear === courseYear
                                    && course.courseType === 'mandatory')
                          .map((course, index) => (
                            <tr key={index} className="table-row">
                              <td>{index + 1}</td>
                              <td>{course.courseName}</td>
                              <td>{course.courseCode}</td>
                              <td>{course.totalCredits}</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              {enablePlusButton === 'true' && !personalCurriculum.includes(`${course.courseId}`) ?
                                (
                                  <td onClick={() => 
                                    {addCourseToCurriculum(course, yearClassification, semesterSpecification)}} >
                                    {enablePlusButton === 'true' && !personalCurriculum.includes(`${course.courseId}`)
                                                    ?
                                                    <img className="add-icon" src="../../../src/assets/add.png" />
                                                    :
                                                    null }
                                  </td>
                                ) : ( <td> </td> )}
                            </tr>
                          ))}

                        <tr className="sub-header-row">
                          <th colSpan="3">
                            {i === 0 
                                    ? 
                                    "1-р курс"
                                    : i === 1
                                    ?
                                    "2-р курс"
                                    : i === 2
                                    ?
                                    "3-р курс"
                                    : i === 3
                                    ?
                                    "4-р курс"
                                    : i === 4
                                    ?
                                    "5-р курс"
                                    : '6-р курс'
                                    }
                              &nbsp; Сонгон судлах хичээл
                          </th>
                          <th colSpan="1">
                            {getTotalCreditsSelective(i)}
                          </th>
                          <th></th>
                          <th></th>
                          <th colSpan="2"></th>
                        </tr>

                        {curriculum
                        .filter(course => course.courseYear === courseYear 
                                  && course.courseType === 'selective')
                        .map((course, index) => (
                            <tr key={index} className="table-row">
                              <td>{index + 1}</td>
                              <td>{course.courseName}</td>
                              <td>{course.courseCode}</td>
                              <td>{course.totalCredits}</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              {enablePlusButton === 'true' && !personalCurriculum.includes(`${course.courseId}`) ?
                                (
                                  <td onClick={() => {addCourseToCurriculum(course, yearClassification, semesterSpecification)}} >
                                    {enablePlusButton === 'true' && !personalCurriculum.includes(`${course.courseId}`)
                                                    ?
                                                    <img className="add-icon"
                                                        src="../../../src/assets/add.png"
                                                    />
                                                    :
                                                    null
                                                    }
                                  </td>
                                ) :
                                (
                                  <td>
                                  </td>
                                )
                              }
                            </tr>
                          ))}
                          
                      </tbody>
                      
                    </table>
                  </div>
                </div>
              ))}
            </div>
        </div>
			</>
		);
	} else {
		return <div className="placeholder">Хөтөлбөрийн хичээл олдсонгүй</div>;
	}
};
    
export default Curriculum;