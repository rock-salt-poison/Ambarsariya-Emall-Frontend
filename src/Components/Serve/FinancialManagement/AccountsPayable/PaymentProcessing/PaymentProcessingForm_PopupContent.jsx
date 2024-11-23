import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function PaymentProcessingForm_PopupContent({selectedInvoice}) {
    // Assuming you may get initial data from somewhere, here it's set to empty for demo
    const initialData = selectedInvoice || {
        invoice_no: '',  // Example: replace with actual data as needed
        total_amount: '0',
        payment_method: '',
        payment_date: '',
        paid_amount: '0',
        balance_amount: '0',
        balance_credit:'',
        last_date_payment:'',
        after_due_date:'0',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Invoice No',
            name: 'invoice_no',
            type: 'select',
            value: initialData["invoice_no"],  // Fixed here
            // readOnly: true,
            options:['123', '456','789']
        },
        {
            id: 2,
            label: 'Total Amount',
            name: 'total_amount',
            type: 'text',
            adornmentValue:'Rs',
            value: initialData["total_amount"],
            readOnly: true,
        },
        {
            id: 3,
            label: 'Payment Method',
            name: 'payment_method',
            type: 'text',
            value: initialData["payment_method"],
            readOnly: true,
        },
        {
            id: 4,
            label: 'Payment Date',
            name: 'payment_date',
            type: 'text',
            value: initialData["payment_date"],
            readOnly: true,
        },
        {
            id: 5,
            label: 'Paid Amount',
            name: 'paid_amount',
            type: 'text',
            value: initialData["paid_amount"],
            adornmentValue:'Rs',
            readOnly: true,
        },
        {
            id: 6,
            label: 'Balance Amount',
            name: 'balance_amount',
            adornmentValue:'Rs',
            type: 'text',
            value: initialData["balance_amount"],
            readOnly: true,
        },
        {
            id: 7,
            label: 'Balance Credit',
            name: 'balance_credit',
            adornmentValue:'Rs',
            type: 'text',
            value: initialData["balance_credit"],
            readOnly: true,
        },
        {
            id: 8,
            label: 'Last date payment',
            name: 'last_date_payment',
            type: 'date',
            value: initialData["last_date_payment"],
            readOnly: true,
        },
        {
            id: 9,
            label: 'After Due Date',
            name: 'after_due_date',
            adornmentValue:'Rs',
            type: 'text',
            value: initialData["after_due_date"],
            // readOnly: true,
        },
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Clear any previous error for this field
        setErrors({ ...errors, [name]: null });
    };

    return (
        <GeneralLedgerForm
            formfields={formFields}
            errors={''}
            formData={formData}
            submitBtnVisibility={false}
            onChange={handleChange}
        />
    );
}

export default PaymentProcessingForm_PopupContent;
