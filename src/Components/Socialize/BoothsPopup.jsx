import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import CardBoardPopup from '../CardBoardPopupComponents/CardBoardPopup';
import { getCategories, getShopUserData, getUser } from '../../API/fetchExpressAPI';

function BoothsPopup({ open, onClose, selectedBooth }) {
  const userAccessToken = useSelector((state) => state.auth.userAccessToken);
  const [shopName, setShopName] = useState('Shop');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchCurrentShopName = async () => {
      try {
        if (!userAccessToken) return;
        const users = await getUser(userAccessToken);
        const shopUser = (users || []).find((u) => u?.shop_access_token);
        if (!shopUser?.shop_access_token) return;
        const shopData = await getShopUserData(shopUser.shop_access_token);
        const currentShopName = shopData?.[0]?.business_name || shopData?.[0]?.shop_name || '';
        if (mounted && currentShopName) setShopName(currentShopName);
      } catch (error) {
        console.error('Error fetching shop name:', error);
      }
    };

    fetchCurrentShopName();
    return () => {
      mounted = false;
    };
  }, [userAccessToken]);

  useEffect(() => {
    let mounted = true;

    const fetchSectorCategories = async () => {
      try {
        if (!open || !selectedBooth?.domainId || !selectedBooth?.sectorId) {
          if (mounted) setCategories([]);
          return;
        }

        const response = await getCategories({
          domain_id: selectedBooth.domainId,
          sector_id: selectedBooth.sectorId,
        });

        if (mounted) {
          setCategories(Array.isArray(response) ? response : []);
        }
      } catch (error) {
        console.error('Error fetching sector categories:', error);
        if (mounted) setCategories([]);
      }
    };

    fetchSectorCategories();
    return () => {
      mounted = false;
    };
  }, [open, selectedBooth]);

  const categoriesText = useMemo(() => {
    if (!categories.length) return 'No categories found';
    return categories
      .map((cat) => cat?.category_name || cat?.name)
      .filter(Boolean)
      .join(', ');
  }, [categories]);

  return (
    <CardBoardPopup
      open={open}
      handleClose={onClose}
      customPopup={true}
      optionalCName="booths_popup_dialog"
      body_content={
        <Box className="booths">
          <Box className="shop_name_container">
              <Typography className="title">{shopName}</Typography>
          </Box>
          <Box
            component="img"
            className="img"
            alt={selectedBooth?.sectorName || 'Selected sector'}
            src={selectedBooth?.img || ''}
          />
          <Box className="sector_details">
            <Typography className="heading">{selectedBooth?.sectorName || 'Sector'}</Typography>
            <Typography className="desc">{categoriesText}</Typography>
          </Box>
        </Box>
      }
    />
  );
}

export default BoothsPopup;
