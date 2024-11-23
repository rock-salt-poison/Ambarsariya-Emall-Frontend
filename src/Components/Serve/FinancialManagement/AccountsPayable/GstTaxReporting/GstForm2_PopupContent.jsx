import React from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function GstForm2_PopupContent({selectedInvoice}) {
    // Assuming you may get initial data from somewhere, here it's set to empty for demo
    const initialData = selectedInvoice || {
        total_tax: '',  // Example: replace with actual data as needed
        shop_or_vendor_no: '0',
        gst_no: '',
    };

    const formFields = [
        {
            id: 1,
            label: 'Total tax :',
            name: 'total_tax',
            type: 'text',
            value: initialData["total_tax"], 
            readOnly: true,
        },
        {
            id: 2,
            label: 'Shop or Vendor No. :',
            name: 'shop_or_vendor_no',
            type: 'text',
            value: initialData["shop_or_vendor_no"],
            readOnly: true,
        },
        {
            id: 3,
            label: 'GST No. :',
            name: 'gst_no',
            type: 'text',
            value: initialData["gst_no"],
            readOnly: true,
        },
        {
            id: 4,
            label: 'Way Bill',
            name: 'waybill',
            type: 'button',
            value: 'Download',
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

export default GstForm2_PopupContent;
