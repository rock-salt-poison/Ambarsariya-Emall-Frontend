import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'


function createData(id, from, to, arrival, arrivedAt) {
    return { id, from, to, arrival, arrivedAt };
}

const rows = [
    createData('1', 'Pathankot', 'Amritsar', '05:30 AM', '06:30 AM'),
    createData('2', 'Pathankot', 'Amritsar', '05:30 AM', '06:30 AM'),
    createData('3', 'Pathankot', 'Amritsar', '05:30 AM', '06:30 AM'),
    createData('4', 'Pathankot', 'Amritsar', '05:30 AM', '06:30 AM'),
    createData('5', 'Pathankot', 'Amritsar', '05:30 AM', '06:30 AM'),
];

function TrainTable({id}) {

    const [status, setStatus] = useState('');

    useEffect(()=>{
        if(id == 'departure'){
            setStatus('Departed')
        }
        else if(id == 'arrival'){
            setStatus('Arrived')
        }
    },[])
  
    return (
    <Table className='table'>
        <TableHead className='thead'>
          <TableRow className='theadRow'>
            <TableCell className='th'>From</TableCell>
            <TableCell className='th' align="center">To</TableCell>
            <TableCell className='th' align="center">Time</TableCell>
            <TableCell className='th' align="right">{status}</TableCell>
          </TableRow>
        </TableHead>
    <TableBody>
        {rows.map((row) => (
            <TableRow
                key={row.id}
                className='tableRow'
            >
                <TableCell className='tableCell1'>
                    <Typography className='route'>
                        {row.from}
                    </Typography>
                </TableCell>
                <TableCell align="center" className='tableCell1'>
                    <Typography className='route'>
                        {row.to}
                    </Typography>
                </TableCell>
                <TableCell align="center" className='tableCell1'>
                    <Typography className='expectedTime'>
                        {row.arrival}
                    </Typography>
                </TableCell>
                <TableCell align="right" className='tableCell1'>
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

export default TrainTable