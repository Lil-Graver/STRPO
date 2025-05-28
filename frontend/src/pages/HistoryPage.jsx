import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = ({ backend_base }) => {
	const [history, setHistory] = useState([]);
	const navigate = useNavigate();


	const handleRefresh = async () => {
		const response = await axios.post(`${backend_base}users/auth/jwt/refresh/`, {
			'refresh': localStorage.getItem('refresh')
		});
		localStorage.setItem('access', response.data.access);
		window.location.reload(); 
	}

	const handleToMain = () => {
		navigate('/');
	}

	useEffect(() => {
		if (localStorage.getItem('access')) {
			const fetchData = async() => {
				try {
					const response = await axios.get(`${backend_base}history/`, {
								headers: {
									Authorization: `Bearer ${localStorage.getItem('access')}`
								}});
					setHistory(response.data);
				} catch (error) {
					handleRefresh();
				}
			}
					
			fetchData();
		}
		
	}, [])
    return (
    	<div>
			<h1>История запросов</h1>
			{
				localStorage.getItem('access') ?
				<ul>
				{history.map((city, index) => (
				<li key={index} >
					{city.city_name}, {city.country}
				</li>
				))}
    		</ul>
			:
			<div>
				<h2>Авторизируйтесь, чтобы просматривать история запросов</h2>
				<button onClick={handleToMain}>На главную</button>
			</div>
			
		}
			
		</div>
    )
}

export default HistoryPage