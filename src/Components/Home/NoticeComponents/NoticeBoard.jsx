import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function NoticeBoard({data}) {
    
  return (
    <Box className="cards">
       {data?.map((item) => {
        const params = ((item.title.toLowerCase()).split(' ')).join('-');
        return <Box className="card" key={item.id}>
            <Box className="hook"></Box>
            <Box className="frame">
                <Box className="top_border"><Box className="line"></Box></Box>
                <Link className="middle" to={`${params}`}>
                    <Typography className="title">{item.title}</Typography>
                    <Typography className="desc">{item.desc}</Typography>
                    <Typography className="date">{item.date}</Typography>
                </Link>
                <Box className="bottom_border"><Box className="line"></Box></Box>
            </Box>
        </Box>
       })}
    </Box>
  )
}

export default NoticeBoard