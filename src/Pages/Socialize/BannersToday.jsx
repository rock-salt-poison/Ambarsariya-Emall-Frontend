import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import UserBadge from '../../UserBadge';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getNearbyBanners } from '../../API/fetchExpressAPI';
import { checkLocationPermission } from '../../API/LocationPermission';
import hornSound from '../../Utils/audio/horn-sound.mp3';
import frameBg from '../../Utils/images/Socialize/banners/banner_frame_img.webp';
import BannerDetailPopup from '../../Components/Socialize/BannerDetailPopup';

function BannersToday() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userAccessToken);
  const [audio] = useState(new Audio(hornSound));
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationPermission, setLocationPermission] = useState('off');
  const [userLocation, setUserLocation] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  useEffect(() => {
    checkLocationPermission(setLocationPermission);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userLocation && locationPermission === 'on' && token) {
      fetchBanners();
    } else {
      setLoading(false);
    }
  }, [userLocation, locationPermission, token]);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await getNearbyBanners(
        userLocation.latitude,
        userLocation.longitude,
        token
      );
      // Handle different response structures
      if (response && response.banners) {
        setBanners(response.banners || []);
      } else if (response && response.data) {
        setBanners(response.data || []);
      } else if (Array.isArray(response)) {
        setBanners(response);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    const target = e.target.closest('.back_button');
    if (target) {
      target.classList.add('reduceSize3');
      audio.play();
      
      setTimeout(() => {
        target.classList.remove('reduceSize3');
      }, 300);
      
      setTimeout(() => {
        navigate('../banners');
      }, 1000);
    }
  };

  const handleBannerClick = (banner) => {
    audio.play();
    setSelectedBanner(banner);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedBanner(null);
  };

  // Split banners into two arrays for left and right sliders
  const leftBanners = banners.slice(0, Math.ceil(banners.length / 2));
  const rightBanners = banners.slice(Math.ceil(banners.length / 2));

  // If no banners, create placeholder data for demonstration
  const placeholderBanners = [
    { id: 1, image_src: frameBg },
    { id: 2, image_src: frameBg },
    { id: 2, image_src: frameBg },
    { id: 2, image_src: frameBg },
    { id: 3, image_src: frameBg },
    { id: 4, image_src: frameBg },
  ];

  const displayBanners = banners.length > 0 ? banners : placeholderBanners;
  const leftDisplay = displayBanners.slice(0, Math.ceil(displayBanners.length / 2));
  const rightDisplay = displayBanners.slice(Math.ceil(displayBanners.length / 2));

  return (
    <Box className="banners_today_wrapper">
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
{/*       
      <Box className="row header_row">
        
        <Box className="col heading_container">
          <Typography className="heading" variant="h2">
            Banners Today
          </Typography>
        </Box>
      </Box> */}

      <Box className="row banners_content_row">
        {/* Left Vertical Slider */}
        <Box className="col left_slider_container">
          <Swiper
            slidesPerView="auto"
            spaceBetween={10}
            direction="vertical"
            mousewheel={true}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            speed={3000}
            modules={[Autoplay]}
            className="banner_swiper left_swiper"
          >
            {leftDisplay.map((banner, index) => (
              <SwiperSlide key={banner.id || index} className="banner_slide">
                <Box className="banner_frame" onClick={() => handleBannerClick(banner)} style={{ cursor: 'pointer' }}>
                  <Box
                    component="img"
                    src={banner.image_src || banner.banner_image || banner.image_url || banner.image || placeholderBanners[index % placeholderBanners.length].image_src}
                    alt={banner.business_name || banner.area_name || `Banner ${index + 1}`}
                    className="banner_image"
                    onError={(e) => {
                      e.target.src = placeholderBanners[index % placeholderBanners.length].image_src;
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Center Content Area */}
        <Box className="col center_content">
          <Typography variant="h3" className="center_title">
            Today's Banners
          </Typography>
          {banners.length === 0 && !loading && (
            <Typography variant="body1" className="no_banners_message">
              No banners available at the moment
            </Typography>
          )}
        </Box>

        {/* Right Vertical Slider */}
        <Box className="col right_slider_container">
        <Box className="back_button" onClick={handleBackClick}>
          <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="login"
          />
        </Box>
          <Swiper
            slidesPerView="auto"
            spaceBetween={10}
            direction="vertical"
            mousewheel={true}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: false, // Reverse direction for right slider
            }}
            speed={3000}
            modules={[Autoplay]}
            className="banner_swiper right_swiper"
          >
            {rightDisplay.map((banner, index) => (
              <SwiperSlide key={banner.id || index} className="banner_slide">
                <Box className="banner_frame" onClick={() => handleBannerClick(banner)} style={{ cursor: 'pointer' }}>
                  <Box
                    component="img"
                    src={banner.image_src || banner.banner_image || banner.image_url || banner.image || placeholderBanners[index % placeholderBanners.length].image_src}
                    alt={banner.business_name || banner.area_name || `Banner ${index + 1}`}
                    className="banner_image"
                    onError={(e) => {
                      e.target.src = placeholderBanners[index % placeholderBanners.length].image_src;
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>

      {/* Banner Detail Popup */}
      <BannerDetailPopup
        open={popupOpen}
        handleClose={handleClosePopup}
        banner={selectedBanner}
      />
    </Box>
  );
}

export default BannersToday;
