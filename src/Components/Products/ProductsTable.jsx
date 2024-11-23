import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button2 from '../Home/Button2';
import { Checkbox, Typography } from '@mui/material';
import thead_vector from '../../Utils/images/Sell/products/thead_vector.png';
import tbody_vector from '../../Utils/images/Sell/products/tbody_vector.webp';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../../store/cartSlice';

const columns = [
  { id: 'product', label_1: 'Product', label_2: 'Brand' },
  { id: 'variations', label_1: 'Variation', label_2: 'Specification' },
  { id: 'price', label_1: 'Price' },
  { id: 'sample', label_1: 'Sample' },
];

export default function CustomPaginationTable({ rows }) {
  const [page, setPage] = useState(0);
  const [selectAll, setSelectAll] = useState(false); // Track the state of the header checkbox
  const { owner } = useParams();
  const rowsPerPage = 3; // Display 3 rows per page
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedProducts = useSelector((state) => state.cart.selectedProducts);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handleCheckboxClick = (event, row) => {
    if (event.target.checked) {
      dispatch(addProduct(row));
    } else {
      dispatch(removeProduct(row.id));
    }
  };

  const isSelected = (id) => selectedProducts.some((product) => product.id === id);

  const handleClick = (e, id) => {
    navigate(`${id}`);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      rows.forEach((row) => {
        if (!isSelected(row.id)) {
          dispatch(addProduct(row));
        }
      });
      setSelectAll(true);
    } else {
      rows.forEach((row) => {
        if (isSelected(row.id)) {
          dispatch(removeProduct(row.id));
        }
      });
      setSelectAll(false);
    }
  };

  React.useEffect(() => {
    setSelectAll(selectedProducts.length === rows.length);
  }, [selectedProducts, rows.length]);

  return (
    <Box className="products_table_wrapper">
      <Paper>
        <Box className="board_pins">
          <Box className="circle"></Box>
          <Box className="circle"></Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selectedProducts.length > 0 && selectedProducts.length < rows.length}
                    checked={selectAll}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <Box component="img" src={thead_vector} className="vector" alt="vector" />
                    <Typography className="text_1">{column.label_1}</Typography>
                    <Typography className="text_2">{column.label_2}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = isSelected(row.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onChange={(event) => handleCheckboxClick(event, row)}
                        />
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          {column.id === 'sample' ? (
                            <Box
                              component="img"
                              src={row.sample}
                              alt="product_image"
                              className="product_image"
                              onClick={(e) => handleClick(e, row.id)}
                            />
                          ) : (
                            <>
                              <Box component="img" src={tbody_vector} className="vector" alt="vector" />
                              <Typography className="text_1">
                                {column.id === 'variations' ? row.variations : ''}
                                {column.id === 'product' ? row.product : ''}
                                {column.id === 'price' ? `₹ ${row.price}` : ''}
                              </Typography>
                              <Typography className="text_2">
                                {column.id === 'variations' ? row.specifications : ''}
                                {column.id === 'product' ? row.brand : ''}
                                {/* {column.id === 'price' ? (row.discount ? `${row.discount} off coupon` : ''):''} */}
                              </Typography>
                            </>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="board_pins">
          <Box className="circle"></Box>
          <Box className="circle"></Box>
        </Box>
      </Paper>
      <Box className="pagination">
        <Button2 text="Prev" onClick={handlePrevPage} disabled={page === 0} />
        <Button2 text="Next" onClick={handleNextPage} disabled={page >= totalPages - 1} />
        <Button2 text="Buy" redirectTo={`../${owner}/cart`} />
      </Box>
    </Box>
  );
}
