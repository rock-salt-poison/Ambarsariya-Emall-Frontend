import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import UserBadge from '../../UserBadge'
import { Link, useNavigate } from 'react-router-dom'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

function TermsAndConditions() {

    const navigate = useNavigate();

    return (
        <Box className="terms_and_conditions_wrapper">
            <Box className="row">
               <Box className="col quote_1">
                    <FormatQuoteIcon className="quote_start"/>
                    <Typography className="quote">
                        “When you are alone, you are the master. When you are among many, you want to be a leader. When you are among several, you are an individual.”
                    </Typography>
                    <FormatQuoteIcon className="quote_end"/>
               </Box>

                
            </Box>
        </Box>
    )
}

export default TermsAndConditions