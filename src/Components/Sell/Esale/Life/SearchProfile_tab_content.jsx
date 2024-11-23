import React from 'react'
import { Box, Typography } from '@mui/material'
import AutoCompleteSearchField from '../../../Products/AutoCompleteSearchField'

function SearchProfile_tab_content({ title, communityData }) {
    const data = [
        {phone:'9876542310'},
    ];

    const handleFilter = () => {

    }
    return (
        <Box className="tab_content">
            <Typography className="title">{title}</Typography>
            <Box className="content">
                <AutoCompleteSearchField data={data} onFilter={handleFilter} suggestions placeholder="Search profile by phone no."/>
            </Box>
        </Box>
    )
}

export default SearchProfile_tab_content