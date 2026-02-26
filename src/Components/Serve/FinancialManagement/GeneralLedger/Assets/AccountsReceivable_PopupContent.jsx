import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import GeneralLedgerForm from "../../../../Form/GeneralLedgerForm";
import CustomSnackbar from "../../../../CustomSnackbar";
import { getUser, getShopUserData, getCustomersList, getAccountsReceivableData, postAccountsReceivableData } from "../../../../../API/fetchExpressAPI";

function AccountsReceivable_PopupContent({onClose}) {
  const token = useSelector((state) => state.auth.userAccessToken);
  const [shop_no, setShop_no] = useState(null);
  const [shop_phone, setShop_phone] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const initialData = {
    member_or_customer_no: "",
    digilocker_authentication_level: "",
    company_loan_and_post_paid: "",
    credit_limit_shop_no: "",
    credit_limit_phone_no: "",
    credit_ledger_table: "",
    total_credits: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  // Fetch shop_no and customers list
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
          
          // Pre-populate credit limit shop_no with current shop_no
          setFormData(prev => ({
            ...prev,
            credit_limit_shop_no: userResp.shop_no,
          }));
          
          // Fetch shop user data to get phone number
          try {
            if (userResp.shop_access_token) {
              const shopData = await getShopUserData(userResp.shop_access_token);
              if (shopData && shopData.length > 0) {
                const phone = shopData[0].phone_no_1 || "";
                setShop_phone(phone);
                // Pre-populate credit limit phone number
                setFormData(prev => ({
                  ...prev,
                  credit_limit_phone_no: phone,
                }));
              }
            } else {
              // If shop_access_token is not available, try to get phone from user data
              // or leave it empty
              console.warn("shop_access_token not available, phone number may not be fetched");
            }
          } catch (error) {
            console.error("Error fetching shop user data:", error);
          }
          
          // Fetch customers list (members and vendors)
          try {
            const customersResp = await getCustomersList(userResp.shop_no);
            if (customersResp?.valid && customersResp?.data) {
              setCustomers(customersResp.data);
            }
          } catch (error) {
            console.error("Error fetching customers list:", error);
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

  // Fetch existing data when customer is selected
  useEffect(() => {
    const fetchExistingData = async () => {
      if (shop_no && formData.member_or_customer_no) {
        try {
          const resp = await getAccountsReceivableData(shop_no, formData.member_or_customer_no);
          if (resp.exists && resp.data) {
            setFormData(prev => ({
              ...prev,
              digilocker_authentication_level: resp.data.digilocker_auth_level?.toString() || "",
              company_loan_and_post_paid: resp.data.company_loan_postpaid?.toString() || "",
              total_credits: resp.data.total_credit_given?.toString() || "",
            }));
          }
        } catch (error) {
          console.error("Error fetching existing data:", error);
        }
      }
    };

    fetchExistingData();
  }, [formData.member_or_customer_no, shop_no]);

  const formFields = [
    {
      id: 1,
      label: "Member / Customer No:",
      name: "member_or_customer_no",
      type: "select",
      options: customers.map(c => ({ label: c.label, value: c.customer_id })),
    },
    {
      id: 2,
      label: "Digilocker Authentication Level",
      name: "digilocker_authentication_level",
      type: "text",
      behavior: "numeric",
      placeholder:'Ex: 4'
    },
    {
      id: 3,
      label: "Company Loan & Post Paid",
      name: "company_loan_and_post_paid",
      type: "text",
    },
    {
      id: 4,
      label: "Credit Limit Choose Shop No",
      type:'text',
      innerField: [
        {
          id: 1,
          label: "Choose Shop No",
          name: "credit_limit_shop_no",
          type: "text",
          placeholder:'Shop No',
          readOnly: true,
        },
        {
          id: 2,
          label: "Enter Phone number",
          placeholder:'Phone number',
          name: "credit_limit_phone_no",
          type: "text",
          behavior: "numeric",
          readOnly: true,
        },
      ],
    },
    {
      id: 5,
      label: "Open Credit Ledger Table",
      name: "credit_ledger_table",
      type: "text",
    },
    {
      id: 6,
      label: "Total Credit Given",
      placeholder:'credits',
      name: "total_credits",
      type: "number",
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

    formFields.forEach((field) => {
      const name = field.name;
      // Validate main fields
      if (!field.innerField && !formData[name]) {
        newErrors[name] = `${field.label} is required.`;
      }
      // Validate inner fields if present
      if (field.innerField) {
        field.innerField.forEach((inner) => {
          const innerName = inner.name;
          if (!formData[innerName]) {
            newErrors[innerName] = `${inner.label} is required.`;
          }
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      if (!shop_no || !formData.member_or_customer_no) {
        setSnackbar({
          open: true,
          message: "Shop number and customer selection are required.",
          severity: "error",
        });
        return;
      }

      try {
        setLoading(true);
        
        // Find selected customer to get customer_type
        const selectedCustomer = customers.find(c => c.customer_id === formData.member_or_customer_no);
        if (!selectedCustomer) {
          setSnackbar({
            open: true,
            message: "Invalid customer selected.",
            severity: "error",
          });
          return;
        }

        // Map form fields to database fields
        // Map customer_type: 'Vendor' stays as 'Vendor', 'Member' stays as 'Member'
        // If it's a merchant/shop, we can use 'Merchant' or 'Vendor' based on business logic
        let customerType = selectedCustomer.customer_type;
        if (customerType === 'Vendor') {
          customerType = 'Vendor';
        } else {
          customerType = 'Member'; // Default to Member for members
        }

        const dataToSave = {
          shop_no: shop_no,
          customer_id: formData.member_or_customer_no,
          customer_type: customerType,
          digilocker_auth_level: formData.digilocker_authentication_level ? parseInt(formData.digilocker_authentication_level) : 0,
          company_loan_postpaid: formData.company_loan_and_post_paid ? parseInt(formData.company_loan_and_post_paid) : 0,
          total_credit_given: formData.total_credits ? parseInt(formData.total_credits) : 0,
          outstanding_balance: formData.total_credits ? parseInt(formData.total_credits) : 0, // Can be calculated separately if needed
        };

        const response = await postAccountsReceivableData(dataToSave);
        
        setSnackbar({
          open: true,
          message: response.message || "Accounts receivable data saved successfully.",
          severity: "success",
        });

        // Close popup after a short delay
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 1500);
      } catch (error) {
        console.error("Error saving accounts receivable data:", error);
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Failed to save accounts receivable data. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (fetching) {
    return (
      <Box className="loading">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <GeneralLedgerForm
        cName="accounts_receivable"
        description="Amounts owed to the store by customers on credit. Credits To Mall Member / Customer"
        formfields={formFields}
        handleSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />
      {loading && (
        <Box className="loading">
          <CircularProgress size={24} />
        </Box>
      )}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
}

export default AccountsReceivable_PopupContent;
