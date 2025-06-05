import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import getApiUrl from '../../../../api/get_Api_Url';
import TeacherUser from '../../../models/teacher_user';
import TeacherCoursePlanning from '../../../models/teacher_course_planning';
import CourseManagement from '../../../models/course_management';
import CourseWeek from '../../../models/course_week';
import CourseMaterial from '../../../models/course_material';
import getUserDetailsFromLocalStorage from '../../../utils/userDetailsTeacher_util';
import { RenderSidebar, RenderSidebarRight } from '../../teacher/university/teacher_university_sidebar';
import './course_management.css'; 

// --- Initial Data ---
const availableMaterialsData = [
  { id: 'mat-1', title: 'Lecture: Course Overview', type: 'lecture' },
  { id: 'mat-2', title: 'Reading: Syllabus', type: 'reading' },
  { id: 'mat-3', title: 'Assignment: Intro Quiz', type: 'quiz' },
  { id: 'mat-4', title: 'Video: Git Basics', type: 'video' },
  { id: 'mat-5', title: 'Discussion: Your Goals', type: 'discussion' },
  { id: 'mat-6', title: 'Assignment: Essay Outline', type: 'assignment' },
  { id: 'mat-7', title: 'Quiz: Chapter 2', type: 'quiz' },
  { id: 'mat-8', title: 'Lecture: Advanced Concepts', type: 'lecture' },
  { id: 'mat-9', title: 'Reading: Research Paper', type: 'reading' },
  { id: 'mat-10', title: 'Project Template', type: 'template' },
];

