import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DiscountField from '../Form/DiscountField';
import AddIcon from '@mui/icons-material/Add';
import { addCoupon } from '../../store/couponsSlice';
import CustomSnackbar from '../CustomSnackbar';
import { HandleRazorpayPayment } from '../../API/HandleRazorpayPayment';
import { getShopUserData, getUser, post_createFundAccount } from '../../API/fetchExpressAPI';
import { useParams } from 'react-router-dom';

function RsTenPerDayContent({ onClose }) {
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const rsTenPerDay = useSelector((state) => state.coupon.rsTenPerDay);
  const user_access_token = useSelector((state) => state.auth.userAccessToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const {token} = useParams();

  const [discounts, setDiscounts] = useState({
    basicEdition: { checked: false },
    standardEdition: { checked: false },
    premiumEdition: { checked: false },
    productUpload: { checked: true },
  });

  useEffect(() => {
    if (rsTenPerDay?.discounts) {
      setDiscounts(rsTenPerDay.discounts);
    }
  }, [rsTenPerDay]);

  useEffect(() => {
    if (user_access_token) {
      const fetchUserType = async () => {
        try {
          setLoading(true);
          const userData = (await getUser(user_access_token))?.find((u)=>u.shop_no !== null);
          

          if (userData?.user_type === "shop" || userData?.user_type === "merchant") {
            try{
              setLoading(true);
              const response = await getShopUserData(userData?.shop_access_token);
              
              if (response && response.length > 0) {
                const data = response[0];               
                setUser(data);
              }
            }catch(e){
              console.log(e);
            }finally{
              setLoading(false);
            }
          }
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
      fetchUserType();
    }
  }, [user_access_token]);

  const handleOnChange = (event, field) => {
    const { name, value } = event.target;
    setDiscounts((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (event, field) => {
    const { checked } = event.target;
    setDiscounts((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        checked,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selected = Object.values(discounts).filter((d) => d.checked);

    if (selected.length === 0) {
      setSnackbar({
        open: true,
        message: 'Please select at least one edition.',
        severity: 'warning',
      });
      return;
    }

    try {
      // If productUpload is selected, trigger Razorpay
      if (token && discounts.productUpload?.checked) {
        const buyerDetails = {
          name: user?.full_name,         // Replace with actual user info
          email: user?.username,   // Optional
          contact: user?.phone_no_1,         // Optional
        };

        const amount = 500; // Razorpay takes amount in paisa (₹500)

        const paymentResp = await HandleRazorpayPayment({ amount, buyerDetails });

        console.log('Payment successful:', paymentResp);

        if (paymentResp?.razorpay_payment_id) {
          // 2. Create Fund Account for Shopkeeper
          const fundAccountResp = await post_createFundAccount({
            name: user?.full_name,
            contact: user?.phone_no_1,
            email: user?.username,
            upi_id: user?.upi_id,
            type: 'customer'
          })
          console.log(fundAccountResp);
          
          const fundAccountId = fundAccountResp.fundAccountId;
          console.log("Fund Account created:", fundAccountId);

          setSnackbar({
            open: true,
            message: "Payment successful!",
            severity: "success",
          });


        // setSnackbar({
        //   open: true,
        //   message: 'Payment successful. Coupon activated.',
        //   severity: 'success',
        // });
        }

      } else {
        setSnackbar({
          open: true,
          message: 'Form submitted successfully.',
          severity: 'success',
        });
      }

      // Save coupon in Redux after form is submitted or payment successful
      dispatch(addCoupon({ type: 'rsTenPerDay', coupon: { id: Date.now(), discounts } }));

      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);

    } catch (error) {
      console.error('Payment failed:', error);
      setSnackbar({
        open: true,
        message: 'Payment failed or cancelled.',
        severity: 'error',
      });
    }
  };

  const data = [
    {
      id: 1,
      name: 'basicEdition',
      description: 'Basic Infrastructure : In 300 discount coupons per year',
      disable: false,
    },
    {
      id: 2,
      name: 'standardEdition',
      description:
        'Standard Infrastructure : Rs.500 + taxes + 30 discount coupons per month',
      disable: true,
    },
    {
      id: 3,
      name: 'premiumEdition',
      description:
        'Premium Shops : Shop age must be greater than 4 yrs + Last 4 months standard shop, cost : 5000/month + 30 discount coupons',
      disable: true,
    },
  ];

  return (
    <>
    {loading && <Box className="loading"><CircularProgress/></Box>}
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="offerings_popup_form form2"
      onSubmit={handleSubmit}
    >
      {/* <Typography className="description" sx={{ textAlign: 'center' }}>
        A paid version which has minimum 4 months period.
      </Typography> */}

      <Box className="checkbox-group">
        {data.map((d) => (
          <DiscountField
            key={d.name}
            label={d.description}
            value={discounts[d.name]}
            checked={!!discounts[d.name]?.checked}
            handleOnChange={(e) => handleOnChange(e, d.name)}
            handleCheckboxChange={(e) => handleCheckboxChange(e, d.name)}
            percentagePlaceholder="4"
            field1={false}
            field2={false}
            additionalText={d.additionalText}
            disable={d?.disable}
          />
        ))}
      </Box>

        {token &&
          <>
          <Box className="description checkbox-group">
          <DiscountField
            label="Pay Rs. 500 for Stock inventory managment and for products upload"
            value={discounts.productUpload}
            checked={!!discounts.productUpload?.checked}
            handleOnChange={(e) => handleOnChange(e, 'productUpload')}
            handleCheckboxChange={(e) => handleCheckboxChange(e, 'productUpload')}
            percentagePlaceholder="4"
            field1={false}
            field2={false}
          />
        </Box>

      <Typography className="description dark">
        Or See the video
      </Typography>
      </>
      }

      <Box className="description total" sx={{ textAlign: 'center' }}>
        <Typography component="span" className="description">
          GST 18% applicable
        </Typography>
        {/* <AddIcon />
        <Typography component="span" className="description">
          tax
        </Typography> */}
      </Box>

      <Typography className="description">
        * FIRST QUARTER OF STANDARD SHOP IS FREE WITH BASIC SHOP
      </Typography>

      <Box className="submit_button_container">
        <Button type="submit" variant="contained" className="submit_button">
          Submit
        </Button>
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
    </>
  );
}

export default RsTenPerDayContent;
