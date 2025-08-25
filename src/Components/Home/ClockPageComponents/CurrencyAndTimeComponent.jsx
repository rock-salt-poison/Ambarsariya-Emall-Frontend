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

 // 1️⃣ Fetch initial times with staggered requests to avoid 429
useEffect(() => {
  if (!data || data.length === 0) return;

  setLoading(true);

  data.forEach((item, index) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://api.timezonedb.com/v2.1/get-time-zone`,
          {
            params: {
              key: timezone_db_api_key,
              format: "json",
              by: "zone",
              zone: item.capital_timezone,
            },
          }
        );

        const { gmtOffset, formatted } = response.data;

        setTimeInfo((prev) => ({
          ...prev,
          [item.country_capital]: {
            offset: gmtOffset,
            time: new Date(formatted),
          },
        }));
      } catch (err) {
        // console.error(`Error fetching time for ${item.country_capital}:`, err);
      }
    }, index * 3000); // 3s gap between requests
  });

  // Only stop loading after all timeouts finish
  setTimeout(() => setLoading(false), data.length * 3000);
}, [data]);

// 2️⃣ Local clock updater (tick every second)
useEffect(() => {
  const interval = setInterval(() => {
    setTimeInfo((prev) => {
      const updated = {};
      for (const capital in prev) {
        updated[capital] = {
          ...prev[capital],
          time: prev[capital]?.time
            ? new Date(prev[capital].time.getTime() + 1000)
            : null,
        };
      }
      return updated;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []); // run once, don’t depend on timeInfo

// 3️⃣ Retry fetching missing countries only ONCE after initial fetch
useEffect(() => {
  if (!data || data.length === 0) return;

  const retryMissing = () => {
    const missing = data.filter(
      (item) => !timeInfo[item.country_capital]?.time
    );
    missing.forEach((item, index) => {
      setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://api.timezonedb.com/v2.1/get-time-zone`,
            {
              params: {
                key: timezone_db_api_key,
                format: "json",
                by: "zone",
                zone: item.capital_timezone,
              },
            }
          );

          const { gmtOffset, formatted } = response.data;

          setTimeInfo((prev) => ({
            ...prev,
            [item.country_capital]: {
              offset: gmtOffset,
              time: new Date(formatted),
            },
          }));
        } catch (err) {
          // console.error(`Retry error for ${item.country_capital}:`, err);
        }
      }, index * 3000); // stagger retries
    });
  };

  // Run retry after a delay to ensure initial fetches finished
  const retryTimeout = setTimeout(retryMissing, data.length * 3500);

  return () => clearTimeout(retryTimeout);
}, [data]); // depends ONLY on `data`



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
