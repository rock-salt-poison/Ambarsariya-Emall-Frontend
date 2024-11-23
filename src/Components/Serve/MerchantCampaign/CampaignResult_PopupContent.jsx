import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function CampaignResult_PopupContent() {
  const data = [
    {
      label: 'No of receivers',
      value: 42.72,
    },
    {
      label: 'No. of viewers More than 1',
      value: 16.38,
    },
    {
      label: 'Shop clickable',
      value: 3.83,
    },
    {
      label: 'Shop product browsing',
      value: 15,
    },
    {
      label: 'Purchase Order',
      value: 4.65,
    },
    {
      label: 'Invoice Received',
      value: 18.65,
    },
    {
      label: 'Share and feedback',
      value: 30,
    },
  ];

  const valueFormatter = (value) => `${value.value}%`;

  return (
    <PieChart
      colors={['#8979FF', '#FF928A', '#8C63DA', '#FFAE4C', '#3CC3DF', '#6FD195', '#B800D8']}
      series={[
        {
          data: data,
          highlightScope: { fade: 'global', highlight: 'item' },
          // faded: { innerRadius: 20, additionalRadius: -20, color: 'gray' },
          valueFormatter,
        },
      ]}
      height={280}
      width={780}
    />
  );
}
