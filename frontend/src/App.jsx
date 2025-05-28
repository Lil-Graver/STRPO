import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WeatherPage from './pages/WeatherPage';
import HistoryPage from './pages/HistoryPage';
import StatsPage from './pages/StatsPage';

const backend_base = 'http://localhost:8000/api/';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherPage backend_base={backend_base} />} />
          <Route path="/login" element={<LoginPage backend_base={backend_base} />} />
          <Route path="/register" element={<RegisterPage backend_base={backend_base} />} />
          <Route path="/history" element={<HistoryPage backend_base={backend_base} />} />
          <Route path="/stats" element={<StatsPage backend_base={backend_base} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App