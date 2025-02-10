import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import AutoCompleteSearchField from '../../Components/Products/AutoCompleteSearchField';
import SingleShopPage from './SingleShopPage';
import { allShops } from '../../API/fetchExpressAPI';
import UserBadge from '../../UserBadge';

function ShopSearchPage() {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true); // Set to true initially
    const [filteredData, setFilteredData] = useState([]);

    const suggestions = ['Stationary', 'Textbook', 'Healthcare'];

    // Handle the filter based on the search input
    const handleFilter = (data) => {
        console.log('Filtered Data:', data);  // Debugging filtered data
        setFilteredData(data);
    };

    // Fetch shops data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await allShops();
                if (resp) {
                    setShops(resp);
                    setFilteredData(resp);  // Initialize filteredData with all shops
                    console.log('Fetched Shops:', resp);  // Debugging fetched shops
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);  // Stop loading after data is fetched
            }
        };
        fetchData();
    }, []);

    return (
        <Box className="shop_search_wrapper">
            {loading && (
                <Box className="loading">
                    <CircularProgress />
                </Box>
            )}

            <Box className="row">
                <Box className="col">
                    <Box className="container">
                        {/* <Button2 text="Back" redirectTo="../esale" /> */}
                    </Box>
                    <Box className="container">
                        <Typography variant="h2" className="title">
                            Shops
                        </Typography>
                    </Box>
                    <Box className="container" display="flex" justifyContent="flex-end">
                        {/* <Button2 text="Next" redirectTo="../shops" /> */}
                        <UserBadge
                            handleBadgeBgClick={`../esale`}
                            handleLogin="../login"
                            handleLogoutClick="../../AmbarsariyaMall"
                        />
                    </Box>
                </Box>
                <Box className="col">
                    {/* Pass filteredData to AutoCompleteSearchField */}
                    <AutoCompleteSearchField
                        data={filteredData}  // Make sure filteredData is passed
                        onFilter={handleFilter}
                        placeholder="Products, Shops, Nearby Me..."
                        suggestions={suggestions}
                    />
                </Box>
                <Box className="col displayShops">
                    {/* Check if filteredData is being passed correctly */}
                    {filteredData.length === 0 ? (
                        <Typography>No shops available</Typography>  // Fallback if no shops are available
                    ) : (
                        <SingleShopPage showBackButton={false} shopData={filteredData} />
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default ShopSearchPage;
