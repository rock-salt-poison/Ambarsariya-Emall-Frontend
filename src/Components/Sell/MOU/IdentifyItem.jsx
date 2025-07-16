import React, { useEffect, useState } from "react";
import GeneralLedgerForm from "../../Form/GeneralLedgerForm";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { get_category_wise_shops, get_mou, get_vendor_details, getUser, post_identification_of_mou } from "../../../API/fetchExpressAPI";
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { setSelectedProductAndShops } from "../../../store/mouSelectedProductsSlice";
import CustomSnackbar from "../../CustomSnackbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function IdentifyItem({handleClose}) {
  const initialData = {
    products: "",
    group: "",
    vendors: "",
    details_of_vendor: "",
    last_conversation: "",
  };

   const {mou_access_token} = useParams();

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const allProducts = useSelector((state) => state.cart.selectedProducts);
  const products = allProducts.filter((p) => p.subscribe === true);
  const token = useSelector((state) => state.auth.userAccessToken);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [purchaserShopNo, setPurchaserShopNo] = useState("");
  const dispatch = useDispatch();
  const selectedData = useSelector(
    (state) => state.mou.selectedProductAndShops
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();


  console.log(allProducts);
  console.log(products);

  useEffect(() => {
    if (token) {
      const fetchPurchaserShopNo = async () => {
        const resp = (await getUser(token))?.find((u) => u?.shop_no !== null);
        if (resp?.user_type === "merchant" || resp?.user_type === "shop") {
          setPurchaserShopNo(resp?.shop_no);
        }
      };
      fetchPurchaserShopNo();
    }
  }, [token, formData?.products]);

  useEffect(()=>{
    if(mou_access_token){
      const fetchMouData = async () =>{
        try{
          setLoading(true);
          const resp = await get_mou(mou_access_token);
          
          if(resp?.valid){
            const mouData = resp?.data?.[0];
            setFormData((prev)=>({
              ...prev,
              products: mouData?.products?.map((p)=>p.id),
              group: mouData?.selected_group,
              vendors: mouData?.vendors_or_shops
            }))
          }
        }catch(e){
          console.log(e);
        }finally{
          setLoading(false);
        }
      }
      fetchMouData();
    }
  },[mou_access_token])

  const formFields = [
    {
      id: 1,
      label: "Select product (s) cum",
      name: "products",
      type: "select-check",
      options: products.map((p) => ({
        label: p.product_name,
        value: p.product_id,
      })),
      // value : selectedData?.product_id || ''
      // adornmentValue:<SearchIcon/>
    },
    {
      id: 2,
      label: "Group",
      name: "group",
      type: "text",
      placeholder: "-",
      adornmentValue: "Group : ",
    },
    {
      id: 3,
      label: "Select vendor(s)",
      name: "vendors",
      type: "select-check",
      options: vendors?.map((v) => ({
        label: v.business_name,
        value: v.shop_no,
      })),
      // value: selectedData?.shop_nos || ''
    },
    // {
    //   id: 4,
    //   label: "Show all details of vendor / shop(s)",
    //   name: "details_of_vendor",
    //   type: "text",
    // },
    // {
    //   id: 5,
    //   label: "Last conversation",
    //   name: "last_conversation",
    //   type: "text",
    // },
  ];

  useEffect(() => {
    if (formData?.products || selectedData) {
      const fetch_shops = async () => {
        // const selectedCategories = [
        //     ...new Set(
        //     formData.products
        //         .map((productId) => {
        //         const match = products?.find((p) => p?.product_id === productId);
        //         return match?.category || null;
        //         })
        //         .filter((cat) => cat !== null)
        //     ),
        // ];

        // const selectedProduct = formData?.products ? products?.find(p=>p.product_id === formData?.products) : selectedData?.product_id && products?.find(p=>p.product_id === selectedData?.product_id);

        try {
          setLoading(true);
          const resp = await get_category_wise_shops(
            products?.[0]?.shop_no,
            purchaserShopNo
          );
          if (resp?.valid) {
            console.log(resp.data);
            setVendors(resp?.data);
            setFormData((prev) => ({
              ...prev,
              group: `${resp?.data?.[0]?.domain_name} - ${resp?.data?.[0]?.sector_name}`,
            }));
          }
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
      fetch_shops();
    }
  }, [formData?.products, selectedData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Handle 'vendors' validation
    // if (name === "vendors") {
    //   // Ensure value is treated as an array
    //   const selected = Array.isArray(value) ? value : [];

    //   if (selected.length < 2) {
    //     setErrors((e) => ({
    //       ...e,
    //       [name]: "Please select at least 2 shops.",
    //     }));
    //   } else if (selected.length > 3) {
    //     setErrors((e) => ({
    //       ...e,
    //       [name]: "Please select maximum 3 shops only.",
    //     }));
    //   } else {
    //     setErrors((e) => ({
    //       ...e,
    //       [name]: null,
    //     }));
    //   }

    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: selected,
    //   }));
    //   return; // Exit early for vendors
    // }

    // For all other fields
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((e) => ({
      ...e,
      [name]: null,
    }));
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

  useEffect(()=>{
    if(formData?.vendors){
      const fetch_vendor_details = async () => {
        try{
          setLoading(true);
          const resp = await get_vendor_details(formData?.vendors);
          if(resp?.valid){
            setVendorDetails(resp?.data);
            const vendorDetailsData = resp?.data?.map((data)=> ({
              shop_no: data?.shop_no,
              business_name: data?.business_name,
              cost_sensitivity: data?.cost_sensitivity,
              class: data?.shop_class,
            }));

            setFormData((prev)=>({
              ...prev,
              details_of_vendor: vendorDetailsData
            }))
          }
          console.log(resp);
        }catch(e){
          console.log(e);
        }finally{
          setLoading(false);
        }
      }
      fetch_vendor_details();
    }
  }, [formData?.vendors]);


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      console.log(formData);

      const selectedProduct = products.find(
        (p) => p.product_id === formData?.products
      );
      // const selectedCategories = [
      //         ...new Set(
      //         formData.products
      //             .map((productId) => {
      //             const match = products?.find((p) => p?.product_id === productId);
      //             return match?.category || null;
      //             })
      //             .filter((cat) => cat !== null)
      //         ),
      //     ];
      const selectedProducts = formData.products.map((productId) => {
      const match = products?.find((p) => p?.product_id === productId);
      console.log(match);

        return (
          {
            id: productId,
            item_id : match?.selectedVariant,
            daily_min_quantity : match?.daily_min_quantity,
            weekly_min_quantity : match?.weekly_min_quantity,
            monthly_min_quantity : match?.monthly_min_quantity,
            editable_min_quantity : match?.editable_min_quantity,
            cost_price : match?.matched_price || match?.selling_price || match?.product_selling_price ,
            name: match?.product_name,
            category: match?.category,
            max_stock_size: match?.max_stock_quantity,
          } || null
        );
      });
    //   dispatch(
    //     setSelectedProductAndShops({
    //       products: selectedProducts,
    //       shop_nos: formData?.vendors,
    //     })
    //   );

    const data = {
        products: selectedProducts,
        selected_group: formData?.group,
        vendors_or_shops: formData?.vendors,
        buyer_id: purchaserShopNo,
        details_of_vendors_or_shops: formData?.details_of_vendor,
        last_mou: null,
        ...(mou_access_token && { access_token: mou_access_token }) 
    };
    console.log(data);
    

    if(data){
        try{
            setLoading(true);
            const resp = await post_identification_of_mou(data);
            console.log(resp);
            if(resp){
                setSnackbar({
                    open: true,
                    message: resp.message,
                    severity: "success",
                });
                if(!mou_access_token){
                    setTimeout(()=>{
                        navigate(`${resp?.access_token}`);
                        handleClose();
                    }, 2000);
                }else{
                    setTimeout(()=>{
                        handleClose();
                    }, 2000)
                }
            }
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

      // Proceed with further submission logic, e.g., API call
    } else {
      console.log(errors);
    }
  };

  const showDetailsOfVendorsOrShops = () => {
    return (
      <Box className="details_of_vendors">
        <Typography className="label">
          Details of Vendor(s) or Shop(s)
        </Typography>
        {vendorDetails && <Box className="table_container">
          <Table>
            <TableHead>
              <TableRow>
                {['Shop Name', 'Class', 'Cost Sensitivity']?.map((heading, index)=>{
                  return <TableCell key={index}>{heading}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                vendorDetails?.map((vendor,index)=> {
                  return <TableRow hover key={index}>
                  <TableCell>{vendor?.business_name}</TableCell>
                  <TableCell>{vendor?.shop_class}</TableCell>
                  <TableCell>{vendor?.cost_sensitivity}</TableCell>
                </TableRow>
                })
              }
            </TableBody>
          </Table>
        </Box>}
      </Box>
    )
  } 

  const showLastConversation = () => {
    return (
      <Box className="last_conversation">
        <Typography className="label">
          Last Conversation
        </Typography>
      </Box>
    )
  } 

  return (
    <>
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      <GeneralLedgerForm
        formfields={formFields}
        handleSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        errors={errors}
        submitButtonText="Create Mou"
        showDetails={true}
        details={[showDetailsOfVendorsOrShops(), showLastConversation()]}
      />

      <CustomSnackbar
              open={snackbar.open}
              handleClose={() => setSnackbar({ ...snackbar, open: false })}
              message={snackbar.message}
              severity={snackbar.severity}
            />
    </>
  );
}

export default IdentifyItem;
