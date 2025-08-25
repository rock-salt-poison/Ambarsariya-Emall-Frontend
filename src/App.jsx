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
import SocializeRoutes from './Routes/SocializeRoutes';
import { restoreTokens } from './store/restoreToken';
import { useDispatch } from 'react-redux';
import OrientationWarning from './Pages/OrientationWarning';

function App() {

   const dispatch = useDispatch();

  useEffect(() => {
    restoreTokens(dispatch);
  }, [dispatch]);
  
  return (
    <>
    {/* <OrientationWarning /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:title/:id" element={<Notice />} />
        <Route path="/clock" element={<ClockPage />} />
        <Route path="/sell/*" element={<SellRoutes />} />
        <Route
          path="/serve/*"
          element={<ServeRoutes /> }
        />
        <Route
          path="/socialize/*"
          element={<SocializeRoutes /> }
        />
      </Routes>
    </>
  );
}

export default App;
