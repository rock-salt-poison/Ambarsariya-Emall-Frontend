import { Box, CircularProgress, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import cartIcon from '../../Utils/images/Sell/product_search/cart_icon.webp'
import notificationIcon from '../../Utils/images/Sell/product_search/notification_icon.webp'
import paperBg from '../../Utils/images/Sell/product_search/tear_paper_bg.webp'
import sideBorderBg from '../../Utils/images/Sell/product_search/side_border_bg.webp'
import starIcon from '../../Utils/images/Sell/product_search/star_icon.svg'
import { Link } from 'react-router-dom'
import FormField from '../../Components/Form/FormField'
import createCustomTheme from '../../styles/CustomSelectDropdownTheme'
import AutoCompleteSearchField from '../../Components/Products/AutoCompleteSearchField'
import { convertDriveLink, get_existing_domains, get_existing_sectors, get_searched_products, getMemberData, getUser } from '../../API/fetchExpressAPI'
import { useSelector } from 'react-redux'

function ProductSearch() {

    const initialFormData = {
        domain:'',
        sector:'',
        product:'',
      };
      const [formData, setFormData] = useState(initialFormData);
      const [domains, setDomains] = useState([]);
      const [sectors, setSectors] = useState([]);
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(false);
      const token = useSelector((state) => state.auth.userAccessToken);
      const [userData , setUserData] = useState(null);
        

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


const fetchMemberData = async (memberToken) => {
        setLoading(true);
          const user = await getMemberData(memberToken);
          if(user){          
            setUserData(user?.[0])
            setLoading(false);
          }
      }
    
      useEffect(()=>{
        const fetchData = async () => {
          if(token){
            const user = (await getUser(token))[0];
            if(user.user_type === "member"){
              fetchMemberData(user.user_access_token);
            }
          }
        }
        fetchData();
      }, [token])

    const fetchDomains = async () => {
        try{
            setLoading(true);
            const resp = await get_existing_domains();
            if(resp.valid){              
                setDomains(resp.data);
                 setFormData((prev) => ({
                ...prev,
                domain: resp?.data?.[0].domain_name
                }));
            }
        }catch(e){
            console.error(e);
        }finally{
            setLoading(false);
        }
    }

    const fetchSectors = async () => {
        try{
            setLoading(true);
            const selected_domain_id = domains.find((d)=>d.domain_name === formData?.domain)?.domain_id;
            if(selected_domain_id){
                const resp = await get_existing_sectors(selected_domain_id);
                if(resp?.valid){
                    setSectors(resp?.data);
                     setFormData((prev) => ({
                    ...prev,
                    sector: resp?.data?.[0].sector_name
                    }));
                }
            }
        }catch(e){
            console.error(e);
        }finally{
            setLoading(false);
        }
    }

    const fetchProducts = async (domain, sector, product) => {
  try {
    setLoading(true);
    const selected_domain_id = domains?.find((d) => d.domain_name === domain)?.domain_id;
    const selected_sector_id = sectors?.find((s) => s.sector_name === sector)?.sector_id;

    const resp = await get_searched_products(selected_domain_id, selected_sector_id, product);
    if (resp?.valid) {
      setProducts(resp?.data);
    }
  } catch (e) {
    console.error(e);
    setProducts([]);
  } finally {
    setLoading(false);
  }
};


    useEffect(()=>{
        fetchDomains();
    }, []);

    useEffect(()=>{
        if(formData?.domain){
            fetchSectors(formData?.domain);
        }
    }, [formData?.domain])

    useEffect(()=>{
        if(formData?.domain || formData?.sector || formData?.product){
            fetchProducts(formData?.domain, formData?.sector, formData?.product);
        }
    }, [formData])

  return (
    <ThemeProvider theme={theme}>
        {loading && <Box className="loading"><CircularProgress/></Box> }
    <Box className="product_search_wrapper">
        <Box className="row">
            <Box className="col">
                <Link to='../esale/life?q=6' className="icon_container">
                    <Box className="icon" component="img" src={cartIcon} alt="cart"/>
                    <Box className="indicator" component="img" src={starIcon} alt="cart"/>
                </Link>
                
                <Link className='container' to='../esale'>
                    <Box className="side_border" component="img" src={sideBorderBg} alt="bg"/>
                    <Box className="title_container">
                        <Box className="paper_bg" component="img" src={paperBg} alt="bg"/>
                        <Typography className="title">{userData?.full_name}</Typography>
                    </Box>
                </Link>

                <Link to='../esale/life?q=7' className="icon_container">
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
                            options={domains?.map((d)=>d.domain_name)}
                            onChange={handleChange} // Handle file selection
                            placeholder="Select Domain..."
                            className="input_field title"
                            required={true}
                        />
                    </Box>
                </Box>
                
                <Box className="search_main_container">
                    <Box className="search_bar_container">
                        {/* <AutoCompleteSearchField data={[]} onFilter={()=>handleFilter()} placeholder="Item, Category, Product, Brand" suggestions={['suggestions']}/> */}

                        <FormField
                            type="search"
                            name="product"
                            value={formData.product}
                            options={sectors?.map((s)=>s.sector_name)}
                            onChange={handleChange} // Handle file selection
                            placeholder="Item, Category, Product, Brand..."
                            className="input_field title"
                            required={true}
                        />
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
                            options={sectors?.map((s)=>s.sector_name)}
                            onChange={handleChange} // Handle file selection
                            placeholder="Select Sector..."
                            className="input_field title"
                            required={true}
                        />
                    </Box>
                </Box>

            </Box>
            <Box className="col">
                <Box className="cards_container">
                    {
                        products?.map((product, index)=>{
                            return <Box className="card" key={index}>
                        <Box className="card_header">
                            <Typography className="heading">
                                {product?.category_name}
                            </Typography>
                        </Box>
                        <Box className="card_body">
                            <Link className="details" to={`../support/shop/shop-detail/${product?.shop_access_token}`}>
                                <Box component="img" alt="product" src={convertDriveLink(product?.product_images?.[0])} className="product_image"/>
                                <Typography className="text product_name">
                                    {product?.product_name}
                                </Typography>
                                <Typography className="text cost">
                                    Cost : {product?.price} / {product?.unit}
                                </Typography>
                                <Typography className="text shop_name">
                                    Shop : {product?.business_name}
                                </Typography>
                                <Typography className="text">
                                    Class Type : " <Typography component="span" className="text class_type">A</Typography> "
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                        })
                    }
                    
                </Box>

            </Box>
        </Box>
    </Box>
    </ThemeProvider>
  )
}

export default ProductSearch