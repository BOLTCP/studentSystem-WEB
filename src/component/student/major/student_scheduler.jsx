import React, { useState, useEffect, useRef, act } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StudentCurriculum from '../../../models/student_curriculum';
import StudentUser from '../../../models/student_user';
import UserDetails from '../../../models/user_details';
import Courses from '../../../models/courses';
import TeachersSchedule from '../../../models/teachersschedule';
import StudentsSchedule from '../../../models/student_schedule';
import getUserDetailsFromLocalStorage from '../../../utils/userDetails_util';
import axios from 'axios';
import getApiUrl from '../../../../api/get_Api_Url';
import './student_scheduler.css';

const days = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан'];
const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ItemTypes = {
  ELEMENT: 'element',
};

const DraggableElements = ({ element, id, interactiveSelection, courseBeingDragged, 
  shouldPopulate, position, studentsSchedule }) => {

  const studentHasSchedule = Array.from(studentsSchedule)
    .some(schedule => schedule.teachersScheduleId === element.teachersScheduleId);

  const showSchedulesData = Array.from(shouldPopulate)
    .filter((schedule) => schedule?.schedulesTimetablePosition === position)[0];

  const isLecture = element.scheduleType;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ELEMENT,
    item: { id, element },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }), [element, id]); 

  useEffect(() => {
    if (interactiveSelection) {
      interactiveSelection(element, isDragging, courseBeingDragged);
    }
  }, [isDragging, element, id]); 

  const [isDoubleClickActive, setIsDoubleClickActive] = useState(false);
  const logInterval = useRef(null);

  const handleDoubleClick = () => {
    setIsDoubleClickActive(true);
    interactiveSelection(element, true, courseBeingDragged);
  };

  const handleMouseUp = () => {
    setIsDoubleClickActive(false);
    interactiveSelection(element, false, courseBeingDragged);
  };

  useEffect(() => {
    if (isDoubleClickActive) {
      logInterval.current = setInterval(() => {
      }, 100);

      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        clearInterval(logInterval.current);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    } else {
      clearInterval(logInterval.current);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDoubleClickActive, element.courseName]); 

  const lockSchedule = (studentHasSchedule) => {
    if (studentHasSchedule === true) {
      return {
        'pointerEvents': 'none', 
      };
    }
  }

  return (
    isDoubleClickActive === true && (isLecture === 'Laboratory' || isLecture === 'Лаборатори')
    ?
    <div
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleMouseUp} 
      ref={drag}
      className={`timetable-draggable-element ${isDragging ? 'isDragging' : ''}`}
      style={makeACoursePopUp(id)}
    >
      {element.courseName} {element.courseYear} {element.courseCode}
    </div>
    :
    isDoubleClickActive === true && (isLecture === 'Lecture' || isLecture === 'Лекц')
    ?
    <div
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleMouseUp} 
      ref={drag}
      className={`timetable-draggable-element-yellow ${isDragging ? 'isDragging' : ''}`}
      style={makeACoursePopUpLecture(id)}
    >
      {element.courseName} {element.courseCode} Лекц {showSchedulesData && `, ${showSchedulesData.classroomNumber}`} 
      {showSchedulesData && `, ${showSchedulesData.teacherName}`}{showSchedulesData && `, ${showSchedulesData.teachersEmail}`} 
    </div>
    :
    isLecture === 'Lecture' || isLecture === 'Лекц'
    ?
    <div
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleMouseUp} 
      ref={drag}
      style={lockSchedule(studentHasSchedule)}
      className={`timetable-draggable-element-yellow ${isDragging ? 'isDragging' : ''}`}
    >
      <>
        <div>{element.courseName}</div>
        <div>{element.courseCode}</div>
        <div style={{ fontSize: '20px' }}
            >{showSchedulesData === undefined 
              && Array.from(studentsSchedule)
                  .some((schedule) => schedule.teachersScheduleId === element.teachersScheduleId)
                  ?
                  'Хуваарь сонгосон'
                  : 
                  null
             }</div>
        <div>{showSchedulesData && showSchedulesData.teacherName}</div> 
        <div>{showSchedulesData && showSchedulesData.teachersEmail}</div>
      </>
     
    </div>
    :
    isLecture === 'Laboratory' || isLecture === 'Лаборатори'
    ?
    <div
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleMouseUp} 
      ref={drag}
      style={lockSchedule(studentHasSchedule)}
      className={`timetable-draggable-element ${isDragging ? 'isDragging' : ''}`}
    >
      <>
        <div>{element.courseName}</div>
        <div>{element.courseCode}</div>
        <div style={{ fontSize: '20px' }}
            >{showSchedulesData === undefined 
              && Array.from(studentsSchedule)
                  .some((schedule) => schedule.teachersScheduleId === element.teachersScheduleId)
                  ?
                  'Хуваарь сонгосон'
                  : 
                  null
             }</div>
        <div>{showSchedulesData && showSchedulesData.classroomNumber}</div>
        <div>{showSchedulesData && showSchedulesData.teacherName}</div> 
        <div>{showSchedulesData && showSchedulesData.teachersEmail}</div>
        <div>{showSchedulesData && showSchedulesData.classroomCapacity !== null ? `Дүүргэлт: ${showSchedulesData.students}/${showSchedulesData.classroomCapacity}` : null}</div> 
      </>
    </div>
    : null
  );
};


