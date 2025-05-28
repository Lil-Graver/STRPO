import CitySearch from '../components/CitySearch';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function WeatherPage({ backend_base }) {
	const [forecast, setForecast] = useState(null);
	const [recents, setRecents] = useState([]);
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
		navigate('/');
	}

	const handleLogin = () => {
		navigate('/login');
	}

	const handleHistory = () => {
		navigate('/history');
	}
	
	const handleStats = () => {
		navigate('/stats');
	}

	const handleSelect = async(city) => {
		const headers = localStorage.getItem('access') ? {Authorization: `Bearer ${localStorage.getItem('access')}`} : {}
		try {
			const response = await axios.get(`${backend_base}forecast/`, {
				headers,
				params: {
					lat: city.latitude,
					lon: city.longitude,
					city: city.city_name,
					country: city.country
					}
				}	
			);

			setForecast(response.data);

		} catch (error) {
			let response = await axios.post(`${backend_base}users/auth/jwt/refresh/`, {
				'refresh': localStorage.getItem('refresh')
			});
			localStorage.setItem('access', response.data.access);
			response = await axios.get(`${backend_base}forecast/`, {
				headers,
				params: {
					lat: city.latitude,
					lon: city.longitude,
					city: city.city_name,
					country: city.country
					}
				}	
			);
			setForecast(response.data);
		}
	}

	const handleRefresh = async () => {
		const response = await axios.post(`${backend_base}users/auth/jwt/refresh/`, {
			'refresh': localStorage.getItem('refresh')
		});
		localStorage.setItem('access', response.data.access);
		window.location.reload(); 
	}

	const formatTime = (time) => {
		const date = new Date(time);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${day}.${month} - ${hours}:${minutes}`;
	}

	useEffect(() => {
		if (localStorage.getItem('access')){
		const fetchData = async() => {
			try {
				const response = await axios.get(`${backend_base}history/?limit=5`, {
							headers: {
								Authorization: `Bearer ${localStorage.getItem('access')}`
							}});
			
				setRecents(response.data);
			} catch (error) {
				handleRefresh();
			}
		}
		
		fetchData()
	}
	}, [])

	return (
		<div className='text-center'>
		{localStorage.getItem('access') ?
			<div className="mt-10 flex items-center justify-center gap-x-6">
            <button
				onClick={handleHistory}
              	className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
				История запросов
            </button>
            <button onClick={handleLogout} className="cursor-pointer text-sm font-semibold text-gray-900">
              Выход <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
			:
			<div className="mt-10 flex items-center justify-center gap-x-6">
            <button
				onClick={handleLogin}
              	className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
				Войти
            </button>
		</div>
		}
		<button className='mt-5 cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={handleStats}>
			Статистика запросов
		</button>
		<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
			Прогноз погоды
		</h2>
		<CitySearch onForecastReceived={setForecast} backend_base={backend_base}/>
		{forecast && (
			<div className="flex flex-col items-center justify-center w-screen  text-gray-700">
		
		<div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
			<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Температура по часам</h2>
			{forecast.hourly.time.map((time, index) => (
				<div className="flex justify-between items-center">
					<span className="font-semibold text-lg w-1/4">{formatTime(time)}</span>
					
					<span className="font-semibold text-lg w-1/4 text-right">{forecast.hourly.temperature_2m[index]}°C</span>
				</div>
				))}
			
			
			
		</div>
		</div>

		)}
		{localStorage.getItem('access') ?
			<div>
				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Последние запросы
				</h2>
				<ul role="list" className="divide-y divide-gray-100 mx-150 pb-20">
				{recents.map((city, index) => (
					<li key={index} onClick={() => handleSelect(city)} className="flex justify-between gap-x-6 py-2 cursor-pointer">
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
			<h3>Авторизируйтесь, чтобы просмотреть последние запросы</h3>
			</div>
		}
		
		</div>
	);
	}

export default WeatherPage;