export const CourseBuilder = () => {
  const [userDetails, setUserDetails] = useState(getUserDetailsFromLocalStorage());
  const [courseManagement, setCourseManagement] = useState([]);
  /*const courseWeeks = {
    'week-1': { id: 'week-1', title: 'Week 1: Introduction', materials: [] },
    'week-2': { id: 'week-2', title: 'Week 2: Core Concepts', materials: [] },
    'week-3': { id: 'week-3', title: 'Week 3: Advanced Topics', materials: [] },
    'week-4': { id: 'week-4', title: 'Week 4: Review', materials: [] },
    'week-5': { id: 'week-5', title: 'Week 5: Project Start', materials: [] },
    'week-6': { id: 'week-6', title: 'Week 6: Midterm Prep', materials: [] },
    'week-7': { id: 'week-7', title: 'Week 7: Research Skills', materials: [] },
    'week-8': { id: 'week-8', title: 'Week 8: Final Project', materials: [] },
  };*/
  const [courseWeeks, setCourseWeeks] = useState([]);
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [editWeekTitle, setEditWeekTitle] = useState(null);
  const [titleEdited, setTitleEdited] = useState(false);
  const [availableMaterials, setAvailableMaterials] = useState(availableMaterialsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(userDetails.teacher ? null : 'Хэрэглэгчийн мэдээлэл олдсонгүй.');

  useEffect(() => {
    const fetchCourseManagement = async () => {

      try {
        const response = await axios.post(getApiUrl('/Fetch/Teachers/CourseManagement/CourseWeeks/And/CourseMaterials/'), 
        {
          teacher: TeacherUser.fromJsonButInApp(userDetails.teacher),
          teachersCoursePlanning: Array.from(userDetails.teachersCoursePlanning).map((coursePlanning) => TeacherCoursePlanning.toJsonButInApp(coursePlanning)),
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        });

        if (response.status === 200) {
          const coursesMngmnt = response.data.management;
          const courseManagement = coursesMngmnt
              .map((management) => CourseManagement.fromJsonCourseManagement(management[0]));
          setCourseManagement(courseManagement);
          
          const courseWeeksData = Array.from(response.data.courseWeeks)[0];
          setCourseWeeks(courseWeeksData
            .map((week) => CourseWeek.fromJsonCourseWeek(week)));

          const courseMaterialsData = Array.from(response.data.courseMaterials)[0];
          setCourseMaterials(courseMaterialsData
            .map((material) => CourseMaterial.fromJsonCourseMaterial(material)));

        } else if (response.status === 400){
          setError(response.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.log('Error fetching teachers Course Management: ', error);
        setError('Багшийн хичээлийн удирдлагын мэдээлэл байхгүй байна.');
      }
      setLoading(false);
    };
    fetchCourseManagement();
  }, [titleEdited]);

  console.log(courseWeeks, courseManagement, courseMaterials);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    console.log(source, destination, draggableId);
    if (!destination) {
        return;
    }

    if (source.droppableId === destination.droppableId) {
      const isWeek = source.droppableId.startsWith('week-');
      const list = isWeek ? courseWeeks[source.droppableId].materials : availableMaterials;
      const setList = isWeek ? (newMaterials) => {
        setCourseWeeks(prev => ({
          ...prev,
          [source.droppableId]: { ...prev[source.droppableId], materials: newMaterials }
        }));
      } : setAvailableMaterials;

      const newItems = Array.from(list);
      const [movedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, movedItem);
      setList(newItems);
    }

    else if (source.droppableId === 'available-materials' && destination.droppableId.startsWith('week-')) {
      const destWeekId = destination.droppableId;
      const destWeek = courseWeeks[destWeekId];
      const materialToAdd = availableMaterials.find(mat => mat.id === draggableId);

      if (materialToAdd) {
        const newWeekMaterials = Array.from(destWeek.materials);
        const newMaterialInstance = { ...materialToAdd, id: `${materialToAdd.id}-${Date.now()}` };
        newWeekMaterials.splice(destination.index, 0, newMaterialInstance);

        setCourseWeeks(prev => ({
          ...prev,
          [destWeekId]: { ...prev[destWeekId], materials: newWeekMaterials },
        }));
      }
    }
    else if (source.droppableId.startsWith('week-') && destination.droppableId.startsWith('week-')) {
      const sourceWeek = courseWeeks[source.droppableId];
      const destinationWeek = courseWeeks[destination.droppableId];

      const newSourceMaterials = Array.from(sourceWeek.materials);
      const [itemToMove] = newSourceMaterials.splice(source.index, 1);

      const newDestinationMaterials = Array.from(destinationWeek.materials);
      newDestinationMaterials.splice(destination.index, 0, itemToMove);

      setCourseWeeks(prev => ({
        ...prev,
        [source.droppableId]: { ...sourceWeek, materials: newSourceMaterials },
        [destination.droppableId]: { ...destinationWeek, materials: newDestinationMaterials },
      }));
    }
  };

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

  const handleTitleChange = (e) => {
    console.log(e);
  }

  return (
    <>

    <div className="course-management-container-layout">
        <nav className="course-management-nav">
          <div className="course-management-nav-container">
            <h1 className="course-management-nav-title">Хичээлийн Материал</h1>
          </div>
        </nav>

      <div className='course-management-main-content'>
        {userDetails && <RenderSidebar user = {userDetails} />}
        {userDetails && <RenderSidebarRight user = {userDetails} />}
        {loading && <div style={{ 
                                textAlign: 'center', 
                                display: 'flex',
                                justifyContent: 'center',
                                verticalAlign: 'center',
                              }}>loading</div>}
        {error && <div style={{ 
                                textAlign: 'center', 
                                display: 'flex',
                                justifyContent: 'center',
                                verticalAlign: 'center',
                              }}>{error}</div>} 
        {!error && 
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="course-builder-layout">

              <div className="semester-view">
                  <h3>Хичээлийн долоо хоногууд</h3>
                  <div className="weeks-horizontal-scroll"> 
                      {Array.from(courseWeeks).map((week) => (
                          <div key={week.courseWeekId} className="week-card">
                              <h4>{week.title && week.title}</h4>
                              {editWeekTitle && editWeekTitle.courseWeekId !== week.courseWeekId &&
                                <div className='course-week-title-container'>
                                <h4>{!week.title && `${week.week} - р долоо хоног`}</h4>
                                  <img src="/src/assets/edit.png"
                                    onMouseEnter={() => showAttribution(
                                          "Edit icons created by Kiranshastry - Flaticon",
                                          " https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=2&origin=search&related_id=1159633"
                                          )}
                                    onMouseLeave={() => hideAttribution()}
                                    onClick={() => setEditWeekTitle(week)} 
                                    //Icon source from 
                                    //https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=2&origin=search&related_id=1159633
                                    //Edit icons created by Kiranshastry - Flaticon
                                    style={{ width: '30px',
                                             height: '30px',
                                             marginBottom: '20px',
                                          }}
                                    alt="Edit"
                                  /> 
                                </div>
                              }
                              {!editWeekTitle &&
                                <div className='course-week-title-container'>
                                <h4>{!week.title && `${week.week} - р долоо хоног`}</h4>
                                  <img src="/src/assets/edit.png"
                                    onMouseEnter={() => showAttribution(
                                          "Edit icons created by Kiranshastry - Flaticon",
                                          " https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=2&origin=search&related_id=1159633"
                                          )}
                                    onMouseLeave={() => hideAttribution()}
                                    onClick={() => setEditWeekTitle(week)} 
                                    //Icon source from 
                                    //https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=2&origin=search&related_id=1159633
                                    //Edit icons created by Kiranshastry - Flaticon
                                    style={{ width: '30px',
                                             height: '30px',
                                             marginBottom: '20px',
                                          }}
                                    alt="Edit"
                                  /> 
                                </div>
                              }
                              {editWeekTitle && editWeekTitle.courseWeekId === week.courseWeekId &&
                                <div className='course-week-title-container'>
                                <input
                                  type="text"
                                  style={{ 
                                          fontSize: '1.25rem', 
                                          marginBottom: '16px',
                                          width: '350px',
                                        }}
                                  value={week.title}
                                  onChange={(e) => handleTitleChange(week.id, e.target.value)} // You'll define handleTitleChange
                                  placeholder="Хичээлийн долоо хоногийн нэрийг оруулна уу." // Placeholder for when title is empty
                                />
                                  <img src="/src/assets/save.png"
                                    onMouseEnter={() => showAttribution(
                                          "Save icons created by Yogi Aprelliyanto - Flaticon",
                                          " https://www.flaticon.com/free-icon/diskette_2874091?term=save&page=1&position=5&origin=search&related_id=2874091"
                                          )}
                                    onMouseLeave={() => hideAttribution()}
                                    onClick={() => setEditWeekTitle(week)} 
                                    //Icon source from 
                                    //https://www.flaticon.com/free-icon/diskette_2874091?term=save&page=1&position=5&origin=search&related_id=2874091
                                    //Save icons created by Yogi Aprelliyanto - Flaticon
                                    style={{ width: '30px',
                                            height: '30px',
                                            marginBottom: '20px',
                                          }}
                                    alt="Edit"
                                  /> 
                                  <img src="/src/assets/edit.png"
                                    onMouseEnter={() => showAttribution(
                                          "Edit icons created by Kiranshastry - Flaticon",
                                          " https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=2&origin=search&related_id=1159633"
                                          )}
                                    onMouseLeave={() => hideAttribution()}
                                    onClick={() => handleWeekTitleEdit(week)} 
                                    //Icon source from 
                                    //https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=2&origin=search&related_id=1159633
                                    //Edit icons created by Kiranshastry - Flaticon
                                    style={{ width: '30px',
                                             height: '30px',
                                             marginBottom: '20px',
                                          }}
                                    alt="Edit"
                                  /> 
                                </div>
                              }
                                <Droppable droppableId={`${week.courseWeekId}`} direction="vertical">
                                    {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.droppableProps}
                                          className="week-materials-list"
                                        >
                                          {week.materials === null && (
                                            <p className="placeholder">Сургалтын материалын элементүүдийг зөөж байршуулна уу.</p>
                                          )}
                                          {week.materials && week.materials.map((material, index) => (
                                            <Draggable key={material.id} draggableId={material.id} index={index}>
                                                {(provided) => (
                                                  <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="material-item-in-week"
                                                  >
                                                    {material.title}
                                                  </div>
                                                  )}
                                              </Draggable>
                                          ))}
                                          {provided.placeholder}
                                      </div>
                                  )}
                              </Droppable>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="material-bank">
                  <h3>Нэмж болох элементүүд</h3>
                  <Droppable droppableId="available-materials" direction="vertical">
                      {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="material-bank-list"
                          >
                            {availableMaterials.map((material, index) => (
                              <Draggable key={material.id} draggableId={material.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="material-item"
                                  >
                                    {material.title} ({material.type})
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                      )}
                  </Droppable>
              </div>
          </div>
        </DragDropContext>
        }
      </div>
    </div>
    </>
  );
}

export default CourseBuilder;