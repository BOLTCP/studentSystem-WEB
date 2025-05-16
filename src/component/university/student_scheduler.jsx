import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StudentCurriculum from '../../models/student_curriculum';
import StudentUser from '../../models/student_user';
import UserDetails from '../../models/user_details';
import Courses from '../../models/courses';
import getUserDetailsFromLocalStorage from '../../utils/userDetails_util';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';
import '../../styles/university/student_scheduler.css';

const days = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'];
const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ItemTypes = {
  ELEMENT: 'element',
};

const DraggableElements = ({ element, id }) => {
  console.log(element);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ELEMENT,
    item: { id, element },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`timetable-draggable-element ${isDragging ? 'isDragging' : ''}`}
    >
      {element.courseName}
    </div>
  );
};

const Cell = ({ row, col, onDrop, element }) => {
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
    <td
      ref={drop}
      className={`placed-course ${isOver} ? 'isOver' : ''`}
    >
      {element && <DraggableElements id={position} element={element} />}
    </td>
  );
};

const Timetable = ({ user }) => {
  
  const userDetails = new UserDetails(user);
  const studentsCurriculum = StudentCurriculum.fromJsonButInAppInstance(JSON.parse(localStorage.getItem('studentCurriculumModel')));
  const [studentsCourses, setStudentsCourses] = useState(null); 
  const [elementsMap, setElementsMap] = useState(new Map());
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const fetchPersonalCurriculum = async () => {
    const userDetails = getUserDetailsFromLocalStorage();
    const studentsCurriculum = StudentCurriculum.fromJsonButInAppInstance(JSON.parse(localStorage.getItem('studentCurriculumModel')));
    let studentsCourses = null;
    console.log(studentsCurriculum);
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
          studentsCourses = (response.data.studentsCourses).map((course) => Courses.fromJsonCourse(course));
          setStudentsCourses(studentsCourses);
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

  console.log(studentsCourses);

  const handleDrop = (position, element) => {
    setElementsMap(prevMap => {
      const newMap = new Map(prevMap);
      const isCourseAlreadyPlaced = Array.from(newMap.values()).some(
        placedElement => (placedElement.courseId || placedElement.id) === (element.courseId || element.id)
      );

      if (!isCourseAlreadyPlaced) {
        newMap.set(position, element);
      }
      return newMap;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='student-schedule-container'>
        <div className='student-schedule-timetable-container'>
          <table className='student-schedule-timetable'>
            <thead>
              <tr>
                <th style={{ width: 60, border: 'none', visibility: 'hidden' }}></th>
                {days.map((day, index) => (
                  <th key={index} style={{ padding: 8, textAlign: 'center' }}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{hour}</td>
                  {days.map((_, colIndex) => {
                    const position = rowIndex * 7 + colIndex;
                    return (
                      <Cell
                        key={colIndex}
                        row={rowIndex}
                        col={colIndex}
                        onDrop={handleDrop}
                        element={elementsMap.get(position)}
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
                <DraggableElements key={item.courseId || item.id} id={item.courseId || item.id} element={item} />
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
