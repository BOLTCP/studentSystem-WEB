import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/university/personal_curriculum.css';
import DeletePrompt from '../../utils/deletePrompt';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';
import UserDetails from '../../models/user_details';


const PersonalCurriculum = ({ user }) => {
  const location = useLocation();
  const userDetails = new UserDetails(user);
  const [isCurriculumClosed, setIsCurriculumClosed] = useState(userDetails.student.isCurriculumClosed);
  const hasFetched = useRef(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deleteCourse, setDeleteCourse] = useState(null);
  const [yearSpecification, setYearSpecification] = useState(null);
  const [studentsCurriculum, setStudentsCurriculum] = useState(null);
  const [majorYears, setMajorYears] = useState(parseInt(userDetails.major.totalYears));
  const [firstYear, setFirstYear] = useState();
  const [secondYear, setSecondYear] = useState(null);
  const [thirdYear, setThirdYear] = useState(null);
  const [fourthYear, setFourthYear] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [maxRows, setMaxRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchPersonalCurriculum = async () => {
      
      if(hasFetched.current) return;
      hasFetched.current = false;

      if( !userDetails.major ) {
        setError('Мэдээлэл олдсонгүй!');
				setLoading(false);
			} else {
				try {
					const response = await axios.post(getApiUrl('/Get/Students/Personal/Curriculum'), 
						{ 
              majorId: userDetails.major.majorId,
              recommendedCurriculum: userDetails.major.recommendedCurriculum,
              studentId: userDetails.student.studentId,
              studentCode: userDetails.student.studentCode
            },
						{
							headers: { 'Content-Type': 'application/json' },
							timeout: 30000,
						});

            if (response.status === 200) {
              setHas
              setFirstYear(response.data.first);
              setSecondYear(response.data.second);
              setThirdYear(response.data.third);
              setFourthYear(response.data.fourth);
              setResponseCode(200);
              
            } else if (response.status === 201) {
              setFirstYear(response.data.first);
              setSecondYear(response.data.second);
              setThirdYear(response.data.third);
              setFourthYear(response.data.fourth);
              setResponseCode(201);

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

    fetchPersonalCurriculum();
	}, []);


  const showAttribution = (attributionComment, attrLink) => {
    const el = document.getElementById("hover-attribution");
    if (el) {
      el.textContent = attributionComment + attrLink;
      el.classList.remove("hidden");
      el.classList.add("visible");
    }
  }
  
  const hideAttribution = () => {
    const el = document.getElementById("hover-attribution");
    if (el) {
      el.classList.remove("visible");
      el.classList.add("hidden");
    }
  }

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
          <td onClick={() => {setShowDeletePrompt(true), setDeleteCourse(course), setYearSpecification(yearSpecification)}}
                                          onMouseEnter={() => showAttribution(
                                          "Minimize icons created by kendis lasman - Flaticon",
                                          " https://www.flaticon.com/free-icon/minus_4096251?term=subtract&page=1&position=8&origin=search&related_id=4096251"
                                          )} 
                                          onMouseLeave={() => hideAttribution()}
                                          //Icon source from 
                                          //https://www.flaticon.com/free-icon/minus_4096251?term=subtract&page=1&position=8&origin=search&related_id=4096251
                                          title="Minimize icons created by kendis lasman - Flaticon"
            >
              {isCurriculumClosed === false 
                                      ?
                                      /*
                                       
                                      <img
                                          onClick={() => navigate('/login_screen', { state: { user: userDetails.user } })}
                                          onMouseEnter={() => showAttribution(
                                          "Plus icons created by srip - Flaticon",
                                          " https://www.flaticon.com/free-icon/add_1237946?term=add&page=1&position=2&origin=search&related_id=1237946"
                                          )} 
                                          onMouseLeave={() => hideAttribution()}
                                          src="/src/assets/add.png"
                                          //Icon source from 
                                          //https://www.flaticon.com/free-icon/add_1237946?term=add&page=1&position=2&origin=search&related_id=1237946
                                          title="Plus icons created by srip - Flaticon"
                                          alt="UserIcon"
                                          className="add-icon"
                                      />
                                      <a href="https://www.flaticon.com/free-icons/minimize" title="minimize icons">Minimize icons created by kendis lasman - Flaticon</a>
                                    
                                      */
                                      <img className="minus-icon"
                                          src="/src/assets/minus.png"
                                      />
                                      :
                                      null
                                      }
          </td>
        </tr>
      ))}

      <tr>
        <td className="spacer"></td>
      </tr>

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
        <th>
        {getTotalCreditsLastHalf(firstYear)}
        </th>
        <th></th>
      </tr>

    {courseOfCurriculum
    .slice(Math.floor(courseOfCurriculum.length / 2), courseOfCurriculum.length)
    .map((course, index) => (
        <tr key={index} className="table-row">
          <td>{index + 1}</td>
          <td>{course.course_name}</td>
          <td>{course.course_code}</td>
          <td>{course.total_credits}</td>
          <td onClick={() => {setShowDeletePrompt(true), setDeleteCourse(course), setYearSpecification(yearSpecification)}}
                                          onMouseEnter={() => showAttribution(
                                          "Minimize icons created by kendis lasman - Flaticon",
                                          " https://www.flaticon.com/free-icon/minus_4096251?term=subtract&page=1&position=8&origin=search&related_id=4096251"
                                          )} 
                                          onMouseLeave={() => hideAttribution()}
                                          //Icon source from 
                                          //https://www.flaticon.com/free-icon/minus_4096251?term=subtract&page=1&position=8&origin=search&related_id=4096251
                                          title="Minimize icons created by kendis lasman - Flaticon"
            >
              {isCurriculumClosed === false 
                                      ?
                                      <img className="minus-icon"
                                      src="/src/assets/minus.png"
                                      />
                                      :
                                      null
                                      }
          </td>
        </tr>
      ))}

    </>
    );

  };

  if (!userDetails) {
    return <div className="no-data">Хэрэглэгч олдсонгүй.</div>;
  }

  const { student, major, department } = userDetails;
  
  if ( responseCode === 200 || responseCode === 201) {
		return (
			<>

        {showDeletePrompt === true 
          && deleteCourse !== null 
          && <DeletePrompt visibility = {showDeletePrompt} 
                           course = {deleteCourse} 
                           studentId = {userDetails.student.studentId}
                           yearSpecification = {yearSpecification} />}

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
                  Хөтөлбөр: {userDetails.major.majorName}
                </div>
                <div className="personal-curriculum-overheader">
                  Зэрэг: {userDetails.major.academicDegree}
                </div>
                <div className="personal-curriculum-overheader">
                  Хэлбэр: {userDetails.major.majorsType === 'afternoon'
                                                            ? 'Өдөр'
                                                            : 'Орой'}
                </div>
                <div className="personal-curriculum-overheader">
                  Оюутны код: {userDetails.student.studentCode.toUpperCase()}
                </div>
                <div className="personal-curriculum-overheader">
                  Овог нэр: {`${userDetails.user.fname} ${userDetails.user.lname}`}
                </div>
                <div className="personal-curriculum-overheader">
                  Регистрийн дугаар: {userDetails.user.registryNumber}
                </div>
              </div>
              
              <table>
                <thead>
                    <tr className="table-header">
                      <th>№</th>
                      <th>Хичээлийн нэр</th>
                      <th>Код</th>
                      <th>Кредит</th>
                      <th></th>
                    </tr>
                    
                    <tr className="sub-header-row">
                      <th colSpan="3">
                        1-р курс, Намар
                      </th>
                      <th>
                      {getTotalCreditsFirstHalf(firstYear)}
                      </th>
                      <th></th>
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
                        <th></th>
                      </tr>
                      
                      <tr className="sub-header-row">
                        <th colSpan="3">
                          2-р курс, Намар
                        </th>
                        <th>
                        {getTotalCreditsFirstHalf(secondYear)}
                        </th>
                        <th></th>
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
                      <th></th>
                    </tr>
                    
                    <tr className="sub-header-row">
                      <th colSpan="3">
                        3-р курс, Намар
                      </th>
                      <th>
                      {getTotalCreditsFirstHalf(thirdYear)}
                      </th>
                      <th></th>
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
                      <th></th>
                    </tr>
                    
                    <tr className="sub-header-row">
                      <th colSpan="3">
                        4-р курс, Намар
                      </th>
                      <th>
                      {getTotalCreditsFirstHalf(fourthYear)}
                      </th>
                      <th></th>
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
}

export default PersonalCurriculum;