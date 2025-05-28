import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

const StatsPage = ({ backend_base }) => {
    const [stats, setStats] = useState([])

	useEffect(() => {
		const fetchData = async() => {
			const response = await axios.get(`${backend_base}stats/`);
			
			setStats(response.data);
			}
		
		fetchData()
	}, [])

    return (
        <div>
			<h1>Статистика запросов</h1>
			<ul>
				{stats.map((city, index) => (
				<li key={index} >
					Город: {city.city_name}, количество запросов: {city.count}
				</li>
				))}
    		</ul>
		</div>
    )
}

export default StatsPage