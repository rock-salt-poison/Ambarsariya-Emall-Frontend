import React, { useEffect, useState } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import FormField from "./FormField";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategories,
  getShopUserData,
  getUser,
  otherShops,
  post_discount_coupons,
  updateEshopData,
} from "../../API/fetchExpressAPI";
import { useSelector, useDispatch } from "react-redux";
import { setUpdatedField } from "../../store/editedEshopFieldsSlice";
import CustomSnackbar from "../CustomSnackbar";

const EshopForm = () => {
  const initialFormData = {
    business_name: "",
    date_of_establishment: "",
    usp_values: "",
    product_samples: "",
    // similar_options: [],
    upi_id: "",
    cost_sensitivity: 0,
    daily_walkin: 0,
    parking_availability: 0,
    category: [],
    advt_video: "",
    key_players: [],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const [similarOptions, setSimilarOptions] = useState([]);
  const [keyPlayers, setKeyPlayers] = useState([]);
  const [categories, setCategories] = useState([]);
  const user_access_token = useSelector((state) => state.auth.userAccessToken);
  const updatedFields = useSelector((state) => state.updatedFields);
  const dispatch = useDispatch();
  const [eshop, setEshop] = useState('');

  const coupons = useSelector((state) => state.coupon);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { edit } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchOtherShops = async (token) => {
    try {
      setLoading(true);
      const resp = await otherShops(token);
      const shopUsersData = (await getShopUserData(token))?.[0];
      if (resp) {
        setSimilarOptions(resp);
        setKeyPlayers(resp);
      }
      

      if (shopUsersData) {
        const domain_id = shopUsersData.domain_id;
        const sector_id = shopUsersData.sector_id;
        const categories_result = await getCategories({ domain_id, sector_id });
        const formattedCategories = categories_result.map((data) => ({
          id: data.category_id,
          name: data.category_name,
        }));
        setCategories(formattedCategories);

        const selectedCategories = shopUsersData.category?.map((category_id) => {
          const resp = formattedCategories.filter(
            (category) => category.id === category_id
          );
          return resp[0].name;
        });

        const selected_key_players = shopUsersData.key_players
          ?.map((shop_no) =>
            resp.filter((othershops) => othershops.shop_no === shop_no)
          )
          .map((key_players) => key_players[0].business_name);

        // const selected_similar_options = shopUsersData.similar_options
        //   ?.map((shop_no) =>
        //     resp.filter((othershops) => othershops.shop_no === shop_no)
        //   )
        //   .map((options) => options[0].business_name);

        // const selected_key_players = selected_key_players_array.map((key_players)=>(key_players[0].business_name))

        // const selected_key_players = selected_key_players_array.map((key_players)=>(key_players[0].business_name))

        const establishment_date_only =
          shopUsersData.establishment_date?.split("T")[0];

        const initialFormData = {
          business_name: shopUsersData.business_name || "",
          date_of_establishment: establishment_date_only || "",
          usp_values: shopUsersData.usp_values_url || "",
          product_samples: shopUsersData.product_sample_url || "",
          // similar_options: selected_similar_options || [],
          upi_id: shopUsersData.upi_id || "",
          cost_sensitivity: shopUsersData.cost_sensitivity || 0,
          daily_walkin: shopUsersData.daily_walkin || 0,
          parking_availability: shopUsersData.parking_availability || 0,
          category: selectedCategories || [],
          advt_video: shopUsersData.advertisement_video_url || "",
          key_players: selected_key_players || [],
        };

        setFormData(initialFormData);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log("Error while fetching : ", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user_access_token) {
        try{
          setLoading(true);
          let users = (await getUser(user_access_token));
          let shop = users.find((u)=>u.shop_no !== null);
          console.log(shop);
          
          if (shop?.shop_access_token) {
            setEshop(shop);
            fetchOtherShops(shop?.shop_access_token);
          }
        }catch(e){
          console.log(e);
        }finally{
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user_access_token]);

  const handleChange = async (e) => {
    const { name, type, files, value } = e.target;
    let fieldValue = type === "file" ? files[0] : value;

    // Handle file validation and store the file in formData
    if (type === "file") {
      const file = files[0];

      // Check file type based on the field name
      if (name === "usp_values" && file.type !== "application/pdf") {
        console.log("Please upload a PDF file");
        return;
      }
      // if (name === "products" && file.type !== "text/csv") {
      //   console.log("Please upload a CSV file");
      //   return;
      // }
      // if (name === "advt_video" && file.type !== "video/mp4") {
      //   console.log("Please upload an MP4 video file");
      //   return;
      // }

      fieldValue = file;
    }

    setFormData({
      ...formData,
      [name]: fieldValue,
    });

    dispatch(setUpdatedField({ name, value: fieldValue }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: "" }));
  };

  const handleSliderChange = (event, newValue, name) => {
    setFormData({
      ...formData,
      [name]: newValue,
    });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: "" }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    const requiredFields = [
      "business_name",
      "date_of_establishment",
      "usp_values",
      "product_samples",
      "cost_sensitivity",
      "daily_walkin",
      "parking_availability",
      "category",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        newErrorMessages[field] = `${field.replace(/_/g, " ")} is required`;
        valid = false;
      }
    });

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };
  console.log(eshop);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (validate()) {
      const selectedCategoryIds = formData.category.map((categoryName) => {
        const category = categories.find((cat) => cat.name === categoryName);
        return category ? category.id : null;
      });

      // const selectedSimilarOptions = formData.similar_options
      //   ? formData.similar_options.map((options) => {
      //       const similarOption = similarOptions.find(
      //         (option) => option.business_name === options
      //       );
      //       return similarOption.shop_no;
      //     })
      //   : [];

      const selectedKeyPlayers = formData.key_players
        ? formData.key_players.map((options) => {
            const keyPlayer = keyPlayers.find(
              (option) => option.business_name === options
            );
            return keyPlayer.shop_no;
          })
        : [];

      console.log(selectedCategoryIds);
      // Prepare the updated post data
      const updatedPostData = {
        business_name: formData.business_name,
        date_of_establishment: formData.date_of_establishment,
        usp_values: formData.usp_values, // Placeholder link, make sure to replace with actual URL if needed
        product_samples: formData.product_samples,
        upi_id: formData.upi_id,
        cost_sensitivity: formData.cost_sensitivity,
        daily_walkin: formData.daily_walkin,
        parking_availability: formData.parking_availability,
        category: selectedCategoryIds, // Hardcoded category, make sure to replace if needed
        advt_video: formData.advt_video, // Placeholder, replace as needed
        key_players: selectedKeyPlayers,
      };

      // Get the userAcessToken (either from localStorage or wherever it's stored)
      const userAccessToken = localStorage.getItem("accessToken");

      if (userAccessToken) {
        try {
          setLoading(true);
          // Call the function to update e-shop data
          const data = (await getUser(userAccessToken))[0];
          console.log(eshop);
          
          if (eshop?.shop_access_token) {
            const response = await updateEshopData(updatedPostData, eshop?.shop_access_token);

            if (response.message) {
              const validityStart = new Date();
              
              // Format validity_start as 'YYYY-MM-DD'
              const formattedValidityStart = validityStart.toLocaleString().split('T')[0];
              
              // Calculate validity_end as one year after validity_start
              const validityEnd = new Date(validityStart);
              validityEnd.setFullYear(validityStart.getFullYear() + 1);
            
              // Format validity_end as 'YYYY-MM-DD'
              const formattedValidityEnd = validityEnd.toLocaleString().split('T')[0];
            
              const coupons_data = {
                validity_start: formattedValidityStart,
                validity_end: formattedValidityEnd,
                data: coupons 
              };
            
              console.log(coupons_data)
              const discount_coupons = await post_discount_coupons(coupons_data, eshop.shop_no);

              console.log(discount_coupons)
            }
            
            setLoading(false);

            setSnackbar({
              open: true,
              message: response.message,
              severity: "success",
            });
            
            // Navigate to the shop page after a successful submission
            setTimeout(() => {
              navigate(`../support/shop/shop-detail/${eshop.shop_access_token}`);
            }, 2500);
          }
        } catch (error) {
          setLoading(false);
          console.error("Error updating e-shop data:", error);
          if(error.response.data.error==="File size exceeds the 1MB limit."){
            setSnackbar({
              open: true,
              message: "File size should not exceed the 1MB limit.",
              severity: "error",
            });
          }else{
            setSnackbar({
              open: true,
              message: error.error,
              severity: "error",
            });
          }
        }
      } else {
        setLoading(false);
        setSnackbar({
          open: true,
          message: "Shop access token not found.",
          severity: "error",
        });
      }
    }
  };

  const getSliderMarks = (name) => {
    switch (name) {
      case "cost_sensitivity":
        return [
          { value: 0, label: "Easy" },
          { value: 1, label: "Moderate" },
          { value: 2, label: "Effective" },
          { value: 3, label: "Luxury" },
        ];
      case "daily_walkin":
        return [
          { value: 0, label: "Low" },
          { value: 1, label: "Medium" },
          { value: 2, label: "High" },
          { value: 3, label: "Dense" },
        ];
      case "parking_availability":
        return [
          { value: 0, label: "Morning" },
          { value: 1, label: "Afternoon" },
          { value: 2, label: "Evening" },
        ];
      default:
        return [];
    }
  };

  const renderFormField = (
    label,
    name,
    type,
    options = [],
    placeholder = "",
    additionalProps = {}
  ) => {
    let additionalClass = "";
    let accept = ""; // Initialize accept based on field

    // Define accept types based on field name
    if (name === "usp_values") {
      accept = "application/pdf";
    // } else if (name === "products") {
    //   accept = ".csv";
    } else if (name === "advt_video") {
      accept = "video/mp4";
    }

    if (name === "parking_availability") {
      additionalClass = "parking-availability-slider";
    } else if (name === "cost_sensitivity") {
      additionalClass = "cost-sensitivity-slider";
    } else if (name === "daily_walkin") {
      additionalClass = "daily-walkin-slider";
    }

    const isUpdated = updatedFields[name] !== undefined;
    const updatedFieldClass = isUpdated ? "updated-field" : "";

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
        // readOnly={edit ? true : false}
        {...additionalProps}
      />
    );
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      {loading && <Box className="loading">
                <CircularProgress />
              </Box>}
      <Box className="form-group">
        {renderFormField("Name of the business :", "business_name", "text")}
        {renderFormField(
          "Date of establishment :",
          "date_of_establishment",
          "date"
        )}
        {renderFormField("USP Values (PDF) :", "usp_values", "file")}
        {renderFormField(
          "Product Sample :",
          "product_samples",
          "url",
          "",
          "Add gmeet link"
        )}
        <Box className="form-group2">
          {/* {renderFormField(
            "Similar Options :",
            "similar_options",
            "select-check",
            similarOptions.map((option) => option.business_name),
            "Select"
          )} */}
          {renderFormField(
            "UPI Id :",
            "upi_id",
            "text",
          )}
          {renderFormField(
            "Key players :",
            "key_players",
            "select-check",
            keyPlayers.map((option) => option.business_name),
            "Select"
          )}
        </Box>
        {renderFormField("Cost sensitivity :", "cost_sensitivity", "range")}

        <Box className="form-group2">
          <Box className="form-subgroup">
            {renderFormField("Daily Walkin :", "daily_walkin", "range")}
          </Box>

          <Box className="form-subgroup">
            {renderFormField(
              "Parking Availability :",
              "parking_availability",
              "range"
            )}
          </Box>
        </Box>

        {renderFormField(
          "Category :",
          "category",
          "select-check",
          categories.map((cat) => cat.name),
          "Select categories"
        )}
        {renderFormField(
          "Advertisement Video :",
          "advt_video",
          "url",
          "",
          "Add youtube video link"
        )}
      </Box>
      {/* {!edit ? (
        <Box className="submit_button_container">
          <Button type="submit" variant="contained" className="submit_button">
            Submit
          </Button>
          <Button
            variant="contained"
            className="submit_button"
            onClick={() => navigate("../support/shop/shop-detail/dashboard/edit/preview")}
          >
            Form Preview
          </Button>
        </Box>
      ) : (
        ""
      )} */}

      {
        <Box className="submit_button_container">
          <Button type="submit" variant="contained" className="submit_button">
            Submit
          </Button>
          {!edit && <Button
            variant="contained"
            className="submit_button"
            onClick={() => navigate("../support/shop/shop-detail/dashboard/edit/preview")}
          >
            Form Preview
          </Button>}
        </Box>
    }
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default EshopForm;