import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import GeneralLedgerForm from "../../../../Components/Form/GeneralLedgerForm";
import ribbon from "../../../../Utils/images/Sell/dashboard/merchant_dashboard/ribbon.svg";
import { useSelector } from "react-redux";
import { get_checkDriveAccess, get_items, get_product_names, get_requestDriveAccess, get_sheetsData, get_sku, getCategoryId, getShopUserData, getUser, post_items, post_open_file, post_open_items_csv_file, post_open_rku_csv_file, post_open_sku_csv_file, post_products, post_rku, post_sku } from "../../../../API/fetchExpressAPI";
import { useParams } from "react-router-dom";
import product_csv from '../../../../Sheets/Ambarsariya Mall - Product CSV.csv'
import item_csv from '../../../../Sheets/Ambarsariya Mall - Item CSV.csv'
import Papa from "papaparse";
import CustomSnackbar from "../../../../Components/CustomSnackbar";

function DashboardForm({data}) {

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [skuData, setSKUData] = useState([]);
  
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
      no_of_rack:'',
      no_of_shelves:'',
      shelf_size:'',
      shelf_length:'',
      shelf_breadth:'',
      shelf_height:'',
    },
    form3: {
      items: "",
      csv_file: "",
      no_of_walls_of_rack: "",
      no_of_racks_per_wall : "" ,
      store_location: "",
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
  const [isRackValid, setIsRackValid] = useState(false);
  
  const user_access_token = useSelector((state) => state.auth.userAccessToken);
  const [csvData, setCsvData] = useState([]);
  const [shopNo, setShopNo] = useState('');
  const {token} = useParams();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if(formData.form3.no_of_walls_of_rack && formData.form3.no_of_racks_per_wall){
      const noOfWalls = parseInt(formData.form3.no_of_walls_of_rack);
      const noOfRacksPerWall = parseInt(formData.form3.no_of_racks_per_wall);
      const totalRacks = noOfWalls * noOfRacksPerWall;
      const availableRacks = itemsData?.[0]?.no_of_racks || 0;
    
      console.log('total racks', totalRacks);
      console.log('available racks', availableRacks);
      
      // Check if total racks do not exceed available racks
      if (totalRacks === availableRacks && noOfWalls > 0 && noOfRacksPerWall > 0) {
        setIsRackValid(true);
        setSnackbar({
          open: true,
          message: 'Valid racks',
          severity: "success",
        });
      } else {
        setIsRackValid(false);
        setSnackbar({
          open: true,
          message: 'Total racks exceed available racks',
          severity: "error",
        });
      }
    }
  }, [formData.form3.no_of_walls_of_rack, formData.form3.no_of_racks_per_wall, formData.form2.no_of_rack]);


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
        fetchItems(shopUsersData.shop_no);    
        fetchSKU(shopUsersData.shop_no);    
      }
    }catch(e){
      console.log("Error while fetching : ", e);
    }
  }

  const fetchProducts = async (shop_no) => {
    try{
      const resp = await get_product_names(shop_no);
      if(resp.valid){      
        setProductsData(resp.data);
      }
    }catch(e){
      console.log("Error fetching products : ",e);
    }
  }

  const fetchItems = async (shop_no) => {
    try{
      const resp = await get_items(shop_no);
      if(resp.valid){
        setItemsData(resp.data);
      }
    }catch(e){
      console.log("Error fetching products : ",e);
    }
  }

  const fetchSKU = async (shop_no) => {
    try{
      const resp = await get_sku(shop_no);
      if(resp.valid){
        setSKUData(resp.data);
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
      try{
        setLoading(true);
        const rackData = {
          no_of_racks:formData.form2.no_of_rack,
          no_of_shelves:formData.form2.no_of_shelves,
          shelf_length:formData.form2.shelf_length,
          shelf_breadth:formData.form2.shelf_breadth,
          shelf_height:formData.form2.shelf_height,
        }
        const response = await post_open_items_csv_file(data?.username, data?.shop_no, rackData);
        if (response.success) {
          window.open(response.url, "_blank");
        } else {
          console.error("❌ Error:", response.message);
        }

      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
      }
    }

    if(name==="sku_id_csv"){
      try{
        setLoading(true);
        const rackWallData = {
          no_of_walls_of_rack : formData.form3.no_of_walls_of_rack,
          no_of_racks_per_wall : formData.form3.no_of_racks_per_wall,
          store_location : formData.form3.store_location,
        }
        const response = await post_open_sku_csv_file(data?.username, data?.shop_no, rackWallData);
        if (response.success) {
          window.open(response.url, "_blank");
        } else {
          console.error("Error:", response.message);
        }

      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
      }
    }
    if(name==="rku_id_csv"){
      try{
        setLoading(true);
        
        const response = await post_open_rku_csv_file(data?.username, data?.shop_no);
        if (response.success) {
          window.open(response.url, "_blank");
        } else {
          console.error("❌ Error:", response.message);
        }

      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
      }
    }
  };


  console.log(itemsData.length<=0 && isRackValid)
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
        readOnly:true
      },
      {
        id: 2,
        label: "Create / Update",
        btn_text: "Click here to open file",
        name: "product_csv",
        type: 'Download file',
        handleDownload: handleDownload
      },
      {
        id: 3,
        label: "Upload sheet",
        name: "csv_file",
        type: "url",
        placeholder: "Link",
      },
      {
        id: 4,
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
      
    ],
    form2: [
      {
        id: 1,
        label: "Product (s)",
        name: "products",
        type: "select-check",
        placeholder: "Select Product(s)",
        options: productsData.map((product)=>product.product_name),
        defaultCheckedOptions: true,
        readOnly:true,
        disable:productsData.length<=0,
      },
      {
        id: 2,
        label: "No. of rack",
        innerField : [
          {id: 1,
            name: "no_of_rack",
            type: "number",
            value: formData?.form2?.no_of_rack || itemsData?.[0]?.no_of_racks || '',
            placeholder: "Enter no of rack",
            disable:productsData.length<=0,
          },
          {id: 2,
            name: "no_of_shelves",
            type: "number",
            value: formData?.form2?.no_of_shelves || itemsData?.[0]?.no_of_shelves || '',
            placeholder: "No. of shelves in each rack",
            disable:productsData.length<=0,
          },
        ]
        
      },
      {
        id: 3,
        label: "Shelf Size (in cm)",
        innerField : [
          {id: 1,
          name: "shelf_length",
          type: "number",
          value: formData?.form2?.shelf_length || itemsData?.[0]?.shelf_length || '',
          placeholder: "Length",
          disable:productsData.length<=0,
        },
          {id: 2,
            name: "shelf_breadth",
            type: "number",
            value: formData?.form2?.shelf_breadth || itemsData?.[0]?.shelf_breadth || '',
            placeholder: "Breadth",
            disable:productsData.length<=0,
          },
          {id: 3,
            name: "shelf_height",
            type: "number",
            value: formData?.form2?.shelf_height || itemsData?.[0]?.shelf_height || '',
            placeholder: "Height",
            disable:productsData.length<=0,
          }
        ]
      },
      {
        id: 4,
        label: "Create / Update",
        btn_text: "Click here to open file",
        name: "item_csv",
        type: 'Download file',
        handleDownload: handleDownload,
        disable:productsData.length<=0,
      },
      {
        id: 5,
        label: "Upload Item CSV",
        name: "csv_file",
        type: "url",
        placeholder: "Link",
        disable:productsData.length<=0,
      },
      
      
    ],
    form3: [
      {
        id: 1,
        label: "Item (s)",
        name: "items",
        type: "select-check",
        placeholder: "Select Item(s)",
        options: itemsData.map((item)=>item.item_id),
        disable: itemsData.length<=0,
        defaultCheckedOptions: true,
        readOnly:true,
      },
      {
        id: 2,
        label: "Walls of Rack",
        innerField: [
          {id:1 ,
            label:'No. of walls of rack',
          name: "no_of_walls_of_rack",
          type: "number",
          value: formData?.form3?.no_of_walls_of_rack || skuData?.[0]?.no_of_walls_of_rack || '',
          placeholder:'No. of walls of rack',
          disable: itemsData.length<=0,
          },
          {id:2 ,
            label:'No. of racks in each wall',
            name: "no_of_racks_per_wall",
            type: "number",
            value: formData?.form3?.no_of_racks_per_wall || skuData?.[0]?.no_of_racks_in_a_wall || '',
            placeholder:'No. of racks in each wall',
            disable: itemsData.length<=0,
            }
        ]
      },
      {
        id: 3,
        label: "Location of the store",
        name: "store_location",
        type: "address",
        placeholder: "store location",
        disable: !isRackValid
      },
      {
        id: 4,
        label: "Create / Update",
        btn_text: "Click here to open file",
        name: "sku_id_csv",
        type: 'Download file',
        disable: !isRackValid,
        handleDownload: handleDownload
      },
      {
        id: 5,
        label: "Upload SKU Id CSV",
        name: "csv_file",
        type: "url",
        placeholder: "Link",
        disable: !isRackValid
      },
      
    ],
    form4: [
      {
        id: 1,
        label: "SKU Id",
        name: "sku_id",
        type: "select-check",
        placeholder: "Select SKU Id",
        options: skuData.map((sku)=>sku.sku_id),
        disable:skuData.length<=0,
        defaultCheckedOptions: true,
        readOnly:true,
      },
      {
        id: 2,
        label: "Create / Update",
        btn_text: "Click here to open file",
        name: "rku_id_csv",
        type: 'Download file',
        handleDownload: handleDownload,
        disable:skuData.length<=0,
      },
      {
        id: 3,
        label: "Upload RKU Id CSV",
        name: "csv_file",
        type: "url",
        placeholder: "Link",
        disable:skuData.length<=0,
      },
      {
        id: 4,
        label: "Stock space (Available in rack)",
        name: "stock_space",
        type: "number",
        disable:skuData.length<=0,
      },
      {
        id: 5,
        label: "Upload",
        name: "upload",
        type: "file",
        placeholder: "Choose file",
        disable:skuData.length<=0,
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
      if(field.type !== "Download file" && field.type !== 'select-check'){
        const name = field.name;
        if (!formData[formName][name]) {
          newErrors[name] = `${field.label} is required.`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = async (event, formName) => {
    event.preventDefault();
    
    if (formName === 'form1' && validateForm('form1')) {
      
      const file = formData['form1'].csv_file;
      
      try {
        const response = await get_sheetsData(file);
        if (response.success) {
            const result = response.sheets;
            console.log(result);
    
            let headers = []; // Declare headers outside
    
            const filteredData = result.map(sheet => {
    
                headers = sheet.data[0]; // Extract headers (first row)
    
                return sheet.data.slice(2).filter(row => {
                    const productNameIndex = headers.indexOf("Product Name");
                    const productTypeIndex = headers.indexOf("Product Type");
                    const productDescriptionIndex = headers.indexOf("Product Description");
    
                    // Ensure none of the required fields are empty
                    return row[productNameIndex]?.trim() !== "" &&
                           row[productTypeIndex]?.trim() !== "" &&
                           row[productDescriptionIndex]?.trim() !== "";
                });
            }).flat();
        
            const processedData = await Promise.all(filteredData.map(async (row, index) => {
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
                const iku =  product['IKU (ITEM Keeping Unit)'].split(', ');

                const categoryId = await getCategoryId(sheet?.sheetName);
                return {
                    shop_no: shopNo, // Ensure shopNo is defined elsewhere
                    product_no: product["Product No"] || null,
                    category: categoryId || null,
                    product_name: product["Product Name"] || null,
                    product_type: product["Product Type"] || null,
                    product_description: product["Product Description"] || null,
                    price: product["Price"] || 0,
                    unit: product["Unit"] || null,
                    brand: product["Brand"] || null,
                    iku: iku || [],
                    product_images: productImages.length > 0 ? productImages : [],
                    product_dimensions_width_in_cm: product["Product Dimension Width (in cm)"] || 0,
                    product_dimensions_height_in_cm: product["Product Dimension Height (in cm)"] || 0,
                    product_dimensions_breadth_in_cm: product["Product Dimension Breadth (in cm)"] || 0,
                    product_weight_in_kg: product["Product Weight (in kg)"] || "0",
                    packing: product["Packing"] || null,
                    product_style: product["Product Style"] || null,
                    area_size_lateral : product['AREA (Size lateral)'] || 0,
                    inventory_or_stock_quantity: product["Inventory/Stock Quantity"] || 0,
                    shipping_information: product["Shipping Information"] || null,
                    variant_group: product["Variant Group"] || "",
                    features: product["Attributes/Features"] || null,
                    keywords: product["Keywords/Tags Metadata"] || null,
                    warranty_or_guarantee: product["Warranty/Guarantee"] || null,
                    expiry_date: product["Information/Expiry Date"] || null,
                    manufacturer_details: product["Manufacturer Details"] || null,
                    manufacturing_date: product["Manufacturing Date"] || null,
                    compliance_and_certifications: product["Compliance and Certifications"] || null,
                    return_policy: product["Return Policy"] || null,
                    customer_reviews_and_ratings: product["Customer Reviews and Ratings"] || null,
                    promotion_information: product["Promotion Information"] || null,
                    related_products: product["Related Products"] ? product["Related Products"] : [],
                    variation_1: product["Variation 1"] || null,
                    variation_2: product["Variation 2"] || null,
                    variation_3: product["Variation 3"] || null,
                    variation_4: product["Variation 4"] || null,
                    selling_price: product["Selling Price"] || 0,
                    product_catalog: product["Product Catalog"] || null,
                    brand_catalog: product["Brand Catalog"] || null
                };
            }));
    
            const uniqueCategories = [...new Set(processedData.map(product => product.category))];
            const data = { products: processedData, categories: uniqueCategories };
            console.log(data);
            
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
                message: `Error : ${e.response.data.message.detail}`,
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
    else if (formName === 'form2' ) {
      
      const file = formData['form2'].csv_file;
      
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
                    const noOfItemsIndex = headers.indexOf("No of Items");
                    const weightOfItemKgsIndex = headers.indexOf("Weight of item kgs");
                    const sellingPriceIndex = headers.indexOf("Selling Price");
                    const costPriceIndex = headers.indexOf("Cost Price");
                    const quantityInStockIndex = headers.indexOf("Quantity in stock");
                    const maxItemQuantityIndex = headers.indexOf("Max Item Quantity");

    
                    // Ensure none of the required fields are empty
                    return row[noOfItemsIndex]?.trim() !== "" &&
                           row[weightOfItemKgsIndex]?.trim() !== "" &&
                           row[sellingPriceIndex]?.trim() !== "" &&
                           row[costPriceIndex]?.trim() !== "" &&
                           row[quantityInStockIndex]?.trim() !== "" &&
                           row[maxItemQuantityIndex]?.trim() !== "";
                });
            }).flat();
    
            console.log(filteredData);
    
            const processedData = filteredData.map((row, index) => {
              const sheet = result.find(sheet => sheet.data.includes(row)); 

              if (!sheet) {
                  console.warn("Sheet not found for row:", row);
                  return null; // Skip this row if no sheet is found
              }
               const items = {};
                console.log(sheet);
                
                headers.forEach((header, index) => {
                    items[header] = row[index]?.trim() || ""; // Handle empty strings
                });
    
                return {
                  item_no : items["Item No"] || null,
                  itemID : items["Item ID"] || null,
                  product_id : items["Product ID"] || null,
                  no_of_items : items["No of Items"] || null,
                  weight_of_item : items["Weight of item kgs"] || null,
                  item_area : items["Item area"] || null, 
                  make_material: items["Make Material"] || null,
                  storage_requirements : items["Storage Occupied"] || null,
                  selling_price : items["Selling Price"] || null,
                  cost_price : items["Cost Price"] || null,
                  quantity_in_stock : items["Quantity in stock"] || null,
                  max_item_quantity : items["Max Item Quantity"] || null,
                  subscribe : items["Subscribe"] || null,
                  weekly_min_quantity : items["Weekly  (Min Quantity)"] || null,
                  monthly_min_quantity : items["Monthly  (Min Quantity)"] || null,
                  daily_min_quantity : items["Daily (Min Quantity)"] || null,
                  editable_min_quantity : items["Editable (Min Quantity)"] || null,
                  item_package_dimensions : items["ITEM ID Package Dimensions (max)"] || null,
                  color : items["Color"] || null,
                  specification_1 : items["Specification 1"] || null,
                  specification_2 : items["Specification 2"] || null,
                  specification_3 : items["Specification 3"] || null,
                  specification_4 : items["Specification 4"] || null,
                  no_of_racks: items["Number of Racks"] || null,
                  no_of_shelves: items["Number of Shelves"] || null,
                  shelf_length: items["Length of Shelf"] || null,
                  shelf_breadth: items["Breadth of Shelf"] || null,
                  shelf_height: items["Height of Shelf"] || null,
                  sku_id : items["SKU ID"] || null,
                  shop_no: shopNo,  
                };
            });
    
            // const uniqueCategories = [...new Set(processedData.map(product => product.category))];
            const data = { items: processedData };
            console.log(data);
            
            try{
              setLoading(true);
              const resp = await post_items(data);
              console.log(resp);
              
              setSnackbar({
                open: true,
                message: resp.message,
                severity: "success",
              });
            }catch(e){
              console.log(e);
              setSnackbar({
                open: true,
                message: `Error : ${e.response.data.message.detail}`,
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
    else if (formName === 'form3' ) {
      
      const file = formData['form3'].csv_file;
      
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
                    const minStockIndex = headers.indexOf("Min Stock");
                    
                    // Ensure none of the required fields are empty
                    return row[minStockIndex]?.trim() !== "" ;
                });
            }).flat();
    
            console.log(filteredData);
    
            const processedData = filteredData.map((row, index) => {
              const sheet = result.find(sheet => sheet.data.includes(row)); 

              if (!sheet) {
                  console.warn("Sheet not found for row:", row);
                  return null; // Skip this row if no sheet is found
              }
               const sku = {};
                console.log(sheet);
                
                headers.forEach((header, index) => {
                    sku[header] = row[index]?.trim() || ""; // Handle empty strings
                });
                
                const rku =  sku['RKU ID'].split(',');
    
                return {
                  sku_id : sku["SKU Code (SKU ID)"] || null,
                  product_id : sku["Product ID"] || null,
                  // product_name : sku["Product Name"] || null,
                  // category : sku["Category"] || null,
                  // brandor_manufacturer : sku["Brand or Manufacturer"] || null,
                  model_or_product_code : sku["Model or Product Code*"] || null, 
                  color: sku["Color"] || null,
                  max_stock_size : sku["Max Stock Size"] || null,
                  // product_type : sku["Product Type"] || null,
                  location : sku["Location"] || null,
                  // manufacturing_date : sku["Batch or Manufacturing Date (Optional)"] || null,
                  // expiry_date : sku["End of Batch/Expiry Date (Optional)"] || null,
                  // quantity : sku["Quantity"] || null,
                  // weight_in_kg : sku["Weight in kgs"] || null,
                  no_of_walls_of_rack : sku["No of Walls of Rack(s)"] || null,
                  no_of_racks_in_a_wall : sku["No of Racks in a (Wall)"] || null,
                  min_stock : sku["Min Stock"] || null,
                  stock_level : sku["Stock Level"] || null,
                  low_stock : sku["Low Stock"] || null,
                  medium_stock : sku["Medium Stock"] || null,
                  high_stock : sku["High Stock"] || null,
                  // number_of_racks : sku["Number of Racks"] || null,
                  // number_of_shelves : sku["Number of Shelves "] || null,
                  // shelf_length: sku["Length of Shelf"] || null,
                  // shelf_breadth: sku["Breadth of Shelf"] || null,
                  // shelf_height: sku["Height of Shelf"] || null,
                  total_area_of_shelf: sku["Total Area of Shelf"] || null,
                  total_shelf_area_in_rack: sku["Total Shelf Area in Rack"] || null,
                  max_area_of_stock : sku["Max Area of Stock"] || null,
                  total_shelves : sku["Total Shelves"] || null,
                  max_racks : sku["Max Racks"] || null,
                  shelves_extra : sku["Shelves extra"] || null,
                  items_per_shelf : sku["Items Per Shelf"] || null,
                  max_rack : sku["Max Rack"] || null,
                  max_shelves : sku["Max Shelves"] || null,
                  rku_id : rku || [],
                  shop_no: shopNo,  
                };
            });
    
            // const uniqueCategories = [...new Set(processedData.map(product => product.category))];
            const data = { sku_data: processedData };
            console.log(data);
            
            try{
              setLoading(true);
              const resp = await post_sku(data);
              console.log(resp);
              
              setSnackbar({
                open: true,
                message: resp.message,
                severity: "success",
              });
            }catch(e){
              console.log(e);
              setSnackbar({
                open: true,
                message: `Error : ${e.response.data.message.detail}`,
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

    else if (formName === 'form4' ) {
      
      const file = formData['form4'].csv_file;
      
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
                    const quantitySaleIndex = headers.indexOf("Quantity Sale");
                    const quantityPurchaseIndex = headers.indexOf("Quantity Purchase");
                    
                    // Ensure none of the required fields are empty
                    return row[quantitySaleIndex]?.trim() !== "" && row[quantityPurchaseIndex]?.trim() !== "" ;
                });
            }).flat();
    
            console.log(filteredData);
    
            const processedData = filteredData.map((row, index) => {
              const sheet = result.find(sheet => sheet.data.includes(row)); 

              if (!sheet) {
                  console.warn("Sheet not found for row:", row);
                  return null; // Skip this row if no sheet is found
              }
               const rku = {};
                console.log(sheet);
                
                headers.forEach((header, index) => {
                    rku[header] = row[index]?.trim() || ""; // Handle empty strings
                });
                
                // const rku =  sku['RKU ID'].split(',');
    
                return {
                  RKU_ID: rku["RKU ID"] || null,
                  product : rku["Product"] || null,
                  item : rku["Item"] || null,
                  rack_no : rku["Rack No (RKU ID)"] || null,
                  shelf_no : rku["Shelf No (Product ID)"] || null,
                  product_id : rku["Product ID"] || null,
                  placement_max : rku["Placement (max)"] || null,
                  quantity_sale : rku["Quantity Sale"] || null,
                  placement_for_so : rku["Placement for S.O"] || null,
                  update_quantity : rku["Update Quantity"] || null,
                  quantity_purchase : rku["Quantity Purchase"] || null,
                  placement_for_po : rku["Placement for P.O"] || null,
                  shop_no: shopNo,  
                };
            });
    
            const data = { rku_data: processedData };
            console.log(data);
            
            try{
              setLoading(true);
              const resp = await post_rku(data);
              console.log(resp);
              
              setSnackbar({
                open: true,
                message: resp.message,
                severity: "success",
              });
            }catch(e){
              console.log(e);
              setSnackbar({
                open: true,
                message: `Error : ${e.response.data.message.detail}`,
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