const makeACoursePopUp = (id) => {
  return {
    backgroundColor: 'green',
    border: '2px solid black', 
    borderRadius: '12px',         
    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.15)', 
    transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
    transform: 'scale(1.1)',      
    boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.25)'
  };
  return {};
};

const makeACoursePopUpLecture = (id) => {
  return {
    backgroundColor: '#FFD54F',
    border: '2px solid black', 
    borderRadius: '12px',         
    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.15)', 
    transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
    transform: 'scale(1.1)',      
    boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.25)'
  };
  return {};
};

const getCellStyle = (cellKey, teachersScheduleCellsORLecture, courseBeingDragged) => {
  let popUpStyle = {}; 
  if (courseBeingDragged?.courseId && parseInt(Array.from(teachersScheduleCellsORLecture)[0][1]) === parseInt(courseBeingDragged.schedulesTimetablePosition)) {
    const validDropPositions = Array.from(teachersScheduleCellsORLecture).filter((schedule) => schedule[0] === courseBeingDragged?.courseId)[0][1];
    if (Array.isArray(validDropPositions) && validDropPositions.includes(cellKey)) {
      if (courseBeingDragged.students === courseBeingDragged.classroomCapacity) {
        popUpStyle = {
          backgroundColor: 'grey',
          border: '1px solid grey',
          color: 'white',
          fontSize: '14px',
          overflow: 'auto',     
        };
      } else {
        popUpStyle = {
          backgroundColor: `${courseBeingDragged.scheduleType === 'Лаборатори' ? 'green' : 'yellow'}`,
          border: '1px solid green',
          color: `${courseBeingDragged.scheduleType === 'Лаборатори' ? 'white' : 'black'}`,
          fontSize: '14px',
          overflow: 'auto',     
        };
      }
    }
  }
  return popUpStyle; 
};

