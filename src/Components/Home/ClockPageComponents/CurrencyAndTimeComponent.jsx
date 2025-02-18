import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { fetchWeatherData } from "../../../API/weathermapapi";

function CurrencyAndTimeComponent({ data, optionalCName }) {
  // State to store temperatures
  const [temperatures, setTemperatures] = useState({});

  // http://api.timezonedb.com/v2.1/get-time-zone?key=RCU9ASSFRVQU&format=json&by=zone&zone=Asia/Kolkata


  // Fetch weather data when component mounts or data changes
  useEffect(() => {
    const fetchData = async (city) => {
      try {
        const data = await fetchWeatherData(city);
        if (data) {
          setTemperatures((prev) => ({
            ...prev,
            [city]: data?.temp,
          }));
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    data?.forEach((item) => {
      fetchData(item.country_capital);
    });
  }, [data]);

  return (
    <Box className={`${optionalCName && optionalCName} currency-wrapper`}>
      <Table className="table">
        <TableBody>
          {/* Row 1: Flags */}
          <TableRow>
            {data?.map((item) => (
              <TableCell key={item.id} className="tableCell p-0">
                <Box
                  component="img"
                  src={`https://flagcdn.com/${item.country_code.toLowerCase()}.svg`}
                  className="flag"
                  alt={`${item.country_name} flag`}
                />
              </TableCell>
            ))}
          </TableRow>

          {/* Row 2: Capital Time */}
          <TableRow>
            {data?.map((item) => (
              <TableCell key={item.id} className="tableCell p-0">
                <Typography className="time">{item.capital_time}</Typography>
              </TableCell>
            ))}
          </TableRow>

          {/* Row 3: Temperature */}
          <TableRow>
            {data?.map((item) => (
              <TableCell key={item.id} className="tableCell">
                <Box className="temp">
                  <Typography className="price" sx={{ marginLeft: 1 }}>
                  {temperatures[item.country_capital] ? `${temperatures[item.country_capital]}°C` : "Loading..."}
                  </Typography>
                </Box>
              </TableCell>
            ))}
          </TableRow>

          {/* Row 4: Currency */}
          <TableRow>
            {data?.map((item) => (
              <TableCell key={item.id} className="tableCell p-0">
                <Box className="currencyTd">
                  <Typography
                    className="price"
                    sx={{ marginLeft: 1 }}
                    dangerouslySetInnerHTML={{
                      __html: `${item.currency_code || ""} ${item.currency || "0"}`,
                    }}
                  />
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

export default CurrencyAndTimeComponent;
