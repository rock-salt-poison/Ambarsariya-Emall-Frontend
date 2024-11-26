import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import GeneralLedgerForm from "../../../../Components/Form/GeneralLedgerForm";
import ribbon from "../../../../Utils/images/Sell/dashboard/merchant_dashboard/ribbon.svg";
import { useSelector } from "react-redux";
import { getCategories, getShopUserData, getUser } from "../../../../API/fetchExpressAPI";

function DashboardForm(props) {

  // Initial form data and errors for 4 forms
  const initialData = {
    form1: {
      product_category: "",
      product_file: "",
      trend_or_exp_date: "",
      catalogue: "",
    },
    form2: {
      products: "",
      item_csv_file: "",
      price: 0,
      images_or_videos: "",
    },
    form3: {
      items: "",
      sku_id_csv: "",
      quantity: 0,
      variation_specifications_images: "",
    },
    form4: {
      sku_id: "",
      rku_id_csv: "",
      stock_space: 0,
      upload: "",
    },
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const user_access_token = useSelector((state) => state.auth.userAccessToken);

  const fetchData = async (token) => {
    try{
      const shopUsersData = (await getShopUserData(token))[0];
      if(shopUsersData){
        const domain_id = shopUsersData.domain_id;
        const sector_id = shopUsersData.sector_id;
        const categories_result = await getCategories({domain_id, sector_id});
        const formattedCategories  = categories_result.map((data)=>({ id: data.category_id, name: data.category_name }));
        setCategories(formattedCategories); 
      }
    }catch(e){
      console.log("Error while fetching : ", e);
    }
  }

  useEffect(()=>{
    const fetchShopToken = async () => {
      const shop_token = (await getUser(user_access_token))[0].shop_access_token;

      if(shop_token){
        fetchData(shop_token);
      }

    }
    fetchShopToken();
  }, [user_access_token])

  // Form fields configuration (for each form)
  const formFields = {
    form1: [
      {
        id: 1,
        label: "Product Category (s)",
        name: "product_category",
        type: "select-check",
        placeholder: "Select Category(s)",
        options: categories.map((cat) => cat.name),
      },
      {
        id: 2,
        label: "Upload Product File",
        name: "product_file",
        type: "file",
        placeholder: "Choose product file",
        accept: ".csv",
      },
      {
        id: 3,
        label: "End of Trend / Exp Date",
        name: "trend_or_exp_date",
        type: "date",
      },
      {
        id: 4,
        label: "Upload Catalogue",
        name: "catalogue",
        type: "file",
        placeholder: "Choose file",
      },
    ],
    form2: [
      {
        id: 1,
        label: "Product (s)",
        name: "products",
        type: "select-check",
        placeholder: "Select Product(s)",
        options: ["Electronics", "Clothing", "Home Goods"],
      },
      {
        id: 2,
        label: "Upload Item CSV",
        name: "item_csv_file",
        type: "file",
        placeholder: "Choose file",
        accept: ".csv",
      },
      {
        id: 3,
        label: "Show price",
        name: "price",
        type: "text",
        behvaior:'numeric',
      },
      {
        id: 4,
        label: "Upload Images/Videos",
        name: "images_or_videos",
        type: "file",
        placeholder: "Choose file",
      },
    ],
    form3: [
      {
        id: 1,
        label: "Item (s)",
        name: "items",
        type: "select-check",
        placeholder: "Select Item(s)",
        options: ["Electronics", "Clothing", "Home Goods"],
      },
      {
        id: 2,
        label: "Upload SKU Id CSV",
        name: "sku_id_csv",
        type: "file",
        placeholder: "Choose file",
        accept: ".csv",
      },
      {
        id: 3,
        label: "Show Quantity",
        name: "quantity",
        type: "number",
      },
      {
        id: 4,
        label: "Upload Variation and specifications images",
        name: "variation_specifications_images",
        type: "file",
        placeholder: "Choose file",
      },
    ],
    form4: [
      {
        id: 1,
        label: "SKU Id",
        name: "sku_id",
        type: "select",
        placeholder: "Select SKU Id",
        options: ["Electronics", "Clothing", "Home Goods"],
      },
      {
        id: 2,
        label: "Upload RKU Id CSV",
        name: "rku_id_csv",
        type: "file",
        placeholder: "Choose file",
        accept: ".csv",
      },
      {
        id: 3,
        label: "Stock space (Available in rack)",
        name: "stock_space",
        type: "number",
      },
      {
        id: 4,
        label: "Upload",
        name: "upload",
        type: "file",
        placeholder: "Choose file",
      },
    ],
  };

  const handleChange = (event, formName) => {
    const { name, value, files, type } = event.target;
    let fieldValue = type === "file" ? files[0] : value;
    // Update formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [formName]: {
        ...prevFormData[formName],
        [name]: fieldValue,
      },
    }));
  
   setErrors({...errors, [name]: null});
  };

  const validateForm = (formName) => {
    const newErrors = {};
    formFields[formName].forEach((field) => {
      const name = field.name;
      if (!formData[formName][name]) {
        newErrors[name] = `${field.label} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event, formName) => {
    event.preventDefault();
    if (validateForm(formName)) {
      console.log(formData[formName]);
    } else {
      console.log(errors[formName]);
    }
  };

  // Array for rendering each form
  const formNames = ["form1", "form2", "form3", "form4"];

  return (
      <Box className="col eshop">
        {formNames.map((formName) => (
          <Box className="form_col" key={formName}>
            <Box component="img" src={ribbon} alt="ribbon" className="ribbon" />
            <GeneralLedgerForm
              cName="eshop_form"
              formfields={formFields[formName]}
              handleSubmit={(e) => handleSubmit(e, formName)}
              formData={formData[formName]}
              onChange={(e) => handleChange(e, formName)}
              errors={errors}
            />
          </Box>
        ))}
      </Box>
  );
}

export default DashboardForm;
