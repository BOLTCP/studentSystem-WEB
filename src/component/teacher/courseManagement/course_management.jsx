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
import e from 'cors';

// --- Initial Data ---
const availableMaterialsData = [
  { id: 'mat-1', title: 'a', type: 'Лекцийн хэсэг' },
  { id: 'mat-2', title: 'b', type: 'Лекцийн хэсэг' },
  { id: 'mat-3', title: 'c', type: 'Лекцийн хэсэг' },
  { id: 'mat-4', title: 'd', type: 'Лекцийн хэсэг' },
  { id: 'mat-5', title: 'e', type: 'Лекцийн хэсэг' },
  { id: 'mat-6', title: 'f', type: 'Лабораторийн хэсэг' },
  { id: 'mat-7', title: 'g', type: 'Лабораторийн хэсэг' },
  { id: 'mat-8', title: 'h', type: 'Лабораторийн хэсэг' },
  { id: 'mat-9', title: 'i', type: 'Лабораторийн хэсэг' },
  { id: 'mat-10', title: 'j', type: 'Лабораторийн хэсэг' },
  { id: 'mat-11', title: 'k', type: 'Лабораторийн хэсэг' },
  { id: 'mat-12', title: 'l', type: 'Лабораторийн хэсэг' },
];

export const CourseBuilder = () => {
  const [userDetails, setUserDetails] = useState(getUserDetailsFromLocalStorage());
  const [courseManagement, setCourseManagement] = useState([]);
  const [courseWeeks, setCourseWeeks] = useState([]);
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [editWeekTitle, setEditWeekTitle] = useState(null);
  const [editWeekDescription, setEditWeekDescription] = useState(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [availableMaterials, setAvailableMaterials] = useState(availableMaterialsData);
  const [selectedMaterialType, setSelectedMaterialType] = useState('Лекцийн хэсэг');
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
  }, []);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    console.log(source);
    console.log(destination);
    console.log(draggableId);
    if (!destination) {
      return;
    }

    setCourseWeeks(prevWeeks => {
      const updatedWeeks = prevWeeks.map((cweek) => {
        if (cweek.courseWeekId === parseInt(destination.droppableId)) {
          let editWeek = { ...cweek };  
          editWeek.materials = editWeek.materials ? Array.from(editWeek.materials).concat(availableMaterials.filter((mat) => mat.id === draggableId)) : availableMaterials.filter((mat) => mat.id === draggableId);
          return new CourseWeek(editWeek);
        } else return cweek;
      });
      return updatedWeeks;
    });
    
    
    /*
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
    */
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

  const saveEditedTitle = async (week) => {
    try {
    const editWeek = { ...week, title: currentTitle };
    const response = await axios.post(getApiUrl('/Save/Teachers/Edited/CourseWeek/'),
      {
        editWeek: CourseWeek.toJson(editWeek),
        teacher: userDetails.teacher,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000,
      });

      if (response.status === 200) {
        let tempTitle;
        setCourseWeeks(prevWeeks => {
          const updatedWeeks = prevWeeks.map((cweek) => {
            if (cweek.courseWeekId === week.courseWeekId) {
              let editWeek = { ...cweek };  
              editWeek.title = currentTitle ? currentTitle : editWeek.title;
              tempTitle = editWeek.title;
              return new CourseWeek(editWeek);
            } else return cweek;
          });
          return updatedWeeks;
        });
        setEditWeekTitle(false);
        setCurrentTitle(tempTitle);
      } 
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  const saveEditedDescription = async (week) => {
    try {
    const editWeek = { ...week, description: currentDescription };
    const response = await axios.post(getApiUrl('/Save/Teachers/Edited/CourseWeek/'),
      {
        editWeek: CourseWeek.toJson(editWeek),
        teacher: userDetails.teacher,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000,
      });

      if (response.status === 200) {
        let tempDesc;
        setCourseWeeks(prevWeeks => {
          const updatedWeeks = prevWeeks.map((cweek) => {
            if (cweek.courseWeekId === week.courseWeekId) {
              let editWeek = { ...cweek };  
              editWeek.description = currentDescription ? currentDescription : editWeek.description;
              tempDesc = editWeek.description;
              return new CourseWeek(editWeek);
            } else return cweek;
          });
          return updatedWeeks;
        });
        setEditWeekDescription(false);
        setCurrentDescription(tempDesc);
      } 
    } catch (error) {
      console.log('Error: ', error);
    }
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
                            {/* TITLE */}
                            <div className='course-week-title-container'>
                              <div style={{
                                    fontWeight: 'bold',
                                   }}>
                                  {editWeekTitle && editWeekTitle.courseWeekId === week.courseWeekId ?
                                  (<input
                                      type="text"
                                      style={{ 
                                              fontSize: '16px', 
                                            }}
                                      value={currentTitle}
                                      onChange={(e) => setCurrentTitle(e.target.value)} 
                                      placeholder="Долоо хоногийн нэр" 
                                    /> 
                                    )
                                    :
                                    (
                                      !week.title ? (`${week.week} - р долоо хоног`) : (week.title)
                                    )
                                  }
                              </div>
                              <div className='buttons-title-description'>
                                {editWeekTitle && editWeekTitle.courseWeekId === week.courseWeekId &&
                                    <img src="/src/assets/save.png"
                                    onMouseEnter={() => showAttribution(
                                          "Save icons created by Yogi Aprelliyanto - Flaticon",
                                          " https://www.flaticon.com/free-icon/diskette_2874091?term=save&page=1&position=5&origin=search&related_id=2874091"
                                          )}
                                    onMouseLeave={() => hideAttribution()}
                                    onClick={() => {saveEditedTitle(week)}} 
                                    //Icon source from 
                                    //https://www.flaticon.com/free-icon/diskette_2874091?term=save&page=1&position=5&origin=search&related_id=2874091
                                    //Save icons created by Yogi Aprelliyanto - Flaticon
                                    style={{ width: '30px',
                                            height: '30px',
                                            marginBottom: '20px',
                                          }}
                                    alt="Edit"
                                  /> 
                                }
                                <img src={`${!editWeekTitle ? '/src/assets/edit.png' : '/src/assets/close.png' }`}
                                  onMouseEnter={() => showAttribution(
                                        "Edit icons created by Kiranshastry - Flaticon",
                                        " https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=2&origin=search&related_id=1159633"
                                        )}
                                  onMouseLeave={() => hideAttribution()}
                                  onClick={() => {editWeekTitle ?  setEditWeekTitle(null) : setEditWeekTitle(week)}} 
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
                            </div>
                            {/* DESCRIPTION */}
                            <div className='course-week-description-container'>
                              <div className='week-description'>
                                  {editWeekDescription && editWeekDescription.courseWeekId === week.courseWeekId ?
                                  (<textarea
                                      className='description-edit'
                                      type="text"
                                      style={{ 
                                              fontSize: '16px', 
                                            }}
                                      value={currentDescription}
                                      onChange={(e) => setCurrentDescription(e.target.value)} 
                                      placeholder="Долоо хоногийн тайлбар" 
                                    /> 
                                    )
                                    :
                                    (
                                      !week.description ? (`Тайлбар`) : (week.description)
                                    )
                                  }
                              </div>
                              <div className='buttons-title-description'>
                                {editWeekDescription && editWeekDescription.courseWeekId === week.courseWeekId &&
                                  <img src="/src/assets/save.png"
                                  onMouseEnter={() => showAttribution(
                                        "Save icons created by Yogi Aprelliyanto - Flaticon",
                                        " https://www.flaticon.com/free-icon/diskette_2874091?term=save&page=1&position=5&origin=search&related_id=2874091"
                                        )}
                                  onMouseLeave={() => hideAttribution()}
                                  onClick={() => {saveEditedDescription(week)}} 
                                  //Icon source from 
                                  //https://www.flaticon.com/free-icon/diskette_2874091?term=save&page=1&position=5&origin=search&related_id=2874091
                                  //Save icons created by Yogi Aprelliyanto - Flaticon
                                  style={{ width: '30px',
                                          height: '30px',
                                          marginBottom: '20px',
                                        }}
                                  alt="Edit"
                                  /> 
                                }
                                <img src={`${!editWeekDescription ? '/src/assets/edit.png' : '/src/assets/close.png'}`}
                                  //src/assets/close.png ---> https://www.flaticon.com/free-icon/close_2976286?term=x&page=1&position=12&origin=search&related_id=2976286
                                  //src/assets/close.png ---> Close icons created by ariefstudio - Flaticon
                                  onMouseEnter={() => showAttribution(
                                        "Edit icons created by Kiranshastry - Flaticon",
                                        " https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=2&origin=search&related_id=1159633"
                                        )}
                                  onMouseLeave={() => hideAttribution()}
                                  onClick={() => {editWeekDescription ? setEditWeekDescription(null) : setEditWeekDescription(week)}} 
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
                              
                            </div>
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
                                        {week.materials && 
                                          Array.from(week.materials).map((material, index) => {
                                            return(
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
                                            )
                                          })
                                        }
                                        {provided.placeholder}
                                    </div>
                                )}
                              </Droppable>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="material-bank">
                  <div className='material-title-and-type-selector'>
                    <h3>Хичээлийн элементүүд</h3>
                    <select onChange={() => {setSelectedMaterialType(event.target.value)}}
                            className='material-type-select'>
                      <option>Лекцийн хэсэг</option>
                      <option>Лабораторийн хэсэг</option>
                      <option>Семинарын хэсэг</option>
                      <option>Шалгалтын хэсэг</option>
                    </select>
                  </div>
                  <Droppable droppableId="available-materials" direction="vertical">
                      {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="material-bank-list"
                          >
                            {availableMaterials.filter((material) => material.type === selectedMaterialType).map((material, index) => (
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