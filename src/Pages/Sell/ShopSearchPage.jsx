import React, {useState} from 'react'
import { Box, Typography } from '@mui/material'
import Button2 from '../../Components/Home/Button2'
import AutoCompleteSearchField from '../../Components/Products/AutoCompleteSearchField';
import SingleShopPage from './SingleShopPage';

const shopDataArray = [
    {
      shopName: 'Madhav',
      discount: '10',
      coupon: 'amall10',
      products: 'pens, textbooks, books, pencils, charts, toffees, paint and brush',
      domain: 'Retailer',
      sector: 'Stationary',
      supply: 'School & Office',
      shopType: 'Class C',
      costSensitivity: 'Moderate'
    },
    {
      shopName: 'HealthCare Hub',
      discount: '15',
      coupon: 'health15',
      products: 'masks, gloves, sanitizers, medicines',
      domain: 'Retailer',
      sector: 'Healthcare',
      supply: 'School & Office',
      shopType: 'Class C',
      costSensitivity: 'Moderate'
    },
    {
      shopName: 'Tech World',
      discount: '20',
      coupon: 'tech20',
      products: 'laptops, mobiles, tablets, accessories',
      domain: 'Retailer',
      sector: 'Electronics',
      supply: 'School & Office',
      shopType: 'Class C',
      costSensitivity: 'Moderate'
      
    }
  ];

function ShopSearchPage() {

    const [filteredData , setFilteredData] = useState(shopDataArray);

    const handleFilter = (data) =>{
        setFilteredData(data);
    }

    const suggestions=['Stationary','Textbook', 'Healthcare']
  

    return (
        <Box className="shop_search_wrapper">
            <Box className="row">
                <Box className="col">
                    <Box className="container">
                        <Button2 text="Back" redirectTo='../esale' />
                    </Box>
                    <Box className="container">
                        <Typography variant='h2' className='title'>Shops</Typography>
                    </Box>
                    <Box className="container" display="flex" justifyContent="flex-end">
                        <Button2 text="Next" redirectTo='../shops' />
                    </Box>
                </Box>
                <Box className="col">
                    <AutoCompleteSearchField data={shopDataArray} onFilter={handleFilter} placeholder="Products, Shops, Nearby Me..." suggestions={suggestions}/>
                </Box>
                <Box className="col displayShops">
                    <SingleShopPage showBackButton={false} shopData={filteredData}/>
                </Box>
            </Box>
        </Box>
    )
}

export default ShopSearchPage