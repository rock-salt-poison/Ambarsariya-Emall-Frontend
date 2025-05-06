import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  ThemeProvider,
  Typography,
} from "@mui/material";
import createCustomTheme from "../../../../styles/CustomSelectDropdownTheme";
import { delete_memberRelation, get_memberRelations, getUser } from "../../../../API/fetchExpressAPI";
import CustomSnackbar from "../../../CustomSnackbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClearIcon } from "@mui/x-date-pickers";

function Relations_tab_content({ relation, onCardClick }) {
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
  const [relations, setRelations] = useState([]);
  const [user, setUser] = useState({});

  const fetchCurrentUserData = async (token) => {
    if (token) {
      try {
        setLoading(true);
        const resp = await getUser(token);
        if (resp?.[0].user_type === "member") {
          const userData = resp?.[0];
          setUser(userData);
          console.log(userData);

          const relationsResp = await get_memberRelations(
            userData?.member_id,
            userData?.user_id,
            relation
          );
          if (relationsResp?.valid) {
            console.log(relationsResp?.data);
            setRelations(relationsResp?.data);
          }
        }
      } catch (e) {
        console.error(e);
        setSnackbar({
          open: true,
          message: e.response.data.message,
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchCurrentUserData(token);
    }
  }, [token]);

  const handleCardClick = async (e, relation) => {
    e.preventDefault();
    if (onCardClick) {
      const selectedRelation = {
        member_id: relation?.member_id,
        access_token: relation?.access_token 
      }
      onCardClick(selectedRelation);
    }
  }

  const handleRemove = async (e, relation) => {
    if(relation){
      try{
        setLoading(true);
        const resp =  await delete_memberRelation(relation?.id, relation?.access_token);
        if(resp){
          console.log(resp);
          
          setSnackbar({
            open: true,
            message: resp.message,
            severity: "success",
          });

          setRelations((prevRelations) =>
            prevRelations.filter((r) => r.access_token !== relation.access_token)
          );
        }
      }catch(e){
        console.error(e);
        setSnackbar({
          open: true,
          message: e.response.data.error,
          severity: "error",
        });
      }finally{
        setLoading(false);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      {relations.length > 0 ? (
        <Box className="cards_container">
          {relations.map((relation) => {
            return (
                <Link
                  key={relation.id}
                  className="card"
                  onClick={(e) => handleCardClick(e, relation)}
                >
                  <Box className="col avatar">
                    <Avatar alt={relation?.people.map((people)=>people.name)?.join(', ')} src="/broken-image.jpg" />
                  </Box>
                  <Box className="col">
                    <Box className="header">
                      <Typography variant="h3">{relation?.people.map((people)=>people.name)?.join(', ')}</Typography>
                      {/* <Link onClick={(e) => handleRemove(e, msg.id)}> */}
                      <Link >
                        <ClearIcon onClick={(e)=>handleRemove(e, relation)}/>
                      </Link>
                    </Box>
                      <Typography className="message">Relation: {relation.relation !== 'Others' ? relation.relation : relation.other_relation}</Typography>
                  </Box>
                </Link>
            );
          })}
        </Box>
      ) : (
        <Box className="no-record">
          <Typography className="text1">No Relation found</Typography>
        </Box>
      )}
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </ThemeProvider>
  );
}

export default Relations_tab_content;
