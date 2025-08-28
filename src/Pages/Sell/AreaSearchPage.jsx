import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, ThemeProvider, Tooltip, Typography } from '@mui/material';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import CustomSnackbar from '../../Components/CustomSnackbar';
import UserBadge from '../../UserBadge';
import VerticalCards from '../../Components/Support/VerticalCards';
import FormField from '../../Components/Form/FormField';
import { get_near_by_areas, get_support_page_famous_areas } from '../../API/fetchExpressAPI';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';

function AreaSearchPage(props) {

  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (e, id) => {
    e.preventDefault();
    navigate(`../support/shops-near?q=${id}`);
  }

  useEffect(()=>{
    const fetchData  = async () => {
      try{
        setLoading(false);

        const resp = await get_support_page_famous_areas();
        // console.log(resp);
        setCardData(resp);
      }catch(e){

      }finally{
        setLoading(false);
      }
    }
    fetchData();
  }, [])
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb : 'var(--brown)'
  };
  
  const theme = createCustomTheme(themeProps);  

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const initialFormData = {
    area: "",
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const debouncedSearch = useDebounce(formData.area, 500); // 500ms debounce

  const fetch_near_by_area = async (searched_value) => {
    try{
      setLoading(true);
      const areas = await get_near_by_areas(searched_value);
      if(areas?.valid){
        console.log(areas?.data);
        setCardData(areas?.data);
      }else{
        setCardData([]);
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      fetch_near_by_area(debouncedSearch);
    } else {
      // Reset to default areas if input is empty
      get_support_page_famous_areas().then((resp) => setCardData(resp));
    }
  }, [debouncedSearch]);

  return (
    <ThemeProvider theme={theme}>
      {loading && <Box className="loading">
        <CircularProgress />
      </Box>}
      <Box className="search_area_wrapper">
        <Box className="row">
          <Box className="col">
            <VerticalCards />
          </Box>
          <Box className="col second_wrapper">
            <Box className="col-1">
              <Box className="search_bar_container">
                <FormField
                  type="search"
                  name="area"
                  value={formData.product}
                  // options={sectors?.map((s) => s.sector_name)}
                  onChange={handleChange} // Handle file selection
                  placeholder="Search area for the domain and sector shop"
                  className="input_field title"
                  required={true}
                />
              </Box>
              <UserBadge
                handleBadgeBgClick="../support"
                handleLogin="../login"
                handleLogoutClick="../../"
              />
            </Box>

            <Box className="cards_outer_container">
              <Box className="cards_container col-2">
                {cardData?.slice(0, 6)?.map((card, index) => (
                  <Box className="card" key={index}>
                  <Link
                    className="card-body"
                    style={{ backgroundImage: `url(${card.image_src})` }}
                    onClick={(e) => { handleClick(e, card.access_token) }}
                  >
                    <Typography variant="h3">
                      <Typography variant="span">
                        {card.area_title}
                      </Typography>
                    </Typography>
                  </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </ThemeProvider>
  );
}

export default AreaSearchPage;
