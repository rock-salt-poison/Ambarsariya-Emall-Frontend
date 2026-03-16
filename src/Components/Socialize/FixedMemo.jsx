import React, { useState } from 'react';
import GeneralLedgerForm from '../Form/GeneralLedgerForm';

function FixedMemo() {
  const [formData, setFormData] = useState({
    fixed_category: [],
    fixed_sector: [],
  });

  const [errors, setErrors] = useState({});

  const formFields = [
    {
      id: 1,
      label: 'Select category',
      name: 'fixed_category',
      type: 'select-check',
      options: [],
    },
    {
      id: 2,
      label: 'Select sector',
      name: 'fixed_sector',
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
      // console.log('Fixed memo data', formData);
    }
  };

  return (
    <GeneralLedgerForm
      formfields={formFields}
      handleSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      errors={errors}
      submitButtonText="Save Fixed Memo"
      showDetails={false}
    />
  );
}

export default FixedMemo;

