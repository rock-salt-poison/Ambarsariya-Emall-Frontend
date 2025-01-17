import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './styles/style.scss';
import './styles/swal.scss';
import Home from './Pages/Home';
import ClockPage from './Pages/ClockPage';
import SellRoutes from './Routes/SellRoutes';
import ServeRoutes from './Routes/ServeRoutes';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import Notice from './Pages/Notice';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/AmbarsariyaMall" element={<Home />} />
        <Route path="/AmbarsariyaMall/notice" element={<Notice />} />
        <Route path="/AmbarsariyaMall/notice/:title/:id" element={<Notice />} />
        <Route path="/AmbarsariyaMall/clock" element={<ClockPage />} />
        <Route path="/AmbarsariyaMall/sell/*" element={<SellRoutes />} />
        <Route
          path="/AmbarsariyaMall/serve/*"
          element={<ServeRoutes /> }
        />
      </Routes>
    </>
  );
}

export default App;
