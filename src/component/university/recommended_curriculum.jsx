import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/university/recommended_curriculum.css';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';
import UserDetails from '../../models/user_details';
import Courses from '../../models/courses';
import moment from 'moment';


const RecommendedCurriculum = ({ user }) => {
  const location = useLocation();
  const userDetails = new UserDetails(user);
	const [curriculum, setCurriculum] = useState(null);
  const [majorYears, setMajorYears] = useState(parseInt(userDetails.major.totalYears));
  const [firstYear, setFirstYear] = useState();
  const [secondYear, setSecondYear] = useState(null);
  const [thirdYear, setThirdYear] = useState(null);
  const [fourthYear, setFourthYear] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [maxRows, setMaxRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

		const fetchRecommendedCurriculum = async () => {
			if( !userDetails.major ) {
				setError('Мэдээлэл олдсонгүй!');
				setLoading(false);
			} else {
				try {
					const response = await axios.post(getApiUrl('/Get/Majors/Recommended/Curriculum'), 
						{ majorId: userDetails.major.majorId },
						{
							headers: { 'Content-Type': 'application/json' },
							timeout: 30000,
						});

						if (response.status === 200) {

              setFirstYear(response.data.recommended_curriculum.first);
              setSecondYear(response.data.recommended_curriculum.second);
              setThirdYear(response.data.recommended_curriculum.third);
              setFourthYear(response.data.recommended_curriculum.fourth);
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
			}
		};
  
		fetchRecommendedCurriculum();
	}, []);

  const getTotalCreditsFirstHalf = (courseOfCurriculum) => {
    
    const totalCreditOfYear = courseOfCurriculum
    .slice(0, Math.floor(courseOfCurriculum.length / 2))
    .reduce((sum, course) => sum + parseInt(course.total_credits), 0);
    
    return totalCreditOfYear;
  }

  const getTotalCreditsLastHalf = (courseOfCurriculum) => {

    const totalCreditOfYear = courseOfCurriculum
    .slice(Math.floor(courseOfCurriculum.length / 2), courseOfCurriculum.length)
    .reduce((sum, course) => sum + parseInt(course.total_credits), 0);
    
    return totalCreditOfYear;
  }

  const printCoursesOfFirstHalf = (courseOfCurriculum, yearSpecification) => { 

    return(
      <>
        {courseOfCurriculum
      .slice(0, Math.floor(courseOfCurriculum.length / 2))
      .map((course, index) => (
        <tr key={index} className="table-row">
          <td>{index + 1}</td>
          <td>{course.course_name}</td>
          <td>{course.course_code}</td>
          <td>{course.total_credits}</td>
        </tr>
      ))}

    <tr className="sub-header-row">
      <th colSpan="3">
      {yearSpecification === '1'
        ?
        '1-р курс, Хавар'
        : yearSpecification === '2'
        ?
        '2-р курс, Хавар'
        : yearSpecification === '3'
        ?
        '3-р курс, Хавар'
        : 
        '4-р курс, Хавар'
      }
      </th>
      <th colSpan="1">
      {getTotalCreditsLastHalf(firstYear)}
      </th>
    </tr>

    {courseOfCurriculum
    .slice(Math.floor(courseOfCurriculum.length / 2), courseOfCurriculum.length)
    .map((course, index) => (
        <tr key={index} className="table-row">
          <td>{index + 1}</td>
          <td>{course.course_name}</td>
          <td>{course.course_code}</td>
          <td>{course.total_credits}</td>
        </tr>
      ))}
      </>
    );

  };

	if (!userDetails) {
			return <div className="no-data">Хэрэглэгч олдсонгүй.</div>;
	}
  
	const { student, major, department } = userDetails;

	if ( responseCode === 200 ) {
		return (
			<>
				<div className="curriculum-container">

          <div className="tables-container">
            <div className="curriculum-table">
              <table>
                <thead>
                    <tr className="table-header">
                      <th>№</th>
                      <th>Хичээлийн нэр</th>
                      <th>Код</th>
                      <th>Кредит</th>
                    </tr>
                    
                    <tr className="sub-header-row">
                      <th colSpan="3">
                        1-р курс, Намар
                      </th>
                      <th colSpan="1">
                      {getTotalCreditsFirstHalf(firstYear)}
                      </th>
                    </tr>
                </thead>
                        
                <tbody>

                  {printCoursesOfFirstHalf(firstYear, '1')}

                </tbody>
              </table>
            </div>
          </div>

          {secondYear !== null
          ?
            <div className="tables-container">
              <div className="curriculum-table">
                <table>
                  <thead>
                      <tr className="table-header">
                        <th>№</th>
                        <th>Хичээлийн нэр</th>
                        <th>Код</th>
                        <th>Кредит</th>
                      </tr>
                      
                      <tr className="sub-header-row">
                        <th colSpan="3">
                          2-р курс, Намар
                        </th>
                        <th colSpan="1">
                        {getTotalCreditsFirstHalf(secondYear)}
                        </th>
                      </tr>
                  </thead>
                          
                  <tbody>

                    {printCoursesOfFirstHalf(secondYear, '2')}

                  </tbody>
                </table>
              </div>
            </div>
          :
          null
          }
          

          {thirdYear !== null
          ?
          <div className="tables-container">
            <div className="curriculum-table">
              <table>
                <thead>
                    <tr className="table-header">
                      <th>№</th>
                      <th>Хичээлийн нэр</th>
                      <th>Код</th>
                      <th>Кредит</th>
                    </tr>
                    
                    <tr className="sub-header-row">
                      <th colSpan="3">
                        3-р курс, Намар
                      </th>
                      <th colSpan="1">
                      {getTotalCreditsFirstHalf(thirdYear)}
                      </th>
                    </tr>
                </thead>
                        
                <tbody>

                  {printCoursesOfFirstHalf(thirdYear, '3')}

                </tbody>
              </table>
            </div>
          </div>
          :
          null
          }
          
          {fourthYear !== null
          ?
          <div className="tables-container">
            <div className="curriculum-table">
              <table>
                <thead>
                    <tr className="table-header">
                      <th>№</th>
                      <th>Хичээлийн нэр</th>
                      <th>Код</th>
                      <th>Кредит</th>
                    </tr>
                    
                    <tr className="sub-header-row">
                      <th colSpan="3">
                        4-р курс, Намар
                      </th>
                      <th colSpan="1">
                      {getTotalCreditsFirstHalf(fourthYear)}
                      </th>
                    </tr>
                </thead>
                        
                <tbody>

                  {printCoursesOfFirstHalf(fourthYear, '4')}

                </tbody>
              </table>
            </div>
          </div>
          :
          null
          }
          

				</div>
			</>
		);
	} else {
		return <div className="placeholder">Хөтөлбөрийн санал болгох төлөвлөгөө олдсонгүй</div>;
	}
};
    
export default RecommendedCurriculum;