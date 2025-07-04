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
    { A: 10, B: 40, C: 600 }, // Eq4
  ];

  const [solutions, setSolutions] = useState([]);
  const [stepsLog, setStepsLog] = useState([]);

  const solveByElimination = (label, eq1, eq2) => {
    const logs = [];
    const { A: A1, B: B1, C: C1 } = eq1;
    const { A: A2, B: B2, C: C2 } = eq2;

    logs.push(`Solving ${label}`);
    logs.push(`${A1}X + ${B1}Y = ${C1}`);
    logs.push(`${A2}X + ${B2}Y = ${C2}`);

    // Eliminate Y by multiplying with opposite X coefficients
    const multiplier1 = A2;
    const multiplier2 = A1;

    const newA1 = A1 * multiplier1;
    const newB1 = B1 * multiplier1;
    const newC1 = C1 * multiplier1;

    const newA2 = A2 * multiplier2;
    const newB2 = B2 * multiplier2;
    const newC2 = C2 * multiplier2;

    logs.push(`Multiply Eq1 by ${multiplier1} → ${newA1}X + ${newB1}Y = ${newC1}`);
    logs.push(`Multiply Eq2 by ${multiplier2} → ${newA2}X + ${newB2}Y = ${newC2}`);

    const diffB = newB1 - newB2;
    const diffC = newC1 - newC2;

    logs.push(`Subtract equations to eliminate X:`);
    logs.push(`${diffB}Y = ${diffC}`);

    const y = diffB !== 0 ? diffC / diffB : 0;
    logs.push(`Y = ${y.toFixed(2)}`);

    const x = (C1 - B1 * y) / A1;
    logs.push(`Substitute Y = ${y.toFixed(2)} into Eq1:`);
    logs.push(`${A1}X + ${B1}*${y.toFixed(2)} = ${C1}`);
    logs.push(`${(A1 * x).toFixed(2)} + ${(B1 * y).toFixed(2)} = ${C1}`);
    logs.push(`${A1}X = ${C1 - B1 * y}`);
    logs.push(`X = ${(C1 - B1 * y) / A1}`);

    const distance = Math.sqrt(x * x + y * y);
    logs.push(`√(X² + Y²) = ${distance.toFixed(2)}`);
    logs.push('---------------------------------');

    return {
      label,
      x: x.toFixed(2),
      y: y.toFixed(2),
      distance: distance.toFixed(2),
      logs,
    };
  };

  const generateAllPairs = (eqs) => {
    const pairs = [];
    for (let i = 0; i < eqs.length; i++) {
      for (let j = i + 1; j < eqs.length; j++) {
        pairs.push({
          eq1: eqs[i],
          eq2: eqs[j],
          label: `Eq${i + 1} & Eq${j + 1}`,
        });
      }
    }
    return pairs;
  };

  useEffect(() => {
    const pairs = generateAllPairs(equations);
    const results = [];
    const allLogs = [];

    for (const pair of pairs) {
      const result = solveByElimination(pair.label, pair.eq1, pair.eq2);
      results.push(result);
      allLogs.push(...result.logs);
    }

    // Rank by distance
    const ranked = [...results].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    ranked.forEach((sol, i) => {
      sol.rank = i === 0
        ? 'Low'
        : i === ranked.length - 1
        ? 'High'
        : 'Medium';
    });

    // Match rank back to original results
    const final = results.map(r =>
      ranked.find(s => s.label === r.label)
    );

    setSolutions(final);
    setStepsLog(allLogs);
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