import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './majors.css';
import axios from 'axios';
import getApiUrl from '../../../../api/get_Api_Url';
import getUserDetailsFromLocalStorage from '../../../utils/userDetailsTeacher_util';
import AuthUser from '../../../models/auth_user';
import TeacherUser from '../../../models/teacher_user';
import MajorClass from '../../../models/major';
import TeachersMajorPlanning from '../../../models/teacher_major_planning';
import Courses from '../../../models/courses';
import moment from 'moment';
import { object } from 'prop-types';

const Majors = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(getUserDetailsFromLocalStorage());
  const hasFetched = useRef(false);
  const [isMajorAddSuccess, setIsMajorAddSuccess] = useState(false);
  const [isMajorRemoveSuccess, setIsMajorRemoveSuccess] = useState(false);
  const [addedMajor, setAddedMajor] = useState(null);
  const [removedMajor, setRemovedMajor] = useState(null);
  const [removeException, setRemoveException] = useState(null);
  const [departmentsMajors, setDepartmentsMajors] = useState(null);
  const [teachersMajors, setTeachersMajors] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [maxRows, setMaxRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const reloadPage = () => {
    window.location.reload()
  };

  useEffect(() => {

    const fetchTeachersMajors = async () => {
      
      if(hasFetched.current) return;
      hasFetched.current = true;
      
      try {
        const response = await axios.post(getApiUrl('/Get/Teachers/Majors/'), 
          { 
            teacher: userDetails.teacher,
            department: userDetails.department,
            departmentOfEducation: userDetails.departmentOfEducation,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
          });

          if (response.status === 200) {
            setDepartmentsMajors(Array.from(response.data.departmentsMajors).map((major) => MajorClass.fromJsonMajor(major)));
            setTeachersMajors(Array.from(response.data.teachersMajors).map((major) => TeachersMajorPlanning.fromJsonPlanning(major)));
            setResponseCode(200);
          } else {
            setResponseCode(400);
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
    fetchTeachersMajors();
	}, []);


  const handleAddingMajors = async (major) => {
    try {
      const response = await axios.post(getApiUrl('/Add/Major/To/Teacher/'), 
        { 
          user: userDetails.user,
          teacher: userDetails.teacher,
          major: major,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        });

        if (response.status === 200) {
          console.log(response.data.courseAdded);
          setUserDetails(prevDetails => {
            let updateDetails = prevDetails;
            Array.from(updateDetails.teachersMajorPlanning).concat(major);
            return updateDetails;
          });
          setResponseCode(200);
          setIsMajorAddSuccess(true);
          setAddedMajor(major);
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
  };

  useEffect(() => {

  }, [isMajorAddSuccess]);

  const handleRemovingMajors = async (major) => {
    try {
      const response = await axios.post(getApiUrl('/Remove/Major/To/Teacher/'), 
        { 
          user: userDetails.user,
          teacher: userDetails.teacher,
          major: major,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        });

        if (response.status === 200) {
          setRemovedMajor(major);
          setIsMajorRemoveSuccess(true);
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
  };

  const closeMessage = () => {
    setIsMajorAddSuccess(false);
    setIsMajorRemoveSuccess(false);
    reloadPage();
  }

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

  if (!userDetails) {
    return <div className="no-data">Хэрэглэгч олдсонгүй.</div>;
  }

  const { student, major, department } = userDetails;
  
  if ( responseCode === 200 ) {
		return (
			<>

        { isMajorAddSuccess === true ?
        
          (
          <div onClick={() => {closeMessage()}}
               className={`course-add-overlay ${isMajorAddSuccess === true ? 'visible' : ''}`}
          >
            <div className="add-modal">
              <div className="success-message">
                <p><strong>{addedMajor.majorName}</strong> хөтөлбөрийг амжилттай оноолоо!</p>
              </div>
            </div>
          </div>
          ) : null

        }

        { isMajorRemoveSuccess === true ?
        
          (
          <div onClick={() => {closeMessage()}}
               className={`course-add-overlay ${isMajorRemoveSuccess === true ? 'visible' : ''}`}
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
              </div>
              
              <table>
                <thead>
                    <tr className="table-header">
                      <th>№</th>
                      <th>Хөтөлбөрүүд</th>
                      <th>Төрөл</th>
                      <th>Эрдмийн зэрэг</th>
                      <th>Нийт жил</th>
                      <th>Жилийн кредит</th>
                      <th></th>
                    </tr>
                    
                    {Array.from(departmentsMajors).map((majors, index) => {
                      return (
                        <tr className="table-row" key={majors.id || Math.random()}> 
                            <th>{index + 1}</th> 
                            <th>{majors.majorName}</th>
                            <th>{majors.majorsType}</th>
                            <th>{majors.academicDegree}</th>
                            <th>{majors.totalYears}</th>
                            <th>{majors.totalCreditsPerYear}</th>
                            <th className='min-width'
                                onClick={() => {handleAddingMajors(majors)}}>
                                {userDetails.teacher.isMajorPlanningClosed === false 
                                  && Array.from(teachersMajors).filter((addedMajor) => addedMajor.majorId === majors.majorId).length === 0
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
                    })}
                    
                </thead>
              </table>
            </div>

            
            <div className="curriculum-table">
              <table>
                <thead>
                    <tr className="table-header">
                      <th>№</th>
                      <th>Оноогдсон хөтөлбөрүүд</th>
                      <th>Төрөл</th>
                      <th>Эрдмийн зэрэг</th>
                      <th>Нийт жил</th>
                      <th>Жилийн кредит</th>
                      <th></th>
                    </tr>
                    
                    {Array.from(teachersMajors).map((majors, index) => {
                      return (
                        <tr className="table-row" key={majors.id || Math.random()}> 
                            <th>{index + 1}</th> 
                            <th>{majors.majorName}</th>
                            <th>{Array.from(departmentsMajors).filter((major) => major.majorId === majors.majorId)[0].majorsType}</th>
                            <th>{majors.academicDegreeOfMajor}</th>
                            <th>{Array.from(departmentsMajors).filter((major) => major.majorId === majors.majorId)[0].totalYears}</th>
                            <th>{Array.from(departmentsMajors).filter((major) => major.majorId === majors.majorId)[0].totalCreditsPerYear}</th>
                            <th onClick={() => {handleRemovingMajors(majors)}}>
                                {userDetails.teacher.isMajorPlanningClosed === false
                                    ?
                                    <img className="minus-icon"
                                        src="/src/assets/minus.png"
                                    />
                                    :
                                    null
                                }
                            </th>
                        </tr>
                      );
                    })}
                    
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
}

export default Majors;