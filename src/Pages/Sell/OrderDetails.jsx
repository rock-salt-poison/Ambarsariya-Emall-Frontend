import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import Switch_On_Off from '../../Components/Form/Switch_On_Off';
import { fetchService, get_purchaseOrderDetails } from '../../API/fetchExpressAPI';

// Reusable DetailRow component
const DetailRow = ({ title, description, isReturn = false, isReview = false, isClickable = false, handleSwitchChange, switchChecked, owner }) => (
  <Box className="detail_row">
    <Box className="col_1">
      <Typography className="title">{title}</Typography>
    </Box>
    <Box className="col_1">
      {isReturn || isReview ? (
        <Switch_On_Off checked={switchChecked} onChange={handleSwitchChange} />
      ) : isClickable ? (
        <Link to={`../${owner}/cart`} className="clickable-link">
          <Typography className="description">{description}</Typography>
        </Link>
      ) : (
        <Typography className="description">{description}</Typography>
      )}
    </Box>
  </Box>
);

// Main OrderDetails component
function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [switchCheckedReturn, setSwitchCheckedReturn] = useState(false);
  const [switchCheckedReview, setSwitchCheckedReview] = useState(false);
  const navigate = useNavigate();
  const { owner } = useParams();

  const fetchOrderDetails = async (access_token) => {
    try {
      setLoading(true);
      if (access_token) {
        const resp = await get_purchaseOrderDetails(access_token);
        if (resp.valid) {
          let service = "";
          if (resp.data[0]) {
            service = await fetch_service_type(resp.data[0].shipping_method);
            setOrderDetails({
              ...resp.data[0], 
              shipping_method: service, 
              date_of_issue: new Date(resp.data[0].date_of_issue).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })
            });
          }
          console.log(resp.data[0]);
        }
      }
    } catch (e) {
      console.log(e);
    }finally{
      setLoading(false);
    }
  };


  const fetch_service_type = async (id) => {
    try {
      setLoading(true);
      if (id) {
        const service = await fetchService(id);
        console.log(service?.[0]?.service);
        return service?.[0]?.service;
      }
    } catch (e) {
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    // Simulate fetching data from a database
    if(owner){
      fetchOrderDetails(owner);
      setSwitchCheckedReturn(false);
      setSwitchCheckedReview(false);
    }
    // setTimeout(() => {
    //   setOrderDetails({
    //     orderId: '00045687',
    //     dateOfPurchase: '07/12/2024',
    //     paymentDetails: 'Direct Bank Transfer',
    //     serviceType: 'Delivery',
    //     pickupSchedule: 'Booked',
    //     homeVisit: '123 ABC Road',
    //     return: 'off'
    //   });
    //   setLoading(false);
    // }, 1000);
  }, [owner]);

  const handleSwitchChangeReturn = (event) => {
    const isChecked = event.target.checked;
    setSwitchCheckedReturn(isChecked);
    if (isChecked) {
      setTimeout(() => {
        navigate(`../${owner}/return`);
      }, 400);
    }
  };

  const handleSwitchChangeReview = (event) => {
    const isChecked = event.target.checked;
    setSwitchCheckedReview(isChecked);
    if (isChecked) {
      setTimeout(() => {
        navigate(`../${owner}/review`);
      }, 400);
    }
  };

  if (loading) {
    return <Box className="loading"><CircularProgress /></Box>; // Show loading indicator while fetching data
  }

  return (
    <Box className="details">
      <DetailRow title="Order Id" description={orderDetails?.po_no} isClickable owner={owner} />
      <DetailRow title="Date of purchase" description={orderDetails?.date_of_issue} />
      <DetailRow title="Payment Details" description={orderDetails?.payment_method} />
      <DetailRow title="Service Type" description={orderDetails?.shipping_method} />
      <DetailRow title="Pickup Schedule" description={orderDetails?.pickupSchedule || '-'} />
      <DetailRow title="Location" description={orderDetails?.shipping_address} />
      <DetailRow title="Return" isReturn handleSwitchChange={handleSwitchChangeReturn} switchChecked={switchCheckedReturn} />
      <DetailRow title="Review" isReview handleSwitchChange={handleSwitchChangeReview} switchChecked={switchCheckedReview} />
    </Box>
  );
}

export default OrderDetails;
