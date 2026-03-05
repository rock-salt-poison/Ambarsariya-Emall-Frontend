import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DiscountField from '../Form/DiscountField';
import FormField from '../Form/FormField';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { addCoupon } from '../../store/couponsSlice';
import CustomSnackbar from '../CustomSnackbar';
import { getShopUserData, getUser, get_products } from '../../API/fetchExpressAPI';

function RetailerPopupContent({ onClose }) {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Get retailer coupon data from Redux store
  const retailerCoupon = useSelector((state) => state.coupon.retailer);
  const user_access_token = useSelector((state) => state.auth.userAccessToken);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
console.log(products);

  // Initialize local state for discounts
  const [discounts, setDiscounts] = useState({
    retailer_upto: { percentage: '', order_upto: '' },
    retailer_flat: { flat: '', minimum_order: '' },
    retailer_freebies: { buy: '', get: '', product_ids: [] }
  });

  // Fetch products when component loads
  useEffect(() => {
    const fetchProducts = async () => {
      if (user_access_token) {
        try {
          setLoadingProducts(true);
          const userData = (await getUser(user_access_token))?.find((u) => u?.shop_no !== null);
          
          if (userData?.user_type === "shop" || userData?.user_type === "merchant") {
            const response = await getShopUserData(userData?.shop_access_token);
            
            if (response && response.length > 0) {
              const shop_no = response[0].shop_no;
              const productsData = await get_products(shop_no);
              
              if (productsData?.valid) {
                setProducts(productsData.data || []);
              }
            }
          }
        } catch (e) {
          console.log("Error fetching products:", e);
        } finally {
          setLoadingProducts(false);
        }
      }
    };
    
    fetchProducts();
  }, [user_access_token]);

  // Sync local state with Redux when retailerCoupon data changes
  useEffect(() => {
    if (retailerCoupon && retailerCoupon.discounts) {
      // If coupon data exists in Redux, pre-fill the form
      setDiscounts(retailerCoupon.discounts);
      console.log(retailerCoupon)
    }
  }, [retailerCoupon]); // This will run when retailerCoupon changes

  // Handle form input changes
  const handleOnChange = (event, field) => {
    const { name, value } = event.target;
    setDiscounts((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [name]: value
      }
    }));
  };

  const handleCheckboxChange = (event, field) => {
    const { checked } = event.target;
    setDiscounts((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        checked,
      },
    }));
  };

  // Handle product selection for retailer_freebies
  const handleProductSelection = (event) => {
    const { value } = event.target;
    setDiscounts((prevState) => ({
      ...prevState,
      retailer_freebies: {
        ...prevState.retailer_freebies,
        product_ids: Array.isArray(value) ? value : [],
      },
    }));
  };

  // Prepare product options for FormField
  const productOptions = products.map(product => ({
    value: product.product_id,
    label: `${product.product_name}`
  }));

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(discounts);

    // Dispatch the coupon details to Redux store
    dispatch(addCoupon({ type: 'retailer', coupon: { id: Date.now(), discounts } }));

    setSnackbar({
        open: true,
        message: "Form Submitted successfully.",
        severity: "success",
    });
    setTimeout(()=>{
      if(onClose){
        onClose();
      }
    }, 1500)
  };

  return (
    <Box component="form" noValidate autoComplete="off" className="offerings_popup_form" onSubmit={handleSubmit}>
      <Box className="checkbox-group">
        <DiscountField
          name1="percentage"
          name2="order_upto"
          value={discounts.retailer_upto}
          label="Percentage"
          checked={discounts.retailer_upto.checked}
          handleOnChange={(e) => handleOnChange(e, 'retailer_upto')}
          handleCheckboxChange={(e) => handleCheckboxChange(e, 'retailer_upto')}
          percentagePlaceholder="10"
          minOrderPlaceholder="1000"
          additionalText={<><PercentIcon className="icon_2" /> Off on order upto <CurrencyRupeeIcon className="icon_2" /></>}
        />
        <DiscountField
          name1="flat"
          name2="minimum_order"
          value={discounts.retailer_flat}
          label="Flat"
          checked={discounts.retailer_flat.checked}
          handleOnChange={(e) => handleOnChange(e, 'retailer_flat')}
          handleCheckboxChange={(e) => handleCheckboxChange(e, 'retailer_flat')}
          percentagePlaceholder="10"
          minOrderPlaceholder="1000"
          additionalText={<><PercentIcon className="icon_2" /> Off on minimum order of <CurrencyRupeeIcon className="icon_2" /></>}
        />
        <DiscountField
          name1="buy"
          name2="get"
          value={discounts.retailer_freebies}
          label="Buy"
          checked={discounts.retailer_freebies.checked}
          handleOnChange={(e) => handleOnChange(e, 'retailer_freebies')}
          handleCheckboxChange={(e) => handleCheckboxChange(e, 'retailer_freebies')}
          percentagePlaceholder="2"
          minOrderPlaceholder="1"
          additionalText="Get"
          additionalText2="Free"
        />
        
        {/* Product Selection for Retailer Freebies */}
        {discounts.retailer_freebies.checked && (
          <Box className="product_field">
            {loadingProducts ? (
              <Box className="loading">
                <CircularProgress />
              </Box>
            ) : (
              <FormField
                type="search-select-check"
                name="product_ids"
                label="Select Products"
                placeholder="Select products (Buy X Get Y applies to these products)"
                value={discounts.retailer_freebies.product_ids || []}
                onChange={handleProductSelection}
                options={productOptions}
                className="input_field"
              />
            )}
          </Box>
        )}

      </Box>

      <Typography className="description">
        Coupons expire after 1 year. The discount will apply on top of the total.
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
  );
}

export default RetailerPopupContent;
