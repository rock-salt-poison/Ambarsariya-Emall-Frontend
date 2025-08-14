import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, ThemeProvider, Tooltip, Typography } from '@mui/material';
import FormField from '../../Components/Form/FormField';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Header from '../../Components/Serve/SupplyChain/Header';
import GeneralLedgerForm from '../../Components/Form/GeneralLedgerForm';
import { useSelector } from 'react-redux';
import { getCompletedOrders, getCustomerRecords, getPendingOrders, getUser } from '../../API/fetchExpressAPI';
import BarChartComponent from '../../Components/Serve/SupplyChain/BarChartComponent';
import { eachDayOfInterval, format } from 'date-fns';

function CustomerRecords(props) {
  const initialData = {
    purchase_date:'',
    customer:'',
    customer_details:'',
    completed_orders:'',
    pending_orders:'',
    subscription_details:'',
    // edit_customer_details:'',
};

const [formData, setFormData] = useState(initialData);
const token = useSelector((state) => state.auth.userAccessToken);

const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({});
const [records, setRecords] = useState([]);
const [currentUser, setCurrentUser] = useState(null);
const [completedOrders, setCompletedOrders] = useState([]);
const [pendingOrders, setPendingOrders] = useState([]);
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [chartData, setChartData] = useState([]);

const handleClick = () => {
  console.log("hi")
}

console.log(formData);

const fetchCurrentUser = async (token) => {
  try{
    setLoading(true);
    const resp = (await getUser(token))?.find(u=> u?.shop_no !== null);
    if(resp){
      setCurrentUser(resp);
    }
  }catch(e){

  }finally{
    setLoading(false);
  }
}  

const fetchCustomerRecord = async (startDate, endDate, shop_no) => {
  if(startDate && endDate && shop_no){
    try{
      setLoading(true);
      const resp =  await getCustomerRecords(startDate, endDate, shop_no);
      if(resp?.valid){
        setRecords(resp?.data);
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }
}

useEffect(()=>{
  if(token){
    fetchCurrentUser(token);
  }
}, [token])

useEffect(() => {
  const fetchData = async () =>{
    if (token) {
      if(formData?.purchase_date){
        const [startDateAndTime, endDateAndTime] = formData?.purchase_date || [];

        // Format into YYYY-MM-DD
        const selectedStartDate = startDateAndTime ? new Date(startDateAndTime).toISOString().split('T')[0] : null;
        const selectedEndDate = endDateAndTime ? new Date(endDateAndTime).toISOString().split('T')[0] : null;

        console.log(selectedStartDate, selectedEndDate);
        setStartDate(selectedStartDate);
        setEndDate(selectedEndDate);
  
        fetchCustomerRecord(selectedStartDate, selectedEndDate, currentUser?.shop_no);
      }
    }
  }
  fetchData();
}, [formData && formData.purchase_date, token, currentUser]);

useEffect(()=> {
  if(formData?.customer){
    const filteredData = records?.find((data)=> data?.buyer_id === formData?.customer);
    setFormData((prev)=>({
      ...prev, 
      customer_details: `Name: ${filteredData?.buyer_name} \nAddress: ${filteredData?.shipping_address} \nPhone No.: ${filteredData?.buyer_contact_no}`,
    }))
    fetch_completed_orders(startDate, endDate, currentUser?.shop_no, formData?.customer);
    fetch_pending_orders(startDate, endDate, currentUser?.shop_no, formData?.customer);
  }
}, [formData && formData?.customer, currentUser]);

const fetch_completed_orders = async (startDate, endDate, shop_no, buyer_id) => {
  try{
    setLoading(true);
    const resp= await getCompletedOrders(startDate, endDate, shop_no, buyer_id);
    if(resp?.valid){
      setCompletedOrders(resp?.data);
    }
  }catch(e){
    console.log(e);
  }finally{
    setLoading(false);
  }
}

const fetch_pending_orders = async (startDate, endDate, shop_no, buyer_id) => {
  try{
    setLoading(true);
    const resp = await getPendingOrders(startDate, endDate, shop_no, buyer_id);
    if(resp?.valid){
      setPendingOrders(resp?.data);
    }
  }catch(e){
    console.log(e);
  }finally{
    setLoading(false);
  }
}


const formFields = [
    {
        id: 1,
        label: 'Purchase Date',
        name: 'purchase_date',
        type: 'daterange',
    },
    {
        id: 2,
        label: 'Select Customer',
        name: 'customer',
        type: 'select',
        options: records?.map((r)=>({ label: r.buyer_contact_no, value: r.buyer_id })),
    },
    {
        id: 3,
        label: 'Customer Details',
        name: 'customer_details',
        type: 'textarea',
        readOnly:true,
    },
    {
        id: 4,
        label: 'Completed Orders',
        name: 'completed_orders',
        type: 'select-check',   
        options: completedOrders?.map((co)=>co.invoice_no),
    },
    {
        id: 5,
        label: 'Pending Orders',
        name: 'pending_orders',
        type: 'select-check',
        options: pendingOrders?.map((so)=>so.so_no),
    },
    {
      id: 6,
      label: 'Subscription Details',
      name: 'subscription_details',
      type: 'select-check',
      options: ['MoU 1', 'MoU 2', 'MoU 3'],
    },
    // {
    //   id: 7,
    //   label: 'Edit Customer Details',
    //   value: 'Edit Customer Details',
    //   name: 'edit_customer_details',
    //   type: 'button',
    //   handleButtonClick : handleClick
    // },
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
  event.preventDefault();
  if (validateForm()) {
    const allDates = eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    }).map(d => format(d, 'yyyy-MM-dd'));

    const dataset = allDates.map(date => {
      const completedCost = completedOrders
        .filter(order =>
          formData.completed_orders.includes(order.invoice_no) &&
          order.created_at?.startsWith(date)
        )
        .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

      const pendingCost = pendingOrders
        .filter(order =>
          formData.pending_orders.includes(order.so_no) &&
          order.created_at?.startsWith(date)
        )
        .reduce((sum, order) => sum + Number(order.subtotal || 0), 0);

      const subscriptionCost = (formData.subscription_details?.length || 0) * 500;

      return {
        date,
        completed: completedCost,
        pending: pendingCost,
        subscription: subscriptionCost
      };
    })
    // Keep only dates that have a selected completed or pending order
    .filter(day => day.completed > 0 || day.pending > 0);

    setChartData(dataset);
  }
};


const themeProps = {
  popoverBackgroundColor: 'var(--yellow)',
  scrollbarThumb: 'var(--brown)',
};

const theme = createCustomTheme(themeProps);

  return (
    <ThemeProvider theme={theme}>
      {loading && <Box className="loading"><CircularProgress/></Box> }
      <Box className="crm_sub_wrapper">
        <Box className="row">
        <Header back_btn_link='../emotional/crm' next_btn_link="../emotional/crm/member-group-creation" heading_with_bg={true} title="Customer Records" redirectTo='../emotional/crm' />


          <Box className="col">
            <Box className="container">
                <Box className="col-3">
                  <Box component="img" src={ribbon} alt="ribbon" className="ribbon" />
                  <GeneralLedgerForm
                      formfields={formFields}
                      handleSubmit={handleSubmit}
                      formData={formData}
                      onChange={handleChange}
                      errors={errors}
                      submitButtonText="Show purchase history"
                  />
                  
                </Box>

              <Box className="sub_container">
                {chartData.length > 0 ? (
                  <BarChartComponent
  dataset={chartData}
  label="Cost (₹)"
  dataKey="date"
  title="Orders Cost Summary"
  series={[
    { dataKey: 'completed', label: 'Completed', color: '#4caf50', valueFormatter: (v) => `₹${v}` },
    { dataKey: 'pending', label: 'Pending', color: '#ff9800', valueFormatter: (v) => `₹${v}` },
    // { dataKey: 'subscription', label: 'Subscription', color: '#2196f3', valueFormatter: (v) => `₹${v}` },
  ]}
/>

                ) : (
                  <Box className="show_message">
                    <Typography className='blank'>
                      Please fill the form first to see the purchase history.
                    </Typography>
                  </Box>
                )}
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CustomerRecords;
