import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ backend_base }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await axios.post(`${backend_base}users/auth/jwt/create/`, {
      username, password
    });
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    navigate('/');
  };

  return (
    <div>
      <h2>Вход</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Имя пользователя" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default LoginPage;
