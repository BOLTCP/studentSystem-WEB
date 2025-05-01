import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/university/curriculum.css';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';
import UserDetails from '../../models/user_details';
import Courses from '../../models/courses';
import moment from 'moment';


const Curriculum = ({ user }) => {
  const location = useLocation();
  const userDetails = new UserDetails(user);
  const hasFetched = useRef(false);
	const [curriculum, setCurriculum] = useState(null);
  const [majorYears, setMajorYears] = useState(parseInt(userDetails.major.totalYears));
  let courseYear = null;
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
              console.log(courses);
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
                        </tr>
                      ))}
                      
                  </tbody>
                  
                </table>
              </div>
            </div>
          ))}
				</div>
			</>
		);
	} else {
		return <div className="placeholder">Хөтөлбөрийн хичээл олдсонгүй</div>;
	}
};
    
export default Curriculum;