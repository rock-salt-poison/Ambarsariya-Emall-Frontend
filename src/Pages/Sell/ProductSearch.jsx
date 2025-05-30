import { Box, ThemeProvider, Typography } from '@mui/material'
import React, { useState } from 'react'
import cartIcon from '../../Utils/images/Sell/product_search/cart_icon.webp'
import notificationIcon from '../../Utils/images/Sell/product_search/notification_icon.webp'
import paperBg from '../../Utils/images/Sell/product_search/tear_paper_bg.webp'
import sideBorderBg from '../../Utils/images/Sell/product_search/side_border_bg.webp'
import starIcon from '../../Utils/images/Sell/product_search/star_icon.svg'
import { Link } from 'react-router-dom'
import FormField from '../../Components/Form/FormField'
import createCustomTheme from '../../styles/CustomSelectDropdownTheme'
import AutoCompleteSearchField from '../../Components/Products/AutoCompleteSearchField'

function ProductSearch() {

    const initialFormData = {
        domain:'',
        sector:'',
      };
      const [formData, setFormData] = useState(initialFormData);

      const themeProps = {
          popoverBackgroundColor: '#f8e3cc',
          scrollbarThumb: 'var(--brown)',
        };
        const theme = createCustomTheme(themeProps);

    const handleChange = async (e) => {
    const { name, type, files, value } = e.target;

    setFormData({
        ...formData,
        [name]: value,
    });
    };

    const handleFilter = () => {
    
    }

  return (
    <ThemeProvider theme={theme}>
    <Box className="product_search_wrapper">
        <Box className="row">
            <Box className="col">
                <Link to='' className="icon_container">
                    <Box className="icon" component="img" src={cartIcon} alt="cart"/>
                    <Box className="indicator" component="img" src={starIcon} alt="cart"/>
                </Link>
                
                <Link className='container'>
                    <Box className="side_border" component="img" src={sideBorderBg} alt="bg"/>
                    <Box className="title_container">
                        <Box className="paper_bg" component="img" src={paperBg} alt="bg"/>
                        <Typography className="title">Muskan singh</Typography>
                    </Box>
                </Link>

                <Link to='' className="icon_container">
                    <Box className="icon" component="img" src={notificationIcon} alt="notifications"/>
                    <Box className="indicator" component="img" src={starIcon} alt="cart"/>
                </Link>
            </Box>
            <Box className="col">
                <Box className='container' sx={{marginLeft:'30px'}}>
                    <Box className="side_border" component="img" src={sideBorderBg} alt="bg"/>
                    <Box className="title_container">
                        <Box className="paper_bg" component="img" src={paperBg} alt="bg"/>
                        <FormField
                            type="select"
                            name="domain"
                            value={formData.domain}
                            options={['Sell', 'Retail', 'Wholesale']}
                            onChange={handleChange} // Handle file selection
                            placeholder="Select Domain..."
                            className="input_field title"
                            required={true}
                        />
                    </Box>
                </Box>
                
                <Box className="search_main_container">
                    <Box className="search_bar_container">
                        <AutoCompleteSearchField data={[]} onFilter={()=>handleFilter()} placeholder="Item, Category, Product, Brand" suggestions={['suggestions']}/>
                    </Box>
                </Box>

                <Box className='container' sx={{marginLeft:'30px'}}>
                    <Box className="side_border" component="img" src={sideBorderBg} alt="bg"/>
                    <Box className="title_container">
                        <Box className="paper_bg" component="img" src={paperBg} alt="bg"/>
                        <FormField
                            type="select"
                            name="sector"
                            value={formData.sector}
                            options={['Sell', 'Retail', 'Wholesale']}
                            onChange={handleChange} // Handle file selection
                            placeholder="Select Sector..."
                            className="input_field title"
                            required={true}
                        />
                    </Box>
                </Box>

            </Box>
            <Box className="col">


            </Box>
        </Box>
    </Box>
    </ThemeProvider>
  )
}

export default ProductSearch