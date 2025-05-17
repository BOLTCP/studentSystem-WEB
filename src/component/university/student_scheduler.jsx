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
import { list } from 'postcss';

const days = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'];
const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ItemTypes = {
  ELEMENT: 'element',
};

const DraggableElements = ({ element, id, interactiveSelection, courseBeingDragged }) => {
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

  return (
    <div
      ref={drag}
      className={`timetable-draggable-element ${isDragging ? 'isDragging' : ''}`}
    >
      {element.courseName}
    </div>
  );
};

const getCellStyle = (cellKey, teachersScheduleCells, courseBeingDragged) => {
  if (courseBeingDragged?.courseId && teachersScheduleCells.has(courseBeingDragged.courseId)) {
    const validDropPositions = teachersScheduleCells.get(courseBeingDragged.courseId);
    if (Array.isArray(validDropPositions) && validDropPositions.includes(cellKey)) {
      return {
        backgroundColor: 'green',
      };
    }
  }
  return {};
};

const Cell = ({ row, col, onDrop, element, teachersScheduleCells, isDragging, interactiveSelection, courseBeingDragged }) => {
  const position = row * 7 + col;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ELEMENT,
    drop: (item) => {
      onDrop(position, item.element);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }), [position]);

  return (
    isDragging === true ?
    <td
      ref={drop}
      className={`placed-course ${isOver} ? 'isOver' : ''`}
      style={getCellStyle(position, teachersScheduleCells, courseBeingDragged)}
    >
      {element && <DraggableElements id={position} element={element} interactiveSelection={interactiveSelection} courseBeingDragged={courseBeingDragged} />}
    </td>
    : 
    <td
      ref={drop}
      className={`placed-course ${isOver} ? 'isOver' : ''`}
    >
      {element && <DraggableElements id={position} element={element} interactiveSelection={interactiveSelection} courseBeingDragged={courseBeingDragged} />}
    </td>
  );
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
  //const teachersScheduleCells = [2,5,6,8,9,10];
  
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
  console.log(teachersScheduleCells);
  useEffect(() => {
    fetchPersonalCurriculum();
  }, []);

  useEffect(() => {
  const timeTablePositions = new Map();
  for (let i = 0; i < teachersSchedule.length; i++) {
    const courseId = teachersSchedule[i].courseId;
    const position = teachersSchedule[i].schedulesTimetablePosition;

    if (timeTablePositions.has(courseId)) {
      // If the courseId already exists in the map, add the new position to its array
      timeTablePositions.get(courseId).push(position);
    } else {
      // If the courseId is new, create a new array with the position
      timeTablePositions.set(courseId, [position]);
    }
  }
  setTeachersScheduleCells(timeTablePositions);
}, [teachersSchedule]);

  const handleDrop = (position, element) => {
    
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
  };
  
  const [isDragging, setIsDragging] = useState(null);
  const [courseBeingDragged, setCourseBeingDragged] = useState(null);

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
        <div className='student-schedule-timetable-container'>
          <table className='student-schedule-timetable'>
            <thead>
              <tr>
                <th style={{ width: 60, border: 'none', visibility: 'hidden' }}></th>
                {days.map((day, index) => (
                  <th key={index} className='hours-and-headers'>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, rowIndex) => (
                <tr key={rowIndex}>
                  <td className='hours-and-headers'>{hour}</td>
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
                        isDragging={isDragging}
                        elementsMap={elementsMap}
                        interactiveSelection={interactiveSelection}
                        courseBeingDragged={courseBeingDragged}
                      />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='draggable-container'>
            <h4>{userDetails.student?.studentCode} сонгосон хичээлүүд:</h4>
             {Array.isArray(studentsCourses) ? (
              studentsCourses.map((item, index) => (
                <DraggableElements key={item.courseId || item.id} id={item.courseId || item.id} element={item} interactiveSelection={interactiveSelection} courseBeingDragged={courseBeingDragged} />
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
