import React, { useState, useEffect, useCallback  } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import getApiUrl from '../../../../api/get_Api_Url';

import TeacherUser from '../../../models/teacher_user';
import TeacherCoursePlanning from '../../../models/teacher_course_planning';
import CourseManagement from '../../../models/course_management';
import CourseWeek from '../../../models/course_week';
import CourseMaterial from '../../../models/course_material';
import availableMaterialsData from '../../../models/course_week_materials';
import CourseMaterialManagement from './course_materials_management';
import getUserDetailsFromLocalStorage from '../../../utils/userDetailsTeacher_util';
import { RenderSidebar, RenderSidebarRight } from '../../teacher/university/teacher_university_sidebar';
import './course_management.css'; 
import e from 'cors';

export const CourseBuilder = () => {
  const [userDetails, setUserDetails] = useState(getUserDetailsFromLocalStorage());

  const [courseManagement, setCourseManagement] = useState([]);
  const [selectedCourseManagement, setSelectedCourseManagement] = useState(null);

  const [courseWeeks, setCourseWeeks] = useState([]);
  const [editWeekTitle, setEditWeekTitle] = useState(null);
  const [editWeekDescription, setEditWeekDescription] = useState(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [courseMaterials, setCourseMaterials] = useState([]);

  const [availableMaterials, setAvailableMaterials] = useState(availableMaterialsData);
  const [selectedMaterialType, setSelectedMaterialType] = useState('Танилцуулга эхлэлийн хэсэг');
  const [showMatTitlePropmt, setShowMatTitlePrompt] = useState(false);
  const [matToCreate, setMatToCreate] = useState(null);
  const [matToCreateWeek, setMatToCreateWeek] = useState(null);
  const [matCreateError, setMatCreateError] = useState(null);
  const [matCreateMessage, setMatCreateMessage] = useState(null);
  const [matsTitleToChange, setMatsTitleToChange] = useState(null);
  const [saveChangedTitle, setSaveChangedTitle] = useState(null);

  const [showMatDeletePrompt, setShowMatDeletePrompt] = useState(null);
  const [matDeleteMessage, setMatDeleteMessage] = useState(null);

  const [introWeekException, setIntroWeekException] = useState(null);
  const [introToCourseWeekException, setIntroToCourseWeekException] = useState(null);
  
  const [showCourseMatManagement, setShowCourseMatManagement] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(userDetails.teacher ? null : 'Хэрэглэгчийн мэдээлэл олдсонгүй.');

  //Долоо хоногийн материалын дараалал болон хасах 
  const [enableMaterialPositionEdit, setEnableMaterialPositionEdit] = useState(false);
  
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
          setSelectedCourseManagement(CourseManagement.fromJsonCourseManagement(coursesMngmnt[0][0]));

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

  const createMaterialForCourseWeek = async () => {

    try {
      const response = await axios.post(getApiUrl('/Create/CourseMaterial/For/Course/Week/'),
        {
          courseManagement: courseManagement[0],
          matToCreate: matToCreate,
          matToCreateWeek: matToCreateWeek,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        });

      if (response.status === 200) {
        setMatCreateMessage(response.data.createMaterial);
        setShowMatTitlePrompt(false);
        const returnedMaterial = CourseMaterial.fromJsonCourseMaterial(response.data.createMaterial);
        setCourseMaterials(prevMaterials => {
          const updatedMaterials = prevMaterials.concat(returnedMaterial);
            
          return updatedMaterials;
        });

      } else if (response.status === 201) {
        setMatCreateError(response.data.message);
        setShowMatTitlePrompt(false);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleMaterialTitleChange = async () => {
    try { 
      const response = await axios.post(getApiUrl('/Change/CourseMaterials/Title/'),
        {
          changedTitle: saveChangedTitle,
          matToChange: CourseMaterial.toJson(matsTitleToChange),
        },
        {
          headers: { 'Content-type': 'application/json' },
          timeout: 30000,
        });
        
        if (response.status === 200) {
          setCourseMaterials(prev => {
            const matToUpdate = prev.find((mat) => mat.courseMaterialId === matsTitleToChange.courseMaterialId);
            const updatedMat = { ...matToUpdate, title: saveChangedTitle };
            return prev.map((mat) => mat.courseMaterialId === matsTitleToChange.courseMaterialId ?  new CourseMaterial(updatedMat) : mat);
          });
        }
    } catch (error) {
      console.log(error);
    }
    setMatsTitleToChange(null);
    setSaveChangedTitle(null);
  }

  const handleRemoveCourseMaterial = async (material) => {
    try {
      const response = await axios.post(getApiUrl('/Remove/CourseMaterial/From/CourseWeek/'),
        {
          matToDelete: CourseMaterial.toJson(material)
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        });
      if (response.status === 200) {
        setMatDeleteMessage(response.data.message);
        setCourseMaterials(prev => {
          const updatedCourseMaterials = prev.filter((courseMat) => courseMat.courseMaterialId !== material.courseMaterialId);
          return updatedCourseMaterials;
        });
      }
    } catch (error) {
      console.log(error);
    }   
    setShowMatDeletePrompt(null);
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

  const getMaterialTypeClass = (typeString) => {
    if (!typeString || typeof typeString !== 'string') {
      return ''; 
    }
    const cleanedString = typeString.replace(/[' ']/g, '-').replace(/[№]/g, '').toLowerCase();
    return cleanedString;
  };

  const handleMaterialMoveUp = async (materialToMove) => {

    if (materialToMove.materialOrder !== 0) {
    const courseMaterialsToSend = courseMaterials.filter((courseMat) => courseMat.courseWeekId === materialToMove.courseWeekId)[materialToMove.materialOrder - 1];

    const response = await axios.post(getApiUrl('/Save/Edited/CourseMaterial/Position/Up'), 
      {
        materialToMoveUp: CourseMaterial.toJson(materialToMove),
        materialToMoveDown:  CourseMaterial.toJson(courseMaterialsToSend),
      }, 
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000,
      });

      if (response.status === 200) {
        setCourseMaterials(prev => {
          let prevCourseMaterials = prev;
          const matsOfCourseWeek = prevCourseMaterials.filter((courseMat) => courseMat.courseWeekId === materialToMove.courseWeekId);

          let temp = matsOfCourseWeek[materialToMove.materialOrder - 1];
          temp = new CourseMaterial({ ...temp, materialOrder: materialToMove.materialOrder });

          matsOfCourseWeek[materialToMove.materialOrder - 1] = new CourseMaterial({ ...materialToMove, materialOrder: materialToMove.materialOrder - 1});;
          matsOfCourseWeek[materialToMove.materialOrder] = temp;

          const updatedCourseMaterials = prev.filter((courseMat) => courseMat.courseWeekId !== materialToMove.courseWeekId).concat(matsOfCourseWeek);
          return updatedCourseMaterials;
        });
      }
    }
    setEnableMaterialPositionEdit(false);
  };

  const handleMaterialMoveDown = async (materialToMove) => {

    if (materialToMove.materialOrder !== courseMaterials
                                          .filter((courseMat) => courseMat.courseWeekId === materialToMove.courseWeekId).length - 1) 
    {            
      const courseMaterialsToSend = courseMaterials.filter((courseMat) => courseMat.courseWeekId === materialToMove.courseWeekId)[materialToMove.materialOrder + 1];
      console.log(courseMaterialsToSend);
      const response = await axios.post(getApiUrl('/Save/Edited/CourseMaterial/Position/Down/'), 
      {
        materialToMoveUp: CourseMaterial.toJson(materialToMove),
        materialToMoveDown:  CourseMaterial.toJson(courseMaterialsToSend),
      }, 
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000,
      });

      if (response.status === 200) {
        setCourseMaterials(prev => {
          let prevCourseMaterials = prev;
          const matsOfCourseWeek = prevCourseMaterials.filter((courseMat) => courseMat.courseWeekId === materialToMove.courseWeekId);

          let temp = matsOfCourseWeek[materialToMove.materialOrder + 1];
          temp = new CourseMaterial({ ...temp, materialOrder: materialToMove.materialOrder });

          matsOfCourseWeek[materialToMove.materialOrder + 1] = new CourseMaterial({ ...materialToMove, materialOrder: materialToMove.materialOrder + 1});;
          matsOfCourseWeek[materialToMove.materialOrder] = temp;

          const updatedCourseMaterials = prev.filter((courseMat) => courseMat.courseWeekId !== materialToMove.courseWeekId).concat(matsOfCourseWeek);
          return updatedCourseMaterials;
        });
      }
    }
    setEnableMaterialPositionEdit(false);
  }

  const handleClose = () => {
    setShowCourseMatManagement(null);
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
        <DragDropContext onDragEnd={(e) => {
            const { source, destination, draggableId } = e;
            console.log(e);
            if (!parseInt(destination?.droppableId) || destination.droppableId === 'available-materials') {
              return;
            } else if (courseWeeks
                .filter((week) => parseInt(destination?.droppableId) === week.courseWeekId)[0].week === 0 
                && 
                availableMaterials.filter((mat) => mat.id === draggableId)[0]?.type !== 'Танилцуулга эхлэлийн хэсэг') {
              setIntroWeekException(true);
              return;
            } else if (courseWeeks
                .filter((week) => parseInt(destination?.droppableId) === week.courseWeekId)[0].week !== 0 
                && 
                availableMaterials.filter((mat) => mat.id === draggableId)[0].type === 'Танилцуулга эхлэлийн хэсэг') {
              setIntroToCourseWeekException(true);
            } else {
              setMatToCreateWeek(courseWeeks.filter((week) => week.courseWeekId === parseInt(destination.droppableId))[0]);
              setShowMatTitlePrompt(true), setMatToCreate((availableMaterials.filter((mat) => mat.id === e.draggableId)[0]));
            }
          }}
        >
            <div className="course-builder-layout">

              {showCourseMatManagement &&
                <CourseMaterialManagement 
                  courseMaterial={showCourseMatManagement}
                  courseManagement={selectedCourseManagement}
                  onClose={handleClose}
                />
              }

              {showMatTitlePropmt &&
                <div className={`material-add-overlay ${showMatTitlePropmt === true ? 'visible' : null}`}>
                  <div className="add-modal">
                    <div>
                      Материалын нэр:
                    </div>
                    &nbsp;
                    <div>
                      <textarea 
                        style={{
                          width: '300px',
                          height: '2.25rem',
                          fontSize: '1rem',
                        }}
                        type='text'
                        value={matToCreate.title}
                        onChange={(e) => {
                        setMatToCreate(prev => {
                          const updatedMat = { ...prev, title: e.target.value };
                          return updatedMat;
                        })}
                        }
                      >
                      </textarea>
                    </div>
                    <div className='button-group'>
                      <button onClick={() => {setShowMatTitlePrompt(false)}}>Буцах</button>
                      <button onClick={() => {createMaterialForCourseWeek()}}
                              style={{ color: 'white', backgroundColor: '#14b82e'}}>Хадгалах</button>
                    </div>
                  </div>
                </div>
              }

              {matsTitleToChange &&
                <div className={`material-add-overlay ${matsTitleToChange && 'visible'}`}>
                  <div className="add-modal">
                    <div>
                      Материалын нэр:
                    </div>
                    &nbsp;
                    <div>
                      <textarea 
                        maxLength={CourseMaterial.titleLength}
                        style={{
                          width: '300px',
                          height: '2.25rem',
                          fontSize: '1rem',
                        }}
                        type='text'
                        value={saveChangedTitle}
                        onChange={(e) => {
                        setSaveChangedTitle(e.target.value)}
                        }
                      >
                      </textarea>
                    </div>
                    <div className='button-group'>
                      <button onClick={() => {setMatsTitleToChange(false)}}>Буцах</button>
                      <button onClick={() => {handleMaterialTitleChange()}}
                              style={{ color: 'white', backgroundColor: '#14b82e'}}>Хадгалах</button>
                    </div>
                  </div>
                </div>
              }

              {showMatDeletePrompt &&
                <div className={`material-add-overlay ${showMatDeletePrompt && 'visible'}`}>
                  <div className="add-modal">
                    <div>
                      Материалын нэр: {showMatDeletePrompt.title} устгах уу?
                    </div>
                    <div>
                    </div>
                    <div className='button-group'>
                      <button onClick={() => {setShowMatDeletePrompt(null)}}>Буцах</button>
                      <button onClick={() => {handleRemoveCourseMaterial(showMatDeletePrompt)}}
                              style={{ color: 'white', backgroundColor: '#14b82e'}}>Устгах</button>
                    </div>
                  </div>
                </div>
              }

              {matDeleteMessage &&
                <div className={`material-add-overlay ${matDeleteMessage && 'visible'}`}>
                  <div className="add-modal">
                    <div>
                      {matDeleteMessage} 
                    </div>
                    <div>
                    </div>
                    <div className='button-group'>
                      <button style={{ backgroundColor: 'green' }}onClick={() => {setMatDeleteMessage(null)}}>Буцах</button>
                    </div>
                  </div>
                </div>
              }

              {matCreateMessage &&
                <div onClick={() => {setMatCreateMessage(null)}} className={`material-add-overlay ${matCreateMessage ? 'visible' : null}`}>
                  <div className="add-modal">
                    <div>
                      <strong>{matCreateMessage.title}</strong> хичэлийн материалыг амжилттай үүсгэлээ.
                    </div>
                    <div className='button-group'>
                      <button onClick={() => {setMatCreateMessage(null)}}
                              style={{ color: 'white', backgroundColor: 'green'}}>Буцах</button>
                    </div>
                  </div>
                </div>
              }

              {matCreateError &&
                <div onClick={() => {setMatCreateError(null)}} className={`material-add-overlay ${matCreateError ? 'visible' : null}`}>
                  <div className="add-modal">
                    <div>
                      <strong>{matCreateError}</strong>
                    </div>
                    <div className='button-group'>
                      <button onClick={() => {setMatCreateError(null)}}
                              style={{ color: 'white', backgroundColor: 'red'}}>Буцах</button>
                    </div>
                  </div>
                </div>
              }

              {introWeekException && 
                <div onClick={() => {setIntroWeekException(null)}} className={`material-add-overlay ${setIntroWeekException ? 'visible' : null}`}>
                  <div className="add-modal">
                    <div>
                      <strong>Долоо хоногт буруу материал оруулсан байна.</strong>
                    </div>
                    <div className='button-group'>
                      <button onClick={() => {setIntroWeekException(null)}}
                              style={{ color: 'white', backgroundColor: 'red'}}>Буцах</button>
                    </div>
                  </div>
                </div>
              }

              {introToCourseWeekException && 
                <div onClick={() => {setIntroToCourseWeekException(null)}} className={`material-add-overlay ${setIntroToCourseWeekException ? 'visible' : null}`}>
                  <div className="add-modal">
                    <div>
                      <strong>Долоо хоногт буруу материал оруулсан байна.</strong>
                    </div>
                    <div className='button-group'>
                      <button onClick={() => {setIntroToCourseWeekException(null)}}
                              style={{ color: 'white', backgroundColor: 'red'}}>Буцах</button>
                    </div>
                  </div>
                </div>
              }

              <div className="semester-view">
                  <div className='course-selection-and-header'>
                    <select onChange={
                             (e) => {setSelectedCourseManagement(courseManagement.filter((courseMngmnt) => courseMngmnt.courseName === e.target.value)[0])}
                            } 
                            style={{ fontSize: '1.4rem' }}
                    >
                        {Array.from(courseManagement).map((course) => 
                        <option key={`${course.courseManagementId}`}>{course.courseName}</option>
                        )}
                      </select>
                    <h3>
                        хичээлийн долоо хоногууд
                    </h3>
                  </div>
                  {selectedCourseManagement 
                  ?
                  <div className="weeks-horizontal-scroll"> 
                      {Array.from(courseWeeks).filter((week) => week.courseManagementId === (selectedCourseManagement.courseManagementId)).map((week) => (
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
                                    alt="Save"
                                  /> 
                                }
                                <img src={`${!editWeekTitle ? '/src/assets/edit.png' : '/src/assets/close.png' }`}
                                  onMouseEnter={() => showAttribution(
                                        "Edit icons created by Kiranshastry - Flaticon",
                                        " https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=2&origin=search&related_id=1159633"
                                        )}
                                  onMouseLeave={() => hideAttribution()}
                                  onClick={() => {{editWeekTitle ?  setEditWeekTitle(null) : setEditWeekTitle(week), setCurrentTitle(week.title)}}} 
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
                                  alt="Save"
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
                              {(providedDroppable) => ( 
                                <div
                                    ref={providedDroppable.innerRef} 
                                    {...providedDroppable.droppableProps} 
                                    className="week-materials-list"
                                >
                                    {courseMaterials.filter((material) => material.courseWeekId === week.courseWeekId).length === 0 && (
                                        <p className="placeholder">Сургалтын материалын элементүүдийг зөөж байршуулна уу.</p>
                                    )}
                                    {courseMaterials
                                        .filter((material) => material.courseWeekId === week.courseWeekId)
                                        .map((material, index) => {
                                            return (
                                                <Draggable key={material.courseMaterialId} draggableId={`${material.courseMaterialId}`} index={index}>
                                                    {(providedDraggable) => ( 
                                                        <div
                                                          ref={providedDraggable.innerRef} 
                                                          {...providedDraggable.draggableProps} 
                                                          {...providedDraggable.dragHandleProps} 
                                                          className={`material-item-in-week ${getMaterialTypeClass(material.courseMatType)}`}
                                                          style={{
                                                            justifyContent: 'space-between',
                                                            gap: '1.5rem',
                                                          }}
                                                        >
                                                          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                                            <p style={{ maxWidth: '275px', }}>
                                                              {material.title}
                                                            </p>
                                                            <img src='/src/assets/edit.png' 
                                                                 onClick={() => {{setMatsTitleToChange(material), setSaveChangedTitle(material.title)}}}
                                                                 style={{ height: '16px', width: '16px', }} />
                                                          </div>
                                                          <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            gap: '1rem',
                                                          }}>
                                                            <div>
                                                              <img
                                                                src='/src/assets/settings.png'
                                                                onClick={() => {setShowCourseMatManagement(material)}}
                                                                onMouseEnter={() => showAttribution(
                                                                  "Settings icons created by Freepik - Flaticon",
                                                                  " https://www.flaticon.com/free-icon/settings_2099058?term=settings&page=1&position=2&origin=search&related_id=2099058"
                                                                )}
                                                                onMouseLeave={() => hideAttribution()}
                                                                style={{
                                                                  width: '30px',
                                                                  height: '30px',
                                                                }}
                                                              />
                                                            </div>
                                                            <div>
                                                              <img
                                                                src='/src/assets/trash.png'
                                                                onClick={() => {setShowMatDeletePrompt(material)}}
                                                                onMouseEnter={() => showAttribution(
                                                                  "Delete icons created by bqlqn - Flaticon",
                                                                  " https://www.flaticon.com/free-icon/trash_3096673?term=trash&page=1&position=3&origin=search&related_id=3096673"
                                                                )}
                                                                onMouseLeave={() => hideAttribution()}
                                                                style={{
                                                                  width: '30px',
                                                                  height: '30px',
                                                                }}
                                                              />
                                                            </div>
                                                            <div style={enableMaterialPositionEdit.courseMaterialId === material.courseMaterialId ?
                                                              {
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                width: '80px',
                                                                justifyContent: 'space-between'
                                                              }
                                                              :
                                                              null
                                                            }
                                                            >
                                                              <img src={!enableMaterialPositionEdit
                                                                ?
                                                                '/src/assets/up-and-down-options.png'
                                                                :
                                                                enableMaterialPositionEdit.courseMaterialId === material.courseMaterialId
                                                                    ?
                                                                    '/src/assets/up-and-down-arrow.png'
                                                                    :
                                                                    '/src/assets/up-and-down-options.png'
                                                                }
                                                                onMouseEnter={() => showAttribution(
                                                                    "Up and down arrow icons created by Rahul Kaklotar - Flaticon",
                                                                    " https://www.flaticon.com/free-icon/unfold_7693521?term=up+and+down&page=1&position=2&origin=search&related_id=7693521"
                                                                )}
                                                                onMouseLeave={() => hideAttribution()}
                                                                onClick={() => {
                                                                    !enableMaterialPositionEdit
                                                                        ?
                                                                          setEnableMaterialPositionEdit(material)
                                                                          :
                                                                          enableMaterialPositionEdit.courseMaterialId === material.courseMaterialId
                                                                              ?
                                                                              handleMaterialMoveUp(material)
                                                                              : null
                                                                      }}
                                                                  style={{
                                                                    width: '30px',
                                                                    height: '30px',
                                                                    }}
                                                                  alt="Save"
                                                                  />
                                                                  {enableMaterialPositionEdit.courseMaterialId === material.courseMaterialId
                                                                    ?
                                                                    <img src='/src/assets/up-and-down-arrow.png'
                                                                          onMouseEnter={() => showAttribution(
                                                                            "Up and down arrow icons created by Rahul Kaklotar - Flaticon",
                                                                            " https://www.flaticon.com/free-icon/unfold_7693521?term=up+and+down&page=1&position=2&origin=search&related_id=7693521"
                                                                          )}
                                                                          onMouseLeave={() => hideAttribution()}
                                                                          onClick={() => {
                                                                            !enableMaterialPositionEdit
                                                                                ?
                                                                                setEnableMaterialPositionEdit(material)
                                                                                :
                                                                                handleMaterialMoveDown(material)
                                                                          }}
                                                                          style={{
                                                                            width: '30px',
                                                                            height: '30px',
                                                                            transform: 'rotate(180deg)',
                                                                          }}
                                                                          alt="Save"
                                                                    />
                                                                    :
                                                                    null
                                                                  }
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )}
                                                </Draggable>
                                              );
                                          })}
                                      {providedDroppable.placeholder} 
                                  </div>
                              )}
                            </Droppable>
                            </div>
                      ))}
                  </div>
                :
                <div className='please-select-course'>Хичээл сонгоно уу.</div>
                }
              </div>
                    
              <div className="material-bank">
                  <div>
                    <h3>Хичээлийн элементүүд</h3>
                    <select onChange={() => {setSelectedMaterialType(event.target.value)}}
                            style={{ fontSize: '1.25rem' }}
                    >
                      <option>Танилцуулга эхлэлийн хэсэг</option>
                      <option>Лекцийн хэсэг</option>
                      <option>Лабораторийн хэсэг</option>
                      <option>Семинарын хэсэг</option>
                      <option>Өөрийгөө сорих Quiz хэсэг</option>
                      <option>Явцын шалгалт №1</option>
                      <option>Явцын шалгалт №2</option>
                      <option>Улирлын шалгалт</option>
                    </select>
                  </div>
                  <Droppable droppableId="available-materials" direction="vertical" >
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
                                    className={`material-item ${getMaterialTypeClass(material.type) ? `material-type-${getMaterialTypeClass(material.type)}` : ''}`}
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
                  <div>
                    <select onChange={() => {}}
                            style={{ fontSize: '1.25rem' }}
                    >
                      <option value=''>Багшийн бэлэн элементүүд</option>
                      {courseManagement.map((courseMngmnt) => 
                        <option key={courseMngmnt.courseManagementId}>{courseMngmnt.courseName}</option>
                      )}
                    </select>
                  </div>
                  {/*
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
                                    className={`material-item ${getMaterialTypeClass(material.type) ? `material-type-${getMaterialTypeClass(material.type)}` : ''}`}
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
                  */}
              </div>
          </div>
        </DragDropContext>
        }
      </div>
    </div>
    <div id="hover-attribution" className="hover-attribution hidden">
    </div>
    </>
  );
}

export default CourseBuilder;