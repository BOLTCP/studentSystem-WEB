import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/university/curriculum.css';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';
import UserDetails from '../../models/user_details';
import Courses from '../../models/courses';
import moment from 'moment';


const Curriculum = ({ user }) => {
  const location = useLocation();
  const userDetails = new UserDetails(user);
	console.log(userDetails);
	const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

		const fetchCurriculum = async () => {
			if( !userDetails.major ) {
				setError('Мэдээлэл олдсонгүй!');
				setLoading(false);
			} else {
				try {
					const response = await axios.post(getApiUrl('/Get/Majors/Curriculum'), 
						{ majorId: userDetails.major.majorId },
						{
							headers: { 'Content-Type': 'application/json' },
							timeout: 30000,
						});

						if (response.status === 200) {
							console.log('Curriculum data fetched!', response.data);
							const pizda = response.data.courses[0];
							console.log(pizda);
							const courses = response.data.courses.map(course => 
								Courses.fromJsonCourse(course));

							setCurriculum(courses);
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
			}
		};

		fetchCurriculum();
	}, []);

	if (!userDetails) {
			return <div className="no-data">Хэрэглэгч олдсонгүй.</div>;
	}

  


	const { student, major, department } = userDetails;

	if ( curriculum ) {
		return (
			<>
				<div className="curriculum-container">
					<div className="curriculum-table">
						<div className="table-header">
						lalar
						</div>
					</div>
					<div className="curriculum-table">
						<div className="table-header">
							lalar
						</div>
					</div>
					<div className="curriculum-table">
						<div className="table-header">
						lalar
						</div>
					</div>
					<div className="curriculum-table">
						<div className="table-header">
							lalar
						</div>
					</div>
					<div className="curriculum-table">
						<div className="table-header">
						lalar
						</div>
					</div>
					<div className="curriculum-table">
						<div className="table-header">
							lalar
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return <div className="placeholder">Хөтөлбөрийн хичээл олдсонгүй</div>;
	}
};
    
export default Curriculum;