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
  const [fetching, setFetching] = useState(true);
  const [shop_no, setShop_no] = useState(null);
  const token = useSelector((state) => state.auth.userAccessToken);

  // Fetch shop_no and categories on mount
  useEffect(() => {
    const fetchShopData = async () => {
      if (!token) {
        setFetching(false);
        return;
      }

      try {
        setFetching(true);
        // Get shop_no from user
        const userResp = (await getUser(token))?.find((u) => u.shop_no !== null);
        
        if (userResp?.shop_no) {
          setShop_no(userResp.shop_no);
          
          // Fetch categories
          try {
            const categoriesResp = await get_shop_categories(userResp.shop_no);
            if (categoriesResp?.valid) {
              setCategories(categoriesResp?.data || []);
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
          }
        }
      } catch (error) {
        console.error("Error fetching shop data:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchShopData();
  }, [token]);

  // Fetch products when category changes
  useEffect(() => {
    if (formData?.category && shop_no && categories.length > 0) {
      const selectedCategory = categories?.find((c) => c.category_name === formData?.category)?.category_id;
      
      if (selectedCategory) {
        // Reset products and items when category changes
        setProducts([]);
        setItems([]);
        setFormData((prev) => ({
          ...prev,
          products: "",
          items: "",
          quantity: 0,
          price: "",
          date_time: "",
        }));

        const fetchProducts = async () => {
          try {
            setLoading(true);
            const resp = await get_shop_products(shop_no, selectedCategory);
            if (resp?.valid) {
              setProducts(resp?.data || []);
            } else {
              setProducts([]);
            }
          } catch (e) {
            console.error("Error fetching products:", e);
            setProducts([]);
          } finally {
            setLoading(false);
          }
        };

        fetchProducts();
      }
    }
  }, [formData?.category, shop_no, categories]);

  // Fetch items when product changes
  useEffect(() => {
    if (formData?.products && products.length > 0) {
      const selectedProductId = products?.find((p) => p.product_id === formData?.products)?.product_id;
      
      if (selectedProductId) {
        // Reset items when product changes
        setItems([]);
        setFormData((prev) => ({
          ...prev,
          items: "",
          quantity: 0,
          price: "",
          date_time: "",
        }));

        const fetchItems = async () => {
          try {
            setLoading(true);
            const resp = await get_shop_product_items(selectedProductId);
            if (resp?.valid) {
              setItems(resp?.data || []);
            } else {
              setItems([]);
            }
          } catch (e) {
            console.error("Error fetching items:", e);
            setItems([]);
          } finally {
            setLoading(false);
          }
        };

        fetchItems();
      }
    }
  }, [formData?.products, products]);


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
      {fetching && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
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
