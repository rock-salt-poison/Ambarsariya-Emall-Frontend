import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Tooltip, Typography } from '@mui/material';
import FormField from '../../Components/Form/FormField';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import stock_management_icon from '../../Utils/images/Serve/emotional/eshop/stock_management.png';
import stock_management_icon2 from '../../Utils/images/Serve/emotional/eshop/stock_management_icon2.png';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Button2 from '../../Components/Home/Button2';
import Header from '../../Components/Serve/SupplyChain/Header';
import BarChartComponent from '../../Components/Serve/SupplyChain/BarChartComponent';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/DateRangePicker/styles/index.css';

function Stock_reports(props) {
  const [barChartData, setBarChartData] = useState([]); 

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const dataset = [
    {
      id: 1,
      title: 'Delivery reports',
      label:'No. of Deliveries',
      dataKey:'month',
      data: [
        { london: 59, paris: 57, newYork: 86, value: 21, month: '1' },
        { london: 50, paris: 52, newYork: 78, value: 28, month: '2' },
        { london: 47, paris: 53, newYork: 106, value: 41, month: '3' },
        { london: 54, paris: 56, newYork: 92, value: 73, month: '4' },
        { london: 57, paris: 69, newYork: 92, value: 99, month: '5' },
        { london: 60, paris: 63, newYork: 103, value: 144, month: '6' },
        { london: 59, paris: 60, newYork: 105, value: 319, month: '7' },
        { london: 65, paris: 60, newYork: 106, value: 249, month: '8' },
        { london: 51, paris: 51, newYork: 95, value: 131, month: '9' },
        { london: 60, paris: 65, newYork: 97, value: 55, month: '10' },
      ]
    },
    {
      id: 2,
      title: 'Home Visit reports',
      label:'No. of home visit',
      dataKey:'month',
      data: [
        { value: 21, month: '1' },
        { value: 28, month: '2' },
        { value: 41, month: '3' },
        { value: 73, month: '4' },
        { value: 99, month: '5' },
        { value: 144, month: '6' },
        { value: 319, month: '7' },
        { value: 249, month: '8' },
        { value: 131, month: '9' },
        { value: 55, month: '10' },
      ]
    },
    {
      id: 3,
      title: 'Pickup reports',
      label:'No. of pickup',
      dataKey:'month',
      data: [
        { value: 21, month: '1' },
        { value: 28, month: '2' },
        { value: 41, month: '3' },
        { value: 73, month: '4' },
        { value: 99, month: '5' },
        { value: 144, month: '6' },
        { value: 319, month: '7' },
        { value: 249, month: '8' },
        { value: 131, month: '9' },
        { value: 55, month: '10' },
      ]
    },
    {
      id: 4,
      title: 'Co-Helper reports',
      label:'No. of hours',
      dataKey:'name',
      data: [
        { value: 21, name: 'Jane' },
        { value: 28, name: 'Alice' },
        { value: 41, name: 'John' },
        { value: 73, name: 'Bob' },
        { value: 99, name: 'Emma' },
        { value: 144, name: 'Tim' },
        { value: 319, name: 'George' },
        { value: 249, name: 'Chris' },
        { value: 131, name: 'Joe' },
        { value: 55, name: 'Emily' },
      ]
    },
  ];

  const handleChange = (e, selectedTitle) => {
    if (e) {
      var filteredData = dataset.filter((item) => item.title == selectedTitle);
      filteredData.map((item) => {
        return item;
      })
      setBarChartData(filteredData);
    } else {
      setBarChartData([]);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="stock_reports_wrapper">
        <Box className="row">
          <Header icon_1={stock_management_icon} icon_2={stock_management_icon2} title="Stock Reports" icon_1_link='../emotional/eshop' icon_2_link=''  redirectTo='../emotional/eshop'/>

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

                  <Box className="col-12">
                    <Typography className='label'>
                    Gate pass
                    </Typography>
                    <Button className='btn-download'>Download (in CSV Format)</Button>
                  </Box>
                  </Box>
                </Box>

                <Box className="sub_container">
                  {
                    barChartData.length>0 ? <BarChartComponent dataset={barChartData[0].data} label={barChartData[0].label} dataKey={barChartData[0].dataKey} title={barChartData[0].title} /> : <Box className="show_message">
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

export default Stock_reports;
