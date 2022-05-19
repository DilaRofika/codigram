import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Login from './components/Login';
import HomePage from './pages/HomePage';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, []);

  console.log('HomePage')
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default App;
