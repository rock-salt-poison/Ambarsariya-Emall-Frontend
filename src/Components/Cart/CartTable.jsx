import React, { useState, useEffect } from "react";
import {
  Button,
  TableFooter,
  Typography,
  Box,
  TableHead,
  TableCell,
  TableContainer,
  TableBody,
  TableRow,
  Table,
  Paper,
  CircularProgress,
} from "@mui/material";
import tbody_vector from "../../Utils/images/Sell/products/tbody_vector.webp";
import plus from "../../Utils/images/Sell/cart/plus.svg";
import minus from "../../Utils/images/Sell/cart/minus.svg";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../store/cartSlice";
import { useParams } from "react-router-dom";
import Button2 from "../Home/Button2";
import { getCategoryName } from "../../API/fetchExpressAPI";

const columns = [
  { id: "1", label_1: "S.No." },
  { id: "2", label_1: "Product" },
  { id: "3", label_1: "Quantity" },
  { id: "4", label_1: "Brand" },
  { id: "5", label_1: "Unit Price" },
  { id: "6", label_1: "Total Price" },
];

export default function CartTable({ rows }) {
  const dispatch = useDispatch();
  const { owner } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    rows.map((row) => ({ ...row, quantity: 1 })) // Initialize quantity for each product
  );
  const [categoryNames, setCategoryNames] = useState({}); // Map of category IDs to names

  // Fetch category names for all products
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const uniqueCategoryIds = Array.from(
        new Set(rows.map((row) => row.category))
      ); // Get unique category IDs
      const categoryNameMap = {};

      for (const categoryId of uniqueCategoryIds) {
        const resp = await getCategoryName(categoryId);
        if (resp.length > 0) {
          categoryNameMap[categoryId] = resp[0].category_name;
        }
      }

      setCategoryNames(categoryNameMap);
      setLoading(false);
    };

    fetchCategories();
  }, [rows]);

  const handleIncrement = (index) => {
    const newData = data.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setData(newData);
  };

  const handleDecrement = (index) => {
    const newData = data
      .map((item, i) =>
        i === index
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null
          : item
      )
      .filter((item) => item !== null);

    if (data[index].quantity === 1) {
      dispatch(removeProduct(data[index].id));
    }

    setData(newData);
  };

  const calculateTotal = () =>
    data.reduce((acc, item) => acc + Number(item.price * item.quantity), 0);

  const calculateDiscount = () => calculateTotal() * 0.1;

  return (
    <Box className="cart_table_wrapper">
      {loading && <Box className="loading"><CircularProgress/></Box>} 
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
                    <Typography className="text_1">{column.label_1}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell className="text_3" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="product_cell">
                      <Box
                        component="img"
                        src={row.product_images[0]}
                        alt="product_image"
                        className="product_image"
                      />
                      <Box className="product_info">
                        <Box component="img" className="vector" src={tbody_vector} />
                        <Typography className="text_1">{row.product_name}</Typography>
                        {/* <Typography className="text_2">
                          {[
                            row.variation_1,
                            row.variation_2,
                            row.variation_3,
                            row.variation_4,
                          ]
                            .filter((variation) => variation && variation.trim() !== "")
                            .join(", ")}
                        </Typography> */}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="quantity">
                        <Button
                          onClick={() => handleDecrement(index)}
                          className="operator"
                        >
                          <Box component="img" src={minus} alt="minus" />
                        </Button>
                        <Typography className="text_3">{row.quantity}</Typography>
                        <Button
                          onClick={() => handleIncrement(index)}
                          className="operator"
                        >
                          <Box component="img" src={plus} alt="plus" />
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="product_info">
                        <Box component="img" className="vector" src={tbody_vector} />
                        <Typography className="text_1">{row.brand}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell className="text_3" align="right">
                      &#8377;{Number(row.price).toFixed(2)}
                    </TableCell>
                    <TableCell className="text_3 product_price" align="right">
                      &#8377;{(row.price * row.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" className="empty_cart">
                    <Typography className="label">0 items added</Typography>
                    <Button2
                      text="Add Products"
                      redirectTo={`../${owner}/products`}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {data.length > 0 && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography className="text_1">Total:</Typography>
                  </TableCell>
                  <TableCell className="text_2">
                    &#8377;{(calculateTotal() - calculateDiscount()).toFixed(2)}
                  </TableCell>
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
