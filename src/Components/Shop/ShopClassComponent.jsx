import React from 'react'
import RatingComponent from '../RatingComponent'
import { Box, Slider, Typography } from '@mui/material'

function ShopClassComponent() {

    const data = [
        { id: 1, title: 'Quality of compliance', value: 3, readOnly: true, star_rating: true, range_slider: false },
        { id: 2, title: 'Quality of service', value: 4, readOnly: true, star_rating: true, range_slider: false },
        { id: 3, title: 'Cost Effective', value: 2.5, readOnly: true, star_rating: true, range_slider: false },
        { id: 4, title: 'Daily Walkin', value: 1, readOnly: true, star_rating: false, range_slider: true, range_max_value: 4 },
        { id: 5, title: 'Years of experience', value: 10, readOnly: true, star_rating: false, range_slider: true, range_max_value: 100 }
    ];


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