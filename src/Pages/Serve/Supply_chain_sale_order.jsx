import React, { useState } from "react";
import { Box, Button, ThemeProvider, Tooltip, Typography } from "@mui/material";
import FormField from "../../Components/Form/FormField";
import createCustomTheme from "../../styles/CustomSelectDropdownTheme";
import supply_chain_management_icon from "../../Utils/images/Serve/emotional/eshop/supply_chain_management_icon.webp";
import HR_management_icon from "../../Utils/images/Serve/emotional/eshop/HR_management_icon.png";
import ribbon from "../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg";
import Button2 from "../../Components/Home/Button2";
import PieChartComponent from "../../Components/Serve/SupplyChain/PieChartComponent";
import BarChartComponent from "../../Components/Serve/SupplyChain/BarChartComponent";
import Header from "../../Components/Serve/SupplyChain/Header";
import DateRangePicker from "rsuite/esm/DateRangePicker";

function Supply_chain_sale_order(props) {
  const [showDateRange, setShowDateRange] = useState(false); // Manage state for date range visibility

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || "var(--yellow)",
    scrollbarThumb: "var(--brown)",
  };

  const theme = createCustomTheme(themeProps);

  const formsConfig = [
    {
      name: "Sale Order",
      fields: [
        // { name: 'sector', label: 'Sector', type: 'text', defaultValue: 'Health and pharmaceuticals', readOnly: true },
        {
          name: "category",
          label: "Category",
          placeholder: "Select category",
          type: "select",
          options: [
            "Medicine",
            "Supplements",
            "Medical Equipment",
            "Personal Care",
            "First Aid & Emergency Care",
          ],
          required: true,
        },
        {
          name: "product",
          label: "Product",
          placeholder: "Select Product",
          type: "select",
          options: [
            "Pain Relief",
            "Antibiotics",
            "Multivitamins",
            "Omega-3",
            "Surgical Instruments",
            "Skin Care",
            "Emergency Kits",
          ],
          required: true,
        },
        // { name: 'item', label: 'Item', placeholder: 'Select Item', type: 'select', options: ['Ibuprofen 200mg Tablets', 'Amoxicillin 500mg Capsules', 'Paracetamol 500mg Tablets', 'Centrum Multivitamins', 'Blood Pressure Monitor', 'Hand Sanitizer', 'Moisturizing Lotion'], required: true },
        {
          name: "expiry_date",
          label: "Expiry Date",
          placeholder: "Expiry Date",
          type: "date",
          required: true,
        },
      ],
    },
  ];

  const initialFormData = formsConfig.reduce((acc, form) => {
    acc[form.name] = form.fields.reduce((fieldAcc, field) => {
      fieldAcc[field.name] = "";
      return fieldAcc;
    }, {});
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e, formName) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [formName]: {
        ...prevData[formName],
        [name]: value,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [formName]: {
        ...prevErrors[formName],
        [name]: "",
      },
    }));
  };

  const validateForm = (formName) => {
    const newErrors = {};
    const formConfig = formsConfig.find((form) => form.name === formName);

    formConfig.fields.forEach((field) => {
      if (field.required && !formData[formName][field.name]) {
        newErrors[field.name] = `${field.placeholder} is required`;
      }
    });

    return newErrors;
  };

  const handleSubmit = (e, formName) => {
    e.preventDefault();
    const validationErrors = validateForm(formName);
    if (Object.keys(validationErrors).length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [formName]: validationErrors,
      }));
    } else {
      console.log(`${formName} data:`, formData[formName]);
    }
  };

  const handlePieChartHeadingClick = (heading) => {
    if (heading === "Previous Sale") {
      setShowDateRange(true);
    } else if (heading === "Today's Sale") {
      setShowDateRange(false);
    }
  };

  // Focus and blur handlers for date fields
  const handleFocus = (e) => {
    if (e.target.name === "expiry_date") {
      // console.log(e.target.type)
      e.target.type = "date";
    }
  };

  const handleBlur = (e) => {
    if (e.target.name === "expiry_date") {
      e.target.type = "text";
    }
  };

  const dataset = [
    { london: 59, paris: 57, newYork: 86, value: 21, month: "1" },
    { london: 50, paris: 52, newYork: 78, value: 28, month: "2" },
    { london: 47, paris: 53, newYork: 106, value: 41, month: "3" },
    { london: 54, paris: 56, newYork: 92, value: 73, month: "4" },
    { london: 57, paris: 69, newYork: 92, value: 99, month: "5" },
    { london: 60, paris: 63, newYork: 103, value: 144, month: "6" },
    { london: 59, paris: 60, newYork: 105, value: 319, month: "7" },
    { london: 65, paris: 60, newYork: 106, value: 249, month: "8" },
    { london: 51, paris: 51, newYork: 95, value: 131, month: "9" },
    { london: 60, paris: 65, newYork: 97, value: 55, month: "10" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box className="supply_chain_sale_order_wrapper">
        <Box className="row">
          <Header
            icon_1={supply_chain_management_icon}
            icon_2={HR_management_icon}
            title="Sale Order"
            icon_1_link="../emotional/eshop/supply-chain"
            icon_2_link="../emotional/eshop/hr-management"
            redirectTo="../emotional/eshop"
          />

          <Box className="col">
            <Box className="container">
              {formsConfig.map((form, index) => (
                <Box className="col-3" key={index}>
                  <Box
                    component="img"
                    src={ribbon}
                    alt="ribbon"
                    className="ribbon"
                  />
                  <Typography className="form_heading" variant="h3">
                    {form.name}
                  </Typography>

                  <Box
                    component="form"
                    className="form_container"
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => handleSubmit(e, form.name)}
                  >
                    {form.fields.slice(0, 2).map((field, idx) => (
                      <Tooltip
                        key={idx}
                        title={field.placeholder}
                        className="tooltip"
                        placement="bottom-end"
                      >
                        <Box
                          className={
                            field.name === "dateFrom" || field.name === "dateTo"
                              ? "date_field_container"
                              : ""
                          }
                        >
                          <FormField
                            name={field.name}
                            label={field.label}
                            type={field.type === "date" ? "text" : field.type}
                            value={
                              field.name === "sector"
                                ? field.defaultValue
                                : formData[form.name][field.name]
                            }
                            onChange={(e) => handleChange(e, form.name)}
                            placeholder={field.placeholder}
                            options={field.options}
                            error={!!errors[form.name]?.[field.name]}
                            errorMessage={errors[form.name]?.[field.name]}
                            readOnly={field.readOnly}
                            handleFocus={(e) => handleFocus(e)}
                            handleBlur={(e) => handleBlur(e)}
                          />
                        </Box>
                      </Tooltip>
                    ))}
                    <Box className="item_count">
                      <Typography className="label">
                        Sale of the product/item
                      </Typography>
                      <DateRangePicker />
                    </Box>

                    {form.fields.slice(2).map((field, idx) => (
                      <Tooltip
                        key={idx}
                        title={field.placeholder}
                        className="tooltip"
                        placement="bottom-end"
                      >
                        <Box
                          className={
                            field.name === "dateFrom" || field.name === "dateTo"
                              ? "date_field_container"
                              : ""
                          }
                        >
                          <FormField
                            name={field.name}
                            label={field.label}
                            type={field.type === "date" ? "text" : field.type}
                            value={
                              field.name === "sector"
                                ? field.defaultValue
                                : formData[form.name][field.name]
                            }
                            onChange={(e) => handleChange(e, form.name)}
                            placeholder={field.placeholder}
                            options={field.options}
                            error={!!errors[form.name]?.[field.name]}
                            errorMessage={errors[form.name]?.[field.name]}
                            readOnly={field.readOnly}
                            handleFocus={(e) => handleFocus(e)}
                            handleBlur={(e) => handleBlur(e)}
                          />
                        </Box>
                      </Tooltip>
                    ))}
                    <Box className="submit_button_container">
                      <Button type="submit" variant="contained" className="btn">
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}

              <Box className="sub_container">
                <Box className="pieCharts">
                  <PieChartComponent
                    title="Today's Sale"
                    pieData="data1"
                    hideLegend={false}
                    onHeadingClick={handlePieChartHeadingClick}
                  />
                  <PieChartComponent
                    title="Previous Sale"
                    pieData="data2"
                    hideLegend={true}
                    onHeadingClick={handlePieChartHeadingClick}
                  />
                </Box>
                <BarChartComponent
                  dataset={dataset}
                  label="INR"
                  dataKey="month"
                />
              </Box>
            </Box>
          </Box>

          <Box className="col">
            <Button2
              text="Back"
              redirectTo="../emotional/eshop/suppliers-for-shop"
            />
            <Button2
              text="Next"
              redirectTo="../emotional/eshop/stock-management"
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Supply_chain_sale_order;