const Cell = ({ row, col, onDrop, element, teachersScheduleCells, teachersScheduleCellsLecture, 
  teachersSchedule, isDragging, interactiveSelection, courseBeingDragged, shouldPopulate, 
  shouldPopulateWholeData, studentsSchedule}) => {

  const availableSchedules = courseBeingDragged?.scheduleType === 'Лаборатори' ? 
    (Array.from(teachersSchedule)).filter((schedule) => schedule !== null && schedule.courseId === courseBeingDragged?.courseId && schedule.scheduleType === 'Лаборатори' ? schedule : '')
    :
    (Array.from(teachersSchedule)).filter((schedule) => schedule !== null && schedule.courseId === courseBeingDragged?.courseId && schedule.scheduleType === 'Лекц' ? schedule : '');
  
  const availablePosition = courseBeingDragged?.scheduleType === 'Лаборатори' ? 
    Array.from(teachersScheduleCells).filter((schedule) => parseInt(schedule[1]) === availableSchedules[0]?.schedulesTimetablePosition)
    :
    Array.from(teachersScheduleCellsLecture).filter((schedule) => parseInt(schedule[1]) === availableSchedules[0]?.schedulesTimetablePosition);

  const position = row * 7 + col;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ELEMENT,
    drop: (item) => {
      onDrop(position, item.element, isDragging, teachersSchedule);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }), [position, teachersSchedule]);

  const cellStyle = isDragging === true ? getCellStyle(position, availablePosition, courseBeingDragged) : null;

  if (availableSchedules.length > 1) {
    return (
      <td
        ref={drop}
        className={`placed-course ${isOver ? 'isOver' : ''}`}
        style={cellStyle}
      >
        {isDragging === true && Object.keys(cellStyle).length > 0 ? (
          `
          ${shouldPopulate[0].courseId === courseBeingDragged.courseId ? `${shouldPopulate[0].teacherName}, 
          ${shouldPopulate[0].courseName} ${shouldPopulate[0].classroomNumber}, ${shouldPopulate[0].teachersEmail},
          ${shouldPopulate[0].students}/${shouldPopulate[0].classroomCapacity}`: ''}
          `
        ) : (
          element && <DraggableElements id={position} element={element} interactiveSelection={interactiveSelection} 
            courseBeingDragged={courseBeingDragged} shouldPopulate={shouldPopulateWholeData} position={position}
            studentsSchedule={studentsSchedule} />
        )}
      </td>
    );
  } else {
    return (
      <td
        ref={drop}
        className={`placed-course ${isOver ? 'isOver' : ''}`}
        style={cellStyle}
      >
        {isDragging === true && Object.keys(cellStyle).length > 0 ? (
          shouldPopulate[0].courseId === courseBeingDragged.courseId ? (
            <>
              <div>{shouldPopulate[0].teacherName}</div>
              <div>{shouldPopulate[0].courseName}</div>
              <div>{courseBeingDragged.scheduleType}</div>
              <div>{shouldPopulate[0].teachersEmail}</div> 
              <div>{shouldPopulate[0].classroomCapacity !== null && shouldPopulate[0].classroomCapacity > shouldPopulate[0].students
                ? 
                `Дүүргэлт: ${shouldPopulate[0].students}/${shouldPopulate[0].classroomCapacity}` 
                : shouldPopulate[0].classroomCapacity !== null && shouldPopulate[0].classroomCapacity === shouldPopulate[0].students
                ?
                `Хуваарь дүүрсэн: ${shouldPopulate[0].students}/${shouldPopulate[0].classroomCapacity}`
                :'Лекц'
                   }
              </div> 
            </>
          ) 
          :
          (
            null
          )
        ) : (
          element && <DraggableElements id={position} element={element} interactiveSelection={interactiveSelection} 
            courseBeingDragged={courseBeingDragged} shouldPopulate={shouldPopulateWholeData} position={position}
            studentsSchedule={studentsSchedule} />
        )}
      </td>
    );
  }
};


