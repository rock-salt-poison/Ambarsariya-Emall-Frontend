import React, { useState } from 'react';
import GeneralLedgerForm from '../Form/GeneralLedgerForm';

function DailyMemo() {
  const [formData, setFormData] = useState({
    daily_needs: '',
    daily_category: [],
  });

  const [errors, setErrors] = useState({});

  const formFields = [
    {
      id: 1,
      label: 'Daily needs / service',
      name: 'daily_needs',
      type: 'text',
    },
    {
      id: 2,
      label: 'Select category',
      name: 'daily_category',
      type: 'select-check',
      options: [],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple required-field validation; expand as needed
    const newErrors = {};
    formFields.forEach((field) => {
      const val = formData[field.name];
      if (!val || (Array.isArray(val) && val.length === 0)) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit logic can be added here later
      // console.log('Daily memo data', formData);
    }
  };

  return (
    <GeneralLedgerForm
      formfields={formFields}
      handleSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      errors={errors}
      submitButtonText="Save Daily Memo"
      showDetails={false}
    />
  );
}

export default DailyMemo;

