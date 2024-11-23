import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import supply_chain_management_icon from '../../Utils/images/Serve/emotional/eshop/supply_chain_management_icon.webp';
import HR_management_icon from '../../Utils/images/Serve/emotional/eshop/HR_management_icon.png';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Button2 from '../../Components/Home/Button2';
import BarChartComponent from '../../Components/Serve/SupplyChain/BarChartComponent';
import Header from '../../Components/Serve/SupplyChain/Header';
import DateRangePicker from 'rsuite/esm/DateRangePicker';

function Forecast(props) {
  const [barChartData, setBarChartData] = useState([]); 

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const dataset = [
    {
      id: 1,
      title: 'Sale Vs Day (s)',
      label:'Sale Amount',
      data: [
        { period: 'Mon', value: 120 },
        { period: 'Tue', value: 150 },
        { period: 'Wed', value: 200 },
        { period: 'Thu', value: 180 },
        { period: 'Fri', value: 220 },
        { period: 'Sat', value: 170 },
        { period: 'Sun', value: 190 },
      ]
    },
    {
      id: 2,
      title: 'Daily Sale VS deliveries completed',
      label:'Completed Deliveries',
      data: [
        { period: 'Mon', value: 110 },
        { period: 'Tue', value: 140 },
        { period: 'Wed', value: 190 },
        { period: 'Thu', value: 170 },
        { period: 'Fri', value: 210 },
        { period: 'Sat', value: 0 },
        { period: 'Sun', value: 0 },
      ]
    },
    {
      id: 3,
      title: 'Forecast sale by analysis',
      label:'Forecast Sale',
      data: [
        { period: 'Mon', value: 130 },
        { period: 'Tue', value: 160 },
        { period: 'Wed', value: 220 },
        { period: 'Thu', value: 200 },
        { period: 'Fri', value: 240 },
        { period: 'Sat', value: 190 },
        { period: 'Sun', value: 210 },
      ]
    },
    {
      id: 4,
      title: 'Procurement Vs Sale',
      label:'Procurement / Sale',
      data: [
        { period: 'Mon', value: 100 },
        { period: 'Tue', value: 130 },
        { period: 'Wed', value: 170 },
        { period: 'Thu', value: 150 },
        { period: 'Fri', value: 190 },
        { period: 'Sat', value: 140 },
        { period: 'Sun', value: 160 },
      ]
    },
  ];

  const handleChange = (e, selectedTitle) => {
    if (e) {
      var filteredData = dataset.filter((item) => item.title == selectedTitle);
      filteredData.map((item) => {
        return item;
      })
      console.log(filteredData);
      setBarChartData(filteredData);
    } else {
      setBarChartData([]);
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <Box className="forecast_wrapper">
        <Box className="row">
        <Header icon_1={supply_chain_management_icon} icon_2={HR_management_icon} title="Sale Forecast" icon_1_link='../emotional/eshop' icon_2_link='../emotional/eshop/hr-management' redirectTo='../emotional/eshop'/>

          <Box className="col">
            <Box className="container">
                <Box className="col-3">
                  <Box component="img" src={ribbon} alt="ribbon" className="ribbon" />
                  <Box className="main_container">
                  {dataset.map((item) => {
                    return <Box className="col-12" key={item.id}>
                      <Typography className='label'>
                        {item.title}
                      </Typography>
                      <DateRangePicker onChange={(e) => handleChange(e, item.title)} />
                    </Box>
                  })}
                </Box>
                </Box>
              <Box className="sub_container">
              {
                barChartData.length>0 ? <BarChartComponent dataset={barChartData[0].data} label={barChartData[0].label} dataKey="period" title={barChartData[0].title} /> : <Box className="show_message">
                  <Typography className='blank'>
                    Please select a date range to view the graphical representation of stock reports.
                  </Typography>
                </Box>
              }
              </Box>
            </Box>
          </Box>

          <Box className="col">
            <Button2 text="Back" redirectTo={-1} />
            <Button2 text="Next" redirectTo={-1} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Forecast;
