import * as React from 'react';
import { Button, TableFooter, Typography, Box, TableHead, TableCell, TableContainer, TableBody, TableRow, Table, Paper } from '@mui/material';
import tbody_vector from '../../Utils/images/Sell/products/tbody_vector.webp';
import plus from '../../Utils/images/Sell/cart/plus.svg';
import minus from '../../Utils/images/Sell/cart/minus.svg';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../../store/cartSlice';
import { useParams } from 'react-router-dom';
import Button2 from '../Home/Button2';

const columns = [
  { id: '1', label_1: 'S.No.' },
  { id: '2', label_1: 'Product' },
  { id: '3', label_1: 'Quantity' },
  { id: '4', label_1: 'Model' },
  { id: '5', label_1: 'Unit Price' }, // Updated label for unit price
  { id: '6', label_1: 'Total Price' }, // Updated label for total price
];

export default function CartTable({ rows }) {
  const dispatch = useDispatch();
  const { owner } = useParams();
  const [data, setData] = React.useState(rows);

  const handleIncrement = (index) => {
    const newData = data.map((item, i) => {
      if (i === index) {
        const newQuantity = item.quantity + 1;
        return { ...item, quantity: newQuantity }; // No change to price
      }
      return item;
    });
    setData(newData);
  };
  
  const handleDecrement = (index) => {
    const newData = data.map((item, i) => {
      if (i === index) {
        const newQuantity = item.quantity - 1;
        if (newQuantity <= 0) {
          dispatch(removeProduct(item.id)); // Remove from Redux if quantity is zero
          return null;
        }
        return { ...item, quantity: newQuantity }; // No change to price
      }
      return item;
    }).filter(item => item !== null);
  
    setData(newData);
  };
  
  // Calculate total price based on quantity and unit price
  const calculateTotal = () => {
    return data.reduce((acc, item) => acc + Number(item.price * item.quantity), 0); // Total Price = unitPrice * quantity
  };
  
  // Calculate discount based on the total price
  const calculateDiscount = () => {
    return calculateTotal() * 0.10;
  };
  


  return (
    <Box className="cart_table_wrapper">
      <Paper>
        <Box className="board_pins">
          <Box className="circle"></Box>
          <Box className="circle"></Box>
        </Box>
         <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <Typography className='text_1'>
                      {column.label_1}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (data.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell className='text_3' align='center'>{index + 1}</TableCell>
                  <TableCell className="product_cell">
                    <Box component="img" src={row.sample} alt="product_image" className='product_image' />
                    <Box className="product_info">
                      <Box component="img" className="vector" src={tbody_vector} />
                      <Typography className='text_1'>{row.variations}</Typography>
                      <Typography className='text_2'>{row.specifications}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className="quantity">
                      <Button onClick={() => handleDecrement(index)} className='operator'><Box component="img" src={minus} alt="minus" /></Button>
                      <Typography className='text_3'>{row.quantity}</Typography>
                      <Button onClick={() => handleIncrement(index)} className='operator'><Box component="img" src={plus} alt="plus" /></Button>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className="product_info">
                      <Box component="img" className="vector" src={tbody_vector} />
                      <Typography className='text_1'>{row.brand}</Typography>
                      <Typography className='text_2'>{row.category}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell className='text_3' align='right'>&#8377;{Number(row.price).toFixed(2)}</TableCell> {/* Unit price constant */}
                  <TableCell className='text_3 product_price' align='right'>&#8377;{(row.price * row.quantity).toFixed(2)}</TableCell> {/* Total price = unitPrice * quantity */}
                </TableRow>
              ))) : (
                <TableRow>
                  <TableCell colSpan="6" className='empty_cart'>
                    <Typography className='label'>0 items added</Typography>
                    <Button2 text="Add Products" redirectTo={`../${owner}/products`} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {data.length > 0 && (
              <TableFooter>
                {/* <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography className='text_1'>Discount Applied:</Typography>
                  </TableCell>
                  <TableCell className='text_2'>- &#8377;{calculateDiscount().toFixed(0)}</TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography className='text_1'>Total:</Typography>
                  </TableCell>
                  <TableCell className='text_2'>&#8377;{(calculateTotal() - calculateDiscount()).toFixed(2)}</TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>
        <Box className="board_pins">
          <Box className="circle"></Box>
          <Box className="circle"></Box>
        </Box>
      </Paper>
    </Box>
  );
}
