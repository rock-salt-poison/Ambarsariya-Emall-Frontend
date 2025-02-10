import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import Button2 from '../../Components/Home/Button2';
import AutoCompleteSearchField from '../../Components/Products/AutoCompleteSearchField';
import ProductsTable from '../../Components/Products/ProductsTable';
// import rows from '../../API/productsRowData';
import { get_products, getShopUserData } from '../../API/fetchExpressAPI';
import UserBadge from '../../Components/Userbadge';

function Products() {
    
    const {token} = useParams();
    
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState(rows);
    const [loading , setLoading] = useState(false);

    const handleFilter = (filteredData) => {
        setFilteredRows(filteredData);
    };
    

    useEffect(() => {
        const fetchShopUserData = async () => {
          if (token) {
            try {
              setLoading(true);
    
              // Fetch shop user data
              const get_shop_user_data = await getShopUserData(token);
              const get_shop_no = get_shop_user_data?.[0]?.shop_no;
    
              if (get_shop_no) {
                // setShopNo(get_shop_no);
    
                // Fetch products data directly using get_shop_no
                try {
                  const get_products_data = await get_products(get_shop_no);
                  if (get_products_data.valid) {
                    setRows(get_products_data.data);
                  } else {
                    console.log("Invalid products data");
                  }
                } catch (productError) {
                  console.error("Error fetching products data:", productError);
                }
              } else {
                console.log("Shop number not found");
              }
    
              setLoading(false);
            } catch (userError) {
              console.error("Error fetching shop user data:", userError);
              setLoading(false);
            }
          }
        };
    
        fetchShopUserData();
      }, [token]);


      useEffect(() => {
        setFilteredRows(rows); // Initialize filteredRows with all rows
    }, [rows]);


    const suggestions = [
        'Round Neck',
        'Self Printed',
        'Dress',
    ];

    return (
        <Box className='products_wrapper'>
            <Box className="row">
                <Box className="col">
                    <Box className="sub_col">
                      <UserBadge
                          handleBadgeBgClick={`../support/shop?token=${token}`}
                          handleLogin="../login"
                          handleLogoutClick="../../AmbarsariyaMall"
                      />
                        {/* <Button2 text={"Back"} redirectTo={`../support/shop?token=${token}`} /> */}
                    </Box>
                    <Box className="sub_col">
                        <Typography variant='h2' className='heading'>
                            Products
                        </Typography>
                    </Box>
                    <Box className="sub_col"></Box>
                </Box>
                
                <Box className="col">
                    <AutoCompleteSearchField data={rows} onFilter={handleFilter} placeholder="Item, Category, Product, Brand" suggestions={suggestions}/>
                </Box>
                <Box className="col">
                    <ProductsTable rows={filteredRows.length > 0 ? filteredRows : rows} token={token} />
                </Box>
            </Box>
        </Box>
    );
}

export default Products;
