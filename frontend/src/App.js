import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Login from './components/Login'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, []);

  //console.log({ user })
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='*' element={<HomePage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  );
};

export default App;
