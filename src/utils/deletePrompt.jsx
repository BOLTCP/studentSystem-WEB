import React, { useState } from 'react';
import Courses from '../models/courses';
import getApiUrl from '../../api/get_Api_Url';
import axios from 'axios';
import './styles/delete_prompt.css';

const DeletePrompt = ({ visibility, course, studentId, yearSpecification, onRefresh }) => {
  const [isVisible, setIsVisible] = useState(visibility);
  const [deleteCourse, setDeleteCourse] = useState(Courses.fromJsonCourse(course));
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOverlayClick = () => {
    setIsVisible(true);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleConfirm = async (e) => {
    e.stopPropagation();
    
      if( !deleteCourse ) {
        setError('Мэдээлэл олдсонгүй!');
        setLoading(false);
      } else {
        try {

          const response = await axios.delete(getApiUrl('/Delete/Students/Course/From/Personal/Curriculum') ,
            { 
              headers: { 'Content-Type': 'application/json' },
              timeout: 30000,
              data: { 
                courseId: deleteCourse.courseId,
                studentId: studentId,
                yearSpecification: yearSpecification,
              },
            });
  
            if (response.status === 200) {
              setIsSuccess(true);
              setTimeout(() => {
                setIsVisible(false);
                onRefresh();
              }, 750);
              
            } else {
              setResponseCode(401);
              console.log('Error fetching students_curriculum:', response.status, response.data);
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



  return (
    <div
      className={`delete-overlay ${isVisible === true ? 'visible' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        {isSuccess === false ?
          <>
            <p>Ганцаарчилсан төлөвлөгөөнөөс <strong>{deleteCourse.courseName}</strong> хичээлийг хасах?</p><div className="button-group">
              <button onClick={handleConfirm}>Тийм</button>
              <button onClick={handleCancel}>Үгүй</button>
            </div>
          </>
        :
          <div className="success-message">
            <p><strong>{deleteCourse.courseName}</strong> хичээлийг амжилттай хаслаа!</p>
          </div>
        }
        
      </div>
    </div>
  );
};

export default DeletePrompt;
