import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Tabs, tabsClasses, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import createCustomTheme from '../styles/CustomSelectDropdownTheme';

export default function ScrollableTabsButton(props) {
  const [value, setValue] = React.useState('1'); // Initialize with the first tab's value
  const navigate = useNavigate(); // For redirection

  // Get tabs data from props
  const tabsData = props.data || [];

  const handleChange = (event, newValue) => {
    const selectedTab = tabsData.find((tab) => tab.id === Number(newValue)); // Convert newValue to a number
  
    if (selectedTab) {
      if (selectedTab.redirectTo) {
        // If the tab has a `redirectTo` property, navigate to the target URL
        navigate(selectedTab.redirectTo);
      } else {
        // Otherwise, update the active tab and show the content
        setValue(newValue);
      }
    }
  };
  

  const themeProps = {
    scrollbarThumbTabs: `${props.scrollbarThumb2}`,
  };

  const theme = createCustomTheme(themeProps);

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <Box className="tabs_container">
          <Tabs 
            value={value} 
            onChange={handleChange} 
            orientation={props.verticalTabs?'vertical':'horizontal'}
            variant="scrollable" 
            className="tabs" 
            scrollButtons={props.hideScrollBtn ? false:true} 
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            {tabsData.map((tab) => {
              return <Tab label={tab.name} value={`${tab.id}`} key={tab.id} ></Tab>
            })}
          </Tabs>
        </Box>
        {tabsData.map((tab) => (
          tab.content && ( // Only render TabPanel if content is available
            <TabPanel key={tab.id} value={`${tab.id}`} className="tab_panel">
              {tab.content} {/* Display the content of the tab */}
            </TabPanel>
          )
        ))}
      </TabContext>
    </ThemeProvider>
  );
}
