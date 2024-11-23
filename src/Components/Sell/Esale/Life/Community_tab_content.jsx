import React from 'react'
import { Box, Typography } from '@mui/material'

function Community_tab_content({ title, communityData }) {
    return (
        <Box className="tab_content">
            <Typography className="title">{title}</Typography>
            <Box className="content">
                {communityData.map((data) => {
                    return <Box className="list" key={data.id}>
                        <Typography className="heading">
                            {data.heading}
                        </Typography>
                        <ul className='list_container'>
                            {data.topics.map((topic, index) => (<li className='list_item' key={index}>{topic}</li>))}
                        </ul>
                    </Box>
                })}
            </Box>
        </Box>
    )
}

export default Community_tab_content