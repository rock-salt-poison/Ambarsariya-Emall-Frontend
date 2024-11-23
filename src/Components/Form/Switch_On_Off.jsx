import * as React from 'react';
import { Stack, Switch, Typography } from '@mui/joy';

export default function Switch_On_Off({ name, checked, onChange, text1="On", text2="Off" }) {
  return (
    <Stack direction="row" spacing={2}>
      <Switch
        name={name}
        checked={checked}
        onChange={onChange}
        slotProps={{
          track: {
            children: (
              <React.Fragment>
                <Typography component="span" level="inherit" className='switch_text'>
                  {text1}
                </Typography>
                <Typography component="span" level="inherit" className='switch_text'>
                  {text2}
                </Typography>
              </React.Fragment>
            ),
          },
        }}
        sx={{
          '--Switch-thumbSize': '27px',
          '--Switch-trackWidth': '64px',
          '--Switch-trackHeight': '31px',
        }}
      />
    </Stack>
  );
}
