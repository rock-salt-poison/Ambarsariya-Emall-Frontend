import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import stationary_bg_img from '../../Utils/images/Sell/merchant_details/stationary.webp';
import Button2 from '../../Components/Home/Button2';
import ShopDetails from '../../Components/Shop/ShopDetails';
import wagah_border_amritsar from '../../Utils/images/Sell/support/wagah_border_amritsar.webp';
import nehru_shoppping_complex_amritsar from '../../Utils/images/Sell/support/nehru_shoppping_complex_amritsar.webp';
import trilium_mall_amritsar from '../../Utils/images/Sell/support/trilium_mall_amritsar.webp';
import mall_road_amritsar from '../../Utils/images/Sell/support/mall_road_amritsar.webp';
import hall_gate_amritsar from '../../Utils/images/Sell/support/hall_gate_amritsar.webp';
import AutoCompleteSearchField from '../../Components/Products/AutoCompleteSearchField';
import { allShops, get_discount_coupons } from '../../API/fetchExpressAPI';
import CouponsSlider from '../../Components/Shop/CouponsSlider';

const MerchantDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("q");
  const navigate = useNavigate();
  const [discountCoupons, setDiscountCoupons] = useState([]);
  const [activeCoupon, setActiveCoupon] = useState(null); // Track active coupon
  

  const imgSrc = () => {
    if (id === 'Wagah Border') {
      return wagah_border_amritsar;
    }
    else if (id === 'Nehru Shopping Complex') {
      return nehru_shoppping_complex_amritsar;
    }
    else if (id === 'Trilium Mall') {
      return trilium_mall_amritsar;
    }
    else if (id === 'Mall Road') {
      return mall_road_amritsar;
    }
    else if (id === 'Hall Gate') {
      return hall_gate_amritsar;
    }
  };

  const [shopData, setShopData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const suggestions = ['Stationary', 'Textbook', 'Healthcare'];

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const resp = await allShops();
        if (resp && Array.isArray(resp)) {
          setShopData(resp);
          setFilteredData(resp);
  
          const discounts = await Promise.all(
            resp.map((shop) => get_discount_coupons(shop.shop_no))
          );
  
          const allCoupons = discounts.map((d) => d.data).flat();
          setDiscountCoupons(allCoupons);
  
          if (allCoupons.length > 0) {
            setActiveCoupon(allCoupons[0]?.coupons?.[0]);
          }
        } else {
          console.error('Failed to fetch shops data');
        }
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, [id]);
  
  const handleFilter = (data) => {
    setFilteredData(data);
  };

  const data = filteredData.length > 0 ? filteredData : [];

  return (
    <Box className="merchant_wrapper">
      <Box component="img" src={imgSrc()} className='sector_bg_img'/>
      {loading && <Box className="loading">
        <CircularProgress />
      </Box>}
      <Box className="row">
        <Box className="col-1">
          <Button2 text="Back" redirectTo="../support" />
        </Box>
        <Box className="container">
          <AutoCompleteSearchField
            data={shopData}
            onFilter={handleFilter}
            placeholder="Products, Shops, Nearby Me..."
            suggestions={suggestions}
          />

          {data.map((shop, index) => (
              <Link key={index} className="col-2" to={`../support/shop?token=${shop.shop_access_token}`}>
                <Box className="sub_col_1">
                  <Box className="shop_details">
                    <Box className="category">
                      <Typography className='sector_type'>{id}</Typography>
                      <Typography className='shop_name'>{shop.business_name}</Typography>
                    </Box>
                    <Box className="discount_percentage">
                      <Typography className='percent'>20</Typography>
                      <Box className="discount_details">
                        <Typography className='text_1'>%</Typography>
                        <Typography className='text_2'>off</Typography>
                        <Typography className='text_3'>min purchase 1000</Typography>
                      </Box>
                    </Box>
                    {/* <DiscountPercentageSlider
                        setOpenPopup={setOpenPopup}
                        data={activeCoupon}
                      /> */}
                      <CouponsSlider
                        data={discountCoupons}
                        onActiveCouponChange={(coupons) =>
                          setActiveCoupon(coupons)
                        }
                      />
                  </Box>
                  <Box className="product_details">
                    <Typography variant="h3">Category:
                      <Typography variant="span">{shop.category_name.join(', ')}</Typography>
                    </Typography>
                  </Box>
                </Box>
                <Box className="sub_col_2">
                  <ShopDetails column={shop} />
                </Box>
              </Link>
            ))
          }
        </Box>
        <Box className="col-3"></Box>
      </Box>
    </Box>
  );
};

export default MerchantDetailsPage;
