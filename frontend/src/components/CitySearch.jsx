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
        <div className="col-span-full px-150">
              <div className="mt-2">
                <input
                    type="text"
                    value={query}
                    placeholder="Введите город"
                    onChange={(e) => setQuery(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {loading && <div>Загрузка...</div>}
                <ul className="overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm">
                    {suggestions.map((city, index) => (
                    <li 
                    className="group relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden" 
                    key={index} onClick={() => handleSelect(city)}>
                        {city.city}, {city.country}
                    </li>
                    ))}
                </ul>
              </div>
            </div>
        // <div>
        // <input
        //     type="text"
        //     value={query}
        //     placeholder="Введите город"
        //     onChange={(e) => setQuery(e.target.value)}
        // />
        // {loading && <div>Загрузка...</div>}
        // <ul>
        //     {suggestions.map((city, index) => (
        //     <li key={index} onClick={() => handleSelect(city)}>
        //         {city.city}, {city.country}
        //     </li>
        //     ))}
        // </ul>
        // </div>
    );
};

export default CitySearch;
