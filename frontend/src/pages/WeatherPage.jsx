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
		// axios.get(`${backend_base}forecast/`, {
		// 	headers,
		// 	params: {
		// 		lat: city.latitude,
		// 		lon: city.longitude,
		// 		city: city.city_name,
		// 		country: city.country
		// 	}
		// }).then(res => {
		// 	setForecast(res.data);
		// });
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
			const response = await axios.post(`${backend_base}users/auth/jwt/refresh/`, {
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
		<div>
		{localStorage.getItem('access') ?
			<div>
			<button onClick={handleLogout}>Выход</button>
			<button onClick={handleHistory}>История запросов</button>
			</div>
			:
			<div>
			<button onClick={handleLogin}>Войти</button>
			</div>}
		<button onClick={handleStats}>Статистика запросов</button>
		<h1>Прогноз погоды</h1>
		<CitySearch onForecastReceived={setForecast} backend_base={backend_base}/>
		{forecast && (
			<div>
			<h2>Температура по часам</h2>
			<ul>
				{forecast.hourly.time.map((time, index) => (
				<li key={index}>
					{formatTime(time)}: {forecast.hourly.temperature_2m[index]}°C
				</li>
				))}
			</ul>
			</div>
		)}
		{localStorage.getItem('access') ?
			<div>
			<h2>Последние запросы</h2>
			<ul>
				{recents.map((city, index) => (
				<li key={index} onClick={() => handleSelect(city)}>
					{city.city_name}, {city.country}
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
