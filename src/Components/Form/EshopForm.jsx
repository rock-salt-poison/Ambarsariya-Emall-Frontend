import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import FormField from './FormField'; 
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCategories, getCategories, getShopUserData, otherShops, updateEshopData } from '../../API/fetchExpressAPI'
import { useSelector, useDispatch } from 'react-redux';
import { setUpdatedField } from '../../store/editedEshopFieldsSlice';

const EshopForm = () => {
  const initialFormData = {
    business_name: '',
    date_of_establishment: '',
    usp_values: '',
    product_samples: '',
    similar_options: '',
    cost_sensitivity: 0,
    daily_walkin: 0,
    parking_availability: 0,
    category: [],
    products: '',
    advt_video:'', 
    key_players:'',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const [similarOptions, setSimilarOptions] = useState([]);
  const [keyPlayers, setKeyPlayers] = useState([]);
  const [categories, setCategories] = useState([]);
  const shop_access_token = useSelector((state) => state.auth.shopAccessToken);
  const updatedFields = useSelector((state) => state.updatedFields); 
  const dispatch = useDispatch();

  const {edit} = useParams();

  const fetchOtherShops = async (token) => {
    try{
      const resp = await otherShops(token);
      const shopUsersData = (await getShopUserData(token))[0];
      if(shopUsersData){
        const domain_id = shopUsersData.domain_id;
        const sector_id = shopUsersData.sector_id;
        const categories_result = await getCategories({domain_id, sector_id});
        const formattedCategories  = categories_result.map((data)=>({ id: data.category_id, name: data.category_name }));
        setCategories(formattedCategories); 
        
        const selectedCategories = shopUsersData.category.map((category_id) => {
          const resp = formattedCategories.filter((category)=> category.id === category_id);
          return resp[0].name;
        })

        const establishment_date_only = (shopUsersData.establishment_date).split('T')[0];

        const initialFormData = {
          business_name: shopUsersData.business_name || '',
          date_of_establishment: establishment_date_only || '',
          usp_values: shopUsersData.usp_values_url || '',
          product_samples: shopUsersData.product_sample_url || '',
          similar_options: shopUsersData.similar_options || '',
          cost_sensitivity: shopUsersData.cost_sensitivity || 0,
          daily_walkin: shopUsersData.daily_walkin || 0,
          parking_availability: shopUsersData.parking_availability || 0,
          category: selectedCategories || [],
          products: '',
          advt_video: shopUsersData.advertisement_video_url || '', 
          key_players:shopUsersData.key_players || '',
        };

        setFormData(initialFormData)

      }
      if(resp){
        const shops = resp.map((shop)=>shop.business_name);
        setSimilarOptions(shops);
        setKeyPlayers(shops);
      }
    }catch(e){
      console.log("Error while fetching : ", e);
    }
  }

  useEffect(()=>{
    if(shop_access_token){
      
      fetchOtherShops(shop_access_token);

    }
  }, [shop_access_token])

  const handleChange = async (e) => {
    const { name, type, files, value } = e.target;
    let fieldValue = type === 'file' ? files[0] : value;

    // Handle file validation and store the file in formData
    if (type === 'file') {
      const file = files[0];
      
      // Check file type based on the field name
      if (name === 'usp_values' && file.type !== 'application/pdf') {
        console.log('Please upload a PDF file');
        return;
      }
      if (name === 'products' && file.type !== 'text/csv') {
        console.log('Please upload a CSV file');
        return;
      }
      if (name === 'advt_video' && file.type !== 'video/mp4') {
        console.log('Please upload an MP4 video file');
        return;
      }
      
      fieldValue = file;
    }

    setFormData({
      ...formData,
      [name]: fieldValue,
    });

    dispatch(setUpdatedField({ name, value: fieldValue }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));
  };

  console.log(updatedFields);
  const handleSliderChange = (event, newValue, name) => {
    setFormData({
      ...formData,
      [name]: newValue,
    });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    const requiredFields = [
      'business_name',
      'date_of_establishment',
      'usp_values',
      'product_samples',
      'similar_options',
      'cost_sensitivity',
      'daily_walkin',
      'parking_availability',
      'category',
      'products',
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        newErrorMessages[field] = `${field.replace(/_/g, ' ')} is required`;
        valid = false;
      }
    });

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form
    if (validate()) {
      const selectedCategoryIds = formData.category.map((categoryName) => {
        const category = categories.find((cat) => cat.name === categoryName);
        return category ? category.id : null;
      })

      // Prepare the updated post data
      const updatedPostData = {
        business_name: formData.business_name,
        date_of_establishment: formData.date_of_establishment,
        usp_values: "link", // Placeholder link, make sure to replace with actual URL if needed
        product_samples: formData.product_samples,
        similar_options: formData.similar_options,
        cost_sensitivity: formData.cost_sensitivity,
        daily_walkin: formData.daily_walkin,
        parking_availability: formData.parking_availability,
        category: selectedCategoryIds, // Hardcoded category, make sure to replace if needed
        advt_video: "link", // Placeholder, replace as needed
        key_players: formData.key_players
      };
  
      // Get the shopAccessToken (either from localStorage or wherever it's stored)
      const shopAccessToken = localStorage.getItem('shopAccessToken');
      
      if (shopAccessToken) {
        try {
          // Call the function to update e-shop data
         const response = await updateEshopData(updatedPostData, shopAccessToken);
          console.log("response : ", response.data);
          console.log('Form Data:', formData);
  
          // Navigate to the shop page after a successful submission
          setTimeout(() => {
            navigate('../shop');
          }, 1000);
        } catch (error) {
          console.error("Error updating e-shop data:", error);
        }
      } else {
        console.error("Shop access token not found.");
      }
    }
  };
  

  const categoryOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const getSliderMarks = (name) => {
    switch (name) {
      case 'cost_sensitivity':
        return [
          { value: 0, label: 'Easy' },
          { value: 1, label: 'Moderate' },
          { value: 2, label: 'Effective' },
          { value: 3, label: 'Luxury' },
        ];
      case 'daily_walkin':
        return [
          { value: 0, label: 'Low' },
          { value: 1, label: 'Medium' },
          { value: 2, label: 'High' },
          { value: 3, label: 'Dense' },
        ];
      case 'parking_availability':
        return [
          { value: 0, label: 'Morning' },
          { value: 1, label: 'Afternoon' },
          { value: 2, label: 'Evening' },
        ];
      default:
        return [];
    }
  };

  const renderFormField = (label, name, type, options = [], placeholder = '', additionalProps = {}) => {
    let additionalClass = '';
    let accept = ''; // Initialize accept based on field
    
    // Define accept types based on field name
    if (name === 'usp_values') {
      accept = 'application/pdf';
    } else if (name === 'products') {
      accept = '.csv';
    } else if (name === 'advt_video') {
      accept = 'video/mp4';
    }

    if (name === 'parking_availability') {
      additionalClass = 'parking-availability-slider';
    } else if (name === 'cost_sensitivity') {
      additionalClass = 'cost-sensitivity-slider';
    } else if (name === 'daily_walkin') {
      additionalClass = 'daily-walkin-slider';
    }

    const isUpdated = updatedFields[name] !== undefined;
    const updatedFieldClass = isUpdated ? 'updated-field' : '';

    return (
      <FormField
        label={label}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        onSliderChange={handleSliderChange}
        error={!!errors[name]}
        errorMessage={errorMessages[name]}
        options={options}
        placeholder={placeholder}
        getSliderMarks={getSliderMarks}
        className={`${additionalClass} ${updatedFieldClass}`}
        accept={accept} 
        {...additionalProps}
      />
    );
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Box className="form-group">
        {renderFormField('Name of the business :', 'business_name', 'text')}
        {renderFormField('Date of establishment :', 'date_of_establishment', 'date')}
        {renderFormField('USP Values (PDF) :', 'usp_values', 'file')}
        {renderFormField('Product Sample :', 'product_samples', 'url', '', 'Add gmeet link')}
        <Box className="form-group2">
        {renderFormField('Similar Options :', 'similar_options', 'select-check', similarOptions, 'Select')}
        {renderFormField('Key players :', 'key_players', 'select-check', keyPlayers, 'Select')}


        </Box>
        {renderFormField('Cost sensitivity :', 'cost_sensitivity', 'range')}
        
        <Box className="form-group2">
          <Box className="form-subgroup">
            {renderFormField('Daily Walkin :', 'daily_walkin', 'range')}
          </Box>

          <Box className="form-subgroup">
            {renderFormField('Parking Availability :', 'parking_availability', 'range')}
          </Box>
        </Box>

        {renderFormField('Category :', 'category', 'select-check', categories.map((cat) => cat.name), 'Select categories')}
        {renderFormField('Products (CSV) :', 'products', 'file')}
        {renderFormField('Advertisement Video :', 'advt_video', 'file')}
      </Box>
      {!edit ? <Box className="submit_button_container">
        <Button type="submit" variant="contained" className="submit_button">
          Submit
        </Button>
        <Button variant="contained" className="submit_button" onClick={()=>navigate('../shop/dashboard/edit/preview')}>
          Form Preview
        </Button>
      </Box> :''}
      
    </Box>
  );
};

export default EshopForm;