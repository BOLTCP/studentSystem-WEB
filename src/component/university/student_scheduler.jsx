import React, { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StudentCurriculum from '../../models/student_curriculum';
import StudentUser from '../../models/student_user';
import UserDetails from '../../models/user_details';
import Courses from '../../models/courses';
import TeachersSchedule from '../../models/teachersschedule';
import getUserDetailsFromLocalStorage from '../../utils/userDetails_util';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';
import '../../styles/university/student_scheduler.css';

const days = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан'];
const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ItemTypes = {
  ELEMENT: 'element',
};

const DraggableElements = ({ element, id, interactiveSelection, courseBeingDragged, shouldPopulate }) => {
  console.log(id);
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


  return (
    isDoubleClickActive === true 
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
    <div
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleMouseUp} 
      ref={drag}
      className={`timetable-draggable-element ${isDragging ? 'isDragging' : ''}`}
    >
      {element.courseName} {element.courseCode} 
    </div>
  );
};


const makeACoursePopUp = (id) => {
  return {
    backgroundColor: 'green',
    border: '2px solid grey', 
    borderRadius: '12px',         
    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.15)', 
    transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
    transform: 'scale(1.1)',      
    boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.25)'
  };
  return {};
};

const getCellStyle = (cellKey, teachersScheduleCells, courseBeingDragged) => {
  let popUpStyle = {}; 
  if (courseBeingDragged?.courseId && teachersScheduleCells.has(courseBeingDragged.courseId)) {
    const validDropPositions = teachersScheduleCells.get(courseBeingDragged.courseId);
    if (Array.isArray(validDropPositions) && validDropPositions.includes(cellKey)) {
      popUpStyle = {
        backgroundColor: 'green',
        color: 'white',
        fontSize: '14px',
        overflow: 'auto',     
      };
    }
  }
  return popUpStyle; 
};

const Cell = ({ row, col, onDrop, element, teachersScheduleCells, teachersSchedule, isDragging, interactiveSelection, courseBeingDragged, shouldPopulate, shouldPopulateWholeData }) => {
  const availableSchedules = (Array.from(teachersSchedule)).filter((schedule) => schedule.courseId === courseBeingDragged?.courseId && schedule.scheduleType === 'Laboratory' ? schedule : '');
  
  const position = row * 7 + col;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ELEMENT,
    drop: (item) => {
      onDrop(position, item.element, isDragging);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }), [position]);

  const cellStyle = isDragging === true ? getCellStyle(position, teachersScheduleCells, courseBeingDragged) : {};

  if (availableSchedules.length > 1) {
    return (
      <td
        ref={drop}
        className={`placed-course ${isOver ? 'isOver' : ''}`}
        style={cellStyle}
      >
        {isDragging === true && Object.keys(cellStyle).length > 0 ? (
          `
          ${shouldPopulate[0].courseId === courseBeingDragged.courseId ? `${shouldPopulate[0].teacherName}, ${shouldPopulate[0].courseName} ${shouldPopulate[0].classroomNumber}, ${shouldPopulate[0].teachersEmail}`: ''}
          `
        ) : (
          element && <DraggableElements id={position} element={element} interactiveSelection={interactiveSelection} courseBeingDragged={courseBeingDragged} shouldPopulate={shouldPopulateWholeData} />
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
          `
          ${shouldPopulate[0].courseId === courseBeingDragged.courseId ? `${shouldPopulate[0].teacherName}, ${shouldPopulate[0].classroomNumber}, ${shouldPopulate[0].teachersEmail}`: ''}
          `
        ) : (
          element && <DraggableElements id={position} element={element} interactiveSelection={interactiveSelection} courseBeingDragged={courseBeingDragged} shouldPopulate={shouldPopulateWholeData} />
        )}
      </td>
    );
  }
};


