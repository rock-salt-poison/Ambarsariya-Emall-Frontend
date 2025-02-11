import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import Switch_On_Off from '../../Components/Form/Switch_On_Off';

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
  const [loading, setLoading] = useState(true);
  const [switchCheckedReturn, setSwitchCheckedReturn] = useState(false);
  const [switchCheckedReview, setSwitchCheckedReview] = useState(false);
  const navigate = useNavigate();
  const { owner } = useParams();

  useEffect(() => {
    // Simulate fetching data from a database
    setTimeout(() => {
      setOrderDetails({
        orderId: '00045687',
        dateOfPurchase: '07/12/2024',
        paymentDetails: 'Direct Bank Transfer',
        serviceType: 'Delivery',
        pickupSchedule: 'Booked',
        homeVisit: '123 ABC Road',
        return: 'off'
      });
      setSwitchCheckedReturn(false);
      setSwitchCheckedReview(false);
      setLoading(false);
    }, 1000);
  }, []);

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
    return <Box className="loading"><CircularProgress /></Box> ; // Show loading indicator while fetching data
  }

  return (
    <Box className="details">
      <DetailRow title="Order Id" description={orderDetails.orderId} isClickable owner={owner} />
      <DetailRow title="Date of purchase" description={orderDetails.dateOfPurchase} />
      <DetailRow title="Payment Details" description={orderDetails.paymentDetails} />
      <DetailRow title="Service Type" description={orderDetails.serviceType} />
      <DetailRow title="Pickup Schedule" description={orderDetails.pickupSchedule} />
      <DetailRow title="Location" description={orderDetails.homeVisit} />
      <DetailRow title="Return" isReturn handleSwitchChange={handleSwitchChangeReturn} switchChecked={switchCheckedReturn} />
      <DetailRow title="Review" isReview handleSwitchChange={handleSwitchChangeReview} switchChecked={switchCheckedReview} />
    </Box>
  );
}

export default OrderDetails;
