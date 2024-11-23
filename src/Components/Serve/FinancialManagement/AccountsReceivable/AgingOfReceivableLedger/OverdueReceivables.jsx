import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';


function OverdueReceivables() {

    function createData(sno, invoice, due_date, price) {
        return { sno, invoice, due_date, price };
    }
    
    const rows = [
        createData(1, 'Product00124579635', '24/09/2024', 499),
        createData(2, 'Product00975214823', '24/11/2024', 499),
        createData(3, 'Product00465784545', '24/12/2024', 499),
    ];

    return (
        <Box className="container">
            <Typography className="description">
                Invoices that have not been paid by the due date
            </Typography>
            <Table border="1">
                    <TableHead>
                    <TableRow>
                        <TableCell>S. No.</TableCell>
                        <TableCell>Invoice</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        hover
                        >
                        <TableCell>
                            {row.sno}
                        </TableCell>
                        <TableCell>{row.invoice}</TableCell>
                        <TableCell>{row.due_date}</TableCell>
                        <TableCell>₹ {row.price}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
        </Box>
    );
}

export default OverdueReceivables