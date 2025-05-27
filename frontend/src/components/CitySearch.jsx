// src/components/CitySearch.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

console.log(import.meta.env.VITE_API_BASE);

const CitySearch = ({ onForecastReceived }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        setLoading(true);
        axios
          .get(`http://localhost:8000/api/autocomplete/?q=${query}`)
          .then(res => {
            setSuggestions(res.data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (city) => {
    setQuery(`${city.city}, ${city.country}`);
    setSuggestions([]);

    // получить прогноз
    axios.get(`http://localhost:8000/api/forecast/`, {
      params: {
        lat: city.latitude,
        lon: city.longitude,
        city: city.city,
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
