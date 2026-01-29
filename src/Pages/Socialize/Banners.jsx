import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Dialog, DialogContent, IconButton } from '@mui/material';
import UserBadge from '../../UserBadge';
import { useSelector } from 'react-redux';
import { getNearbyBanners, getShopBanners, createBannerNotification, deleteBannerNotification, getShopUserData, getUser, get_support_page_famous_areas } from '../../API/fetchExpressAPI';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FormField from '../../Components/Form/FormField';
import CustomSnackbar from '../../Components/CustomSnackbar';
import ConfirmationDialog from '../../Components/ConfirmationDialog';
import { checkLocationPermission, handleLocationRequest } from '../../API/LocationPermission';
import hornSound from '../../Utils/audio/horn-sound.mp3';
import paint_stroke from '../../Utils/images/Socialize/paint_stroke.webp';
import big_cloud from '../../Utils/images/Socialize/city_junctions/co_helpers/big_cloud.svg';
import small_cloud from '../../Utils/images/Socialize/city_junctions/co_helpers/small_cloud.svg';
import dayjs from 'dayjs';

function Banners() {
  const token = useSelector((state) => state.auth.userAccessToken);
  const [userType, setUserType] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState('off');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [shopBanners, setShopBanners] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [audio] = useState(new Audio(hornSound));
  
  // Create banner form state
  const [bannerForm, setBannerForm] = useState({
    location_type: 'shop', // 'shop' or 'famous_area'
    area_name: '',
    address: null,
    latitude: 31.6356659,
    longitude: 74.8787496,
    radius: 1, // in km
    start_time: '',
    end_time: '',
    offer_message: '',
    famous_area_id: null, // For famous area banners
  });
  const [shopAccessToken, setShopAccessToken] = useState(null);
  const [shopNo, setShopNo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [famousAreas, setFamousAreas] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  useEffect(() => {
    checkUserType();
    checkLocationPermission(setLocationPermission);
    fetchFamousAreas();
  }, [token]);

  const fetchFamousAreas = async () => {
    try {
      const areas = await get_support_page_famous_areas();
      setFamousAreas(areas || []);
    } catch (error) {
      console.error('Error fetching famous areas:', error);
    }
  };

  useEffect(() => {
    if (userLocation && locationPermission === 'on') {
      fetchNearbyBanners();
    }
  }, [userLocation, locationPermission]);

  useEffect(() => {
    if ((userType === 'shop' || userType === 'merchant') && shopAccessToken) {
      fetchShopBanners();
    }
  }, [userType, shopAccessToken]);

  const checkUserType = async () => {
    if (token) {
      try {
        const userData = (await getUser(token))?.find((u)=>u.shop_access_token !== null);
        const type = userData?.user_type;        
        setUserType(type);
        
        if ((type === 'shop' || type === 'merchant')) {
          const shopData = await getShopUserData(userData?.shop_access_token);
          console.log(shopData);
          
          if (shopData && shopData[0]) {
            setShopAccessToken(shopData[0].shop_access_token);
            setShopNo(shopData[0].shop_no);
            setUserId(shopData[0].user_id);
            if (shopData[0].latitude && shopData[0].longitude) {
              setBannerForm(prev => ({
                ...prev,
                latitude: parseFloat(shopData[0].latitude) || 31.6356659,
                longitude: parseFloat(shopData[0].longitude) || 74.8787496,
              }));
            }
            if (shopData[0].address) {
              setBannerForm(prev => ({
                ...prev,
                address: {
                  description: shopData[0].address,
                  place_id: 'existing',
                  latitude: parseFloat(shopData[0].latitude) || 31.6356659,
                  longitude: parseFloat(shopData[0].longitude) || 74.8787496,
                  formatted_address: shopData[0].address,
                },
              }));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    }
  };

  const requestLocation = () => {
    handleLocationRequest(setLocationPermission);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setLocationPermission('on');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationPermission('off');
        }
      );
    }
  };

  const fetchNearbyBanners = async () => {
    if (!userLocation) return;
    
    setLoading(true);
    try {
      const data = await getNearbyBanners(userLocation.lat, userLocation.lng, token);
      setBanners(data.banners || []);
    } catch (error) {
      console.error('Error fetching nearby banners:', error);
      setSnackbar({
        open: true,
        message: 'Error fetching nearby banners',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchShopBanners = async () => {
    if (!shopAccessToken) return;
    
    setLoading(true);
    try {
      const data = await getShopBanners(shopAccessToken);
      console.log(data);
      
      setShopBanners(data.banners || []);
    } catch (error) {
      console.error('Error fetching shop banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBannerForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const addressData = e.target.value;
    if (addressData) {
      setBannerForm(prev => ({
        ...prev,
        address: addressData,
        latitude: addressData.latitude || prev.latitude,
        longitude: addressData.longitude || prev.longitude,
      }));
    } else {
      setBannerForm(prev => ({
        ...prev,
        address: null,
      }));
    }
  };

  const handleCreateBanner = async () => {
    if (!shopAccessToken) {
      setSnackbar({
        open: true,
        message: 'Shop access token not found',
        severity: 'error',
      });
      return;
    }

    // Validate required fields
    if (!bannerForm.start_time || !bannerForm.end_time) {
      setSnackbar({
        open: true,
        message: 'Please fill all required fields',
        severity: 'error',
      });
      return;
    }

    // Validate based on location type
    if (bannerForm.location_type === 'famous_area') {
      if (!bannerForm.famous_area_id) {
        setSnackbar({
          open: true,
          message: 'Please select a famous area',
          severity: 'error',
        });
        return;
      }
      if (!bannerForm.radius) {
        setSnackbar({
          open: true,
          message: 'Please provide a radius',
          severity: 'error',
        });
        return;
      }
    } else {
      // Shop location - validate address or coordinates
      const hasAddress = bannerForm.address && (bannerForm.address.formatted_address || bannerForm.address.description);
      const hasCoordinates = bannerForm.latitude && bannerForm.longitude;
      
      if (!hasAddress && !hasCoordinates) {
        setSnackbar({
          open: true,
          message: 'Please provide either an address or coordinates',
          severity: 'error',
        });
        return;
      }

      if (!bannerForm.radius) {
        setSnackbar({
          open: true,
          message: 'Please provide a radius',
          severity: 'error',
        });
        return;
      }
    }

    setLoading(true);
    try {
      // Send address as object (FormField format) or use coordinates
      const bannerData = {
        shop_access_token: shopAccessToken,
        shop_no: shopNo,
        user_id: userId, // Pass user_id to exclude creator from notifications
        banner_type: bannerForm.location_type === 'famous_area' ? 'famous_area' : 'regular',
        area_name: bannerForm.area_name || null,
        address: bannerForm.location_type === 'shop' ? (bannerForm.address || null) : null,
        latitude: bannerForm.location_type === 'shop' ? (bannerForm.address?.latitude || bannerForm.latitude) : null,
        longitude: bannerForm.location_type === 'shop' ? (bannerForm.address?.longitude || bannerForm.longitude) : null,
        radius: parseFloat(bannerForm.radius),
        start_time: dayjs(bannerForm.start_time).toISOString(),
        end_time: dayjs(bannerForm.end_time).toISOString(),
        offer_message: bannerForm.offer_message,
        famous_area_id: bannerForm.location_type === 'famous_area' ? parseInt(bannerForm.famous_area_id) : null,
      };

      await createBannerNotification(bannerData);
      setSnackbar({
        open: true,
        message: 'Banner notification created successfully. Nearby users will be notified!',
        severity: 'success',
      });
      setCreateDialogOpen(false);
      setBannerForm({
        location_type: 'shop',
        area_name: '',
        address: null,
        latitude: 31.6356659,
        longitude: 74.8787496,
        radius: 1,
        start_time: '',
        end_time: '',
        offer_message: '',
        famous_area_id: null,
      });
      fetchShopBanners();
    } catch (error) {
      console.error('Error creating banner:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Error creating banner notification',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e, action, data = null) => {
    const target = e.target.closest(".card, .btn, .heading_container");
    if (target) {
      target.classList.toggle("reduceSize3");
      audio.play();

      setTimeout(() => {
        target.classList.toggle("reduceSize3");
      }, 300);

      setTimeout(() => {
        if (action === 'create') {
          setCreateDialogOpen(true);
        } else if (action === 'delete' && data) {
          setBannerToDelete(data);
          setDeleteDialogOpen(true);
        }
      }, 600);
    }
  };

  const handleDeleteBanner = async () => {
    if (!bannerToDelete) return;

    setLoading(true);
    setDeleteDialogOpen(false);
    try {
      await deleteBannerNotification(bannerToDelete);
      setSnackbar({
        open: true,
        message: 'Banner deleted successfully',
        severity: 'success',
      });
      fetchShopBanners();
      if (userLocation) {
        fetchNearbyBanners();
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      setSnackbar({
        open: true,
        message: 'Error deleting banner',
        severity: 'error',
      });
    } finally {
      setLoading(false);
      setBannerToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setBannerToDelete(null);
  };

  return (
    <Box className="banners_wrapper">
      {loading && <Box className="loading"><CircularProgress /></Box>}
      
      {/* Animated Border */}
      <svg xmlns="http://www.w3.org/2000/svg" className='animated-border'>
        <rect
          rx="20"
          ry="20"
          className="line"
          height="100%"
          width="100%"
          strokeLinejoin="round"
        />
      </svg>

      {/* Decorative Clouds */}
      <Box>
        <Box
          component="img"
          src={big_cloud}
          className="big_cloud"
          alt="cloud"
        />
      </Box>
      <Box
        component="img"
        src={big_cloud}
        className="big_cloud cloud_2"
        alt="cloud"
      />

      <Box className="row">
        <Box className="col">
          <Box className="back-button-wrapper">
            <UserBadge
              handleLogoutClick="../../"
              handleBadgeBgClick={-1}
              handleLogin="login"
            />
          </Box>
        </Box>
        <Box className="col">
          <Box className="container">
            <Box className="heading_container">
              <Typography className="heading" variant="h2">
                Banner Notifications
              </Typography>
            </Box>

            {/* Shop owner: Create banner button */}
            {(userType === 'shop' || userType === 'merchant') && (
              <Box className="button_container">
                <Box 
                  className="btn btn_create" 
                  onClick={(e) => handleClick(e, 'create')}
                  sx={{ position: 'relative', cursor: 'pointer' }}
                >
                  <Box component="img" src={paint_stroke} alt="bg" className="btn_bg" />
                  <Box className="btn_content">
                    <AddIcon sx={{ mr: 1 }} />
                    <Typography>Create Banner Notification</Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* User: Request location button */}
            {userType !== 'shop' && userType !== 'merchant' && locationPermission !== 'on' && (
              <Box className="button_container">
                <Box 
                  className="btn btn_location" 
                  onClick={requestLocation}
                  sx={{ position: 'relative', cursor: 'pointer' }}
                >
                  <Box component="img" src={paint_stroke} alt="bg" className="btn_bg" />
                  <Box className="btn_content">
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography>Enable Location to See Nearby Banners</Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Shop owner: Show their banners */}
            {(userType === 'shop' || userType === 'merchant') && (
              <Box className="sub_container">
                <Typography className="heading" variant="h3" sx={{ mb: 2 }}>
                  Your Banner Notifications
                </Typography>
                {shopBanners.length === 0 ? (
                  <Box className="empty_state">
                    <Box
                      component="img"
                      src={small_cloud}
                      alt="small_cloud"
                      className="small_cloud"
                    />
                    <Typography>No banners created yet. Create one to get started!</Typography>
                  </Box>
                ) : (
                  <Box className="cards_container">
                    {shopBanners.map((banner, index) => (
                      <Box key={banner.id} className="card banner_card_shop">
                        <Box component="img" src={paint_stroke} alt="bg" className="card_bg" />
                        <Box className="card_body">
                          <Box className="card_header">
                            <Typography className="heading" variant="h4">
                              {banner.area_name}
                            </Typography>
                          </Box>
                          <Box className="card_content">
                            <Typography variant="body2" className="card_info">
                              <strong>Radius:</strong> {banner.radius} km
                            </Typography>
                            <Typography variant="body2" className="card_info">
                              <strong>Active:</strong> {dayjs(banner.start_time).format('YYYY-MM-DD, HH:mm:ss A')} - {dayjs(banner.end_time).format('YYYY-MM-DD, HH:mm:ss A')}
                            </Typography>
                            {banner.offer_message && (
                              <Typography variant="body2" className="card_message">
                                {banner.offer_message}
                              </Typography>
                            )}
                          </Box>
                          <Box className="card_actions">
                            <Button
                              className="btn btn_delete"
                              onClick={(e) => handleClick(e, 'delete', banner.id)}
                              startIcon={<DeleteIcon />}
                            >
                              Delete
                            </Button>
                          </Box>
                        </Box>
                        {/* Decorative small cloud for every 3rd card */}
                        {index % 3 === 2 && (
                          <Box
                            component="img"
                            src={small_cloud}
                            alt="small_cloud"
                            className="small_cloud card_cloud"
                          />
                        )}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            )}

            {/* User: Show nearby banners with mirror effect */}
            {userType !== 'shop' && userType !== 'merchant' && locationPermission === 'on' && (
              <Box className="sub_container">
                <Typography className="heading" variant="h3" sx={{ mb: 2 }}>
                  Nearby Banner Notifications
                </Typography>
                {banners.length === 0 ? (
                  <Box className="empty_state">
                    <Box
                      component="img"
                      src={small_cloud}
                      alt="small_cloud"
                      className="small_cloud"
                    />
                    <Typography>No nearby banners at the moment. Check back later!</Typography>
                  </Box>
                ) : (
                  <Box className="cards_container">
                    {banners.map((banner, index) => (
                      <Box
                        key={banner.id}
                        className="card banner_card"
                        sx={{
                          transform: `scale(${banner.scale})`,
                          opacity: banner.opacity,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Box component="img" src={paint_stroke} alt="bg" className="card_bg" />
                        <Box className="card_body">
                          <Box className="card_header">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocationOnIcon sx={{ color: 'primary.main' }} />
                              <Typography className="heading" variant="h4">
                                {banner.business_name}
                              </Typography>
                            </Box>
                            <Typography variant="h5" className="card_area">
                              {banner.area_name}
                            </Typography>
                          </Box>
                          <Box className="card_content">
                            {banner.offer_message && (
                              <Typography variant="body1" className="card_message">
                                {banner.offer_message}
                              </Typography>
                            )}
                            <Box className="card_meta">
                              <Typography variant="caption" className="card_meta_item">
                                <strong>Distance:</strong> {banner.distance.toFixed(2)} km
                              </Typography>
                              <Typography variant="caption" className="card_meta_item">
                                <strong>Clarity:</strong> {banner.visual_clarity.toFixed(0)}%
                              </Typography>
                            </Box>
                            <Typography variant="caption" className="card_validity">
                              Valid until: {dayjs(banner.end_time).format('YYYY-MM-DD, HH:mm:ss A')}
                            </Typography>
                          </Box>
                        </Box>
                        {/* Decorative small cloud for every 3rd card */}
                        {index % 3 === 2 && (
                          <Box
                            component="img"
                            src={small_cloud}
                            alt="small_cloud"
                            className="small_cloud card_cloud"
                          />
                        )}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Create Banner Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
        className="banner_dialog"
      >
        <DialogContent className="dialog_content">
          <Box className="dialog_header">
            <Typography className="heading" variant="h3">
              Create Banner Notification
            </Typography>
            <IconButton 
              className="close_button"
              onClick={() => setCreateDialogOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <form onSubmit={(e) => { e.preventDefault(); handleCreateBanner(); }} className="banner_form">
            {/* Location Type Selector */}
            <FormField
              label="Banner Location"
              name="location_type"
              value={bannerForm.location_type}
              onChange={handleChange}
              type="select"
              required
              options={[
                { value: 'shop', label: 'Shop Location' },
                { value: 'famous_area', label: 'Famous Area' },
              ]}
            />

            {/* Famous Area Dropdown - shown only when famous_area is selected */}
            {bannerForm.location_type === 'famous_area' && (
              <>
                <FormField
                  label="Select Famous Area"
                  name="famous_area_id"
                  value={bannerForm.famous_area_id || ''}
                  onChange={handleChange}
                  type="select"
                  required
                  options={famousAreas.map(area => ({
                    value: area.id,
                    label: `${area.area_title} - ${area.area_address}`,
                  }))}
                />
                <FormField
                  label="Radius (km)"
                  name="radius"
                  value={bannerForm.radius}
                  onChange={handleChange}
                  type="number"
                  required
                  placeholder="0.1 to 50"
                />
              </>
            )}

            {/* Shop Location Fields - shown only when shop location is selected */}
            {bannerForm.location_type === 'shop' && (
              <>
                <FormField
                  label="Area Name (e.g., Novelty, Amritsar)"
                  name="area_name"
                  value={bannerForm.area_name}
                  onChange={handleChange}
                  type="text"
                  required
                />

                <FormField
                  label="Address (Search and select location)"
                  name="address"
                  value={bannerForm.address}
                  onChange={handleAddressChange}
                  type="address"
                  required
                />

                <Box className="form_row">
                  <FormField
                    label="Latitude"
                    name="latitude"
                    value={bannerForm.latitude}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                  <FormField
                    label="Longitude"
                    name="longitude"
                    value={bannerForm.longitude}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </Box>
                <FormField
                  label="Radius (km)"
                  name="radius"
                  value={bannerForm.radius}
                  onChange={handleChange}
                  type="number"
                  required
                  placeholder="0.1 to 50"
                />

              </>
            )}

            <Box className="form_row">
              <FormField
                label="Start Time"
                name="start_time"
                value={bannerForm.start_time}
                onChange={handleChange}
                type="datetime-local"
                required
              />
              <FormField
                label="End Time"
                name="end_time"
                value={bannerForm.end_time}
                onChange={handleChange}
                type="datetime-local"
                required
              />
            </Box>

            <FormField
              label="Offer Message"
              name="offer_message"
              value={bannerForm.offer_message}
              onChange={handleChange}
              type="textarea"
              rows={3}
              placeholder="Visit our store to avail special offers!"
            />

            <Box className="dialog_actions">
              <Button 
                className="btn btn_cancel"
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="btn btn_submit"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Create Banner'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteBanner}
        title="Delete Banner"
        message="Are you sure you want to delete this banner? This action cannot be undone."
        confirmBtnText="Delete"
        closeBtnText="Cancel"
        optionalCname="logoutDialog"
      />
    </Box>
  );
}

export default Banners;
