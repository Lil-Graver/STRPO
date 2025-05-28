// src/components/CitySearch.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const CitySearch = ({ onForecastReceived, backend_base }) => {
const [query, setQuery] = useState('');
const [suggestions, setSuggestions] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
    const delayDebounceFn = setTimeout(async() => {
        if (query.length > 0) {
            setLoading(true);
            try {
                const response = await axios.get(`${backend_base}autocomplete/?q=${query}`)
                setSuggestions(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false)
            }
        } else {
            setSuggestions([]);
        }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
}, [query]);

const handleSelect = (city) => {
    setQuery(`${city.city}, ${city.country}`);
    setSuggestions([]);

    const headers = localStorage.getItem('access') ? {Authorization: `Bearer ${localStorage.getItem('access')}`} : {}

    // получить прогноз
    axios.get(`${backend_base}forecast/`, {
        headers,
        params: {
            lat: city.latitude,
            lon: city.longitude,
            city: city.city,
            country: city.country
        }
    }).then(res => {
        onForecastReceived(res.data);
    });
};

return (
    <div>
    <input
        type="text"
        value={query}
        placeholder="Введите город"
        onChange={(e) => setQuery(e.target.value)}
    />
    {loading && <div>Загрузка...</div>}
    <ul>
        {suggestions.map((city, index) => (
        <li key={index} onClick={() => handleSelect(city)}>
            {city.city}, {city.country}
        </li>
        ))}
    </ul>
    </div>
);
};

export default CitySearch;
