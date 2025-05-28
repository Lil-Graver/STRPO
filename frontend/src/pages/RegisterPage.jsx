import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = ({ backend_base }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    await axios.post(`${backend_base}users/register/`, {
      username, password
    });
    navigate('/login');
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Имя пользователя" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
};

export default RegisterPage