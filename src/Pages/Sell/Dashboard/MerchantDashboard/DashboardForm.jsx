import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import GeneralLedgerForm from "../../../../Components/Form/GeneralLedgerForm";
import ribbon from "../../../../Utils/images/Sell/dashboard/merchant_dashboard/ribbon.svg";
import { useSelector } from "react-redux";
import { get_checkDriveAccess, get_product_names, get_requestDriveAccess, get_sheetsData, getCategories, getShopUserData, getUser, post_open_file, post_products } from "../../../../API/fetchExpressAPI";
import { useParams } from "react-router-dom";
import product_csv from '../../../../Sheets/Ambarsariya Mall - Product CSV.csv'
import item_csv from '../../../../Sheets/Ambarsariya Mall - Item CSV.csv'
import Papa from "papaparse";
import CustomSnackbar from "../../../../Components/CustomSnackbar";

function DashboardForm({data}) {

  console.log(data);

  const [loading, setLoading] = useState(false);
  
  // Initial form data and errors for 4 forms
  const initialData = {
    form1: {
      product_category: "",
      csv_file: "",
      trend_or_exp_date: "",
      // catalogue: "",
    },
    form2: {
      products: "",
      csv_file: "",
      price: 0,
      images_or_videos: "",
    },
    form3: {
      items: "",
      csv_file: "",
      quantity: 0,
      variation_specifications_images: "",
    },
    form4: {
      sku_id: "",
      csv_file: "",
      stock_space: 0,
      upload: "",
    },
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const user_access_token = useSelector((state) => state.auth.userAccessToken);
  const [csvData, setCsvData] = useState([]);
  const [shopNo, setShopNo] = useState('');
  const {token} = useParams();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchData = async (token) => {
    try{
      const shopUsersData = (await getShopUserData(token))[0];
      if(shopUsersData){
        
        setShopNo(shopUsersData.shop_no);
        const categoriesList = shopUsersData.category_name.map((category, index) => ({
          name: category,
          id: shopUsersData.category[index] // Assuming categories and ids are aligned in the same order
        }));
  
        setCategories(categoriesList);  
        fetchProducts(shopUsersData.shop_no);    
      }
    }catch(e){
      console.log("Error while fetching : ", e);
    }
  }

  const fetchProducts = async (shop_no) => {
    try{
      const resp = await get_product_names(shop_no);
      if(resp.valid){
        console.log(resp.data);
        
        setProductsData(resp.data);
      }
    }catch(e){
      console.log("Error fetching products : ",e);
    }
  }

  useEffect(()=>{
    const fetchShopToken = async () => {
      const shop_token = (await getUser(user_access_token))[0].shop_access_token;
      if(shop_token === token){
        fetchData(shop_token);
      }

    }
    fetchShopToken();
  }, [user_access_token])

  const handleDownload = async (e, name) => {
    if(name==="product_csv"){
      console.log(`Checking Drive access for: ${data?.username}`);

      setLoading(true);
      // Step 1: Check if user has access
      const checkAccess = await get_checkDriveAccess(data?.username);
      if (!checkAccess.accessGranted) {
        console.warn("🔄 Redirecting for Google Drive access...");
        get_requestDriveAccess();
        return;
      }
      
      // Step 2: Open Google Drive file
      console.log("Access granted, opening file");
      const response = await post_open_file(data?.username);
      
      setLoading(false);
      if (response.success) {
        window.open(response.url, "_blank");
      } else {
        console.error("❌ Error:", response.message);
      }
    }
    if(name==="item_csv"){
      const link = document.createElement("a");
      link.href = item_csv;  // File URL or path
      link.download = "Item CSV.csv";  // Specify the downloaded file name
      link.click();
    }
  };
console.log(categories)
  // Form fields configuration (for each form)
  const formFields = {
    form1: [
      {
        id: 1,
        label: "Product Category (s)",
        name: "product_category",
        type: "select-check",
        placeholder: "Category(s)",
        options: categories.map((cat) => cat.name),
        defaultCheckedOptions: true,
        readOnly:false
      },
      {
        id: 2,
        label: "Upload Product File",
        name: "csv_file",
        type: "url",
        placeholder: "Link",
      },
      {
        id: 3,
        label: "End of Trend / Exp Date",
        name: "trend_or_exp_date",
        type: "date",
      },
      // {
      //   id: 4,
      //   label: "Upload Catalogue",
      //   name: "catalogue",
      //   type: "file",
      //   placeholder: "Choose file",
      // },
      {
        id: 5,
        label: "Click here to open file",
        name: "product_csv",
        type: 'Download file',
        handleDownload: handleDownload
      },
    ],
    form2: [
      {
        id: 1,
        label: "Product (s)",
        name: "products",
        type: "select-check",
        placeholder: "Select Product(s)",
        options: productsData.map((product)=>product.product_name),
      },
      {
        id: 2,
        label: "Upload Item CSV",
        name: "csv_file",
        type: "url",
        placeholder: "Link",
      },
      {
        id: 3,
        label: "Stock out - cost",
        name: "price",
        type: "text",
        behvaior:'numeric',
      },
      {
        id: 4,
        label: "Select the stock",
        name: "images_or_videos",
        type: "file",
        placeholder: "Choose file",
      },
      {
        id: 5,
        label: "Click here to open file",
        name: "item_csv",
        type: 'Download file',
        handleDownload: handleDownload
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
        name: "csv_file",
        type: "url",
        placeholder: "Link",
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
      {
        id: 5,
        label: "Click here to open file",
        name: "sku_id_csv",
        type: 'Download file',
        handleDownload: handleDownload
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
        name: "csv_file",
        type: "url",
        placeholder: "Link",
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
      {
        id: 5,
        label: "Click here to open file",
        name: "rku_csv",
        type: 'Download file',
        handleDownload: handleDownload
      },
    ],
  };

  const handleChange = (event, formName) => {
    const { name, value, files, type } = event.target;
    let file = type === "file" ? files[0] : value;
    
    // Update formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [formName]: {
        ...prevFormData[formName],
        [name]: file,
      },
    }));
  
   setErrors({...errors, [name]: null});
  };

  

  const validateForm = (formName) => {
    const newErrors = {};
    formFields[formName].forEach((field) => {
      if(field.type !== "Download file"){
        const name = field.name;
        if (!formData[formName][name]) {
          newErrors[name] = `${field.label} is required.`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log(formData["form1"].product_category);
  
  const handleSubmit = async (event, formName) => {
    event.preventDefault();
    if (validateForm(formName)) {
      // const file = formData[formName].csv_file;
      // if (file && file.type === "text/csv") {
      //   Papa.parse(file, {
      //     header: true, // Automatically map the CSV headers to object keys
      //     skipEmptyLines: true, // Skip empty lines
      //     complete: async (result) => {
      //       // Filter out rows where "Product Name" is empty
      //       const filteredData = result.data.filter((row) => row["Product Name"] && row["Product Name"].trim() !== "");
  
      //       const processedData = filteredData.map((product) => {
      //         // Process product images and ensure empty arrays are handled correctly
      //         const productImages = [
      //           product["Product Image 1"],
      //           product["Product Image 2"],
      //           product["Product Image 3"],
      //           product["Product Image 4"],
      //         ];
            
      //         // Ensure that product_images is an array, if no valid images, set as an empty array
      //         const validProductImages = productImages.filter((image) => image && image.trim() !== "");
      //         const finalProductImages = validProductImages.length > 0 ? validProductImages : [""];  // Empty array is treated as an empty string to be formatted as '{}'
            
      //         // Process the product data
      //         return {
      //           shop_no: shopNo,
      //           category: categories.find((cat) => cat.name === product["Category"])?.id, 
      //           product_name: product["Product Name"],
      //           product_type: product["Product Type"],
      //           product_description: product["Product Description"],
      //           price: product["Price"],
      //           brand: product["Brand"],
      //           product_images: finalProductImages, // Ensure it's an empty array or an array with valid values
      //           product_dimensions_width_in_cm: product["Product Dimension Width (in cm)"],
      //           product_dimensions_height_in_cm: product["Product Dimension Height (in cm)"],
      //           product_dimensions_breadth_in_cm: product["Product Dimension Breadth (in cm)"],
      //           product_weight_in_kg: product["Product Weight (in kg)"],
      //           packing: product["Packing"],
      //           product_style: product["Product Style"],
      //           inventory_or_stock_quantity: product["Inventory/Stock Quantity"],
      //           shipping_information: product["Shipping Information"],
      //           variant_group: product["Variant Group"],
      //           features: product["Attributes/Features"],
      //           keywords: product["Keywords/Tags Metadata"],
      //           warranty_or_guarantee: product["Warranty/Guarantee"],
      //           expiry_date: product["Information/Expiry Date"],
      //           manufacturer_details: product["Manufacturer Details"],
      //           manufacturing_date: product["Manufacturing Date"],
      //           compliance_and_certifications: product["Compliance and Certifications"],
      //           return_policy: product["Return Policy"],
      //           customer_reviews_and_ratings: product["Customer Reviews and Ratings"],
      //           promotion_information: product["Promotion Information"],
      //           related_products: product["Related Products"] ? product["Related Products"] : [],  // Use empty array if missing
      //           variation_1: product["Variation 1"],
      //           variation_2: product["Variation 2"],
      //           variation_3: product["Variation 3"],
      //           variation_4: product["Variation 4"],
      //           selling_price: product["Selling Price"],
      //           product_catalog: product["Product Catalog"],
      //           brand_catalog: product["Brand Catalog"],
      //         };
      //       });
            
      //       const data = { products: processedData };  
      //       try{
      //         setLoading(true);
      //         const resp = await post_products(data);
              
      //         setSnackbar({
      //           open: true,
      //           message: resp.message,
      //           severity: "success",
      //         });
      //       }catch(e){
      //         console.log(e)
      //         setSnackbar({
      //           open: true,
      //           message: e.response.data.error,
      //           severity: "error",
      //         });
      //       }finally{
      //         setLoading(false);
      //       }
      //     },
      //     error: (err) => {
      //       console.error("Error parsing CSV:", err);
      //       setSnackbar({
      //         open: true,
      //         message: "Error parsing the CSV file. Please try again.",
      //         severity: "error",
      //       });
      //       setErrors({ ...errors, field: "Error parsing the CSV file. Please try again." });
      //     },
      //   });
      // } else {
      //   console.log("Invalid file type. Please upload a CSV file.");
      //   setSnackbar({
      //     open: true,
      //     message: "Invalid file type. Please upload a CSV file.",
      //     severity: "error",
      //   });
      //   setErrors({ ...errors, field: "Invalid file type. Please upload a CSV file." });
      // }


      const file = formData[formName].csv_file;
      
      try {
        const response = await get_sheetsData(file);
        if (response.success) {
            const result = response.sheets;
            console.log(result);
    
            let headers = []; // Declare headers outside
    
            const filteredData = result.map(sheet => {
                console.log(sheet);
    
                headers = sheet.data[0]; // Extract headers (first row)
    
                return sheet.data.slice(1).filter(row => {
                    const productNameIndex = headers.indexOf("Product Name");
                    const productTypeIndex = headers.indexOf("Product Type");
                    const productDescriptionIndex = headers.indexOf("Product Description");
    
                    // Ensure none of the required fields are empty
                    return row[productNameIndex]?.trim() !== "" &&
                           row[productTypeIndex]?.trim() !== "" &&
                           row[productDescriptionIndex]?.trim() !== "";
                });
            }).flat();
    
            console.log(filteredData);
    
            const processedData = filteredData.map((row, index) => {
              const sheet = result.find(sheet => sheet.data.includes(row)); 

              if (!sheet) {
                  console.warn("Sheet not found for row:", row);
                  return null; // Skip this row if no sheet is found
              }
               const product = {};
                console.log(sheet);
                
                headers.forEach((header, index) => {
                    product[header] = row[index]?.trim() || ""; // Handle empty strings
                });
    
                const productImages = [
                    product["Product Image 1"],
                    product["Product Image 2"],
                    product["Product Image 3"],
                    product["Product Image 4"]
                ].filter(image => image && image.trim() !== "");
    
                return {
                    shop_no: shopNo, // Ensure shopNo is defined elsewhere
                    category: categories.find(cat => cat.name === sheet.sheetName)?.id || null, // Now sheet is defined
                    product_name: product["Product Name"] || "",
                    product_type: product["Product Type"] || "",
                    product_description: product["Product Description"] || "",
                    price: product["Price"] || "0",
                    brand: product["Brand"] || "",
                    iku: product["IKU (ITEM Keeping Unit)"] || "",
                    product_images: productImages.length > 0 ? productImages : [],
                    product_dimensions_width_in_cm: product["Product Dimension Width (in cm)"] || "0",
                    product_dimensions_height_in_cm: product["Product Dimension Height (in cm)"] || "0",
                    product_dimensions_breadth_in_cm: product["Product Dimension Breadth (in cm)"] || "0",
                    product_weight_in_kg: product["Product Weight (in kg)"] || "0",
                    packing: product["Packing"] || "",
                    product_style: product["Product Style"] || "",
                    area_size_lateral : product['AREA (Size lateral)'] || 0,
                    inventory_or_stock_quantity: product["Inventory/Stock Quantity"] || "0",
                    shipping_information: product["Shipping Information"] || "",
                    variant_group: product["Variant Group"] || "",
                    features: product["Attributes/Features"] || "",
                    keywords: product["Keywords/Tags Metadata"] || "",
                    warranty_or_guarantee: product["Warranty/Guarantee"] || "",
                    expiry_date: product["Information/Expiry Date"] || "",
                    manufacturer_details: product["Manufacturer Details"] || "",
                    manufacturing_date: product["Manufacturing Date"] || "",
                    compliance_and_certifications: product["Compliance and Certifications"] || "",
                    return_policy: product["Return Policy"] || "",
                    customer_reviews_and_ratings: product["Customer Reviews and Ratings"] || "",
                    promotion_information: product["Promotion Information"] || "",
                    related_products: product["Related Products"] ? product["Related Products"] : [],
                    variation_1: product["Variation 1"] || "",
                    variation_2: product["Variation 2"] || "",
                    variation_3: product["Variation 3"] || "",
                    variation_4: product["Variation 4"] || "",
                    selling_price: product["Selling Price"] || "0",
                    product_catalog: product["Product Catalog"] || "",
                    brand_catalog: product["Brand Catalog"] || ""
                };
            });
    
            const uniqueCategories = [...new Set(processedData.map(product => product.category))];
            const data = { products: processedData, categories: uniqueCategories };
    
            try{
              setLoading(true);
              const resp = await post_products(data);
              setSnackbar({
                open: true,
                message: resp.message,
                severity: "success",
              });
            }catch(e){
              console.log(e);
              setSnackbar({
                open: true,
                message: e.response.data.error,
                severity: "error",
              });
            }finally{
              setLoading(false);
            }
        }
    } 
    catch (e) {
        console.log(e);
    }
    

    } 
  };
  

  // Array for rendering each form
  const formNames = ["form1", "form2", "form3", "form4"];

  return (
      <Box className="col eshop">
        {loading && <Box className="loading"><CircularProgress/></Box>}
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
              handleDownload={handleDownload}
              noValidate={false}
            />
          </Box>
        ))}
        <CustomSnackbar
              open={snackbar.open}
              handleClose={() => setSnackbar({ ...snackbar, open: false })}
              message={snackbar.message}
              severity={snackbar.severity}
            />
      </Box>
  );
}

export default DashboardForm;
