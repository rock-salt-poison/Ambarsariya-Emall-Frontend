import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import GeneralLedgerForm from "../../../../Form/GeneralLedgerForm";
import CustomSnackbar from "../../../../CustomSnackbar";
import { getCashData, getUser, postCashData } from "../../../../../API/fetchExpressAPI";


function Cash_PopupContent({onClose}) {
    const token = useSelector((state) => state.auth.userAccessToken);
    const [shop_no, setShop_no] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const initialData = {
        name: "",
        bank_name: "",
        bank_ifsc_code: "",
        bank_address: "",
        account_number: "",
        upi_linked_with_services: "",
        bank_cash_available: "",
        bank_limit_available: "",
        other_credits_available: "",
        cash_available_in_cash_counter: "",
        cash_available_in_other_wallets_and_e_wallets: "",
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    // Fetch shop_no and existing data
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
                    
                    // Fetch existing cash data
                    try {
                        const cashResp = await getCashData(userResp.shop_no);
                        if (cashResp.exists && cashResp.data) {
                            // Map database fields to form fields
                            setFormData({
                                name: cashResp.data.name || "",
                                bank_name: cashResp.data.bank_name || "",
                                bank_ifsc_code: cashResp.data.bank_ifsc_code || "",
                                bank_address: cashResp.data.bank_address?.formatted_address || cashResp.data.bank_address?.description || "",
                                account_number: cashResp.data.bank_account_number || "",
                                upi_linked_with_services: cashResp.data.upi_linked_services || "",
                                bank_cash_available: cashResp.data.bank_cash_available?.toString() || "",
                                bank_limit_available: cashResp.data.bank_limit_available?.toString() || "",
                                other_credits_available: cashResp.data.other_credits_available?.toString() || "",
                                cash_available_in_cash_counter: cashResp.data.cash_available_in_counter?.toString() || "",
                                cash_available_in_other_wallets_and_e_wallets: cashResp.data.cash_available_in_wallets?.toString() || "",
                            });
                        }
                    } catch (error) {
                        console.error("Error fetching cash data:", error);
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

    const formFields = [
        {
            id: 1,
            label: "Name",
            name: "name",
            type: "text"
        },
        {
            id: 2,
            label: "Bank Name",
            name: "bank_name",
            type: "text"
        },
        {
            id: 3,
            label: "Bank IFSC Code",
            placeholder:'IFSC Code',
            name: "bank_ifsc_code",
            type: "text"
        },
        {
            id: 4,
            label: "Bank Address",
            name: "bank_address",
            type: "address"
        },
        {
            id: 5,
            label: "Account Number",
            name: "account_number",
            type: "text",
            behavior: "numeric",
        },
        {
            id: 6,
            label: "UPI linked with services",
            name: "upi_linked_with_services",
            type: "text",
        },
        {
            id: 7,
            label: "Bank cash available",
            name: "bank_cash_available",
            type: "text",
            behavior: "numeric",
        },
        {
            id: 8,
            label: "Bank limit available",
            name: "bank_limit_available",
            type: "text",
            behavior: "numeric",
        },
        {
            id: 9,
            label: "Other credits available",
            name: "other_credits_available",
            type: "text",
        },
        {
            id: 10,
            label: "Cash available in cash counter",
            name: "cash_available_in_cash_counter",
            type: "text",
            behavior: "numeric",
        },
        {
            id: 11,
            label: "Cash available in other wallets and E-wallets",
            name: "cash_available_in_other_wallets_and_e_wallets",
            type: "text",
            behavior: "numeric",
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
            if (!formData[name]) {
                newErrors[name] = `${field.label} is required.`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            if (!shop_no) {
                setSnackbar({
                    open: true,
                    message: "Shop number not found. Please try again.",
                    severity: "error",
                });
                return;
            }

            try {
                setLoading(true);
                
                // Map form fields to database fields
                const dataToSave = {
                    shop_no: shop_no,
                    name: formData.name,
                    bank_name: formData.bank_name,
                    bank_ifsc_code: formData.bank_ifsc_code,
                    bank_address: formData.bank_address,
                    bank_account_number: formData.account_number,
                    upi_linked_services: formData.upi_linked_with_services,
                    bank_cash_available: formData.bank_cash_available || 0,
                    bank_limit_available: formData.bank_limit_available || 0,
                    other_credits_available: formData.other_credits_available || 0,
                    cash_available_in_counter: formData.cash_available_in_cash_counter || 0,
                    cash_available_in_wallets: formData.cash_available_in_other_wallets_and_e_wallets || 0,
                };

                const response = await postCashData(dataToSave);
                
                setSnackbar({
                    open: true,
                    message: response.message || "Cash data saved successfully.",
                    severity: "success",
                });

                // Close popup after a short delay
                setTimeout(() => {
                    if (onClose) {
                        onClose();
                    }
                }, 1500);
            } catch (error) {
                console.error("Error saving cash data:", error);
                setSnackbar({
                    open: true,
                    message: error.response?.data?.message || "Failed to save cash data. Please try again.",
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


    return (
        <>
            <GeneralLedgerForm
                cName="cash"
                description="Includes all cash on hand and in bank accounts."
                formfields={formFields}
                handleSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                errors={errors}
            />
            {fetching && (
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

export default Cash_PopupContent;
