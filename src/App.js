import React, { Fragment } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PhoneBook from './components/PhoneBook';
import Login from './components/login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={< PhoneBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App