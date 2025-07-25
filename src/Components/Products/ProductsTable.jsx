import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button2 from "../Home/Button2";
import { Checkbox, CircularProgress, Typography } from "@mui/material";
import thead_vector from "../../Utils/images/Sell/products/thead_vector.png";
import tbody_vector from "../../Utils/images/Sell/products/tbody_vector.webp";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../store/cartSlice";
import axios from "axios";
import { convertDriveLink, get_products, getShopUserData, getUser } from "../../API/fetchExpressAPI";

const columns = [
  { id: "product", label_1: "Product", label_2: "Brand" },
  { id: "variations", label_1: "Variation", label_2: "Specification" },
  { id: "price", label_1: "Price" },
  { id: "sample", label_1: "Sample" },
];

export default function CustomPaginationTable({rows}) {

  
  const [page, setPage] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(rows || []);
  const rowsPerPage = 3;
  const totalPages = Math.ceil((filteredData.length > 0 ? filteredData : data).length / rowsPerPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedProducts = useSelector((state) => state.cart.selectedProducts);
  const { token } = useParams();
  const [shopNo, setShopNo] = useState("");
  const [loading, setLoading] = useState(false);
  const loggedInUserToken = useSelector((state) => state.auth.userAccessToken);
  const [canBuy, setCanBuy] = useState(true);
  
  useEffect(() => {
    const fetchShopUserData = async () => {
      if (token) {
        try {
          setLoading(true);

          // Fetch shop user data
          const get_shop_user_data = await getShopUserData(token);
          const get_shop_no = get_shop_user_data?.[0]?.shop_no;

          if (get_shop_no) {
            setShopNo(get_shop_no);

            // Fetch products data directly using get_shop_no
            try {
              const get_products_data = await get_products(get_shop_no);
              if (get_products_data.valid) {
                setData(get_products_data.data);
              } else {
                console.log("Invalid products data");
              }
            } catch (productError) {
              console.error("Error fetching products data:", productError);
            }
          } else {
            console.log("Shop number not found");
          }

          setLoading(false);
        } catch (userError) {
          console.error("Error fetching shop user data:", userError);
          setLoading(false);
        }
      }
    };

    fetchShopUserData();
  }, [token]);

  useEffect(()=>{
    const validUser = async () => {
      if(loggedInUserToken && token){
        try{
          const fetch_details = (await getUser(loggedInUserToken))?.find((u)=>u.shop_no !==null);
          if(fetch_details.shop_access_token){
            if(fetch_details.shop_access_token === token){
              setCanBuy(false);
            }
          }
        }catch(e){
          console.log(e);
        }
      }
    }
    validUser();
  }, [loggedInUserToken])

  const activeData = filteredData.length > 0 ? filteredData : data;

  // Fetch data from the API once when the component mounts
  // const fetchData = async () => {
  //   const url = 'https://api.sheetbest.com/sheets/08a3278a-afb2-4e23-83c5-dd243688c14d'; // Your Sheet.best URL
  //   try {
  //     const response = await axios.get(url);
  //     setData(response.data); // Set the data to state
  //   } catch (err) {
  //     console.error('Error fetching data:', err);
  //   }
  // };

  // Group products by their variant_group
  const groupedProducts = data.reduce((acc, product) => {
    const { variant_group } = product;
    if (!acc[variant_group]) acc[variant_group] = [];
    acc[variant_group].push(product);
    return acc;
  }, {});

  // Identify the variation fields dynamically based on variation values
  const getVariationFields = (product) => {
    const variationFields = {};
    const variations = {};

    // Loop through all products in the same variant_group
    groupedProducts[product.variant_group].forEach((otherProduct) => {
      ["variation_1", "variation_2", "variation_3", "variation_4"].forEach(
        (key) => {
          if (otherProduct[key]) {
            variations[key] = variations[key] || new Set();
            variations[key].add(otherProduct[key]);
          }
        }
      );
    });

    // Add variation field to the list if there are multiple distinct values
    Object.entries(variations).forEach(([key, values]) => {
      if (values.size > 1) {
        variationFields[key] = Array.from(values); // Convert Set to an array for further usage
      }
    });

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
    // Check if the product is already in selectedProducts
    const existingProduct = selectedProducts.find(p => p.product_no === row.product_no);

   const selectedRow = existingProduct?.selectedVariant
  ? row // already has selectedVariant, use as-is
  : {
      ...row,
      selectedVariant: row?.matched_item_id || null
    };


    //  const selectedRow = existingProduct?.selectedVariant
    //   ? row // already has selectedVariant, use as-is
    //   : { ...row, selectedVariant: row.item_ids ? (row?.item_ids)?.find((ids)=>ids?.match(row.iku_id?.[0])?.input) : null}; // add selectedVariant if missing


    dispatch(addProduct(selectedRow));
    console.log(selectedRow);
  } else {
    dispatch(removeProduct(row.product_no));
  }
};

console.log('----------', selectedProducts);


  const isSelected = (id) =>
    selectedProducts.some((product) => product.product_no === id);

  const handleClick = (e, product_id, item_id) => {
    console.log(item_id);
    
    if(item_id){
      navigate(`../shop/${token}/products/${product_id}/${encodeURIComponent(item_id)}`);
    }else{
      navigate(`../shop/${token}/products/${product_id}`);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      activeData.forEach((row) => {
        if (!isSelected(row.product_no)) {
          dispatch(addProduct(row));
        }
      });
      setSelectAll(true);
    } else {
      activeData.forEach((row) => {
        if (isSelected(row.product_no)) {
          dispatch(removeProduct(row.product_no));
        }
      });
      setSelectAll(false);
    }
  };

  useEffect(() => {
    setFilteredData(rows); // Update filtered data when rows change
  }, [rows]);

  // useEffect(() => {
  //   fetchData();
  // }, []); // Fetch data only once when the component mounts

  useEffect(() => {
    setSelectAll(selectedProducts.length === activeData.length);
  }, [selectedProducts, activeData.length]);

  // Derived paginated data
  const paginatedData = React.useMemo(
    () => activeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [activeData, page, rowsPerPage]
  );

  // Render table cell content
  const renderTableCellContent = (column, row) => {
    console.log(row, selectedProducts);
    
    if (column.id === "sample") {
      const selectedProduct = selectedProducts.find(p => p.product_no === row.product_no);
      return (
        <Box
          component="img"
          src={convertDriveLink(row.product_images[0])}
          alt="product_image"
          className="product_image"
          onClick={(e) => handleClick(e, row.product_id, selectedProduct?.selectedVariant ? selectedProduct?.selectedVariant : row?.matched_item_id)}
        />
      );
    }

    const primaryText =
      column.id === "variations"
        ? row.variant_group
        : column.id === "product"
        ? row.product_name
        : column.id === "price"
  ? (() => {
      const selectedProduct = selectedProducts.find(p => p.product_no === row.product_no);
      const priceToShow = selectedProduct ? selectedProduct.matched_price ? selectedProduct.matched_price : selectedProduct?.selling_price ? selectedProduct?.selling_price : selectedProduct?.product_selling_price : row?.matched_price ? row?.matched_price : row.selling_price ? row.selling_price : row.product_selling_price;
      return `₹ ${priceToShow} ${row.unit !== null ? row.unit : ''}`;
    })():"";
        
    const secondaryText =
      column.id === "variations"
        ? (() => {
      const selectedProduct = selectedProducts.find(p => p.product_no === row.product_no);
      const variationToShow = selectedProduct?.selectedVariant ? ((selectedProduct.selectedVariant)?.split('_')?.at(-3))?.replace(/-/g, ' ') : row.variation_1;
      return variationToShow;
    })()
        : column.id === "product"
        ? row.brand
        : "";

    return (
      <>
        <Box
          component="img"
          src={tbody_vector}
          className="vector"
          alt="vector"
        />
        <Typography className="text_1">{primaryText}</Typography>
        <Typography className="text_2">{secondaryText}</Typography>
      </>
    );
  };

  const handleBuyClick = async (loggedInUserToken) => {
    if(loggedInUserToken){
      try{
        const users= (await getUser(loggedInUserToken));
        const matchedUser = users.find(user => ['member', 'shop', 'merchant'].includes(user.user_type));
        console.log(matchedUser);
        

        if(matchedUser){
          navigate(`../shop/${token}/cart`);
        }else{
          navigate(`../login`);
        }
      }catch(e){
        console.log(e);
      }
    }
  }

  // Render variations for the given product
  const renderVariations = (row) => {
    const variationFields = getVariationFields(row);

    return Object.entries(variationFields)
      .map(([key, values]) => `${values.join(", ")}`)
      .join("; ");
  };

  return (
    <Box className="products_table_wrapper">
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
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
                    indeterminate={
                      selectedProducts.length > 0 &&
                      selectedProducts.length < activeData.length
                    }
                    checked={selectAll}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <Box
                      component="img"
                      src={thead_vector}
                      className="vector"
                      alt="vector"
                    />
                    <Typography className="text_1">{column.label_1}</Typography>
                    <Typography className="text_2">{column.label_2}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => {
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
                        <TableCell key={column.id}>
                          {renderTableCellContent(column, row)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1}>
                    <Typography className="text">
                      No Products Available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="board_pins">
          <Box className="circle"></Box>
          <Box className="circle"></Box>
        </Box>
      </Paper>
      <Box className="pagination">
        {page !== 0 && <Button2
          text="Prev"
          optionalcName={page === 0 ? "disabled_button" : ""}
          onClick={handlePrevPage}
        />}
        {!(page >= totalPages - 1) && <Button2
          text="Next"
          optionalcName={page >= totalPages - 1 ? "disabled_button" : ""}
          onClick={handleNextPage}
          disabled={page >= totalPages - 1}
        />}
        {canBuy && <Button2
          text="Buy"
          optionalcName={selectedProducts.length <= 0 ? "disabled_button" : ""}
          // redirectTo={`../shop/${token}/cart`}
          onClick={()=>handleBuyClick(loggedInUserToken)}
        />}
      </Box>
    </Box>
  );
}
