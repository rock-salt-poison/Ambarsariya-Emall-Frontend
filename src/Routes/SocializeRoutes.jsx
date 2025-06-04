import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import Socialize from '../Pages/Socialize';
import CityFeeds from '../Pages/Socialize/CityFeeds';
import Updates from '../Pages/Socialize/Updates';
import CityLights from '../Pages/Socialize/CityLights';
import { useSelector } from 'react-redux';
import { getUser } from '../API/fetchExpressAPI';
import { Box, CircularProgress } from '@mui/material';
import Login from "../Pages/Socialize/Login";

function SocializeRoutes() {
  const token = useSelector((state) => state.auth.userAccessToken);
  const [checkUser, setCheckUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserType = async () => {
      if (token) {
        try {
          setLoading(true);
          const user_type = (await getUser(token))[0].user_type;
          setCheckUser(user_type);
          console.log(user_type);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserType();
  }, [token]);

  const ProtectedRoute = ({ shopElement, memberElement }) => {
    if (loading) {
      return (
        <Box className="loading">
          <CircularProgress />
        </Box>
      );
    }

    if (checkUser === "shop") {
      return shopElement;
    } else if (checkUser === "member") {
      return memberElement;
    } 
  };

  // Optional: Block all route rendering until user check is done
  // if (token && (loading || !checkUser)) {
  //   return (
  //     <Box className="loading">
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <Routes>
      <Route path="/" element={token && <Socialize />} />
      <Route path="/login" element={<Login />} />
      <Route path="/city-feeds" element={
        <ProtectedRoute shopElement={<CityFeeds />} memberElement={<CityFeeds />} />
      } />
      <Route path="/updates" element={
        <ProtectedRoute shopElement={<Updates />} memberElement={<Updates />} />
      } />
      <Route path="/city-lights" element={
        <ProtectedRoute shopElement={<CityLights />} memberElement={<CityLights />} />
      } />
    </Routes>
  );
}


export default SocializeRoutes;
