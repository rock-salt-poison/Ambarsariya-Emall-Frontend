import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function PrepaidExpenses_PopupContent() {
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

  const formFields = [
    {
      id: 1, label: 'Coupons selection', innerField: [
        {
          id: 1, label: 'Retailer', innerFields: [
            { id: 1, label: 'Total', name: 'retailer_total_coupons', type: 'text', behavior: 'numeric' },
            { id: 2, label: 'No. of used', name: 'retailer_used_coupons', type: 'text', behavior: 'numeric' },
            { id: 3, label: 'No. of left', name: 'retailer_left_coupons', type: 'text', behavior: 'numeric' },
          ]
        },
        {
          id: 2, label: 'Subscription', innerFields: [
            { id: 1, label: 'Total', name: 'subscription_total_coupons', type: 'text', behavior: 'numeric' },
            { id: 2, label: 'No. of used', name: 'subscription_used_coupons', type: 'text', behavior: 'numeric' },
            { id: 3, label: 'No. of left', name: 'subscription_left_coupons', type: 'text', behavior: 'numeric' },
          ]
        },
        {
          id: 3, label: 'Loyalty', innerFields: [
            { id: 1, label: 'Total', name: 'loyalty_total_coupons', type: 'text', behavior: 'numeric' },
            { id: 2, label: 'No. of used', name: 'loyalty_used_coupons', type: 'text', behavior: 'numeric' },
            { id: 3, label: 'No. of left', name: 'loyalty_left_coupons', type: 'text', behavior: 'numeric' },
          ]
        },
        {
          id: 4, label: 'Customizable', innerFields: [
            { id: 1, label: 'Total', name: 'customizable_total_coupons', type: 'text', behavior: 'numeric' },
            { id: 2, label: 'No. of used', name: 'customizable_used_coupons', type: 'text', behavior: 'numeric' },
            { id: 3, label: 'No. of left', name: 'customizable_left_coupons', type: 'text', behavior: 'numeric' },
          ]
        },
      ]
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

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
