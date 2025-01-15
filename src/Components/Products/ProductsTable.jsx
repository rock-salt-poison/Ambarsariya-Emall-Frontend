import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../../store/cartSlice';
import axios from 'axios';

const columns = [
  { id: 'product', label_1: 'Product', label_2: 'Brand' },
  { id: 'variations', label_1: 'Variation', label_2: 'Specification' },
  { id: 'price', label_1: 'Price' },
  { id: 'sample', label_1: 'Sample' },
];

export default function CustomPaginationTable({ token }) {
  const [page, setPage] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState([]);
  const rowsPerPage = 3;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedProducts = useSelector((state) => state.cart.selectedProducts);

  // Fetch data from the API once when the component mounts
  const fetchData = async () => {
    const url = 'https://api.sheetbest.com/sheets/08a3278a-afb2-4e23-83c5-dd243688c14d'; // Your Sheet.best URL
    try {
      const response = await axios.get(url);
      setData(response.data); // Set the data to state
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  // Group products by their variant_group
  const groupedProducts = data.reduce((acc, product) => {
    const { variant_group } = product;
    if (!acc[variant_group]) acc[variant_group] = [];
    acc[variant_group].push(product);
    return acc;
  }, {});

  // Identify the variation fields dynamically based on variation values
  const getVariationFields = (product) => {
    const variationFields = [];
    const variations = {
      color: new Set(),
      size: new Set(),
      material: new Set(),
    };

    // Loop through all products in the same variant_group and track unique values for each variation field
    groupedProducts[product.variant_group].forEach((otherProduct) => {
      if (otherProduct.color) variations.color.add(otherProduct.color);
      if (otherProduct.product_size) variations.size.add(otherProduct.product_size);
      if (otherProduct.material) variations.material.add(otherProduct.material);
    });

    // Only add the variation field to the list if there are multiple distinct values
    if (variations.color.size > 1) variationFields.push('Color');
    if (variations.size.size > 1) variationFields.push('Size');
    if (variations.material.size > 1) variationFields.push('Material');

    return variationFields;
  };

  // Pagination logic
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  // Handle individual row checkbox click
  const handleCheckboxClick = (event, row) => {
    if (event.target.checked) {
      dispatch(addProduct(row));
    } else {
      dispatch(removeProduct(row.product_no));
    }
  };

  const isSelected = (id) => selectedProducts.some((product) => product.product_no === id);

  const handleClick = (e, id) => {
    navigate(`../shop/${token}/products/${id}`);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      data.forEach((row) => {
        if (!isSelected(row.product_no)) {
          dispatch(addProduct(row));
        }
      });
      setSelectAll(true);
    } else {
      data.forEach((row) => {
        if (isSelected(row.product_no)) {
          dispatch(removeProduct(row.product_no));
        }
      });
      setSelectAll(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data only once when the component mounts

  useEffect(() => {
    setSelectAll(selectedProducts.length === data.length);
  }, [selectedProducts, data.length]);

  // Derived paginated data
  const paginatedData = React.useMemo(
    () => data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [data, page, rowsPerPage]
  );

  // Render table cell content
  const renderTableCellContent = (column, row) => {
    if (column.id === 'sample') {
      return (
        <Box
          component="img"
          src={row.product_images}
          alt="product_image"
          className="product_image"
          onClick={(e) => handleClick(e, ((row.product_no).split('_'))[1])}
        />
      );
    }

    const primaryText = column.id === 'variations' ? renderVariations(row) : column.id === 'product' ? row.product_type : column.id === 'price' ? `₹ ${row.price}` : '';
    const secondaryText = column.id === 'variations' ? row.product_name : column.id === 'product' ? row.brand : '';

    return (
      <>
        <Box component="img" src={tbody_vector} className="vector" alt="vector" />
        <Typography className="text_1">{primaryText}</Typography>
        <Typography className="text_2">{secondaryText}</Typography>
      </>
    );
  };

  // Render variations for the given product
  const renderVariations = (row) => {
    const variationFields = getVariationFields(row);
    return variationFields.join(', ');
  };

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
                    indeterminate={selectedProducts.length > 0 && selectedProducts.length < data.length}
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
              {paginatedData.map((row) => {
                const isItemSelected = isSelected(row.product_no);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.product_no}
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
                      <TableCell key={column.id}>{renderTableCellContent(column, row)}</TableCell>
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
        <Button2 text="Prev" optionalcName={page===0?"disabled_button":""} onClick={handlePrevPage} />
        <Button2 text="Next" optionalcName={page >= totalPages - 1?"disabled_button":""} onClick={handleNextPage} disabled={page >= totalPages - 1} />
        <Button2 text="Buy" optionalcName={selectedProducts.length<=0 ?"disabled_button":""} redirectTo={`../shop/${token}/cart`} />
      </Box>
    </Box>
  );
}
