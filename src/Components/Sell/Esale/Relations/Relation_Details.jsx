import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  ThemeProvider,
  Typography,
} from "@mui/material";
import createCustomTheme from "../../../../styles/CustomSelectDropdownTheme";
import { delete_memberRelation, get_memberRelationDetail, get_memberRelations, getUser } from "../../../../API/fetchExpressAPI";
import CustomSnackbar from "../../../CustomSnackbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClearIcon } from "@mui/x-date-pickers";

function Relation_Details({ data, goBack }) {
  const themeProps = {
    popoverBackgroundColor: "#f8e3cc",
    scrollbarThumb: "var(--brown)",
  };

  const theme = createCustomTheme(themeProps);

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const token = useSelector((state) => state.auth.userAccessToken);
  const [relation, setRelation] = useState([]);

  const handleCardClick = async (relation) => {
    
  }

  const fetch_relationDetails = async (member_id, access_token) => {
    try{
      setLoading(true);
      const resp = await get_memberRelationDetail(member_id, access_token);
      console.log(resp);
      if(resp.valid){
        console.log(resp.data);
        setRelation(resp.data?.[0]);
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=> {
    if(data){
      fetch_relationDetails(data?.member_id, data?.access_token)
    }
  }, [data]);
console.log(data);

  

  return (
    <ThemeProvider theme={theme}>
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      {relation && (
        <Box className="cards_container">
          <Link
            key={relation.id}
            className="card"
            onClick={goBack}
          > 
            Go Back
          </Link>
          <Box className="col-auto">
            <Typography className="label">Relation</Typography>
            <Typography className="label">{relation.relation !== 'Others' ? relation.relation : relation.other_relation}</Typography>
          </Box>
          <Box className="col-auto">
            <Typography className="label">Name of the place</Typography>
            <Typography className="label">{relation.place_name}</Typography>
          </Box>
          <Box className="col-auto">
            <Typography className="label">Address</Typography>
            <Typography className="label">{relation.address}</Typography>
          </Box>
          <Box className="col-auto">
            <Typography className="label">Work years</Typography>
            <Typography className="label">{relation.work_yrs}</Typography>
          </Box>
          <Box className="col-auto">
            <Typography className="label">On going / left</Typography>
            <Typography className="label">{relation.ongoing_or_left}</Typography>
          </Box>
          <Box className="col-auto">
            <Typography className="label">People</Typography>
            <Typography className="label">{relation.people?.map((people)=> people.name)}</Typography>
          </Box>
          <Box className="col-auto">
            <Typography className="label">Name of group</Typography>
            <Typography className="label">{relation.name_group}</Typography>
          </Box>
          <Box className="col-auto">
            <Typography className="label">Mentor</Typography>
            <Typography className="label">{relation.mentor}</Typography>
          </Box>
          <Box className="col-auto">
            <Typography className="label">Member Phone no</Typography>
            <Typography className="label">{relation.member_phone_no}</Typography>
          </Box>
        </Box>
      ) }
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </ThemeProvider>
  );
}

export default Relation_Details;
