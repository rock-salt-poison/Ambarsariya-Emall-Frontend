import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import createCustomTheme from "../../styles/CustomSelectDropdownTheme";
import FitbitIcon from "@mui/icons-material/Fitbit";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import html2pdf from "html2pdf.js";
import { get_invoiceOrder } from "../../API/fetchExpressAPI";

function InvoicePopup({ open, onClose, serviceType, invoiceNo }) {
  const [audio] = useState(new Audio(hornSound));
  const themeProps = {
    popoverBackgroundColor: "#f8e3cc",
    scrollbarThumb: "var(--invoice-dark)",
    dialogBackdropColor: "var(--brown-4)",
  };
  const theme = createCustomTheme(themeProps);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({});
  const invoiceRef = useRef();
  console.log(invoiceNo);

  const handleDownloadPDF = () => {
    const invoiceContent = invoiceRef.current;
    if (!invoiceContent) return;

    const opt = {
      margin: [0, 0, 0, 0],
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // Clone the invoice node and inline the CSS
    const clone = invoiceContent.cloneNode(true);
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=PT+Serif&display=swap');

    * {
      font-family: 'PT Serif', serif !important;
    }

    body {
      font-family: "PT Serif", serif;
    }


    .page-break {
  page-break-after: always;
}

    /* Paste your CSS styles here */
    

    .content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      padding: 30px;
      box-sizing: border-box;
    }

    .content-body {
      flex: 1;
      overflow-y: visible;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 20px;
    }

    .text {
      font-size: 15px;
      color: #000;
      text-align: center;
      line-height: 17px;
    }

    .header {
      background-color: #F8F4EC;
      padding-bottom: 20px;
    }

    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px solid #706556;
    }

    .heading {
      padding: 15px;
      background: #F8F4EC;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }

    .header .col-3 {
      width: 30%;
      padding: 20px;
      border-right: 1px solid #706556;
      display: flex;
      flex-direction: column;
      justify-content: center;
      place-items: center;
      gap: 5px;
    }

    .logo {
      width: 60px !important;
      height: auto !important;
      fill: #706556;
    }

    .shop_name {
      font-size: 22px;
      font-weight: 500;
      text-align: center;
      text-transform: capitalize;
    }

    .header .col-7 {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 20px;
    }


    .title_container {
      border-top: 1px solid #706556;
      display: flex;
      flex-direction: column;
      flex:1;
      align-self:stretch;
      justify-content: center;
    }

    .title {
      font-size: 70px;
      text-align: center;
    }

    .shop_info {
      display: flex;
      justify-content: center;
      border: 1px solid #706556;
    }

    .shop_info .col {
      padding: 10px 15px;
      border-right: 1px solid #706556;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .shop_info .col:last-child {
      border-right: none;
    }

    .details{
      display: flex;
      flex-direction : column;
      justify-content : flex-start;
    }

    .details .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border: 1px solid #706556;
    }

    .details .row:not(:first-child) {
      border-top: none;
    }

    .bgColor {
      background: #F8F4EC;
    }

    .right {
      text-align: right;
    }

    table{
      margin-top: 30px;
    }

    table svg{
                  width: 16px;
                  height: auto;
                  vertical-align: top;
                }

    .details table tr td,
    .details table tr th {
      border-right: 1px solid #706556;
      border-bottom: 1px solid #706556;
    }

    .details table tr td:last-child,
    .details table tr th:last-child {
      border-right: none;
    }

    .details table tr:last-child td {
      border-bottom: none;
    }

    .border-bottom {
      border-bottom: 1px solid #706556;
    }

    .border-right {
      border-right: 1px solid #706556;
    }

    .border-top {
      border-top: 1px solid #706556;
    }

    .border-top-none {
      border-top: 0px;
    }

    .bold {
      font-weight: 600;
      white-space:nowrap;
    }

    .body{
      padding: 15px;
      display: flex;
      flex-direction : column;
      justify-content : flex-start;
      gap: 15px;
    }

    .body .col-group {
      display: flex;
      flex-direction : row;
      justify-content : flex-start;
      gap: 10px;
    }

    .col-7{
      width: 70%;
      flex: 1;
    }

    .col-7 .text{
      text-align: right;
    }


    .col-2 {
      width: 20%;
    }

    .col-2 .col-group {
      align-self: flex-start;
    }

    .col-2 .text {
      text-align: left;
      font-size: 16px;
      line-height: 18px;
    }

    .col-3 {
      width: 30%;
    }

    .col-3  .col-group {
        align-self: flex-start;
    }  
    .col-3 .col-group .text {
      text-align: left;
    }

    .col-3 .col-group .vertical {
      flex-direction: column;
    }

    button{
      display: none;
    }
                

    /* Add more styling as needed */
  `;
    clone.prepend(styleTag);

    html2pdf().set(opt).from(clone).save();
  };

  const fetchInvoiceDetails = async (invoice_no) => {
    if (invoice_no) {
      try {
        setLoading(true);
        const resp = await get_invoiceOrder(invoice_no);
        if (resp?.valid) {
          console.log(resp?.data?.[0]);
          setInvoice(resp?.data?.[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (invoiceNo) {
      fetchInvoiceDetails(invoiceNo);
    }
  }, [invoiceNo]);


  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={onClose}
        className="invoice-popup-dialog-paper"
        maxWidth="sm"
        fullScreen={fullScreen}
        fullWidth
      >
        {loading && (
          <Box className="loading">
            <CircularProgress />
          </Box>
        )}
        <DialogContent className="invoiceDialogContent">
          <Box className="content" ref={invoiceRef}>
            <Box className="content-body">
              <Box className="header">
                <Box className="row">
                  <Box className="col-3">
                    <FitbitIcon className="logo" />
                    <Typography variant="h3" className="shop_name">
                      {invoice?.shop_name}
                    </Typography>
                    <Typography className="text small">
                      Domain : {invoice?.domain_name}
                    </Typography>
                    <Typography className="text small">
                      Sector : {invoice?.sector_name}
                    </Typography>
                  </Box>
                  <Box className="col-7">
                    <Box className="title_container">
                      <Typography variant="h2" className="title">
                        Invoice
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="shop_info">
                <Box className="col">
                  <Typography className="text">
                    {invoice?.shop_address}
                  </Typography>
                </Box>

                <Box className="col">
                  <Typography className="text">
                    {invoice?.shop_email}
                  </Typography>
                </Box>

                <Box className="col">
                  <Typography className="text">
                    {invoice?.shop_contact?.[0]}
                  </Typography>
                </Box>
              </Box>

              <Box className="details">
                <Box className="row">
                  <Box className="col-7 border-right">
                    <Box className="heading border-bottom">
                      <Typography className="text">Billed From:</Typography>
                    </Box>
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Seller's Name:
                        </Typography>
                        <Typography
                          className="text"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {invoice?.seller_name}
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">Email ID:</Typography>
                        <Typography className="text">
                          {invoice?.shop_email}
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">Address:</Typography>
                        <Typography className="text">
                          {invoice?.shop_address}
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Phone No.:
                        </Typography>
                        <Typography className="text">
                          {invoice?.shop_contact
                            ?.filter((contact) => contact != null)
                            ?.join(", ")}
                        </Typography>
                      </Box>

                      {invoice?.seller_pan && (
                        <Box className="col-group">
                          <Typography className="text bold">PAN ID:</Typography>
                          <Typography className="text">
                            {invoice?.seller_pan || "-"}
                          </Typography>
                        </Box>
                      )}

                      {invoice?.seller_gst && (
                        <Box className="col-group">
                          <Typography className="text bold">
                            GST No.:
                          </Typography>
                          <Typography className="text">
                            {invoice?.seller_gst || "-"}
                          </Typography>
                        </Box>
                      )}

                      {invoice?.seller_msme && (
                        <Box className="col-group">
                          <Typography className="text bold">
                            MSME No.:
                          </Typography>
                          <Typography className="text">
                            {invoice?.seller_msme || "-"}
                          </Typography>
                        </Box>
                      )}

                      {invoice?.seller_cin && (
                        <Box className="col-group">
                          <Typography className="text bold">
                            CIN No.:
                          </Typography>
                          <Typography className="text">
                            {invoice?.seller_cin || "-"}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box className="col-3">
                    <Box className="heading border-bottom">
                      <Typography className="text">Invoice No.:</Typography>
                    </Box>

                    <Box className="body border-bottom">
                      <Box className="col-group">
                        <Typography className="text">
                          {invoice?.invoice_no}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="heading border-bottom">
                      <Typography className="text">Invoice Date:</Typography>
                    </Box>

                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text">
                          {invoice?.created_at?.split("T")?.[0]}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="details">
                <Box className="row">
                  <Box className="col-7 border-right">
                    <Box className="heading border-bottom">
                      <Typography className="text">Billed To:</Typography>
                    </Box>
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Buyer's Name:
                        </Typography>
                        <Typography
                          className="text"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {invoice?.buyer_name}
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Email ID:{" "}
                        </Typography>
                        <Typography className="text">
                          {invoice?.buyer_name}
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">Address: </Typography>
                        <Typography className="text">
                          {invoice?.buyer_address}
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Phone No.:
                        </Typography>
                        <Typography className="text">
                          {invoice?.buyer_contact_no}
                        </Typography>
                      </Box>

                      {invoice?.buyer_pan && (
                        <Box className="col-group">
                          <Typography className="text bold">PAN ID:</Typography>
                          <Typography className="text">
                            {invoice?.buyer_pan || "-"}
                          </Typography>
                        </Box>
                      )}

                      {invoice?.buyer_gst && (
                        <Box className="col-group">
                          <Typography className="text bold">
                            GST No.:
                          </Typography>
                          <Typography className="text">
                            {invoice?.buyer_gst || "-"}
                          </Typography>
                        </Box>
                      )}

                      {invoice?.buyer_msme && (
                        <Box className="col-group">
                          <Typography className="text bold">
                            MSME No.:
                          </Typography>
                          <Typography className="text">
                            {invoice?.buyer_msme || "-"}
                          </Typography>
                        </Box>
                      )}

                      {invoice?.buyer_cin && (
                        <Box className="col-group">
                          <Typography className="text bold">
                            CIN No.:
                          </Typography>
                          <Typography className="text">
                            {invoice?.buyer_cin || "-"}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box className="col-3">
                    <Box className="heading border-bottom">
                      <Typography className="text">Invoice No.:</Typography>
                    </Box>

                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text">
                          {invoice?.invoice_no}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className="row">
                  <Box className="col-7 border-right">
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Purchase Order No.:
                        </Typography>
                        <Typography className="text">
                          {invoice?.po_no}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="col-3">
                    <Box className="body">
                      <Box className="col-group vertical">
                        <Typography className="text">Date/Time :</Typography>
                        <Typography className="text">
                          {invoice?.po_created_at?.split("T")?.[0]}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className="row">
                  <Box className="col-7 border-right">
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Sale Order No.:
                        </Typography>
                        <Typography className="text">
                          {invoice?.so_no}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="col-3">
                    <Box className="body">
                      <Box className="col-group vertical">
                        <Typography className="text">Date/Time :</Typography>
                        <Typography className="text">
                          {invoice?.so_created_at?.split("T")?.[0]}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="details">
                <Box className="row">
                  <Table>
                    <TableHead>
                      <TableRow className="bgColor">
                        <TableCell className="text">
                          Product Name / Category / Brand / Variation
                        </TableCell>
                        <TableCell className="text">Unit price</TableCell>
                        <TableCell className="text">Quantity</TableCell>
                        <TableCell className="text">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoice?.products?.map((product, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="text">
                              {product?.product_name
                                ?.split(" - ")?.[0]
                                ?.replace(/-/g, " ")}
                              /{product?.category_name}/{product?.brand}/
                              {product?.variation}
                            </TableCell>
                            <TableCell className="text">
                              {product?.unit_price}/-
                            </TableCell>
                            <TableCell className="text">
                              {product?.quantity}
                            </TableCell>
                            <TableCell className="text">
                              <CurrencyRupeeIcon />{" "}
                              {product?.unit_price * product?.quantity}/-
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="bgColor">
                        <TableCell colSpan={3} className="text right">
                          Subtotal
                        </TableCell>
                        <TableCell className="text">
                          <CurrencyRupeeIcon /> {invoice?.subtotal}
                        </TableCell>
                      </TableRow>

                      {invoice?.tax_applied &&
                        <TableRow className="bgColor">
                          <TableCell colSpan={3} className="text right">
                            Tax Rate (%)
                          </TableCell>
                          <TableCell className="text">
                            18% = <CurrencyRupeeIcon /> {invoice?.tax_applied || '-'}
                          </TableCell>
                        </TableRow>
                      }

                      {invoice?.discount_applied && <TableRow className="bgColor">
                        <TableCell colSpan={3} className="text right">
                          Discount Coupon Applied
                        </TableCell>
                        <TableCell className="text">
                          {invoice?.discount_applied?.conditions?.[1]?.value}% = -<CurrencyRupeeIcon /> {invoice?.discount_amount}
                        </TableCell>
                      </TableRow>}

                      {invoice?.discount_amount > 0 && <TableRow className="bgColor">
                        <TableCell colSpan={3} className="text right">
                          Coupon Charges
                        </TableCell>
                        <TableCell className="text">30</TableCell>
                      </TableRow>}

                      <TableRow className="bgColor">
                        <TableCell colSpan={3} className="text right">
                          Total
                        </TableCell>
                        <TableCell className="text">
                          <Typography className="text">
                            <CurrencyRupeeIcon /> {
  invoice?.discount_amount
    ? (parseFloat(invoice?.subtotal || 0) - parseFloat(invoice?.discount_amount || 0) + 30).toFixed(2)
    : parseFloat(invoice?.subtotal || 0).toFixed(2)
}

                          </Typography>
                        </TableCell>
                      </TableRow>

                      {serviceType === "Hold" && (
                        <TableRow className="bgColor">
                          <TableCell colSpan={3} className="text right">
                            Paid Amount
                          </TableCell>
                          <TableCell className="text">
                            <CurrencyRupeeIcon /> 1000
                          </TableCell>
                        </TableRow>
                      )}

                      {serviceType === "Hold" && (
                        <TableRow className="bgColor">
                          <TableCell colSpan={3} className="text right">
                            Balance Amount
                          </TableCell>
                          <TableCell className="text">
                            <CurrencyRupeeIcon /> 4036.5
                          </TableCell>
                        </TableRow>
                      )}

                      <TableRow className="bgColor">
                        <TableCell colSpan={2}>
                          <Box className="col-group vertical">
                            <Typography className="text">Co-Helper</Typography>
                            <Typography className="text">N.A</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box className="col-group vertical">
                            <Typography className="text">
                              Credit Balance
                            </Typography>
                            <Typography className="text">N.A</Typography>
                          </Box>
                        </TableCell>
                        {/* <TableCell>
                          <Box className="col-group vertical">
                          <Typography className="text">
                          Home Delivery Charges
                          </Typography>
                          <Typography className="text">N.A</Typography>
                          </Box>
                          </TableCell> */}
                        <TableCell>
                          <Box className="col-group vertical">
                            <Typography className="text">
                              Subscription Type
                            </Typography>
                            <Typography className="text">N.A</Typography>
                          </Box>
                        </TableCell>{" "}
                      </TableRow>

                      <TableRow className="bgColor">
                        <TableCell className="text">CGST : 0%</TableCell>

                        <TableCell className="text">Cost : -</TableCell>

                        <TableCell className="text">SGST : 0%</TableCell>

                        <TableCell className="text">Cost : -</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>
              <Box className="page-break"></Box>

              <Box className="details">
                <Box className="row">
                  <Box className="col-2 heading border-right">
                    <Box className="col-group">
                      <Typography className="text">
                        Payment Information for Buyer:
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="col-7">
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Payment Due Date:
                        </Typography>
                        <Typography className="text">29 May 2025</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Credit Balance:
                        </Typography>
                        <Typography className="text">200</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Subscription type:
                        </Typography>
                        <Typography className="text">-</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">MoU:</Typography>
                        <Typography className="text">
                          Expiry Date: 21 Dec 2025
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Seller's Bank Name:
                        </Typography>
                        <Typography className="text">
                          Whelton Financial Services
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Account Name:
                        </Typography>
                        <Typography className="text">
                          Lairssa Charter
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Account No.:
                        </Typography>
                        <Typography className="text">9876587987</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">UPI:</Typography>
                        <Typography className="text">
                          8928282992@payts
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="details">
                <Box className="row">
                  <Box className="col-2 heading border-right">
                    <Box className="col-group">
                      <Typography className="text">
                        Payment Information for Seller:
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="col-7">
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Payment Date/Time:
                        </Typography>
                        <Typography className="text">29 May 2025</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Reference No.:
                        </Typography>
                        <Typography className="text">
                          1-2024/10/5uj74
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Payment Type:
                        </Typography>
                        <Typography className="text">UPI Transfer</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">PoS:</Typography>
                        <Typography className="text">QR Code</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Buyer's Bank Name:
                        </Typography>
                        <Typography className="text">
                          Whelton Financial Services
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Account Name:
                        </Typography>
                        <Typography className="text">
                          Lairssa Charter
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Account No.:
                        </Typography>
                        <Typography className="text">9876587987</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">UPI:</Typography>
                        <Typography className="text">
                          8928282992@payts
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={handleDownloadPDF}
              >
                Download Invoice as PDF
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default InvoicePopup;
