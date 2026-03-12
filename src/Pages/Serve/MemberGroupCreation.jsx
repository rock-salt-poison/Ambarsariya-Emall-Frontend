import React, { useState, useEffect } from 'react';
import { Box, Button, ThemeProvider, Tooltip, Typography, CircularProgress, Checkbox } from '@mui/material';
import FormField from '../../Components/Form/FormField';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Header from '../../Components/Serve/SupplyChain/Header';
import GeneralLedgerForm from '../../Components/Form/GeneralLedgerForm';
import { fetchDomains, fetchDomainSectors, getCategories, getDomainSectorCategorySpecificShops, getSupplierShops, getUser } from '../../API/fetchExpressAPI';
import ScrollableTabsButton from '../../Components/ScrollableTabsButton';
import { useSelector } from 'react-redux';

function MemberGroupCreation(props) {
  const initialData = {
    domains: [],
    sectors: [],
    categories: [],
    group_name: '',
};

const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState(initialData);
const [errors, setErrors] = useState({});
const [domainsOptions, setDomainsOptions] = useState([]);
const [sectorsOptions, setSectorsOptions] = useState([]);
const [categoriesOptions, setCategoriesOptions] = useState([]);
const [shopsLoading, setShopsLoading] = useState(false);
const [shops, setShops] = useState([]);
const [selectedShops, setSelectedShops] = useState([]);
const [currentShopNo, setCurrentShopNo] = useState(null);
const token = useSelector((state) => state.auth.userAccessToken);

const handleClick = () => {
  console.log("hi")
}

// Fetch current logged-in shop_no (if any)
useEffect(() => {
  const fetchCurrentShop = async () => {
    if (!token) return;
    try {
      const resp = await getUser(token);
      const shopUser = resp?.find((u) => u.shop_no !== null);
      if (shopUser?.shop_no) {
        setCurrentShopNo(shopUser.shop_no);
      }
    } catch (e) {
      console.error('Error fetching current shop user:', e);
    }
  };

  fetchCurrentShop();
}, [token]);

// Fetch initial data on component mount
useEffect(() => {
  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const domainsData = await fetchDomains();
      setDomainsOptions(domainsData.map(domain => ({
        value: domain.domain_id,
        label: domain.domain_name
      })));
    } catch (error) {
      console.error('Error fetching domains:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchInitialData();
}, []);

// Fetch sectors when domains are selected
useEffect(() => {
  const fetchSectorsForDomains = async () => {
    if (formData.domains && formData.domains.length > 0) {
      setLoading(true);
      try {
        const allSectors = [];
        const sectorMap = new Map(); // To avoid duplicates

        // Fetch sectors for each selected domain
        for (const domainId of formData.domains) {
          const domainSectors = await fetchDomainSectors(domainId);
          domainSectors.forEach(sector => {
            if (!sectorMap.has(sector.sector_id)) {
              sectorMap.set(sector.sector_id, sector);
              allSectors.push({
                value: sector.sector_id,
                label: sector.sector_name
              });
            }
          });
        }

        setSectorsOptions(allSectors);
      } catch (error) {
        console.error('Error fetching sectors:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSectorsOptions([]);
      setCategoriesOptions([]);
      setFormData(prev => ({ ...prev, sectors: [], categories: [] }));
    }
  };

  fetchSectorsForDomains();
}, [formData.domains]);

// Fetch categories when sectors are selected
useEffect(() => {
  const fetchCategoriesForSectors = async () => {
    if (formData.sectors && formData.sectors.length > 0 && formData.domains && formData.domains.length > 0) {
      setLoading(true);
      try {
        const allCategories = [];
        const categoryMap = new Map(); // To avoid duplicates

        // Fetch categories for each domain-sector combination
        for (const domainId of formData.domains) {
          for (const sectorId of formData.sectors) {
            try {
              const categories = await getCategories({ domain_id: domainId, sector_id: sectorId });
              categories.forEach(category => {
                if (!categoryMap.has(category.category_id)) {
                  categoryMap.set(category.category_id, category);
                  allCategories.push({
                    value: category.category_id,
                    label: category.category_name
                  });
                }
              });
            } catch (error) {
              console.error(`Error fetching categories for domain ${domainId} and sector ${sectorId}:`, error);
            }
          }
        }

        setCategoriesOptions(allCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setCategoriesOptions([]);
      setFormData(prev => ({ ...prev, categories: [] }));
    }
  };

  fetchCategoriesForSectors();
}, [formData.sectors, formData.domains]);

// Fetch shops that match any selected sector and any selected category
useEffect(() => {
  const fetchMatchedShops = async () => {
    if (
      !Array.isArray(formData.domains) ||
      formData.domains.length === 0 ||
      !Array.isArray(formData.sectors) ||
      formData.sectors.length === 0 ||
      !Array.isArray(formData.categories) ||
      formData.categories.length === 0
    ) {
      setShops([]);
      setSelectedShops([]);
      return;
    }

    setShopsLoading(true);
    try {
      const resp = await getDomainSectorCategorySpecificShops(
        formData.domains,
        formData.sectors,
        formData.categories
      );

      if (resp?.valid && Array.isArray(resp.data)) {
        setShops(resp.data);
      } else {
        setShops([]);
      }
      setSelectedShops([]);
    } catch (error) {
      console.error('Error fetching shops:', error);
      setShops([]);
    } finally {
      setShopsLoading(false);
    }
  };

  fetchMatchedShops();
}, [formData.domains, formData.sectors, formData.categories]);

const handleToggleShopSelection = (shop_no) => {
  setSelectedShops((prev) => {
    const exists = prev.includes(shop_no);
    return exists ? prev.filter((s) => s !== shop_no) : [...prev, shop_no];
  });
};


const formFields = [
    {
        id: 1,
        label: 'Select Domains',
        name: 'domains',
        type: 'select-check',
        options: domainsOptions,
        placeholder: 'Select domains',
    },
    {
        id: 2,
        label: 'Select Sectors',
        name: 'sectors',
        type: 'select-check',
        options: sectorsOptions,
        placeholder: 'Select sectors',
    },
    {
        id: 3,
        label: 'Select Category',
        name: 'categories',
        type: 'select-check',
        options: categoriesOptions,
        placeholder: 'Select categories',
    },
    {
        id: 4,
        label: 'Group Name',
        name: 'group_name',
        type: 'text',
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

    // Check if at least 2 shops are selected
    if (selectedShops.length < 2) {
        newErrors.shops = 'Please select at least 2 shops to create a group.';
    }

    formFields.forEach(field => {
        const name = field.name;
        // Skip validation for read-only, button, and optional fields
        if (field.readOnly || field.type === 'button' || name === 'edit_merchant_details') {
            return;
        }
        
        // Validate array fields (select-check)
        if (field.type === 'select-check') {
            if (!formData[name] || (Array.isArray(formData[name]) && formData[name].length === 0)) {
                newErrors[name] = `${field.label} is required.`;
            }
        } else {
            // Validate other fields
            if (!formData[name]) {
                newErrors[name] = `${field.label} is required.`;
            }
        }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
};

const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    
    // Check if at least 2 shops are selected
    if (selectedShops.length < 2) {
        setErrors(prev => ({
            ...prev,
            shops: 'Please select at least 2 shops to create a group.'
        }));
        return;
    }
    
    if (validateForm()) {
        console.log({
            ...formData,
            selectedShops: selectedShops
        });
        // Proceed with further submission logic, e.g., API call
    } else {
        console.log(errors);
    }
};

const themeProps = {
  popoverBackgroundColor: 'var(--yellow)',
  scrollbarThumb: 'var(--brown)',
};

const theme = createCustomTheme(themeProps);
console.log(shops);


  return (
    <ThemeProvider theme={theme}>
      <Box className="crm_sub_wrapper">
        {loading && (
          <Box className="loading">
            <CircularProgress />
          </Box>
        )}
        <Box className="row">
        <Header back_btn_link='../emotional/crm' next_btn_link="../emotional/crm/sales-pipeline" heading_with_bg={true} title="Member Group Creation" redirectTo='../emotional/crm' />

          <Box className="col">
            <Box className="container">
                <Box className="col-3">
                  <Box component="img" src={ribbon} alt="ribbon" className="ribbon" />
                  <GeneralLedgerForm
                      formfields={formFields}
                      handleSubmit={handleSubmit}
                      formData={formData}
                      onChange={handleChange}
                      errors={errors}
                      submitButtonText="Submit"
                  />
                  {errors.shops && (
                    <Typography className="error_message" style={{ color: 'red', marginTop: '10px' }}>
                      {errors.shops}
                    </Typography>
                  )}
                </Box>

              <Box className="sub_container">
                <Box className="show_message">
                  {shopsLoading ? (
                    <Box className="loading">
                      <CircularProgress />
                    </Box>
                  ) : shops.length === 0 ? (
                    <Typography className="blank">
                      Select domains, sectors and categories to see matching shops.
                    </Typography>
                  ) : (
                    <Box className="assets_popup">
                      <ScrollableTabsButton
                        data={[
                          {
                            id: 1,
                            name: 'Shops',
                            content: () => (
                              <Box className="shops_list">
                                {shops
                                  .filter(
                                    (shop) =>
                                      shop.user_type !== 'merchant'
                                  )
                                  .map((shop) => (
                                    <Box key={shop.shop_no} className="shop_item_wrapper">
                                      <Box className="shop_select_checkbox">
                                        <Checkbox
                                          checked={selectedShops.includes(
                                            shop.shop_no
                                          )}
                                          onChange={() =>
                                            handleToggleShopSelection(
                                              shop.shop_no
                                            )
                                          }
                                        />
                                      </Box>
                                      <Box className="ticket shop_ticket">
                                        <Box className="left">
                                          <Box className="container">
                                            <Box className="sector">
                                              <Typography>
                                                {shop.sector_name || shop.sector}
                                              </Typography>
                                            </Box>
                                            <Box className="domain">
                                              <Typography>
                                                {shop.domain_name || shop.domain}
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </Box>
                                        <Box className="divider"></Box>
                                        <Box className="right">
                                          <Box className="inner-box">
                                          <Box className="user_type">
                                              Hawker
                                            </Box>
                                            <Box className="details">
                                              <Box className="shop-name">
                                                {shop.business_name ||
                                                  shop.shop_name}
                                              </Box>
                                              <Box className="category">
                                                Category : {Array.isArray(
                                                  shop.category_name
                                                )
                                                  ? shop.category_name.slice(0, 3).join(', ')
                                                  : shop.category_name ||
                                                    shop.category || 'N/A'}
                                              </Box>
                                              <Box className="product">
                                                Products : {Array.isArray(shop.product_names) && shop.product_names.length > 0
                                                  ? shop.product_names.join(', ')
                                                  : 'No products'}
                                              </Box>
                                            </Box>
                                      
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                  ))}
                              </Box>
                            ),
                          },
                          {
                            id: 2,
                            name: 'Merchants',
                            content: () => (
                              <Box className="shops_list">
                                {shops
                                  .filter(
                                    (shop) =>
                                      shop.user_type === 'merchant'
                                  )
                                  .map((shop) => (
                                    <Box key={shop.shop_no} className="shop_item_wrapper">
                                      <Box className="shop_select_checkbox">
                                        <Checkbox
                                          checked={selectedShops.includes(
                                            shop.shop_no
                                          )}
                                          onChange={() =>
                                            handleToggleShopSelection(
                                              shop.shop_no
                                            )
                                          }
                                        />
                                      </Box>
                                      <Box className="ticket shop_ticket">
                                        <Box className="left">
                                          <Box className="container">
                                            <Box className="sector">
                                              <Typography>
                                                {shop.sector_name || shop.sector}
                                              </Typography>
                                            </Box>
                                            <Box className="domain">
                                              <Typography>
                                                {shop.domain_name || shop.domain}
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </Box>
                                        <Box className="divider"></Box>
                                        <Box className="right">
                                          <Box className="inner-box">
                                            <Box className="user_type">
                                              Shop
                                            </Box>

                                            <Box className="details">
                                              <Box className="shop-name">
                                                {shop.business_name ||
                                                  shop.shop_name}
                                              </Box>
                                              <Box className="category">
                                                Category: {Array.isArray(
                                                  shop.category_name
                                                )
                                                  ? shop.category_name.slice(0, 3).join(', ')
                                                  : shop.category_name ||
                                                    shop.category || 'N/A'}
                                              </Box>
                                              <Box className="product">
                                                {Array.isArray(shop.product_names) && shop.product_names.length > 0
                                                  ? shop.product_names.join(', ')
                                                  : 'No products'}
                                              </Box>
                                            </Box>
                                          </Box>
                                        </Box>
                                      </Box>
                                      
                                    </Box>
                                  ))}
                              </Box>
                            ),
                          },
                        ]}
                        scrollbarThumb2="var(--brown)"
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MemberGroupCreation;
