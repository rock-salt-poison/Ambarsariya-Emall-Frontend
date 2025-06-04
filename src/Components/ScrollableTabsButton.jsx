import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Tabs, tabsClasses, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import createCustomTheme from '../styles/CustomSelectDropdownTheme';

export default function ScrollableTabsButton(props) {
  const navigate = useNavigate();
  const tabsData = props.data || [];

  const [value, setValue] = React.useState(props.selectedTabValue || '1');

  // Sync with prop changes
  React.useEffect(() => {
    if (props.selectedTabValue) {
      setValue(`${props.selectedTabValue}`);
    }
  }, [props.selectedTabValue]);

  const handleChange = (event, newValue) => {
    const selectedTab = tabsData.find((tab) => tab.id === Number(newValue));

    if (selectedTab) {
      if (selectedTab.redirectTo) {
        navigate(selectedTab.redirectTo);
      } else {
        setValue(newValue);
      }
    }
  };

  const theme = createCustomTheme({
    scrollbarThumbTabs: `${props.scrollbarThumb2}`,
  });

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <Box className="tabs_container">
          <Tabs
            value={value}
            onChange={handleChange}
            orientation={props.verticalTabs ? 'vertical' : 'horizontal'}
            variant="scrollable"
            className="tabs"
            scrollButtons={props.hideScrollBtn ? false : true}
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            {tabsData.map((tab) => (
              <Tab label={tab.name} value={`${tab.id}`} key={tab.id} />
            ))}
          </Tabs>
        </Box>
        {tabsData.map((tab) =>
          tab.content ? (
            <TabPanel key={tab.id} value={`${tab.id}`} className="tab_panel">
              {typeof tab.content === 'function' ? tab.content() : tab.content}
            </TabPanel>
          ) : null
        )}
      </TabContext>
    </ThemeProvider>
  );
}
