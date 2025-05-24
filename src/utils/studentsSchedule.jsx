import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getApiUrl from '../../api/get_Api_Url';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import StudentUser from '../models/student_user';
import UserDetails from '../models/user_details';
import getUserDetailsFromLocalStorage from './userDetails_util';
import '../component/student/student_dashboard.css';


export const StudentsScheduleUtil = ({ user, theme }) => {
  
  const [userDetails, setUserDetails] = useState(() => getUserDetailsFromLocalStorage());
  const [themeIcon, setThemeIcon] = useState("/src/assets/lightMode.png");
  const [todaysSchedule, setTodaysSchedule] = useState([]);
  const [hasSchedulesToday, setHasSchedulesToday] = useState(false);
  const navigate = useNavigate();

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
          const today = new Date().getDay() === 1 ? 'Monday'
            : new Date().getDay() === 2 ? 'Tuesday'
            : new Date().getDay() === 3 ? 'Wednesday'
            : new Date().getDay() === 4 ? 'Thursday'
            : new Date().getDay() === 5 ? 'Friday'
            : new Date().getDay() === 6 ? 'Saturday'
            : 'Sunday';
          console.log('Оюутны хичээлийн хуваарийг амжилттай татлаа.');
          const studentsSchedule = Array.from(response.data.studentsSchedule).filter((schedule) => schedule[1].days === 'Monday')
          setTodaysSchedule(studentsSchedule);
        } 
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    
    fetchStudentsSchedule();
  }, []);

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

  const handleLogout = () => {
    console.log('Logout clicked');
    navigate('/');
  };

  const todaysScheduleCourses = (schedule) => {
  return (
    <div className="to-do-container" key={schedule.students_schedule_id}>
      <div className="to-do-list-bullets"></div>
      <div className="to-do-item">
        { schedule.classroom_number === null 
         ?
         (
            <a href="">{`Лекц: ${schedule.course_name}`}</a>
         )
         :
         (
            <a>{`Анги: ${schedule.classroom_number}`}</a>
         ) 
        }
      </div>
    </div>
  );
};

  const classroomLocation = () => {

    return (
      <button onMouseEnter={() => showAttribution(
        "Location icons created by Freepik - Flaticon",
        " https://www.flaticon.com/free-icon/location_2838912?term=location&page=1&position=3&origin=search&related_id=2838912"
        )}
        onMouseLeave={() => hideAttribution()}
        className={`sidebar-link ${theme}`}>

        <img src="src/assets/classroomLocation.png"//src/assets/toDoList.png
        //Icon source from 
        //https://www.flaticon.com/free-icon/location_2838912?term=location&page=1&position=3&origin=search&related_id=2838912
        //Location icons created by Freepik - Flaticon
        alt="LightModeIcon"
        className={`sidebar-right-classroom-icon ${theme}`}
        /> 
      </button>
    );
  }

  return (
    <div className={`dashboard-sidebar-right ${theme}`}>
      <div className="sidebar-header-right">
        <img src="/src/assets/StudentSystemLoginScreenLogo.png"
             alt="Logo"
             className="sidebar-header-right-logo"
        />
        University Name Here
      </div>
      <ul className="sidebar-list">

        <li className="sidebar-right-item">
  
          <div className="to-do-list-container">
            <div className="to-do-container">
              <img src="src/assets/toDoList.png"//src/assets/toDoList.png
              //Icon source from 
              //https://www.flaticon.com/free-icon/to-do-list_3208615?related_id=3208615
              //Checklist icons created by Freepik - Flaticon
              alt="LightModeIcon"
              className={`sidebar-right-icon ${theme}`}
              /> 
              Хичээлүүд
            </div>
          
            <div className="to-do-container">
              <div className="to-do-list-bullets"></div>
              <div className="to-do-item"> <a href="">Даалгавар №</a> </div>
            </div>
            <div className="to-do-container">
              <div className="to-do-list-bullets"></div>
              <div className="to-do-item"> <a href="">Даалгавар №</a></div>
            </div>
            <div className="to-do-container">
              <div className="to-do-list-bullets"></div>
              <div className="to-do-item"> <a href="">Даалгавар №</a></div>
            </div>
            <div className="to-do-container">
              <div className="to-do-list-bullets"></div>
              <div className="to-do-item"> <a href="">Даалгавар №</a></div>
            </div>
            <div className="to-do-container">
              <div className="to-do-list-bullets"></div>
              <div className="to-do-item"> <a href="">Даалгавар №</a></div>
            </div>
            <div className="to-do-container">
              <div className="to-do-list-bullets"></div>
              <div className="to-do-item"> <a href="">Даалгавар №</a></div>
            </div>
            <div className="to-do-container">
              <div className="to-do-list-bullets"></div>
              <div className="to-do-item"> <a href="">Даалгавар №</a></div>
            </div>
            <div className="to-do-container">
              <div className="to-do-list-bullets"></div>
              <div className="to-do-item"> <a href="">Даалгавар №</a></div>
            </div>
            <div className="to-do-container">
              <div className="to-do-list-bullets"></div>
              <div className="to-do-item"> <a href="">Даалгавар №</a></div>
            </div>
            <div className="to-do-container">
              <div className="to-do-list-bullets"></div>
              <div className="to-do-item"> <a href="">Даалгавар №</a></div>
            </div>
            <div className="to-do-container">
              <div className="to-do-list-bullets"></div>
              <div className="to-do-item"> <a href="">Даалгавар №</a></div>
            </div>
            
          </div>
          
          <br></br>
          
          <div className="today-schedule-list-container">
            <div className="to-do-container">
              <img src="src/assets/classroom.png"//src/assets/toDoList.png
              //Icon source from 
              //https://www.flaticon.com/free-icon/to-do-list_3208615?related_id=3208615
              //Checklist icons created by Freepik - Flaticon
              alt="LightModeIcon"
              className={`sidebar-right-icon ${theme}`}
              /> 
              Өнөөдрийн &nbsp; хуваарь
            </div>

            {todaysSchedule.length > 0 ? (
              todaysSchedule.map((schedule) => 
                  todaysScheduleCourses((schedule[1]))
              )
            ) : (
              <div className='no-schedule-for-today-assignments'>Өнөөдөр оюутанд хуваарь байхгүй байна.</div>
            )}

            {/*
            <div className="today-schedule-container">
              <div>{classroomLocation()}</div>
              <div className="today-schedule-item">Хичээл орох ангийн байршиал</div>
            </div>
            <div className="today-schedule-container">
              <div>{classroomLocation()}</div>
              <div className="today-schedule-item">Хичээл орох ангийн байршиал</div>
            </div>
            <div className="today-schedule-container">
              <div>{classroomLocation()}</div>
              <div className="today-schedule-item">Хичээл орох ангийн байршиал</div>
            </div>
            <div className="today-schedule-container">
              <div>{classroomLocation()}</div>
              <div className="today-schedule-item">Хичээл орох ангийн байршиал</div>
            </div>
            <div className="today-schedule-container">
              <div>{classroomLocation()}</div>
              <div className="today-schedule-item">Хичээл орох ангийн байршиал</div>
            </div>
            */}

          </div>
        </li>
      </ul>

      <ul className="sidebar-list-settings-and-logout">
        <li className="sidebar-item">
            <button onMouseEnter={() => showAttribution(
                    "Settings icons created by srip - Flaticon",
                    "https://www.flaticon.com/free-icon/settings_900797?term=settings&page=1&position=11&origin=search&related_id=900797"
                    )}    
                    onMouseLeave={() => hideAttribution()}
                    onClick={() => navigate('/messages', { state: { userDetails: userDetails } })} 
                    className={`sidebar-link ${theme}`}>
              <img src="/src/assets/settings.png"
              //Icon source from 
              //https://www.flaticon.com/free-icon/settings_900797?term=settings&page=1&position=11&origin=search&related_id=900797
              //Settings icons created by srip - Flaticon
              alt="Settings"
              className={`sidebar-list-icon ${theme}`}
              /> 
              Тохиргоо
            </button>
        </li>
        
        <li className="sidebar-item">
          <button onMouseEnter={() => showAttribution(
                  "Logout icons created by Pixel perfect - Flaticon",
                  " https://www.flaticon.com/free-icon/logout_1828427?term=log+out&page=1&position=5&origin=search&related_id=1828427"
                  )}
                  onMouseLeave={() => hideAttribution()}
                  onClick={()=>{handleLogout()}} 
                  className={`sidebar-link ${theme}`}>
            <img src="/src/assets/logout.png"
            //Icon source from 
            //https://www.flaticon.com/free-icon/logout_1828427?term=log+out&page=1&position=5&origin=search&related_id=1828427
            //Logout icons created by Pixel perfect - Flaticon
            alt="IntoUniversity"
            className={`sidebar-list-icon ${theme}`}
            /> 
            Гарах
          </button>
        </li>
      </ul>
    </div>
  );
}

StudentsScheduleUtil.PropTypes = {
  user: PropTypes.instanceOf(UserDetails).isRequired
}


