import React, { useEffect, useState } from "react";
import GeneralLedgerForm from "../../../../Form/GeneralLedgerForm";
import { useSelector } from "react-redux";
import {
  get_shop_categories,
  get_shop_product_items,
  get_shop_products,
  getUser,
} from "../../../../../API/fetchExpressAPI";
import { Box, CircularProgress } from "@mui/material";

function Inventory_PopupContent() {
  const initialData = {
    category: "",
    products: "",
    items: "",
    quantity: 0,
    price: "",
    date_time: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.auth.userAccessToken);

  useEffect(() => {
    if (token) {
      fetch_shop_categories(token);
    }
  }, [token]);

  const fetch_shop_categories = async (token) => {
    if (token) {
      const resp = await getUser(token);
      if (resp?.[0]) {
        setUser(resp?.[0]);
        const categoriesResp = await get_shop_categories(resp?.[0]?.shop_no);
        if (categoriesResp?.valid) {
          setCategories(categoriesResp?.data);
        }
      }
    }
  };

  const fetch_shop_products =async (category, shop_no)=>{
    if(category && shop_no){
        try{
            setLoading(true);
            const resp = await get_shop_products(shop_no, category);            
            if(resp?.valid){
                setProducts(resp?.data);
            }
        }catch(e){
            console.error(e);
            setProducts([]);
        }finally{
            setLoading(false);
        }
    }
  }

  const fetch_shop_product_items = async (product_id)=>{
    if(product_id){
        try{
            setLoading(true);
            const resp = await get_shop_product_items(product_id);            
            if(resp?.valid){
                console.log(resp?.data)
                setItems(resp?.data);
            }
        }catch(e){
            console.error(e);
            setItems([]);
        }finally{
            setLoading(false);
        }
    }
  }

  useEffect(()=>{
    if(formData?.category && user?.shop_no){
        const selectedCategory = categories?.find((c)=>c.category_name === formData?.category)?.category_id;
        console.log(selectedCategory);
        
        if(selectedCategory){
            fetch_shop_products(selectedCategory, user?.shop_no);
        }
    }
  }, [user, formData]);

  useEffect(()=>{
    if(formData?.products && user?.shop_no){
        const selectedProductId = products?.find((p)=>p.product_id === formData?.products)?.product_id;
        console.log(selectedProductId);
        
        if(selectedProductId){
            fetch_shop_product_items(selectedProductId);
        }
    }
  }, [user, formData]);


  const formFields = [
    {
      id: 1,
      label: "Choose Category",
      name: "category",
      type: "select",
      options: categories?.map((c)=>c.category_name),
    },
    {
      id: 2,
      label: "Choose Products",
      name: "products",
      type: "select",
      options: products?.map((p)=>({label:`${p.product_name} | ${p.brand}`, value: p.product_id})),
    },
    {
      id: 3,
      label: "Choose Item",
      name: "items",
      type: "select",
      options: items?.map((i)=>({label : `${(i.item_id)?.split('_')?.[8]?.replace(/-/g, ' ')} | ${(i.item_id)?.split('_')?.[10]}`, value: i.item_id})),
    },
    { id: 4, label: "Quantity", name: "quantity", type: "quantity" }, // Quantity field
    { id: 5, label: "Price", name: "price", type: "text", behavior: "numeric" },
    { id: 6, label: "Date / Time", name: "date_time", type: "datetime-local" },
  ];

  const handleChange = (event) => {
  const { name, value } = event.target;

  if (name === "items") {
    const selectedItem = items.find((i) => i.item_id === value);

    if (selectedItem) {
      setFormData((prev) => ({
        ...prev,
        items: value,
        quantity: selectedItem.quantity_in_stock,
        price: selectedItem.selling_price,
        date_time: new Date(selectedItem.updated_at).toISOString().slice(0, 16),
      }));
    }
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Clear error
  setErrors((prev) => ({
    ...prev,
    [name]: null,
  }));
};



  // Handle Increment/Decrement for Quantity
  const handleIncrement = () => {
    setFormData((prevState) => ({
      ...prevState,
      quantity: parseInt(prevState.quantity) + 1,
    }));
  };

  const handleDecrement = () => {
    setFormData((prevState) => {
      const newQuantity = parseInt(prevState.quantity) - 1;
      return { ...prevState, quantity: newQuantity >= 0 ? newQuantity : 0 }; // Prevent negative quantity
    });
  };

  const validateForm = () => {
    const newErrors = {};

    formFields.forEach((field) => {
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
    <>
    {loading && <Box className="loading"><CircularProgress/></Box> }
    <GeneralLedgerForm
      cName="inventory"
      description="The value of goods available for sale."
      formfields={formFields}
      handleSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      errors={errors}
      handleIncrement={handleIncrement}
      handleDecrement={handleDecrement}
    />
    </>
  );
}

export default Inventory_PopupContent;
