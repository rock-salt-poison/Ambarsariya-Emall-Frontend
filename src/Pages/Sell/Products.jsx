import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Button2 from '../../Components/Home/Button2';
import AutoCompleteSearchField from '../../Components/Products/AutoCompleteSearchField';
import ProductsTable from '../../Components/Products/ProductsTable';
import rows from '../../API/productsRowData';

function Products() {
    
    const { owner } = useParams();
    const [filteredRows, setFilteredRows] = useState(rows);

    const handleFilter = (filteredData) => {
        setFilteredRows(filteredData);
    };

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
                        <Button2 text={"Back"} redirectTo={'../support/stationary'} />
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
                    <ProductsTable rows={filteredRows} />
                </Box>
            </Box>
        </Box>
    );
}

export default Products;
