import React, { useState, useEffect} from 'react';
import { Box, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'


function BusTable({id, data}) {

    const convertTo12HourFormat = (time) => {
        if (!time) return "";
        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours, 10);
        const period = hour >= 12 ? "PM" : "AM";
        const adjustedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
        return `${adjustedHour}:${minutes} ${period}`;
      };

  return (
    <Table className='table'>
    <TableBody>
        {data?.map((row) => (
            <TableRow
                key={row.id}
                className='tableRow'
            >
                <TableCell className='tableCell1'>
                    <Typography className='route'>
                        {row.travel_from} to {row.travel_to}
                    </Typography>
                </TableCell>
                <TableCell align="right" className='tableCell2'>
                    <Typography className='expectedTime'>
                        {id} : {id === "Arrival"? convertTo12HourFormat(row.arrival_time) : convertTo12HourFormat(row.departure_time)}
                    </Typography>
                    <Typography className='finalTime'>
                        {id === "Arrival"? ("Arrived at: " +convertTo12HourFormat(row.arrived_at)) : ("Departed at: " + convertTo12HourFormat(row.departed_at)) }
                    </Typography>
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>
  )
}

export default BusTable