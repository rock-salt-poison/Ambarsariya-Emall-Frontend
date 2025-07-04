import React, { useEffect, useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';

function SigningMou() {
    const initialData = {
        rank:'',
        description:'',
        half_payment:'',
        credit_assigns:'',
        purchase_sale_party_details:'',
        purchaser_phone_number:'',
        purchaser_otp:'',
        seller_phone_number:'',
        seller_otp:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

 const equations = [
    { A: 30, B: 30, C: 900 }, // Eq1
    { A: 25, B: 30, C: 750 }, // Eq2
    { A: 20, B: 35, C: 700 }, // Eq3
  ];

  const [solutions, setSolutions] = useState([]);

  // Cramer's Rule Solver
  const solveTwoEquations = (eq1, eq2) => {
    const { A: a1, B: b1, C: c1 } = eq1;
    const { A: a2, B: b2, C: c2 } = eq2;

    const D = a1 * b2 - a2 * b1;
    const Dx = c1 * b2 - c2 * b1;
    const Dy = a1 * c2 - a2 * c1;

    if (D === 0) {
      return { x: 'No Unique Solution', y: 'No Unique Solution' };
    }

    const x = Dx / D;
    const y = Dy / D;

    return {
      x: x.toFixed(2),
      y: y.toFixed(2),
    };
  };

  useEffect(() => {
    const sol1 = solveTwoEquations(equations[0], equations[1]); // Eq1 + Eq2
    const sol2 = solveTwoEquations(equations[1], equations[2]); // Eq2 + Eq3
    const sol3 = solveTwoEquations(equations[2], equations[0]); // Eq3 + Eq1

    setSolutions([
      { label: 'Eq1 & Eq2', ...sol1 },
      { label: 'Eq2 & Eq3', ...sol2 },
      { label: 'Eq3 & Eq1', ...sol3 },
    ]);
  }, []);
  console.log(solutions);
  


    const formFields = [
        {
            id: 1,
            label: 'Select Ranks',
            name: 'rank',
            type: 'select',
            options:['Rank 1', 'Rank 2','Rank 3'],
        },
        {
            id: 2,
            label: 'Description of Mou',
            name: 'description',
            type: 'textarea',
        },
        {
            id: 3,
            label: '50% of the payment',
            name: 'half_payment',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 4,
            label: 'Credit Assigns',
            name: 'credit_assigns',
            type: 'text',   
        },
        {
            id: 5,
            label: 'Purchase and sale party details',
            name: 'purchase_sale_party_details',
            type: 'text',
        },
        {
            id: 6,
            label: 'Purchaser Phone number',
            name: 'purchaser_phone_number',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 7,
            label: 'Enter OTP',
            name: 'purchaser_otp',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 8,
            label: 'Seller Phone number',
            name: 'seller_phone_number',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 9,
            label: 'Enter OTP',
            name: 'seller_otp',
            type: 'text',
            behavior:'numeric'
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
            const name = field.name;
            // Validate main fields
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
        } else {
            console.log(errors);
        }
    };
  return (
    <GeneralLedgerForm
        formfields={formFields}
        handleSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        errors={errors}
        submitBtnVisibility={false}
    />
  )
}

export default SigningMou