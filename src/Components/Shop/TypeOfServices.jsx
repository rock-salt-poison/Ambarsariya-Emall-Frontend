import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import pickup from '../../Utils/images/Sell/shop_details/pickup.svg';
import delivery from '../../Utils/images/Sell/shop_details/delivery.webp';
import home_visit from '../../Utils/images/Sell/shop_details/home_visit.webp';
import takeaway from '../../Utils/images/Sell/shop_details/takeaway.webp';
import { Link } from 'react-router-dom'
import CardBoardPopup from '../CardBoardPopupComponents/CardBoardPopup';
import ServiceType from '../Cart/ServiceType/ServiceType';
import Delivery from '../Cart/ServiceType/Delivery';
import Pickup from '../Cart/ServiceType/Pickup';
import Visit from '../Cart/ServiceType/Visit';
import TakeAway from '../Cart/ServiceType/TakeAway';
import { getUser, updateEshopServiceTypes, getShopTakeawaySettings, updateShopTakeawayAvailability } from '../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';
import CustomSnackbar from '../CustomSnackbar';

function TypeOfServices({services_type, data}) {
    // Create services array dynamically to pass shop data to ServiceType
    
    const [selectedServices, setSelectedServices] = useState(new Set());
    const [disabledServices, setDisabledServices] = useState(new Set());
    const [openServicePopup, setOpenServicePopup] = useState(null);
    const token = useSelector((state) => state.auth.userAccessToken);
    const [openDashboard, setOpenDashboard] = useState(false);
    const [loading, setLoading] = useState(false);
    const [takeawayAvailable, setTakeawayAvailable] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const services = React.useMemo(() => [
        {id: 1, type:'Delivery', icon:delivery, popupContent: <Delivery />,
            cName: "service_type_popup delivery",},
        {id: 2, type:'Home Visit', icon:home_visit, popupContent: <Visit />,
            cName: "service_type_popup delivery visit"},
        {id: 3, type:'Pickup', icon:pickup, popupContent: <ServiceType shop_no={data?.shop_no} shopAccessToken={data?.shop_access_token} />,
            cName: "service_type_popup service",},
        {id: 4, type:'Take Away', icon:takeaway, popupContent: <TakeAway title="Take Away" fieldSet="cart" shop_no={data?.shop_no} shopAccessToken={data?.shop_access_token} handleClose={() => setOpenServicePopup(null)} />,
            cName: "service_type_popup pickup"},
    ], [data?.shop_no, data?.shop_access_token]);

    // Initialize disabled services based on current services_type and takeaway_available
    useEffect(() => {
        const initialDisabled = new Set();
        
        if (services_type && services_type.length > 0) {
            services.forEach(service => {
                if (!services_type.includes(service.type)) {
                    initialDisabled.add(service.id);
                }
            });
        }
        
        // If TakeAway is not available in DB, disable it
        if (!takeawayAvailable) {
            initialDisabled.add(4); // TakeAway id is 4
        } else {
            // If TakeAway is available, make sure it's not disabled (unless it's not in services_type)
            if (services_type && services_type.includes('Take Away')) {
                initialDisabled.delete(4);
            }
        }
        
        setDisabledServices(initialDisabled);
    }, [services_type, services, takeawayAvailable]);

    useEffect(() => {
        if(token){
            fetch_user(token);
        }
    }, [token]);

    const fetch_user = async (token) => {
        const res = (await getUser(token))?.find((u)=>u.shop_no !== null);
        if(data.shop_access_token === res?.shop_access_token){
            setOpenDashboard(true);
        }else {
            setOpenDashboard(false);
        }
    }

    // Fetch takeaway settings to check if takeaway is available
    useEffect(() => {
        const fetchTakeawaySettings = async () => {
            if (!data?.shop_no) return;
            
            try {
                const response = await getShopTakeawaySettings(data.shop_no);
                if (response?.exists && response?.data) {
                    setTakeawayAvailable(response.data.takeaway_available === true);
                } else {
                    setTakeawayAvailable(false);
                }
            } catch (error) {
                console.error('Error fetching takeaway settings:', error);
                setTakeawayAvailable(false);
            }
        };
        
        fetchTakeawaySettings();
    }, [data?.shop_no]);

    console.log(data);

    // Calculate and update type_of_service in database
    const updateServiceTypesInDB = async (newDisabledServices) => {
        try {
            setLoading(true);
            // Get enabled service IDs (not in disabled set)
            const enabledServiceIds = services
                .filter(service => !newDisabledServices.has(service.id))
                .map(service => service.id);
            
            const updateData = {
                shop_access_token: data.shop_access_token,
                type_of_service: enabledServiceIds,
            };

            const resp = await updateEshopServiceTypes(updateData);
            
            // If TakeAway (id: 4) is being toggled, also update takeaway_available in database
            const takeawayWasDisabled = disabledServices.has(4);
            const takeawayIsDisabled = newDisabledServices.has(4);
            
            if (takeawayWasDisabled !== takeawayIsDisabled) {
                // TakeAway state changed, update only takeaway_available
                try {
                    await updateShopTakeawayAvailability({
                        shop_no: data.shop_no,
                        takeaway_available: !takeawayIsDisabled // true if enabled, false if disabled
                    });
                    // Update local state
                    setTakeawayAvailable(!takeawayIsDisabled);
                } catch (takeawayError) {
                    console.error('Error updating takeaway availability:', takeawayError);
                    // Don't fail the whole operation, just log the error
                }
            }
            
            setSnackbar({
                open: true,
                message: resp.message || 'Service types updated successfully',
                severity: 'success',
            });
        } catch (error) {
            console.error('Error updating service types:', error);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Error updating service types',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleServiceTypeClick = async (e, service) => {
        // If openDashboard is true, toggle disabled state and update database
        if (openDashboard) {
            setDisabledServices((prevDisabledServices) => {
                const newDisabledServices = new Set(prevDisabledServices);
                if (newDisabledServices.has(service.id)) {
                    newDisabledServices.delete(service.id);
                } else {
                    newDisabledServices.add(service.id);
                }
                console.log('Disabled Services:', Array.from(newDisabledServices));
                
                // Update database with new service types (and takeaway_available if TakeAway)
                updateServiceTypesInDB(newDisabledServices);
                
                return newDisabledServices;
            });
            return;
        }
        
        // For non-dashboard users, only open popup if service is not disabled
        if (!disabledServices.has(service.id)) {
            setOpenServicePopup((prev) => (prev === service.id ? null : service.id));
        } else {
            e.preventDefault();
        }
    };

    
  return (
    <Box className="services_wrapper">
        <Typography variant="h2">Type of services</Typography>
        <Box className="services_container">
            {services?.map((item) =>  {
                const isDisabled = disabledServices.has(item.id);
                return (
                    <Link
                        key={item.id}
                        onClick={(e) => handleServiceTypeClick(e, item)}
                        className={`col ${isDisabled ? 'disabled' : ''}`}
                        style={{ 
                            pointerEvents: isDisabled && !openDashboard ? 'none' : 'auto', 
                            opacity: isDisabled ? 0.8 : 1, 
                            cursor: isDisabled && !openDashboard ? 'not-allowed' : 'pointer' 
                        }}
                    >
                        <Box
                            component="img"
                            src={item.icon}
                            alt={item.type}
                            className={`service_icon ${isDisabled ? 'disabled' : ''}`}
                        />
                        <Typography className={`service_type ${isDisabled ? 'disabled' : ''}`}> {item.type}</Typography>
                    </Link>
                );
            })}    
            <CardBoardPopup
                customPopup={true}
                open={openServicePopup !== null}
                handleClose={() => setOpenServicePopup(null)}
                body_content={services.find(s => s.id === openServicePopup)?.popupContent}
                optionalCName={services.find(s => s.id === openServicePopup)?.cName}
            />
        </Box>
        <CustomSnackbar
            open={snackbar.open}
            handleClose={() => setSnackbar({ ...snackbar, open: false })}
            message={snackbar.message}
            severity={snackbar.severity}
        />
    </Box>
  )
}

export default TypeOfServices