import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import CardBoardPopup from '../CardBoardPopupComponents/CardBoardPopup';
import { getCategories, getShopUserData, getUser } from '../../API/fetchExpressAPI';
import { Link, useNavigate } from 'react-router-dom';

function BoothsPopup({ open, onClose, selectedBooth }) {
  const navigate = useNavigate();
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

  const normalizedCategory = useMemo(() => {
    const first = categories?.[0]?.category_name || categories?.[0]?.name || '';
    return String(first).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  }, [categories]);

  const handleViewClick = (e) => {
    e.preventDefault();
    const wrapper = e.target.closest('.img');
    if (wrapper) {
      wrapper.classList.add('reduceSize3');
      setTimeout(() => {
        wrapper.classList.remove('reduceSize3');
      }, 300);
    }
    setTimeout(() => {
      const params = new URLSearchParams();
      if (normalizedCategory) params.set('category', normalizedCategory);
      if (selectedBooth?.sectorId) params.set('sectorId', String(selectedBooth.sectorId));
      if (selectedBooth?.domainId) params.set('domainId', String(selectedBooth.domainId));
      if (selectedBooth?.sectorName) params.set('sectorName', String(selectedBooth.sectorName));
      navigate(`/socialize/citizens/booths/products?${params.toString()}`);
      if (onClose) onClose();
    }, 600);
  };

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
          <Box className="img">
            <Box
              component="img"
              alt={selectedBooth?.sectorName || 'Selected sector'}
              src={selectedBooth?.img || ''}
            />
            <Link className="text" to="#" onClick={handleViewClick}>Click to view</Link>
          </Box>
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
