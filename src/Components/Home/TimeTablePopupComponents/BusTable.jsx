import React, { useState, useEffect} from 'react';
import { Box, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'


function createData(id, route, arrival, arrivedAt) {
    return { id, route, arrival, arrivedAt };
}

const rows = [
    createData('1', 'Pathankot to amritsar', 'Arrival : 05:30 AM', 'Arrived at : 06:30 AM'),
    createData('2', 'Pathankot to amritsar', 'Arrival : 05:30 AM', 'Arrived at : 06:30 AM'),
    createData('3', 'Pathankot to amritsar', 'Arrival : 05:30 AM', 'Arrived at : 06:30 AM'),
    createData('4', 'Pathankot to amritsar', 'Arrival : 05:30 AM', 'Arrived at : 06:30 AM'),
    createData('5', 'Pathankot to amritsar', 'Arrival : 05:30 AM', 'Arrived at : 06:30 AM'),
];




function BusTable({id, data}) {

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
                        {id} : {id === "Arrival"? row.arrival_time : row.departure_time}
                    </Typography>
                    <Typography className='finalTime'>
                        {id === "Arrival"? ("Arrived at: " +row.arrived_at) : ("Departed at: " + row.departed_at) }
                    </Typography>
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>
  )
}

export default BusTable