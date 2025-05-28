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
            <div>
				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Статистика запросов
				</h2>
				<ul role="list" className="divide-y divide-gray-100 px-150">
				{stats.map((city, index) => (
					<li key={index} className="flex justify-between gap-x-6 py-2 cursor-pointer">
						<div className="flex min-w-0 gap-x-4">
							<div className="min-w-0 flex-auto">
							<p className="text-sm/6 font-semibold text-gray-900">{city.city_name}</p>
							{/* <p className="mt-1 truncate text-xs/5 text-gray-500">{city.country}</p> */}
							</div>
						</div>
						<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">						
							<p className="mt-1 text-xs/5 text-gray-500">
								Просмотрено {city.count}
							</p>
						</div>
					</li>
				))}
				</ul>
					<a className="ml-150 cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" href="/">На главную</a>
			</div>
		</div>
    )
}

export default StatsPage