import React, { useMemo, useState } from 'react';
import { Box, Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { getCategoryImage } from '../../Utils/category_images';
import UserBadge from '../../UserBadge';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom } from 'swiper/modules';

function BoothProducts() {
    const { search } = useLocation();
    const params = useMemo(() => new URLSearchParams(search), [search]);
    const category = params.get('category') || 'dairy_needs';
    const sectorName = params.get('sectorName') || '';

    const categoryImageUrl = useMemo(() => {
        const key = category.endsWith('_bg') ? category : `${category}_bg`;
        return getCategoryImage(key);
    }, [category]);

    const backgroundImage = useMemo(() => {
        return categoryImageUrl ? `url(${categoryImageUrl})` : undefined;
    }, [categoryImageUrl]);

    const title = useMemo(() => {
        // Map a nicer title based on category. Defaults to Dairy & Perishables
        if (category.includes('dairy')) return 'Dairy & Perishables';
        return (category || 'Products')
            .split('_')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
    }, [category]);

    const subtitle = useMemo(() => {
        if (category.includes('dairy')) {
            return 'Milk, Cheese, Yogurt, Fresh Produce';
        }
        return sectorName ? sectorName : 'Featured Items';
    }, [category, sectorName]);

    const rows = [1, 2, 3, 4];

    const [openImgPopup, setOpenImgPopup] = useState(false);

    const handleOpenImage = (e) => {
        e.preventDefault();
        setOpenImgPopup(true);
    };

    const handleCloseImage = () => {
        setOpenImgPopup(false);
    };

    return (
        <Box
            className={`booth_products_page ${category}`}
            sx={backgroundImage ? { backgroundImage } : undefined}
        >
            <Box className="content_container">
                <Box className="header_container">
                    <Box></Box>
                    <Box className="header">
                        <Typography className="title">{title}</Typography>
                        <Typography className="subtitle">{subtitle}</Typography>
                    </Box>
                    <UserBadge
                        handleLogoutClick="../../"
                        handleBadgeBgClick={-1}
                        handleLogin="login"
                    />
                </Box>

                <Box className="list">
                    {rows.map((i) => (
                        <Box className="row" key={i}>
                            <Box className="left_badge">
                                <Typography>SINGLE TONE /</Typography>
                                <Typography>DOUBLE TONE</Typography>
                            </Box>
                            <Box className="product_frame">
                                {/* Category image that opens a full-view popup */}
                                <Link
                                    to="#"
                                    onClick={handleOpenImage}
                                    style={{ display: 'block', width: '100%', height: '100%' }}
                                >
                                    <Box className="img" component="img" alt="category" src={categoryImageUrl || ''} />
                                </Link>
                            </Box>
                            <Box className="price_badge">
                                <Typography>₹ 2199 /-</Typography>
                                <Typography className='dark_text'>per litre</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Dialog
                open={openImgPopup}
                onClose={handleCloseImage}
                maxWidth="lg"
                fullWidth
                className="boothProductsDialog"
            >
                <DialogContent className="boothProductsDialogContent">
                    <IconButton
                        onClick={handleCloseImage}
                        aria-label="close"
                        className="boothProductsDialogClose"
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box
                        className="boothProductsImageZoomContainer"
                    >
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            loop={true}
                            zoom={true}
                            modules={[Zoom]}
                            className="boothProductsSwiper"
                        >
                            <SwiperSlide className="card">
                                <Box className="images swiper-zoom-container">
                                    <Box
                                        component="img"
                                        alt="category full view"
                                        className="boothProductsDialogImage"
                                        src={categoryImageUrl || ''}
                                    />
                                </Box>
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default BoothProducts;

