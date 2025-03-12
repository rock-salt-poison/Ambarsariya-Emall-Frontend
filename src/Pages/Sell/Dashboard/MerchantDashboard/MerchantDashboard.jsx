import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, ThemeProvider } from '@mui/material';
import DashboardHeader from './DashboardHeader';
import Button2 from '../../../../Components/Home/Button2';
import { useParams } from 'react-router-dom';
import DashboardComponents from './DashboardComponents';
import DashboardForm from './DashboardForm';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import { getShopUserData } from '../../../../API/fetchExpressAPI';
import UserBadge from '../../../../UserBadge';

function MerchantDashboard(props) {
    const {token, edit} = useParams();
    const [details, setDetails] = useState([]);
    const [loading , setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const themeProps = {
        popoverBackgroundColor: props.popoverBackgroundColor || "var(--yellow)",
        scrollbarThumb: "var(--brown)",
      };
    
      const theme = createCustomTheme(themeProps);

    useEffect(()=>{
        if(token){
            const fetchData = async () => {
                try{
                    setLoading(true);
                    const resp = await getShopUserData(token);
                    if(resp.length>0){
                        setDetails(resp);
                    }
                    setLoading(false);
                }catch(e){
                    console.log(e);
                    setLoading(false);
                }
            }
            fetchData();
        }
    }, [token])

    return (
        <ThemeProvider theme={theme}>
        {loading && <Box className="loading"><CircularProgress/></Box>}
        <Box className="merchant_dashboard_wrapper">
            <Box className="row">
                <DashboardHeader optionalColCname="calendar" data={details?.[0]} setSelectedDate={setSelectedDate}/>
                {edit ? <DashboardForm data={details?.[0]}/> : <DashboardComponents data={details?.[0]} date={selectedDate.toLocaleDateString()}/>}
                <Box className="col">
                    {/* <Button2 text={edit ? "Back" : "Next"} redirectTo={edit ? -1 :'edit'} optionalcName={edit ? "" : 'align-right'}/> */}
                    <UserBadge handleBadgeBgClick={-1} handleLogin={'../login'} handleLogoutClick={'../../AmbarsariyaMall'} optionalcName={'align-right'}/>
                </Box>
            </Box>
        </Box>
        </ThemeProvider>
    )
}

export default MerchantDashboard