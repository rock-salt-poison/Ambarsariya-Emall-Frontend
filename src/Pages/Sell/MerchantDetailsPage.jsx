import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import stationary_bg_img from '../../Utils/images/Sell/merchant_details/stationary.webp';
import Button2 from '../../Components/Home/Button2';
import ShopDetails from '../../Components/Shop/ShopDetails';
import wagah_border_amritsar from '../../Utils/images/Sell/support/wagah_border_amritsar.webp';
import nehru_shoppping_complex_amritsar from '../../Utils/images/Sell/support/nehru_shoppping_complex_amritsar.webp';
import trilium_mall_amritsar from '../../Utils/images/Sell/support/trilium_mall_amritsar.webp';
import mall_road_amritsar from '../../Utils/images/Sell/support/mall_road_amritsar.webp';
import hall_gate_amritsar from '../../Utils/images/Sell/support/hall_gate_amritsar.webp';
import AutoCompleteSearchField from '../../Components/Products/AutoCompleteSearchField';

const MerchantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const columns = [
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
      shopName: 'Neelam',
      discount: '15',
      coupon: 'amall15',
      products: 'notebooks, erasers, sharpeners, crayons, rulers',
      domain: 'Wholesaler',
      sector: 'Books',
      supply: 'School',
      shopType: 'Class B',
      costSensitivity: 'High'
    },
    {
      shopName: 'Arjun',
      discount: '20',
      coupon: 'amall20',
      products: 'binders, markers, folders, glue, scissors',
      domain: 'Retailer',
      sector: 'Office Supplies',
      supply: 'Office',
      shopType: 'Class A',
      costSensitivity: 'Low'
    }
  ];

  // const handleClick = (e) => {
  //   navigate('../AmbarsariyaMall/support/stationary')
  // }

  const imgSrc = () =>{
    if(id==='Wagah Border'){
      return wagah_border_amritsar;
    }
    else if(id==='Nehru Shopping Complex'){
      return nehru_shoppping_complex_amritsar;
    }
    else if(id==='Trilium Mall'){
      return trilium_mall_amritsar;
    }
    else if(id==='Mall Road'){
      return mall_road_amritsar;
    }
    else if(id==='Hall Gate'){
      return hall_gate_amritsar;
    }
  }

  const [filteredData , setFilteredData] = useState(columns);

  const handleFilter = (data) =>{
    setFilteredData(data);
  }

  const data = filteredData ? filteredData : columns;

  const suggestions=['Stationary','Textbook', 'Healthcare'];

  return (
    <Box 
      className="merchant_wrapper" 
      // sx={{
      //   backgroundImage: id === 'Mall Road' ? `url(${stationary_bg_img})` : 'none',
      // }}
    >
      <Box component="img" src={imgSrc()} className='sector_bg_img'/>
      <Box className="row">
        <Box className="col-1">
          <Button2 text="Back" redirectTo="../support" />
        </Box>
        <Box className="container">
          <AutoCompleteSearchField data={columns} onFilter={handleFilter} placeholder="Products, Shops, Nearby Me..." suggestions={suggestions}/>

          {data.map((column, index) => (
            <Link key={index} className="col-2" to={`../support/stationary`}>
              <Box className="sub_col_1">
                <Box className="shop_details" >
                  <Box className="category">
                    <Typography className='sector_type'>{id}</Typography>
                    <Typography className='shop_name'>{column.shopName}</Typography>
                  </Box>
                  <Box className="discount_percentage">
                    <Typography className='percent'>{column.discount}</Typography>
                    <Box className="discount_details">
                      <Typography className='text_1'>%</Typography>
                      <Typography className='text_2'>off</Typography>
                      <Typography className='text_3'>min purchase 1000</Typography>
                    </Box>
                  </Box>
                  <Box className="discount_coupon">
                    <Typography className='coupon'>coupon</Typography>
                    <Typography className='coupon_value'>{column.coupon}</Typography>
                  </Box>
                </Box>
                <Box className="product_details">
                  <Typography variant="h3">Category: 
                    <Typography variant="span">{column.products}</Typography>
                  </Typography>
                </Box>
              </Box>
              <Box className="sub_col_2">
                <ShopDetails column={column}/>
              </Box>
            </Link>
          ))}
        </Box>
        <Box className="col-3"></Box>
      </Box>
    </Box>
  );
};

export default MerchantDetailsPage;