const Timetable = ({ user }) => {
  
  const [userDetails, setUserDetails] = useState(getUserDetailsFromLocalStorage());
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deleteSchedule, setDeleteSchedule] = useState(null);
  const [teachersSchedule, setTeachersSchedule] = useState([]);
  const [teachersScheduleCells, setTeachersScheduleCells] = useState(new Map());
  const [teachersScheduleCellsLecture, setTeachersScheduleCellsLecture] = useState(new Map());
  const [alreadyHasSchedules, setAlreadyHasSchedules] = useState(false);
  const [elementsMap, setElementsMap] = useState(new Map());
  const [handleReject, setHandleReject] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [removeSuccessful, setRemoveSuccessful] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStudentsSchedule = async () => {
      try {

        const response = await axios.post(getApiUrl('/Get/Students/Made/Schedule/'),
        {
          student: StudentUser.fromJsonButInApp(userDetails.student),
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        });

        if (response.status === 200) {
          console.log('Оюутны хичээлийн хуваарийг амжилттай татлаа.');
          const tempScheduleArray = Array.from(response.data.studentsSchedule);
          if (tempScheduleArray.length > 0) {
            for ( let i = 0; i < tempScheduleArray.length; i++) {
              setElementsMap(prevMap => {
                const newMap = new Map(prevMap);
                const schedulesTimetablePosition = tempScheduleArray[i][0];
                const scheduleOfThePosition = StudentsSchedule.fromJsonStudentsSchedule(tempScheduleArray[i][1]);
                
                newMap.set(schedulesTimetablePosition, scheduleOfThePosition);
                return newMap;
              });
            }
          }

          setAlreadyHasSchedules(true);
        } 
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    
    fetchStudentsSchedule();
  }, []);

  const fetchPersonalCurriculum = async () => {
    const userDetails = getUserDetailsFromLocalStorage();
    const studentsCurriculum = StudentCurriculum.fromJsonButInAppInstance(JSON.parse(localStorage.getItem('studentCurriculumModel')));
    let studentsCourses = null;
    try {
      const response = await axios.post(getApiUrl('/Add/Course/To/Students/Schedule/'), 
        { 
          studentsCurriculum: StudentCurriculum.fromJsonButInAppInstance(studentsCurriculum),
          student: StudentUser.fromJsonButInApp(userDetails.student),
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        }); 

        if (response.status === 200) {
          console.log(response.data);
          studentsCourses = (response.data.studentsCourses)
            .map((course) => Courses.fromJsonCourse(course));
          setTeachersSchedule(Array.from(response.data.teachersAvailableCourses).length > 0 
            ?
            Array.from(response.data.teachersAvailableCourses)
              .map((schedule) => schedule === null ? null : TeachersSchedule.fromJsonTeachersSchedule(schedule))
            : null);
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
  };

  useEffect(() => {
    fetchPersonalCurriculum();
  }, []);
  
  useEffect(() => {
    const timeTablePositions = new Map();
    const timeTablePositionsLecture = new Map();
    for (let i = 0; i < teachersSchedule.length; i++) {

      if (teachersSchedule[i] === null) {
        continue;
      }
      if (teachersSchedule[i].scheduleType === 'Лаборатори') {
        const courseLaboratory = teachersSchedule[i];
        if (timeTablePositions.has(courseLaboratory.courseId)) {
          timeTablePositions.get(courseLaboratory.courseId).push(courseLaboratory.schedulesTimetablePosition);
        } else {
          timeTablePositions.set(courseLaboratory.courseId, [courseLaboratory.schedulesTimetablePosition]);
        }
      } else {
        const courseLecture = teachersSchedule[i];
        if (timeTablePositionsLecture.has(courseLecture.courseId)) {
          timeTablePositionsLecture.get(courseLecture.courseId).push(courseLecture.schedulesTimetablePosition);
        } else {
          timeTablePositionsLecture.set(courseLecture.courseId, [courseLecture.schedulesTimetablePosition]);
        }
      }
      /*const courseLaboratory = teachersSchedule[i].scheduleType === 'Лаборатори' ? teachersSchedule[i] : '';

      const courseLecture = teachersSchedule[i].scheduleType === 'Лекц' ? teachersSchedule[i] : '';

      if (timeTablePositions.has(courseLaboratory.courseId)) {
        timeTablePositions.get(courseLaboratory.courseId).push(courseLaboratory.schedulesTimetablePosition);
      } else {
        timeTablePositions.set(courseLaboratory.courseId, [courseLaboratory.schedulesTimetablePosition]);
      }

      if (timeTablePositionsLecture.has(courseLecture.courseId)) {
        timeTablePositionsLecture.get(courseLecture.courseId).push(courseLecture.schedulesTimetablePosition);
      } else {
        timeTablePositionsLecture.set(courseLecture.courseId, [courseLecture.scheduleOfThePosition]);
      }*/
    }

    setTeachersScheduleCells(Array.from(timeTablePositions).filter((position) => position[0] !== ""));
    setTeachersScheduleCellsLecture(Array.from(timeTablePositionsLecture).filter((position) => position[0] !== ""));

  }, [teachersSchedule]);

  const [isDragging, setIsDragging] = useState(null);
  const [courseBeingDragged, setCourseBeingDragged] = useState(null);

  const handleRejectAction = () => {
    setHandleReject(true); 
    setTimeout(() => {
      setHandleReject(false);
    }, [1000]);
  };

  const handleDrop = (position, element, isDragging, teachersSchedule, handleReject) => {

    if (element.classroomCapacity === element.students) {
      handleRejectAction();
      return null;
    }
    /*
    console.log(Array.from(teachersSchedule)
      .filter((schedule) => schedule.scheduleType === element.scheduleType && schedule.courseId === element.courseId)
      .map((schedule) => schedule.schedulesTimetablePosition));
    */
    const isMultiplePositionsValid = Array.from(teachersSchedule)
      .filter((schedule) => schedule?.scheduleType === element.scheduleType && schedule.courseId === element.courseId)
      .map((schedule) => schedule.schedulesTimetablePosition);
    const isPositionValid = Array.from(teachersSchedule)
      .filter((schedule) => schedule?.schedulesTimetablePosition === position)[0]
      ?.teachersScheduleId === element.teachersScheduleId || 
      Array.from(teachersSchedule)
      .filter((schedule) => schedule.schedulesTimetablePosition === position)[0]
      ?.teachersScheduleId === element.teachersScheduleId
      ? 
      true 
      : 
      false;
    
    if (isPositionValid || isMultiplePositionsValid.includes(position)) {
      setElementsMap(prevMap => {
        const newMap = new Map(prevMap); 
        let existingPositionForKey = null;
        for (const [key, value] of newMap.entries()) {
          if (value.teachersScheduleId === element.teachersScheduleId) {
            existingPositionForKey = key;
            break;
          }
        }
        if (existingPositionForKey !== null && existingPositionForKey !== position) {
          newMap.delete(existingPositionForKey);
        }
        newMap.set(position, element);
        return newMap;
      });

      handleScheduleSave(element);
    } else {
      handleRejectAction();
    }
    setIsDragging(false);
  };

  const handleScheduleSave = async (scheduleOfStudent) => {

    try {
      const response = await axios.post(getApiUrl('/Create/Students/Schedule/For/Courses/'), 
        { 
          studentsPickedSchedule: scheduleOfStudent,
          student: StudentUser.fromJsonButInApp(userDetails.student),
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        }); 

        if (response.status === 200) {
          console.log(response.data.message);
          const createdSchedule = StudentsSchedule.fromJsonStudentsSchedule(response.data.createdSchedule);

          setUserDetails(prev => {
            const updatedDetails = { ...prev };
            if (updatedDetails.studentsSchedule !== undefined) {
              updatedDetails.studentsSchedule = Array.from(updatedDetails.studentsSchedule).concat({...createdSchedule});
            } else {
              const prevSchedules = Array.from(...prev.prevsSchedules).concat({...createdSchedule});
              updatedDetails.studentsSchedule = prevSchedules;
            }
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            return updatedDetails;
          });

          setSuccessful(true);
        } else {
          console.log('Error fetching curriculum:', response.message);
          setError('Failed to fetch curriculum.');
        }
    } catch (err) {
      console.error('Error fetching curriculum:', err);
      setError('Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const removeSchedule = async () => {
    try {
      const response = await axios.post(getApiUrl('/Remove/Schedule/From/Student/'), 
      { 
        scheduleToRemove: deleteSchedule,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000,
      }); 

      if (response.status === 200) {
        console.log('Амжилттай хаслаа.');
        setUserDetails(prev => {
          const updatedDetails = { ...prev };
          const updatedSchedules = Array.from(updatedDetails.studentsSchedule)
            .filter((schedule) => schedule.studentsScheduleId !== deleteSchedule.studentsScheduleId);
          updatedDetails.studentsSchedule = updatedSchedules;

          localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
          return updatedDetails;
        });

        setElementsMap(prevMap => {
          const newMap = new Map(prevMap); 
          newMap.delete(deleteSchedule.schedulesTimetablePosition);
          return newMap;
        });

        setShowDeletePrompt(false);
        setRemoveSuccessful(true);
      } 

    } catch (error) {
      console.log('Error has occured: ', error);
      setError('Network error occurred.');
    } finally {
      setLoading(false);
    }
    setShowDeletePrompt(false);
  };

  const interactiveSelection = (element, isDragging) => {
    if (isDragging){
      setIsDragging(true);
      setCourseBeingDragged(element);
    } else { 
      setIsDragging(false);
      setCourseBeingDragged(null);
    }
  }
  
  return (
    <DndProvider backend={HTML5Backend}>
      {successful && (
        <div onClick={() => {setSuccessful(false)}}
             className="hovering-overlay">
          <div className="hovering-content"
               style={{
                  border: '3px solid green',
                  cursor: 'pointer',
                }}
          >
            <h2>
                Хуваарийг амжилттай нэмлээ.
            </h2>
            <button onClick={() => {setSuccessful(false)}}>Хаах</button>
          </div>
        </div>
      )}
      {showDeletePrompt && (
        <div onClick={() => {setShowDeletePrompt(false)}}
             className="hovering-overlay">
          <div className="hovering-content"
               style={{
                  border: '9px solid yellow',
                  cursor: 'pointer',
                }}
          >
            <h2>
                <div>{deleteSchedule.courseName}</div>
                <div>
                  {StudentsSchedule.convertDays(deleteSchedule.days)}
                  &nbsp; {deleteSchedule.time}
                </div>
                <div>{deleteSchedule.teachersName}</div>
            </h2>
            <div className='button-group-schedule'>
              <button style={{ fontSize: '18px' }}
                      onClick={() => {setShowDeletePrompt(false)}}>Хаах</button>
              <button className='remove-button'
                      onClick={() => {removeSchedule()}}>Хасах</button>
            </div>
          </div>
        </div>
      )}
      {removeSuccessful && (
        <div onClick={() => {setRemoveSuccessful(false), setDeleteSchedule(null)}}
             className="hovering-overlay">
          <div className="hovering-content"
               style={{
                  border: '9px solid green',
                  cursor: 'pointer',
                }}
          >
            <h2>
                <div>{deleteSchedule.courseName}</div>
                <div>
                  {StudentsSchedule.convertDays(deleteSchedule.days)}
                  &nbsp; {deleteSchedule.time}
                </div>
                <div>{deleteSchedule.teachersName}</div>
                <div>Хуваарийг амжилттай хаслаа.</div>
            </h2>
              <button style={{ fontSize: '18px' }}
                onClick={() => {setRemoveSuccessful(false), setDeleteSchedule(null)}}>Хаах</button>
          </div>
        </div>
      )}
      <div className='student-schedule-container-viewport'>
        <div className='student-schedule-container'>
          <div className='column-5fr'>
              <div className='student-schedule-container-window'>
                <div className={`student-schedule-timetable-container ${handleReject === true ? 'handleReject' : ''} `}>
                <table className={`student-schedule-timetable ${elementsMap.size === teachersSchedule.length && alreadyHasSchedules === true ? 'locked': ''} `}>
                  <thead>
                    <tr>
                      <th style={{ width: 60, border: 'none', visibility: 'hidden' }}></th>
                      {days.map((day, index) => (
                        <th key={index} className='headers'>
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {hours.map((hour, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className='hours'>{hour}</td>
                        {days.map((_, colIndex) => {
                          const position = rowIndex * 7 + colIndex;
                          return (
                            <Cell
                              key={colIndex}
                              row={rowIndex}
                              col={colIndex}
                              onDrop={handleDrop}
                              element={elementsMap.get(position)}
                              teachersScheduleCells={teachersScheduleCells}
                              teachersScheduleCellsLecture={teachersScheduleCellsLecture}
                              teachersSchedule={teachersSchedule}
                              isDragging={isDragging}
                              elementsMap={elementsMap}
                              interactiveSelection={interactiveSelection}
                              courseBeingDragged={courseBeingDragged}
                              shouldPopulate={teachersSchedule.filter((schedule) => schedule === null ? null : schedule.schedulesTimetablePosition === position)}
                              shouldPopulateWholeData={teachersSchedule}
                              studentsSchedule={userDetails.studentsSchedule}
                            />
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='column-1fr'>
            <div className='draggable-container-super'>
              <div className={`draggable-container ${userDetails.student.isCurriculumClosed === true ? 'locked': ''}`} >
                    <div>
                      <h4 className="student-header-of-schedules">
                        <span>{userDetails.student?.studentCode} сонгосон хичээлүүд:</span>
                        <img
                          src={` ${ userDetails.student.isCurriculumClosed === true ? '/src/assets/schedulesLocked.png' : '/src/assets/schedulesOpen.png'} `}
                          alt="Lesson Selection Icon"
                          className="header-icon"
                        />
                      </h4>
                    </div>
                    {Array.isArray(teachersSchedule) ? (
                      teachersSchedule.map((item, index) => (
                        item !== null 
                        ?
                        (
                        <DraggableElements key={`${item.courseId || item.id}-${index}`} id={item.courseId || item.id} 
                          element={item} interactiveSelection={interactiveSelection} 
                          courseBeingDragged={courseBeingDragged} shouldPopulate={teachersSchedule}
                          studentsSchedule={userDetails.studentsSchedule} 
                        />
                        )
                        : 
                        (
                        null
                        )
                      ))
                    ) : (
                      <div></div>
                    )}
              </div>
            </div>
            <div className='draggable-container-super'>
              <div className={`draggable-container ${userDetails.student.isCurriculumClosed === true ? 'locked': ''}`} >
                    <div>
                      <h4 className="student-header-of-schedules">
                        <span>Хуваариас хасалт хийх:</span>
                        <img
                          src={` ${ userDetails.student.isCurriculumClosed === true ? '/src/assets/schedulesLocked.png' : '/src/assets/schedulesOpen.png'} `}
                          alt="Lesson Selection Icon"
                          className="header-icon"
                        />
                      </h4>
                    </div>
                    {Array.isArray(userDetails.studentsSchedule) ? (
                      userDetails.studentsSchedule.map((item, index) => (
                        <div className={`remove-elements ${item.scheduleType}`}
                             onClick={() => {{setShowDeletePrompt(true), setDeleteSchedule(item)}}}
                             key={item.studentsScheduleId}
                        >{item.courseName}</div>
                      ))
                    ) : (
                      <div></div>
                    )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider> 
  );
};

export default Timetable;
/*
<div className='has-selected-all-container'>
                      {elementsMap.size === teachersSchedule.length ? 'Хичээлийн хуваарийг хадгалах' : 'Хичээлүүдийн хуваарийг сонгоно уу!'}
                    </div>*/