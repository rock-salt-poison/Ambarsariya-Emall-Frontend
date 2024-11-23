import React from 'react'
import { Box, Typography } from '@mui/material'
import GstForm_PopupContent from './GstForm_PopupContent'
import SearchIcon from '@mui/icons-material/Search';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import GstForm2_PopupContent from './GstForm2_PopupContent';

function GstData_PopupContent({selectedInvoice}) {
  return (
    <Box className="gst_wrapper">
        <Box className="col-5">
            <Typography className='label'>Tax components</Typography>
            <GstForm_PopupContent selectedInvoice={selectedInvoice}/>
        </Box>
        <Box className="col-7">
            <Box className="window">
                <Box className="window_header">
                    <Box className="menu_bar">
                        <Box className="menu_items">
                            <MinimizeIcon/>
                            <WebAssetIcon/>
                            <CloseIcon/>
                        </Box>
                    </Box>
                    <Box className="result_bar">
                        <Box className="result">
                            <SearchIcon/>
                            <Typography className="title">Invoice.pdf</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className="window_body">
                    <GstForm2_PopupContent selectedInvoice={selectedInvoice}/>

                </Box>
                <Box className="window_footer"></Box>
            </Box>
        </Box>
    </Box>
  )
}

export default GstData_PopupContent