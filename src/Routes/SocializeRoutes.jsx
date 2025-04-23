import React from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import Socialize from '../Pages/Socialize';
import CityFeeds from '../Pages/Socialize/CityFeeds';


function SocializeRoutes() {
  

  return (
    <Routes>
      <Route path="/" element={<Socialize />} />
      <Route path="/city-feeds" element={<CityFeeds />} />
      
    </Routes>
  );
}

export default SocializeRoutes;
