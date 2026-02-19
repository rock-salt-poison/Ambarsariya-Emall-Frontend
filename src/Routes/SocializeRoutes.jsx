import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import Socialize from "../Pages/Socialize";
import CityFeeds from "../Pages/Socialize/CityFeeds";
import Updates from "../Pages/Socialize/Updates";
import CityLights from "../Pages/Socialize/CityLights";
import { useSelector } from "react-redux";
import { getUser } from "../API/fetchExpressAPI";
import { Box, CircularProgress } from "@mui/material";
import Login from "../Pages/Socialize/Login";
import CityJunctions from "../Pages/Socialize/CityJunctions";
import TermsAndConditions from "../Pages/Socialize/TermsAndConditions";
import CoHelpers from "../Pages/Socialize/CoHelpers";
import Jobs_offered from "../Pages/Serve/Jobs_offered";
import ConnectWithUtilities from "../Pages/Socialize/ConnectWithUtilities";
import UtilitiesMain from "../Pages/Socialize/UtilitiesMain";
import StandardFit from "../Pages/Socialize/StandardFit";
import MunicipalCorporation from "../Pages/Socialize/MunicipalCorporation";
import Banners from "../Pages/Socialize/Banners";
import BannerMain from "../Pages/Socialize/BannerMain";

function SocializeRoutes() {
  const token = useSelector((state) => state.auth.userAccessToken);
  const [checkUser, setCheckUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      if (token) {
        try {
          const response = await getUser(token);
          const user_type = response[0]?.user_type;
          setCheckUser(user_type || null);
        } catch (error) {
          console.error(error);
          setCheckUser(null); // fallback
        }
      }
      setLoading(false);
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

    if (checkUser === "shop") return shopElement;
    if (checkUser === "member") return memberElement;
    if (checkUser === "merchant") return shopElement;

    return <Navigate to="../login" />;
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
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Socialize />} />
      <Route
        path="/city-feeds"
        element={
          <ProtectedRoute
            shopElement={<CityFeeds />}
            memberElement={<CityFeeds />}
          />
        }
      />
      <Route
        path="/updates"
        element={
          <ProtectedRoute
            shopElement={<Updates />}
            memberElement={<Updates />}
          />
        }
      />
      <Route
        path="/city-lights"
        element={
          <ProtectedRoute
            shopElement={<CityLights />}
            memberElement={<CityLights />}
          />
        }
      />
      <Route
        path="/city-junctions"
        element={
          <ProtectedRoute
            shopElement={<CityJunctions />}
            memberElement={<CityJunctions />}
          />
        }
      />
      <Route
        path="/city-junctions/terms-and-conditions"
        element={<TermsAndConditions />}
      />
      <Route path="/city-junctions/co-helpers" element={<ProtectedRoute
            shopElement={<CoHelpers />}
            memberElement={<CoHelpers />}
          />} />
      <Route
        path="/city-junctions/jobs-offered"
        element={
          <ProtectedRoute
            shopElement={<Jobs_offered />}
            memberElement={<Jobs_offered />}
          />
        }
      />
      <Route
        path="/city-junctions/utilities-main"
        element={
          <ProtectedRoute
            shopElement={<UtilitiesMain />}
            memberElement={<UtilitiesMain />}
          />
        }
      />
      <Route
        path="/city-junctions/connect-with-utilities"
        element={
          <ProtectedRoute
            shopElement={<ConnectWithUtilities />}
            memberElement={<ConnectWithUtilities />}
          />
        }
      />
      <Route
        path="/city-junctions/standard-fit"
        element={
          <ProtectedRoute
            shopElement={<StandardFit />}
            memberElement={<StandardFit />}
          />
        }
      />
      <Route
        path="/city-junctions/municipal-corporation"
        element={
          <ProtectedRoute
            shopElement={<MunicipalCorporation />}
            memberElement={<MunicipalCorporation />}
          />
        }
      />
      <Route
        path="/banners"
        element={
          <ProtectedRoute
            shopElement={<BannerMain />}
            memberElement={<BannerMain />}
          />
        }
      />
    </Routes>
  );
}

export default SocializeRoutes;
