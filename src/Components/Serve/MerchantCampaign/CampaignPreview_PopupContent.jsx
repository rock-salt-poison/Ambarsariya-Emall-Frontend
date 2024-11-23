import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import logo from '../../../Utils/images/hall-gate-bg.webp';
import VideoPlayer from '../../MerchantWrapper/VideoPlayer';
import catalog_icon from '../../../Utils/images/Serve/emotional/merchant_campaign/catalog_icon.webp'
import { Link } from 'react-router-dom';

function CampaignPreview_PopupContent({formData}) {
  return (
    <Box className="container">
        <Link to="../../AmbarsariyaMall/sell/support/stationary" className="col">
            <Box component="img" src={logo} alt="" className='shop_logo'/>
            <Box className="shop_detail">
              {formData.shop_name &&  <Typography className="text">Shop Name: 
                  <Typography variant='span'>{formData.shop_name}</Typography>
                </Typography> }
              {formData.domain && <Typography className="text">Domain: 
                  <Typography variant='span'>{formData.domain}</Typography>
                </Typography>}
              {formData.sector && <Typography className="text">Sector: 
                  <Typography variant='span'>{formData.sector}</Typography>
                </Typography>}
            </Box>
        </Link>

        {formData.main_content && <Box className="col">
          <VideoPlayer url={'https://www.youtube.com/embed/m701WKQMeYQ?controls=0&modestbranding=1'} />
        </Box>}
        
        <Box className="col">
            <Box component="img" src={catalog_icon} alt="icon" className='icon'/>
            <Button className='btn'>Download</Button>
        </Box>
    </Box>
  )
}

export default CampaignPreview_PopupContent