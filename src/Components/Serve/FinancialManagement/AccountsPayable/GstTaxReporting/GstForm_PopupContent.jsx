import React from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function GstForm_PopupContent({selectedInvoice}) {
    // Assuming you may get initial data from somewhere, here it's set to empty for demo
    const initialData = selectedInvoice || {
        cgst: '',  // Example: replace with actual data as needed
        igst: '0',
        sgst: '',
        create_in_taxes: '',
    };

    const formFields = [
        {
            id: 1,
            label: 'CGST (in percentage)',
            name: 'cgst',
            type: 'text',
            value: initialData["cgst"],  // Fixed here
            readOnly: true,
        },
        {
            id: 2,
            label: 'IGST (in percentage)',
            name: 'igst',
            type: 'text',
            value: initialData["igst"],
            readOnly: true,
        },
        {
            id: 3,
            label: 'SGST (in percentage)',
            name: 'sgst',
            type: 'text',
            value: initialData["sgst"],
            readOnly: true,
        },
        {
            id: 4,
            label: 'Create in-taxes',
            name: 'create_in_taxes',
            type: 'text',
            value: initialData["create_in_taxes"],
            readOnly: true,
        },
    ];

    return (
        <GeneralLedgerForm
            formfields={formFields}
            errors={''}
            formData={initialData}
            submitBtnVisibility={false}
        />
    );
}

export default GstForm_PopupContent;
