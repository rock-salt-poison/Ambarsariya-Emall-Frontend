import React from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import ScrollableTabsButton from '../ScrollableTabsButton';
import DailyMemo from './DailyMemo';
import FixedMemo from './FixedMemo';
import title_bg from '../../Utils/images/Sell/mou/title_bg.png';

function MemoPopup() {
  const themeProps = {
    popoverBackgroundColor: '#F8DED4',
    scrollbarThumb: 'var(--pink2)',
  };

  const theme = createCustomTheme(themeProps);

  const tabsData = [
    {
      id: 1,
      name: 'Daily Memo',
      content: () => <DailyMemo />,
    },
    {
      id: 2,
      name: 'Fixed Memo',
      content: () => <FixedMemo />,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box className="header">
        <Box className="col"></Box>
        <Box className="title_container">
          <Box component="img" className="title_bg" alt="bg" src={title_bg} />
          <Typography className="title">Write Your Memo</Typography>
        </Box>
        <Box className="col"></Box>
      </Box>

      <Box className="body">
        <ScrollableTabsButton data={tabsData} />
      </Box>
    </ThemeProvider>
  );
}

export default MemoPopup;

