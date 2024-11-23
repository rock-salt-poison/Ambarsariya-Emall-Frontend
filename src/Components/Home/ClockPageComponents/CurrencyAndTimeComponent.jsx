import React from 'react';
import { Box, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import flag from '../../../Utils/images/India (IN).png';
import indian_currency_icon from '../../../Utils/images/rupee-icon.png';
import europian_currency_icon from '../../../Utils/images/europian-currency-icon.png';
import new_zealand_currency_icon from '../../../Utils/images/new-zealand-currency-icon.png';
import canadian_currency_icon from '../../../Utils/images/canadian-currency-icon.png';
import american_currency_icon from '../../../Utils/images/american-currency-icon.png';
import australian_currency_icon from '../../../Utils/images/australian-currency-icon.png';

// Create data function with variable arguments
function createData(id, ...values) {
  return { id, values };
}

const rows = [
  createData('1', flag, flag, flag),
  createData('2', '12:00', '12:30', '02:30'),
  createData('3', { icon: indian_currency_icon, price: '100', optionalClassName:'rupeeIcon' }, { icon: new_zealand_currency_icon, price: '1.17' }, { icon: canadian_currency_icon, price: '1.97' }),
];

function CurrencyAndTimeComponent({optionalCName}) {
  return (
    <Box className={`${optionalCName &&  optionalCName} currency-wrapper`}>
      <Table className='table'>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {row.values.map((value, index) => {
                if (row.id === '1') {
                  return (
                    <TableCell key={index} className='tableCell'>
                      <Box component="img" src={value} className='flag' alt="flag" />
                    </TableCell>
                  );
                } else if (row.id === '2') {
                  return (
                    <TableCell key={index} className='tableCell'>
                      <Typography className='time'>{value}</Typography>
                    </TableCell>
                  );
                } else if (row.id === '3') {
                  return (
                    <TableCell key={index} className='tableCell'>
                      <Box className="currencyTd">
                        <Box component="img" src={value.icon} className={value.optionalClassName ? value.optionalClassName : "currencyIcon"} alt="currency" />
                        <Typography className='price' sx={{ marginLeft: 1 }}>
                          {value.price}
                        </Typography>
                      </Box>
                    </TableCell>
                  );
                }
                return null;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default CurrencyAndTimeComponent;
