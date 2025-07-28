import React, { useEffect, useState } from 'react'
import RatingComponent from '../RatingComponent'
import { Box, CircularProgress, Slider, Typography } from '@mui/material'
import { get_vendor_details } from '../../API/fetchExpressAPI';

function ShopClassComponent({shopData}) {

    const data = [
        { id: 1, title: 'Quality of compliance', value: shopData?.quality_of_compliance, readOnly: true, star_rating: true, range_slider: false },
        { id: 2, title: 'Quality of service', value: shopData?.quality_of_service, readOnly: true, star_rating: true, range_slider: false },
        { id: 3, title: 'Cost Effective', value: shopData?.price_effective, readOnly: true, star_rating: true, range_slider: false },
        { id: 4, title: 'Daily Walkin', value: shopData?.daily_walkin, readOnly: true, star_rating: false, range_slider: true, range_max_value: 4 },
        { id: 5, title: 'Years of experience', value: shopData?.years_in_business_score, readOnly: true, star_rating: false, range_slider: true, range_max_value: 4 }
    ];

    console.log(shopData);

    

    return (
        <Box className="rating_container">
            {data.map((item) => {
                return <Box className="col" key={item.id}>
                    <Typography className="title">{item.title}</Typography>
                    {item.star_rating && <RatingComponent value={item.value} readOnly={item.readOnly} />}
                    {item.range_slider && <Slider
                        value={item.value}
                        min={0}
                        max={item.range_max_value}
                        step={0.1}
                        size={"large"}
                        className= {`input_field`} // Apply the custom className
                    />}
                </Box>
            })}

        </Box>
    )
}

export default ShopClassComponent