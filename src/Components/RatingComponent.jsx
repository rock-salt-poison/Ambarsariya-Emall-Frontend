import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingComponent({value, readOnly}) {
  return (
    <Stack spacing={1}>
      <Rating defaultValue={value} precision={0.5} readOnly={readOnly}/>
    </Stack>
  );
}
