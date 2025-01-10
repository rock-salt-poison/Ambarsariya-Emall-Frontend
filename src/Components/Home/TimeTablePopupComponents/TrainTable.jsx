import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function TrainTable({ id, data }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (id === "Departure") {
      setStatus("Departed");
    } else if (id == "Arrival") {
      setStatus("Arrived");
    }
  }, []);

  return (
    <Table className="table">
      <TableHead className="thead">
        <TableRow className="theadRow">
          <TableCell className="th">From</TableCell>
          <TableCell className="th" align="center">
            To
          </TableCell>
          <TableCell className="th" align="center">
            Time
          </TableCell>
          <TableCell className="th" align="right">
            {status}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((row) => (
          <TableRow key={row.id} className="tableRow">
            <TableCell className="tableCell1">
              <Typography className="route">{row.travel_from}</Typography>
            </TableCell>
            <TableCell align="center" className="tableCell1">
              <Typography className="route">{row.travel_to}</Typography>
            </TableCell>
            <TableCell align="center" className="tableCell1">
              <Typography className="expectedTime">
                {id === "Arrival" ? row.arrival_time : row.departure_time}
              </Typography>
            </TableCell>
            <TableCell align="right" className="tableCell1">
              <Typography className="finalTime">
                {id === "Arrival" ? row.arrived_at : row.departed_at}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TrainTable;
