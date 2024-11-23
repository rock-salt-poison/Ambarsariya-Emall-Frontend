import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const data1 = [
  { label: 'Pending', value: 65, color: 'var(--brown-4)' },
  { label: 'Completed', value: 35, color: 'var(--brown-6)' },
];

const data2 = [
  { label: 'Previous Sales', value: 80, color: 'var(--brown-6)' }, // 80% sales
  { label: 'Remaining', value: 20, color: '#6B433699' }, // 20% blank area
];

export default function PieChartComponent(props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is small

  const { title, pieData, hideLegend, onHeadingClick } = props;
  const pieChartData = (val) => {
    if (val === "data1") {
      return data1;
    } else if (val === "data2") {
      return data2;
    }
  };

  const percentage = pieData === "data2" ? data2[0].value : null;

  const handleHeadingClick = (title) => {
    if (onHeadingClick) {
      onHeadingClick(title);
    }
  };


  return (
    <Box className="pie_chart_container">
      <Link className="heading_link" onClick={() => onHeadingClick && onHeadingClick(title)}>
        <Typography variant="h3" className="heading">
          {title}
        </Typography>
      </Link>
      <Link className="main">
        <PieChart
          series={[
            {
              data: pieChartData(pieData), // Pass the specific data based on the chart
              cx: 92, // Center X for regular screens
              cy: 55, // Adjust Y-axis based on screen size
              innerRadius: 35,
              outerRadius: 60,
            },
          ]}
          className="pieChart"
          height={isSmallScreen ? (pieData === "data2" ? 120 : 190) : 155}
          slotProps={{
            legend: {
              hidden: hideLegend ? true : false,
              direction: isSmallScreen ? 'column' : 'row',
              position: { vertical: 'bottom', horizontal: 'middle' },
              padding: 0,
            },
          }}
        >
        </PieChart>
        {percentage && <Typography className='percentage_count'>{percentage}%</Typography>}
      </Link>
    </Box>
  );
}