const Timetable = ({ user }) => {
  
  const userDetails = new UserDetails(user);
  const studentsCurriculum = StudentCurriculum.fromJsonButInAppInstance(JSON.parse(localStorage.getItem('studentCurriculumModel')));
  const [studentsCourses, setStudentsCourses] = useState([]); 
  const [teachersSchedule, setTeachersSchedule] = useState([]);
  const [teachersScheduleCells, setTeachersScheduleCells] = useState(new Map());
  const [elementsMap, setElementsMap] = useState(new Map());
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  const fetchPersonalCurriculum = async () => {
    const userDetails = getUserDetailsFromLocalStorage();
    const studentsCurriculum = StudentCurriculum.fromJsonButInAppInstance(JSON.parse(localStorage.getItem('studentCurriculumModel')));
    let studentsCourses = null;
    let teachersAvailableCourses = null;

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
          console.log(response.data.teachersAvailableCourses);
          studentsCourses = (response.data.studentsCourses)
            .map((course) => Courses.fromJsonCourse(course));
          teachersAvailableCourses = Array.from((response.data.teachersAvailableCourses)
            .map((teach_schedule) => TeachersSchedule.fromJsonTeachersSchedule(teach_schedule)));
          setStudentsCourses(studentsCourses);
          setTeachersSchedule(teachersAvailableCourses);
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
  for (let i = 0; i < teachersSchedule.length; i++) {
    const courseId = teachersSchedule[i].courseId && teachersSchedule[i].scheduleType === 'Laboratory' ? teachersSchedule[i].courseId : '';
    const position = teachersSchedule[i].schedulesTimetablePosition && teachersSchedule[i].scheduleType === 'Laboratory' ? teachersSchedule[i].schedulesTimetablePosition : '';

    if (timeTablePositions.has(courseId)) {
      timeTablePositions.get(courseId).push(position);
    } else {
      timeTablePositions.set(courseId, [position]);
    }

  }
  setTeachersScheduleCells(timeTablePositions);
}, [teachersSchedule]);

  const [isDragging, setIsDragging] = useState(null);
  const [courseBeingDragged, setCourseBeingDragged] = useState(null);

  const handleDrop = (position, element, isDragging) => {

    setElementsMap(prevMap => {
      const newMap = new Map(prevMap);
      const isCourseAlreadyPlaced = Array.from(newMap.values()).some(
        placedElement => (placedElement.courseId || placedElement.id) === (element.courseId || element.id)
      );

      if (!isCourseAlreadyPlaced) {
        newMap.set(position, element);
      } else  {
        let keyToRemove = null;
        for (const [key, value] of newMap.entries()) {
          if (value === element) {
            keyToRemove = key;
            break; 
          }
        }

        if (keyToRemove !== null) {
          newMap.delete(keyToRemove);
          newMap.set(position, element);
        } 
      }
      return newMap;
    });
    setIsDragging(false);
    
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
      <div className='student-schedule-container'>
        <div className='student-schedule-container-window'>
            <div className='student-schedule-timetable-container'>
            <table className='student-schedule-timetable'>
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
                          teachersSchedule={teachersSchedule}
                          isDragging={isDragging}
                          elementsMap={elementsMap}
                          interactiveSelection={interactiveSelection}
                          courseBeingDragged={courseBeingDragged}
                          shouldPopulate={teachersSchedule.filter((schedule) => schedule.schedulesTimetablePosition === position)}
                          shouldPopulateWholeData={teachersSchedule}
                        />
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='draggable-container'>
              <h4>{userDetails.student?.studentCode} сонгосон хичээлүүд:</h4>
              {Array.isArray(studentsCourses) ? (
                studentsCourses.map((item, index) => (
                  <DraggableElements key={item.courseId || item.id} id={item.courseId || item.id} element={item} interactiveSelection={interactiveSelection} courseBeingDragged={courseBeingDragged} shouldPopulate={teachersSchedule}/>
                ))
              ) : (
                <div></div>
              )}
            </div>
      </div>
    </DndProvider> 
  );
};

export default Timetable;
