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




function BusTable({id}) {

  return (
    <Table className='table'>
    <TableBody>
        {rows.map((row) => (
            <TableRow
                key={row.id}
                className='tableRow'
            >
                <TableCell className='tableCell1'>
                    <Typography className='route'>
                        {row.route}
                    </Typography>
                </TableCell>
                <TableCell align="right" className='tableCell2'>
                    <Typography className='expectedTime'>
                        {row.arrival}
                    </Typography>
                    <Typography className='finalTime'>
                        {row.arrivedAt}
                    </Typography>
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>
  )
}

export default BusTable