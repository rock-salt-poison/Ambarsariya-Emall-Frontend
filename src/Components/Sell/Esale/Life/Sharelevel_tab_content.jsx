import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Switch_On_Off2 from '../../../Form/Switch_On_Off2';

function Sharelevel_tab_content({ title, communityData }) {

    const data = [
        {id:1, title:'Emotional'},
        {id:2, title:'Personal'},
        {id:3, title:'Professional'},
        {id:4, title:'Community'},
        {id:5, title:'Relations'},
        {id:6, title:'Locations'},
    ];

    const [checked, setChecked] = useState(false);

    const handleOnChange = (e) => {
        setChecked(true);
    }
    return (
        <Box className="tab_content">
            <Typography className="title">{title}</Typography>
            <Box className="content">
                {data.map((item)=>{
                    return <Box className="list share_level" key={item.id}>
                        <Typography className="heading">{item.title}</Typography>
                        <Switch_On_Off2 checked={checked} onChange={(e)=>handleOnChange(e)} />
                    </Box>
                })}
            </Box>
        </Box>
    )
}

export default Sharelevel_tab_content