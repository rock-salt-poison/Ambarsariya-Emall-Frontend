import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import Switch_On_Off from '../../Components/Form/Switch_On_Off';
import { fetchService, get_purchaseOrderDetails, getMemberEshopReview, set_visibilityMemberReview } from '../../API/fetchExpressAPI';
import ConfirmationDialog from '../../Components/ConfirmationDialog';
import CustomSnackbar from '../../Components/CustomSnackbar';

// Reusable DetailRow component
const DetailRow = ({ title, description, isReturn = false, isReview = false, isClickable = false, handleSwitchChange, switchChecked, owner,  }) => (
  <Box className="detail_row">
    <Box className="col_1">
      {
        isReview ? (
          <Link to={`../${owner}/review`}>
            <Typography className="title">{title}</Typography>
          </Link>
        ): (
          <Typography className="title">{title}</Typography>
        )
      }
    </Box>
    <Box className="col_1">
      {isReturn || isReview ? (
        <Switch_On_Off checked={switchChecked} onChange={handleSwitchChange} />
      ) : isClickable ? (
        <Link to={`../esale/life`} className="clickable-link">
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
  const [review, setReview] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
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
        navigate(`../${orderDetails?.access_token}/return`);
      }, 400);
    }
  };

  const handleSwitchChangeReview = async (event) => {
  const isChecked = event.target.checked;

  // Switch turned ON
  if (isChecked) {
    // If review exists but currently hidden, make it visible
    if (review?.visible === false) {
      try {
        setLoading(true);
        const resp = await set_visibilityMemberReview(review.review_id, 'true');
        if (resp) {
          setSnackbar({
            open: true,
            message: resp?.message || "Review made visible",
            severity: "success",
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    setSwitchCheckedReview(true);
    setTimeout(() => {
      navigate(`../${orderDetails?.access_token}/review`);
    }, 400);
  }

  // Switch turned OFF
  else {
    setOpenDialog(true);
  }
};




  const get_member_shop_reviews = async (data) => {
      try{
        setLoading(true);
        
        const resp = await getMemberEshopReview(data);
        if(resp?.data){
          setReview(resp?.data);
          setSwitchCheckedReview(resp.data.visible === true);
          // setSwitchCheckedReview(true);
        }
      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
      }
    }
  
    useEffect(()=>{
      if(orderDetails?.buyer_id && orderDetails?.seller_id){
        get_member_shop_reviews({shop_no: orderDetails?.seller_id, reviewer_id: orderDetails?.buyer_id });
      }
    }, [orderDetails?.buyer_id, orderDetails?.seller_id])

  const handleConfirm = async () => {
    try{
      setLoading(true);
      console.log(review);
      
      const resp = await set_visibilityMemberReview(review?.review_id, 'false');
      console.log(resp);
      
      if(resp){
        setSnackbar({
          open: true,
          message: resp?.message,
          severity: "success",
        });
        setSwitchCheckedReview(false);
        setReview(null);
        setOpenDialog(false);
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  const handleClose = async () => { 
    setOpenDialog(false);
    setSwitchCheckedReview(true);
  }

  

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
      <DetailRow title="Review" isReview handleSwitchChange={handleSwitchChangeReview} switchChecked={switchCheckedReview} owner={orderDetails?.access_token}/>

      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        disableAutoHide={true}
      />
      <ConfirmationDialog
        open={openDialog}
        onClose={() => handleClose()}
        onConfirm={(e)=>handleConfirm(e)}
        title="Confirm Review"
        message={`Are you sure you want to disable your review ?`}
        optionalCname="logoutDialog"
      />
    </Box>
  );
}

export default OrderDetails;
