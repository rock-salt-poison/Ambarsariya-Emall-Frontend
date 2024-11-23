import React, { useState } from "react";
import GeneralLedgerForm from "../../../../Form/GeneralLedgerForm";

function Cash_PopupContent() {
    const initialData = {
        name: "",
        bank_name: "",
        bank_ifsc_code: "",
        bank_address: "",
        account_number: "",
        upi_linked_with_services: "",
        bank_cash_available: "",
        bank_limit_available: "",
        other_credits_available: "",
        cash_available_in_cash_counter: "",
        cash_available_in_other_wallets_and_e_wallets: "",
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: "Name",
            name: "name",
            type: "text"
        },
        {
            id: 2,
            label: "Bank Name",
            name: "bank_name",
            type: "text"
        },
        {
            id: 3,
            label: "Bank IFSC Code",
            placeholder:'IFSC Code',
            name: "bank_ifsc_code",
            type: "text"
        },
        {
            id: 4,
            label: "Bank Address",
            name: "bank_address",
            type: "text"
        },
        {
            id: 5,
            label: "Account Number",
            name: "account_number",
            type: "text",
            behavior: "numeric",
        },
        {
            id: 6,
            label: "UPI linked with services",
            name: "upi_linked_with_services",
            type: "text",
        },
        {
            id: 7,
            label: "Bank cash available",
            name: "bank_cash_available",
            type: "text",
            behavior: "numeric",
        },
        {
            id: 8,
            label: "Bank limit available",
            name: "bank_limit_available",
            type: "text",
            behavior: "numeric",
        },
        {
            id: 9,
            label: "Other credits available",
            name: "other_credits_available",
            type: "text",
        },
        {
            id: 10,
            label: "Cash available in cash counter",
            name: "cash_available_in_cash_counter",
            type: "text",
            behavior: "numeric",
        },
        {
            id: 11,
            label: "Cash available in other wallets and E-wallets",
            name: "cash_available_in_other_wallets_and_e_wallets",
            type: "text",
            behavior: "numeric",
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
            if (!formData[name]) {
                newErrors[name] = `${field.label} is required.`;
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
        }
    };

    return (
        <GeneralLedgerForm
            cName="cash"
            description="Includes all cash on hand and in bank accounts."
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default Cash_PopupContent;
