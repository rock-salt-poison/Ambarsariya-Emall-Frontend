import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import DashboardHeader from './DashboardHeader';
import Button2 from '../../../../Components/Home/Button2';
import { useParams } from 'react-router-dom';
import DashboardComponents from './DashboardComponents';
import DashboardForm from './DashboardForm';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';

function MerchantDashboard(props) {
    const {edit} = useParams();

    const themeProps = {
        popoverBackgroundColor: props.popoverBackgroundColor || "var(--yellow)",
        scrollbarThumb: "var(--brown)",
      };
    
      const theme = createCustomTheme(themeProps);

    return (
        <ThemeProvider theme={theme}>
        <Box className="merchant_dashboard_wrapper">
            <Box className="row">
                <DashboardHeader optionalColCname="calendar" />
                {edit ? <DashboardForm/> : <DashboardComponents/>}
                <Box className="col">
                    <Button2 text={edit ? "Back" : "Next"} redirectTo={edit ? -1 :'edit'} optionalcName={edit ? "" : 'align-right'}/>
                </Box>
            </Box>
        </Box>
        </ThemeProvider>
    )
}

export default MerchantDashboard