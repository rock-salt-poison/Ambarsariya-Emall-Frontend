import React from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import Socialize from '../Pages/Socialize';


function SocializeRoutes() {
  

  return (
    <Routes>
      <Route path="/" element={<Socialize />} />
      
    </Routes>
  );
}

export default SocializeRoutes;
