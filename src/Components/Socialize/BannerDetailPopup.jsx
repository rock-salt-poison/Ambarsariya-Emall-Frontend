import React from "react";
import {
    Box,
    Dialog,
    DialogContent,
    IconButton,
    ThemeProvider,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import createCustomTheme from "../../styles/CustomSelectDropdownTheme";

export default function BannerDetailPopup({ open, handleClose, banner }) {
    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
        dialogBackdropColor: 'var(--brown)',
    };

    const theme = createCustomTheme(themeProps);
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    // Placeholder banner data if none provided
    const placeholderBanner = {
        id: 1,
        image_src: '',
        business_name: 'Banner',
        area_name: '',
        offer_message: '',
        distance: 0,
        end_time: null,
    };

    const displayBanner = banner || placeholderBanner;

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={open}
                onClose={handleClose}
                className="banner_detail_popup"
                maxWidth="md"
                fullScreen={fullScreen}
                fullWidth
            >
                <DialogContent className="banner_popup_content">
                    {displayBanner && (
                        <Box className="banner_popup_frame">
                            {/* Background frame image */}
                            <Box className="banner_frame_bg" />



                            {/* Close button */}
                            <IconButton
                                className="banner_popup_close"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>

                            {/* Banner content */}
                            <Box className="banner_popup_inner">
                                {/* Banner image */}
                                <Box className="banner_popup_image_container">
                                    <Box
                                        component="img"
                                        src={displayBanner.image_src || displayBanner.banner_image || displayBanner.image_url || displayBanner.image || ''}
                                        alt={displayBanner.business_name || displayBanner.area_name || 'Banner'}
                                        className="banner_popup_image"
                                    />
                                    {/* Banner details */}
                                    <Box className="banner_popup_heading">
                                        {
                                            <Typography variant="h3" className="banner_business_name">
                                                Madhav Stationary
                                            </Typography>
                                        }
                                    </Box>

                                    <Box className="banner_popup_details">
                                        {/* Board pins at top */}
                                        <Box className="board_pins top_pins">
                                            <Box className="circle"></Box>
                                            <Box className="circle"></Box>
                                        </Box>

                                        <Box className="content">

                                            {(
                                                <Typography variant="body1" className="banner_offer_message">
                                                    Get 50% off on woodland
                                                </Typography>
                                            )}


                                            {(
                                                <Typography variant="body2" className="banner_validity">
                                                    Valid until: {new Date('2026-01-02').toLocaleString()}
                                                </Typography>
                                            )}
                                        </Box>
                                        {/* Board pins at bottom */}
                                        <Box className="board_pins bottom_pins">
                                            <Box className="circle"></Box>
                                            <Box className="circle"></Box>
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>


                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
}
