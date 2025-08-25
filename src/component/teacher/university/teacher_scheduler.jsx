import React, { useState, useEffect, useRef, act } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TeacherUser from '../../../models/teacher_user';
import TeachersSchedule from '../../../models/teachersschedule';
import Classroom from '../../../models/classrooms';
import getUserDetailsFromLocalStorage from '../../../utils/userDetailsTeacher_util';
import axios from 'axios';
import getApiUrl from '../../../../api/get_Api_Url';
import './teacher_scheduler.css';

const days = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан'];
const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ItemTypes = {
  ELEMENT: 'element',
};

const DraggableElements = ({ element, id, interactiveSelection, courseBeingDragged, 
  shouldPopulate, position, showAvailableClasses, showMadeSchedules }) => {

  const teacherHasSchedule = Array.from(showMadeSchedules)
    .some(schedule => schedule.teachersScheduleId === element.teachersScheduleId);

  const showSchedulesData = (Array.from(shouldPopulate).filter((schedule) => schedule.schedulesTimetablePosition === position)[0]);
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
    showAvailableClasses(element);
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

  const lockSchedule = (teacherHasSchedule) => {
    if (teacherHasSchedule === true) {
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
      onMouseUp={handleMouseUp} 
      ref={drag}
      className={`timetable-draggable-element-yellow ${isDragging ? 'isDragging' : ''}`}
      style={makeACoursePopUpLecture(id)}
    >
      {element.courseName} Лекц {element.courseCode}{showSchedulesData && `, ${showSchedulesData.classroomNumber}`} 
      {showSchedulesData && `, ${showSchedulesData.teacherName}`}{showSchedulesData && `, ${showSchedulesData.teachersEmail}`} 
    </div>
    :
    isLecture === 'Lecture' || isLecture === 'Лекц'
    ?
    <div
      onMouseUp={handleMouseUp} 
      ref={drag}
      style={lockSchedule(teacherHasSchedule)}
      className={`timetable-draggable-element-yellow ${isDragging ? 'isDragging' : ''}`}
    >
      <div>{element.courseName}</div> 
      <div>Лекц</div> 
      <div>{element.courseCode}</div>
    </div>
    :
    <div
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleMouseUp} 
      ref={drag}
      style={lockSchedule(teacherHasSchedule)}
      className={`timetable-draggable-element ${isDragging ? 'isDragging' : ''}`}
    >
      <div>{element.courseName}</div> 
      <div>Лаборатори</div> 
      <div>{element.courseCode}</div>
      <div>{element.classroomNumber}</div>
    </div>
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
  if (courseBeingDragged?.courseId && teachersScheduleCellsORLecture.has(courseBeingDragged.courseId)) {
    const validDropPositions = teachersScheduleCellsORLecture.get(courseBeingDragged.courseId);
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

const Cell = ({ row, col, onDrop, element, teachersScheduleCells, teachersScheduleCellsLecture, 
    teachersSchedule, isDragging, interactiveSelection, courseBeingDragged, shouldPopulate, 
    shouldPopulateWholeData, showAvailableClasses, showMadeSchedules }) => {
  const availableSchedules = courseBeingDragged?.scheduleType === 'Laboratory' ? 
    (Array.from(teachersSchedule)).filter((schedule) => schedule.courseId === courseBeingDragged?.courseId && schedule.scheduleType === 'Laboratory' ? schedule : '')
    :
    (Array.from(teachersSchedule)).filter((schedule) => schedule.courseId === courseBeingDragged?.courseId && schedule.scheduleType === 'Lecture' ? schedule : '');
  const scheduleType = courseBeingDragged?.scheduleType === 'Laboratory' ? 'Laboratory' : 'Lecture';

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

  const cellStyle = isDragging === true && scheduleType === 'Laboratory' 
    ? getCellStyle(position, teachersScheduleCells, courseBeingDragged, scheduleType)
    : getCellStyle(position, teachersScheduleCellsLecture, courseBeingDragged, scheduleType);

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
            showAvailableClasses={showAvailableClasses} showMadeSchedules={showMadeSchedules} />
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
          ${shouldPopulate[0].courseId === courseBeingDragged.courseId ? `${shouldPopulate[0].teacherName}, 
          ${shouldPopulate[0].courseName} Лекц ${shouldPopulate[0].teachersEmail}`: ''}
          `
        ) : (
          element && <DraggableElements id={position} element={element} interactiveSelection={interactiveSelection} 
            courseBeingDragged={courseBeingDragged} shouldPopulate={shouldPopulateWholeData} position={position}
            showAvailableClasses={showAvailableClasses} showMadeSchedules={showMadeSchedules}/>
        )}
      </td>
    );
  }
};


const Timetable = ({ user, refresh }) => {
  
  const [userDetails, setUserDetails] = useState(getUserDetailsFromLocalStorage());
  const [teachersCourses, setStudentsCourses] = useState(() => {
    let populateLectureAndLaboratory = [];
    for (let i = 0; i < userDetails.teachersCoursePlanning.length; i++){
      let teachersScheduleMock = new TeachersSchedule({
        coursePlanningId: userDetails.teachersCoursePlanning[i].teacherCoursePlanningId,
        teacherId: userDetails.teachersCoursePlanning[i].teacherId,
        courseId: userDetails.teachersCoursePlanning[i].courseId,
        majorId: userDetails.teachersCoursePlanning[i].majorId,
        courseName: userDetails.teachersCoursePlanning[i].courseName,
        scheduleType: 'Laboratory',
        courseCode: userDetails.teachersCoursePlanning[i].courseCode,
      });
      populateLectureAndLaboratory.push(teachersScheduleMock);

      teachersScheduleMock = new TeachersSchedule({
        coursePlanningId: userDetails.teachersCoursePlanning[i].teacherCoursePlanningId,
        teacherId: userDetails.teachersCoursePlanning[i].teacherId,
        courseId: userDetails.teachersCoursePlanning[i].courseId,
        majorId: userDetails.teachersCoursePlanning[i].majorId,
        courseName: userDetails.teachersCoursePlanning[i].courseName,
        scheduleType: 'Lecture',
        courseCode: userDetails.teachersCoursePlanning[i].courseCode,
      });
      populateLectureAndLaboratory.push(teachersScheduleMock);
    }
    return populateLectureAndLaboratory;
  }); 
  const [teachersSchedule, setTeachersSchedule] = useState([]);
  const [availableClassroom, setAvailableClassroom] = useState(null);
  const [classroomSelection, setClassroomSelection] = useState(false);
  const [noAvailableClassroom, setNoAvailableClassroom] = useState(false);
  const [failMessage, setFailMessage] = useState(null);
  const [scheduleDuplicate, setScheduleDuplicate] = useState(null);
  const [scheduleInstance, setScheduleInstance] = useState(null);
  const [scheduleCreateSuccessful, setScheduleCreateSuccessful] = useState(false);
  const [scheduleCreateMessage, setScheduleCreateMessage] = useState(null);
  const [teachersScheduleCells, setTeachersScheduleCells] = useState(new Map());
  const [teachersScheduleCellsLecture, setTeachersScheduleCellsLecture] = useState(new Map());
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deleteSchedule, setDeleteSchedule] = useState(null);
  const [removeSuccessful, setRemoveSuccessful] = useState(false);
  const [removeFail, setRemoveFail] = useState(false);
  const [removeFailMessage, setRemoveFailMessage] = useState(null);
  const [alreadyHasSchedules, setAlreadyHasSchedules] = useState(false);
  const [elementsMap, setElementsMap] = useState(new Map());
  const [handleReject, setHandleReject] = useState(false);
  const [hasSelectedAll, setHasSelectedAll] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachersSchedule = async () => {
      try {

        const response = await axios.post(getApiUrl('/Get/Teachers/Made/Schedule/'),
        {
          teacher: TeacherUser.fromJsonTeacher(userDetails.teacher),
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        });

        if (response.status === 200) {
          let teachersSchedule = new Map();
          const scheduleData = Array.from(response.data.teachersSchedule);
          for (let i = 0; i < scheduleData.length; i++) {
            teachersSchedule.set(scheduleData[i][0], TeachersSchedule.fromJsonTeachersSchedule(scheduleData[i][1]));
          }
          setTeachersSchedule(teachersSchedule);
          console.log('Багшийн хичээлийн хуваарийг амжилттай татлаа.');
          const tempScheduleArray = Array.from(userDetails.teachersSchedule);

          for ( let i = 0; i < tempScheduleArray.length; i++) {
            setElementsMap(prevMap => {
              const newMap = new Map(prevMap);
              const schedulesTimetablePosition = tempScheduleArray[i].schedulesTimetablePosition;
              const scheduleOfThePosition = tempScheduleArray[i];
              
              newMap.set(schedulesTimetablePosition, scheduleOfThePosition);
              return newMap;
            });
          }
          setAlreadyHasSchedules(true);
        } else if (response.status === 400) {
          setElementsMap(null);
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    
    fetchTeachersSchedule();
  }, []);

  const showAvailableClasses = async (element) => {
    let scheduleInstanceToSend = TeachersSchedule.toJson(element);
    scheduleInstanceToSend.schedules_timetable_position = Array.from(elementsMap).filter((schedule) => schedule[1] === element)[0][0];

    try {
      const response = await axios.post(getApiUrl('/Get/Available/Classes/For/Timetable/Position/'), 
        { 
          teachersScheduleInstance: scheduleInstanceToSend,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        }); 

        if (response.status === 200) {
          setAvailableClassroom(Array.from(response.data.availableClassroom).map((classroom) => Classroom.fromJsonClassroom(classroom)));
          setClassroomSelection(true);
          setScheduleInstance(scheduleInstanceToSend);
        } else if (response.status === 201) {
          setFailMessage(response.data.message);
          setNoAvailableClassroom(true);
        }
    } catch (err) {
      console.error('Error fetching curriculum:', err);
      setError('Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const [isDragging, setIsDragging] = useState(null);
  const [courseBeingDragged, setCourseBeingDragged] = useState(null);

  const handleRejectAction = () => {
    setHandleReject(true); 
    setTimeout(() => {
      setHandleReject(false);
    }, [1000]);
  };

  const handleDrop = (position, element, isDragging, teachersSchedule, handleReject) => {

    console.log(Array.from(teachersSchedule)
      .filter((schedule) => schedule.scheduleType === element.scheduleType && schedule.courseId === element.courseId)
      .map((schedule) => schedule.schedulesTimetablePosition));
    const isMultiplePositionsValid = Array.from(teachersSchedule)
      .filter((schedule) => schedule.scheduleType === element.scheduleType && schedule.courseId === element.courseId)
      .map((schedule) => schedule.schedulesTimetablePosition);
    const isPositionValid = Array.from(teachersSchedule)
      .filter((schedule) => schedule.schedulesTimetablePosition === position)[0]
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
          if (value.courseId === element.courseId 
              && value.teacherId === element.teacherId
              && value.majorId === element.majorId
              && value.courseName === element.courseName
              && value.scheduleType === element.scheduleType) {
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

    } else {
      handleRejectAction();
    }
    setIsDragging(false);
    if (element.scheduleType === 'Lecture') {
      createTeachersScheduleLecture(element, position);
    }
  };

  const createTeachersScheduleLecture = async (element, position) => {
    const scheduleOfLecture = TeachersSchedule.toJson(element);
    const hours = ['firstPeriod', 'secondPeriod', 'thirdPeriod', 'fourthPeriod', 'fifthPeriod',
      'sixthPeriod', 'seventhPeriod', 'eightPeriod', 'ninthPeriod'];
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const newScheduleDataToSend = {
        ...scheduleOfLecture,
        schedules_timetable_position: position,
        classroom_capacity: null,
        classroom_id: null,
        classroom_number: null,
        classroom_type: 'Онлайн',
        days: days[parseInt(position % 7)],
        teacher_name: userDetails.user.fname,
        teachers_email: userDetails.teacher.teacherEmail,
        time: hours[parseInt(position / 7)],
    };
    setScheduleInstance(newScheduleDataToSend); 

    try {
      const response = await axios.post(getApiUrl('/Create/Schedule/For/Teachers/Timetable/'),
        {
          scheduleInstance: newScheduleDataToSend, 
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        });

      if (response.status === 200) {
        const createdSchedule = TeachersSchedule.fromJsonTeachersSchedule(response.data.scheduleData);
        console.log(createdSchedule);
        
        setUserDetails(prev => {
          const updatedDetails = { ...prev };
          updatedDetails.teachersSchedule = Array
            .from(updatedDetails.teachersSchedule)
            .concat({ ...createdSchedule }); 

          localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
          return updatedDetails; 
        });

        setElementsMap(prevMap => {
          const newMap = new Map(prevMap); 
          newMap.set(createdSchedule.schedulesTimetablePosition, createdSchedule);
          return newMap;
        });

        setScheduleCreateSuccessful(true);
        setScheduleCreateMessage(response.data.scheduleData);
      } else if (response.status === 201) {
        setScheduleDuplicate(TeachersSchedule.fromJsonTeachersSchedule(response.data.scheduleData));
      }
    } catch (err) {
        console.error('Error creating schedule:', err);
        setError('Network error occurred.');
    } finally {
        setLoading(false);
    }
  };

  const removeSchedule = async () => {
    try {
      const response = await axios.post(getApiUrl('/Remove/Schedule/From/Teacher/'), 
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
          const updatedSchedules = Array.from(updatedDetails.teachersSchedule)
            .filter((schedule) => schedule.teachersScheduleId !== deleteSchedule.teachersScheduleId);
          updatedDetails.teachersSchedule = updatedSchedules;

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

      } else if (response.status === 209) {
        console.log('Алдаа гарлаа.');
        setRemoveFailMessage(response.data.failMessage);
        setRemoveFail(true);
      }

    } catch (error) {
      console.log('Error has occured: ', error);
      setError('Network error occurred.');
    } finally {
      setLoading(false);
    }
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
  
  const createTeachersSchedule = async (classroom) => {
    const hours = ['firstPeriod', 'secondPeriod', 'thirdPeriod', 'fourthPeriod', 'fifthPeriod',
      'sixthPeriod', 'seventhPeriod', 'eightPeriod', 'ninthPeriod'];
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const newScheduleDataToSend = {
        ...scheduleInstance,
        classroom_capacity: parseInt(classroom.capacity),
        classroom_id: classroom.classroomId,
        classroom_number: classroom.classroomNumber,
        classroom_type: classroom.classroomType,
        days: days[parseInt(scheduleInstance.schedules_timetable_position % 7)],
        teacher_name: userDetails.user.fname,
        teachers_email: userDetails.teacher.teacherEmail,
        time: hours[parseInt(scheduleInstance.schedules_timetable_position / 7)],
    };
    setScheduleInstance(newScheduleDataToSend); 

    try {
      const response = await axios.post(getApiUrl('/Create/Schedule/For/Teachers/Timetable/'),
        {
          scheduleInstance: newScheduleDataToSend, 
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        });

      if (response.status === 200) {
        const createdSchedule = TeachersSchedule
          .fromJsonTeachersSchedule(response.data.scheduleData);

        setUserDetails(prev => {
          const updatedDetails = { ...prev };
          updatedDetails.teachersSchedule = Array
            .from(updatedDetails.teachersSchedule)
            .concat({ ...createdSchedule }); 

          localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
          return updatedDetails; 
        });

        setElementsMap(prevMap => {
          const newMap = new Map(prevMap); 
          newMap.set(createdSchedule.schedulesTimetablePosition, createdSchedule);
          return newMap;
        });

        setScheduleCreateSuccessful(true);
        setScheduleCreateMessage(response.data.scheduleData);
      } 
    } catch (err) {
        console.error('Error creating schedule:', err);
        setError('Network error occurred.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {noAvailableClassroom && (
        <div className="hovering-overlay">
          <div className="hovering-content">
            <h3>Алдаа</h3>
            <p>{failMessage}</p>
            <button onClick={() => {setNoAvailableClassroom(false), setFailMessage(null)}}>Хаах</button>
          </div>
        </div>
      )}
      {classroomSelection && (
        <div className="hovering-overlay">
          <div className="hovering-content" style={{border: '3px solid green'}}>
            <h3>Ангийн сонголт</h3>
            {Array.isArray(availableClassroom) && availableClassroom.length > 0 ? (
        <table className="classroom-selection-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Ангийн дугаар</th>
              <th>Ангийн төрөл</th>
              <th>Багтаамж</th>
              <th>Проектор</th>
              <th>ТВ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.from(availableClassroom).map((classroom, index) => (
              <tr key={classroom.classroomId || index}> 
                <td>{index + 1}</td>
                <td>{classroom.classroomNumber}</td>
                <td>{classroom.classroomType}</td>
                <td>{classroom.capacity}</td>
                <td>{classroom.projector}</td> 
                <td>{classroom.tv}</td>
                <td style={{
                      backgroundColor: 'yellowgreen',
                      cursor: 'pointer',
                    }}
                    onClick={() => {createTeachersSchedule(classroom), setClassroomSelection(false)}}
                >Сонгох</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Сонгох боломжтой анги байхгүй байна.</p> // Message if no classrooms are available
      )}
            <button onClick={() => setClassroomSelection(false)}>Хаах</button>
          </div>
        </div>
      )}
      {scheduleCreateSuccessful && (
        <div  onClick={() => {setScheduleCreateSuccessful(false)}}
             className="hovering-overlay">
          <div className="hovering-content"
               style={{
                  border: '3px solid green',
                  cursor: 'pointer',
                }}
          >
            <h2>
                {scheduleCreateMessage.course_name}, &nbsp;
                {scheduleCreateMessage.course_code}, &nbsp;
                {scheduleCreateMessage.classroom_number} 
                хичээлийн хуваарийг амжилттай нэмлээ.
            </h2>
            <button onClick={() => {setScheduleCreateSuccessful(false), refresh()}}>Хаах</button>
          </div>
        </div>
      )}
      {scheduleDuplicate && (
        <div className="hovering-overlay">
          <div className="hovering-content"
               style={{
                  border: '3px solid red',
                  cursor: 'pointer',
                }}
          >
            <h2>
                {scheduleDuplicate.courseName}, &nbsp;
                {scheduleDuplicate.courseCode}, &nbsp;
                {scheduleDuplicate.scheduleType}, &nbsp; 
                {days[parseInt(scheduleDuplicate.schedulesTimetablePosition / 7)]}, &nbsp;
                {hours[parseInt(scheduleDuplicate.schedulesTimetablePosition % 7)]} - р цагийн хичээл давхцаж байна.
            </h2>
            <button onClick={() => {setScheduleDuplicate(null)}}>Хаах</button>
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
                  {TeachersSchedule.convertDays(deleteSchedule.days)}
                  &nbsp; {deleteSchedule.time}
                </div>
                <div>{deleteSchedule.teachersName}</div>
                <div>{deleteSchedule.classroomNumber !== null 
                        ? `Анги: ${deleteSchedule.classroomNumber}`
                        :
                        null
                      }
                </div>
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
                  {TeachersSchedule.convertDays(deleteSchedule.days)}
                  &nbsp; {deleteSchedule.time}
                </div>
                <div>{deleteSchedule.teachersName}</div>
                <div>Хуваарийг амжилттай хаслаа.</div>
            </h2>
              <button style={{ fontSize: '18px' }}
                onClick={() => {setRemoveSuccessful(false), setDeleteSchedule(null), refresh() }}>Хаах</button>
          </div>
        </div>
      )}
      {removeFail && (
        <div onClick={() => {setRemoveFail(false), setRemoveFailMessage(null)}}
             className="hovering-overlay">
          <div className="hovering-content"
               style={{
                  border: '12px solid red',
                  cursor: 'pointer',
                }}
          >
            <h2>
                <div>{removeFailMessage}</div>
            </h2>
              <button style={{ fontSize: '18px' }}
                onClick={() => {setRemoveFail(false), setRemoveFailMessage(null)}}>Хаах</button>
          </div>
        </div>
      )}
      <div className='student-schedule-container-viewport'>
        <div className='student-schedule-container'>
          <div className='column-5fr'>
              <div className='student-schedule-container-window'>
                <div className={`student-schedule-timetable-container ${handleReject === true ? 'handleReject' : ''} `}>
                <table className={`student-schedule-timetable ${teachersSchedule.size === teachersCourses.length ? 'locked': ''} `}>
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
                              teachersSchedule={Array.from(teachersSchedule)}
                              isDragging={isDragging}
                              elementsMap={elementsMap}
                              interactiveSelection={interactiveSelection}
                              courseBeingDragged={courseBeingDragged}
                              shouldPopulate={Array.from(teachersSchedule).filter((schedule) => schedule.schedulesTimetablePosition === position)}
                              shouldPopulateWholeData={Array.from(teachersSchedule)}
                              showAvailableClasses={showAvailableClasses}
                              showMadeSchedules={userDetails.teachersSchedule}
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
              <div className={`draggable-container ${userDetails.teacher?.isCoursePlanningClosed  === true ? 'locked': ''}`} >
                    <div>
                      <h4 className="student-header-of-schedules">
                        <span>{userDetails.teacher?.teacherCode} оноогдсон хичээлүүд:</span>
                        <img
                          src={` ${ userDetails.teacher?.isCoursePlanningClosed  === true  ? '/src/assets/schedulesLocked.png' : '/src/assets/schedulesOpen.png'} `}
                          alt="Lesson Selection Icon"
                          className="header-icon"
                        />
                      </h4>
                    </div>
                    {Array.isArray(teachersCourses) ? (
                      Array.from(teachersCourses).map((item, index) => (
                        <DraggableElements key={`${item.courseId || item.id}-${index}`} id={item.courseId || item.id} element={item} 
                          interactiveSelection={interactiveSelection} courseBeingDragged={courseBeingDragged} shouldPopulate={teachersSchedule}
                          showAvailableClasses={showAvailableClasses}
                           showMadeSchedules={userDetails.teachersSchedule}
                        />
                      ))
                    ) : (
                      <div></div>
                    )}
              </div>
            </div>
            <div className='draggable-container-super'>
              <div className={`draggable-container ${userDetails.teacher?.isCoursePlanningClosed  === true  ? 'locked': ''}`} >
                    <div>
                      <h4 className="student-header-of-schedules">
                        <span>Хичээлээс хасалт хийх:</span>
                        <img
                          src={` ${ userDetails.teacher?.isCoursePlanningClosed  === true  ? '/src/assets/schedulesLocked.png' : '/src/assets/schedulesOpen.png'} `}
                          alt="Lesson Selection Icon"
                          className="header-icon"
                        />
                      </h4>
                    </div>
                    {Array.isArray(userDetails.teachersSchedule) ? (
                      userDetails.teachersSchedule.map((item, index) => (
                        <div className={`remove-elements ${item.scheduleType}`}
                             onClick={() => {{setShowDeletePrompt(true), setDeleteSchedule(item)}}}
                             key={item.teachersScheduleId}
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
