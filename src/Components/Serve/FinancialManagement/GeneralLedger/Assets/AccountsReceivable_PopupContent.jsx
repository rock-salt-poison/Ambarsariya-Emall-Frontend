import React, { useState } from "react";
import GeneralLedgerForm from "../../../../Form/GeneralLedgerForm";

function AccountsReceivable_PopupContent() {
  const initialData = {
    member_or_customer_no: "",
    digilocker_authentication_level: "",
    company_loan_and_post_paid: "",
    credit_limit_shop_no: "",
    credit_limit_phone_no: "",
    credit_ledger_table: "",
    total_credits: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const formFields = [
    {
      id: 1,
      label: "Member / Customer No:",
      name: "member_or_customer_no",
      type: "text",
      behavior: "numeric",
    },
    {
      id: 2,
      label: "Digilocker Authentication Level",
      name: "digilocker_authentication_level",
      type: "text",
      behavior: "numeric",
      placeholder:'Ex: 4'
    },
    {
      id: 3,
      label: "Company Loan & Post Paid",
      name: "company_loan_and_post_paid",
      type: "text",
    },
    {
      id: 4,
      label: "Credit Limit Choose Shop No",
      innerField: [
        {
          id: 1,
          label: "Choose Shop No",
          name: "credit_limit_shop_no",
          type: "select",
          placeholder:'Shop No',
          options:['Shop_001','Shop_002','Shop_003','Shop_004']
        },
        {
          id: 2,
          label: "Enter Phone number",
          placeholder:'Phone number',
          name: "credit_limit_phone_no",
          type: "text",
          behavior: "numeric",
        },
      ],
    },
    {
      id: 5,
      label: "Open Credit Ledger Table",
      name: "credit_ledger_table",
      type: "text",
    },
    {
      id: 6,
      label: "Total Credit Given",
      placeholder:'credits',
      name: "total_credits",
      type: "number",
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

    formFields.forEach((field) => {
      const name = field.name;
      // Validate main fields
      if (!field.innerField && !formData[name]) {
        newErrors[name] = `${field.label} is required.`;
      }
      // Validate inner fields if present
      if (field.innerField) {
        field.innerField.forEach((inner) => {
          const innerName = inner.name;
          if (!formData[innerName]) {
            newErrors[innerName] = `${inner.label} is required.`;
          }
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
            cName="cash"
            description="Amounts owed to the store by customers on credit. Credits To Mall Member / Customer"
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
  );
}

export default AccountsReceivable_PopupContent;
