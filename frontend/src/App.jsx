import CitySearch from './components/CitySearch';
import { useState } from 'react';

function App() {
  const [forecast, setForecast] = useState(null);

  return (
    <div>
      <h1>Прогноз погоды</h1>
      <CitySearch onForecastReceived={setForecast} />
      {forecast && (
        <div>
          <h2>Температура по часам</h2>
          <ul>
            {forecast.hourly.time.map((time, index) => (
              <li key={index}>
                {time}: {forecast.hourly.temperature_2m[index]}°C
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
