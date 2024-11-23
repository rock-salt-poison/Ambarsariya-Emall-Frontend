import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Box, Typography } from '@mui/material';

export default function BarChartComponent({ dataset, label, dataKey, title }) {
  const valueFormatter = (value) => `${value}`;

  const chartSetting = {
    yAxis: [
      {
        label: label,
      },
    ],
    series: [
      { dataKey: 'value', valueFormatter, color: 'var(--brown-6)' },
    ],
    height: 200, 
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-12px)',
      },
    },
    margin: { top: 10, bottom: 20, right: 10, left: 50 }, 
  };
  return (
    <Box className="bar_chart_container">
      <Typography variant="h3" className="heading">{title? title:"Sale"}</Typography>
      <BarChart
        dataset={dataset}
        xAxis={[
          { scaleType: 'band', dataKey: dataKey, paddingOuter: 0.1, paddingInner: 0.3 },
        ]}
        {...chartSetting}
      />
    </Box>
  );
}
