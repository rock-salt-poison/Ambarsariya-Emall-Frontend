import React from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import Socialize from '../Pages/Socialize';
import CityFeeds from '../Pages/Socialize/CityFeeds';
import Updates from '../Pages/Socialize/Updates';
import CityLights from '../Pages/Socialize/CityLights';


function SocializeRoutes() {
  

  return (
    <Routes>
      <Route path="/" element={<Socialize />} />
      <Route path="/city-feeds" element={<CityFeeds />} />
      <Route path="/updates" element={<Updates />} />
      <Route path="/city-lights" element={<CityLights />} />
      
    </Routes>
  );
}

export default SocializeRoutes;
