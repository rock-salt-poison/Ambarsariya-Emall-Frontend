import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import { getUser, get_coupons } from '../../../../../API/fetchExpressAPI';

function PrepaidExpenses_PopupContent() {
  const token = useSelector((state) => state.auth.userAccessToken);
  const [shop_no, setShop_no] = useState(null);
  const [fetching, setFetching] = useState(true);

  const initialData = {
    retailer_total_coupons: '',
    retailer_used_coupons: '',
    retailer_left_coupons: '',
    subscription_total_coupons: '',
    subscription_used_coupons: '',
    subscription_left_coupons: '',
    loyalty_total_coupons: '',
    loyalty_used_coupons: '',
    loyalty_left_coupons: '',
    customizable_total_coupons: '',
    customizable_used_coupons: '',
    customizable_left_coupons: ''
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  // Fetch shop_no and coupons data
  useEffect(() => {
    const fetchShopData = async () => {
      if (!token) {
        setFetching(false);
        return;
      }

      try {
        setFetching(true);
        // Get shop_no from user
        const userResp = (await getUser(token))?.find((u) => u.shop_no !== null);
        
        if (userResp?.shop_no) {
          setShop_no(userResp.shop_no);
          
          // Fetch coupons data
          try {
            const couponsResp = await get_coupons(userResp.shop_no);
            if (couponsResp?.valid && couponsResp?.data) {
              // Count coupons by discount_category
              const categoryCounts = {
                retailer: { total: 0, used: 0 },
                subscription: { total: 0, used: 0 },
                loyalty: { total: 0, used: 0 },
                customizable: { total: 0, used: 0 }
              };

              couponsResp.data.forEach((coupon) => {
                const category = coupon.discount_category?.toLowerCase();
                if (category && categoryCounts[category] !== undefined) {
                  categoryCounts[category].total = parseInt(coupon.no_of_coupons || 0);
                  categoryCounts[category].used = parseInt(coupon.used_coupons || 0);
                }
              });

              // Calculate left and update form data
              setFormData({
                retailer_total_coupons: categoryCounts.retailer.total.toString(),
                retailer_used_coupons: categoryCounts.retailer.used.toString(),
                retailer_left_coupons: (categoryCounts.retailer.total - categoryCounts.retailer.used).toString(),
                subscription_total_coupons: categoryCounts.subscription.total.toString(),
                subscription_used_coupons: categoryCounts.subscription.used.toString(),
                subscription_left_coupons: (categoryCounts.subscription.total - categoryCounts.subscription.used).toString(),
                loyalty_total_coupons: categoryCounts.loyalty.total.toString(),
                loyalty_used_coupons: categoryCounts.loyalty.used.toString(),
                loyalty_left_coupons: (categoryCounts.loyalty.total - categoryCounts.loyalty.used).toString(),
                customizable_total_coupons: categoryCounts.customizable.total.toString(),
                customizable_used_coupons: categoryCounts.customizable.used.toString(),
                customizable_left_coupons: (categoryCounts.customizable.total - categoryCounts.customizable.used).toString(),
              });
            }
          } catch (error) {
            console.error("Error fetching coupons data:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching shop data:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchShopData();
  }, [token]);

  const formFields = [
    {
      id: 1, label: 'Coupons selection', type:'text', innerField: [
        {
          id: 1, label: 'Retailer', innerFields: [
            { id: 1, label: 'Total', name: 'retailer_total_coupons', type: 'text', behavior: 'numeric' },
            { id: 2, label: 'No. of used', name: 'retailer_used_coupons', type: 'text', behavior: 'numeric' },
            { id: 3, label: 'No. of left', name: 'retailer_left_coupons', type: 'text', behavior: 'numeric', readOnly: true },
          ]
        },
        {
          id: 2, label: 'Subscription', innerFields: [
            { id: 1, label: 'Total', name: 'subscription_total_coupons', type: 'text', behavior: 'numeric' },
            { id: 2, label: 'No. of used', name: 'subscription_used_coupons', type: 'text', behavior: 'numeric' },
            { id: 3, label: 'No. of left', name: 'subscription_left_coupons', type: 'text', behavior: 'numeric', readOnly: true },
          ]
        },
        {
          id: 3, label: 'Loyalty', innerFields: [
            { id: 1, label: 'Total', name: 'loyalty_total_coupons', type: 'text', behavior: 'numeric' },
            { id: 2, label: 'No. of used', name: 'loyalty_used_coupons', type: 'text', behavior: 'numeric' },
            { id: 3, label: 'No. of left', name: 'loyalty_left_coupons', type: 'text', behavior: 'numeric', readOnly: true },
          ]
        },
        {
          id: 4, label: 'Customizable', innerFields: [
            { id: 1, label: 'Total', name: 'customizable_total_coupons', type: 'text', behavior: 'numeric' },
            { id: 2, label: 'No. of used', name: 'customizable_used_coupons', type: 'text', behavior: 'numeric' },
            { id: 3, label: 'No. of left', name: 'customizable_left_coupons', type: 'text', behavior: 'numeric', readOnly: true },
          ]
        },
      ]
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };

    // Auto-calculate left coupons when total or used changes
    if (name.includes('_total_coupons') || name.includes('_used_coupons')) {
      const category = name.split('_')[0]; // retailer, subscription, loyalty, customizable
      const totalKey = `${category}_total_coupons`;
      const usedKey = `${category}_used_coupons`;
      const leftKey = `${category}_left_coupons`;
      
      const total = parseInt(updatedFormData[totalKey] || 0);
      const used = parseInt(updatedFormData[usedKey] || 0);
      updatedFormData[leftKey] = Math.max(0, total - used).toString();
    }

    setFormData(updatedFormData);

    // Clear any previous error for this field
    setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    const newErrors = {};

    formFields.forEach(field => {
      // Validate inner fields if present
      if (field.innerField) {
        field.innerField.forEach(inner => {
          inner.innerFields.forEach(subInner => {
            const innerName = subInner.name;
            if (!formData[innerName]) {
              newErrors[innerName] = `${subInner.label} is required.`;
            }
          });
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      console.log(formData);
      // Proceed with further submission logic, e.g., API call
    } else {
      console.log(errors);
    }
  };

  if (fetching) {
    return (
      <Box className="loading">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <GeneralLedgerForm
      cName="prepaid_expenses"
      description="Payments made in advance for goods or services (e.g., rent, insurance)."
      formfields={formFields}
      handleSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      errors={errors}
    />
  );
}

export default PrepaidExpenses_PopupContent;
