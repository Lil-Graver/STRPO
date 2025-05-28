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

	const formatTime = (time) => {
		const date = new Date(time);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${day}.${month} - ${hours}:${minutes}`;
	}

    return (
		<div>
		{localStorage.getItem('access') ?
    	<div>
			<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            	История запросов
          	</h2>
			<ul role="list" className="divide-y divide-gray-100 px-80">
			{history.map((city, index) => (
				<li key={index} className="flex justify-between gap-x-6 py-2">
				<div className="flex min-w-0 gap-x-4">
					<div className="min-w-0 flex-auto">
					<p className="text-sm/6 font-semibold text-gray-900">{city.city_name}</p>
					<p className="mt-1 truncate text-xs/5 text-gray-500">{city.country}</p>
					</div>
				</div>
				<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">					
					<p className="mt-1 text-xs/5 text-gray-500">
						Просмотрено {formatTime(city.timestamp)}
					</p>
				</div>
				</li>
			))}
			</ul>
		</div>
		:
		<div>
			<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            	Авторизируйтесь, чтобы посмотреть историю запросов
          	</h2>
		</div>
		}
		<a className="ml-80 cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" href="/">На главную</a>
	</div>
    )
}

export default HistoryPage