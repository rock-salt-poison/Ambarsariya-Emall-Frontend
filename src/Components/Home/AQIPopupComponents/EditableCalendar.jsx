import { Box, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from 'rsuite';
import { isAfter, isBefore } from 'rsuite/esm/internals/utils/date';

function EditableCalendar({business_establishment_date, setDate}) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  
  
  const [value, setValue] = useState(new Date());
  const datePickerRef = useRef(null);

  const handleChange = (value) => {
    setValue(value);
    setDate(value);
  };

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.open();
    }
  };

  return (
    <Box className='calendarBorder' onClick={openDatePicker} sx={{ cursor: 'pointer', position: 'relative' }}>
      <Box className="vectors">
        <Box className="vector"></Box>
        <Box className="vector"></Box>
        <Box className="vector"></Box>
      </Box>

      <Box className="date">
        <Typography component='p'>
          {value.getDate()}
        </Typography>
      </Box>

      <Box className="month">
        <Typography component='p'>
          {months[value.getMonth()]}
        </Typography>
      </Box>

      {/* Hidden DatePicker */}
      <DatePicker
        ref={datePickerRef}
        value={value}
        onChange={handleChange}
        className='calendar_popup'
        placement='auto'
        shouldDisableDate={date => 
          isAfter(date, new Date()) || isBefore(date, business_establishment_date)
        }
        style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
      />
    </Box>
  );
}

export default EditableCalendar;
