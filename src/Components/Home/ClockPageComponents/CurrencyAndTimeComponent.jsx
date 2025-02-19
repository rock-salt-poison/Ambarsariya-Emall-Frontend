import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { fetchWeatherData } from "../../../API/weathermapapi";
import axios from "axios";

function CurrencyAndTimeComponent({ data, optionalCName }) {

  const [weatherInfo, setWeatherInfo] = useState({});
  const [timeInfo, setTimeInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const timezone_db_api_key = process.env.REACT_APP_TIMEZONEDB_API_KEY;


  /** Fetch Weather Data Separately */
  useEffect(() => {
    if (!data || data.length === 0) return;

    setLoading(true);
    const fetchWeather = async (item) => {
      try {
        const weather = await fetchWeatherData(item.country_capital);
        setWeatherInfo((prev) => ({
          ...prev,
          [item.country_capital]: weather?.temp ?? "N/A",
        }));
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    data.forEach((item) => fetchWeather(item));

    setLoading(false);
  }, [data]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    setLoading(true);
    let requests = [];

    const fetchTime = async (item, delay) => {
      await new Promise((resolve) => setTimeout(resolve, delay));

      try {
        const response = await axios.get(`https://api.timezonedb.com/v2.1/get-time-zone`, {
          params: { key: timezone_db_api_key, format: "json", by: "zone", zone: item.capital_timezone },
        });

        const { gmtOffset } = response.data; // Get UTC offset in seconds
        const currentUTC = response.data.formatted; // Adjust local time

        setTimeInfo((prev) => ({
          ...prev,
          [item.country_capital]: {
            offset: gmtOffset,
            time: new Date(currentUTC),
          },
        }));
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };

    data.forEach((item, index) => {
      requests.push(fetchTime(item, index * 3000));
    });

    Promise.all(requests).finally(() => setLoading(false));

  }, [data]);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInfo((prev) => {
        const updatedTime = {};
        Object.entries(prev).forEach(([capital, info]) => {
          if (info?.time) {
            updatedTime[capital] = {
              ...info,
              time: new Date(info.time.getTime() + 1000),
            };
          }
        });
        return updatedTime;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [timeInfo]);
 

  return (
    <Box className={`${optionalCName && optionalCName} currency-wrapper`}>
      {loading && <Box className="loading"><CircularProgress/></Box> }
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
            {data.map((item) => (
              <TableCell key={item.id} className="tableCell p-0">
                <Typography className="time">
                  {timeInfo[item.country_capital]?.time?.toLocaleTimeString() || "Loading..."}
                </Typography>
              </TableCell>
            ))}
          </TableRow>

          {/* Row 3: Temperature */}
          <TableRow>
            {data.map((item) => (
              <TableCell key={item.id} className="tableCell">
                <Typography className="price" sx={{ marginLeft: 1 }}>
                  {weatherInfo[item.country_capital]}°C
                </Typography>
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
