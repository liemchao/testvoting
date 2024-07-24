import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { Avatar, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Authen } from "context/authenToken/AuthenToken";
import { useDispatch, useSelector } from "react-redux";
import { callAPIgetListResult } from "context/redux/action/action";
import CardTop1 from "components/CardTop/CardTop1";
import CardTop2 from "components/CardTop/CardTop2";
import CardTop3 from "components/CardTop/CardTop3";
import MultipleInteractionCard1 from "components/Cards/cardtop";
import { CustomizedToast } from "components/toast/ToastCustom";

function Results() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState(""); // Define searchQuery state
  const { token } = useContext(Authen);
  const dispatch = useDispatch();
  const id = useParams();

  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListResult(id.id, token));
    };
    callAPI();
  }, [dispatch]);

  const results = useSelector((state) => {
    return state.results;
  });

  if (!results) {
    return null; // or handle the case when results is not available
  }

  const sortedData = results.sort((a, b) => b.score - a.score);

  const topData = sortedData.slice(0, 3);
  const remainingData = sortedData.slice(3);

  return (
    <>
      <Box textAlign="center">
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            fontSize: "50px",
            color: "#B83490",
            fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
          }}
        >
          Bảng xếp hạng top 10
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", ml: "1rem" }}>
        <Grid container spacing={3} mt={-1} bottom={2}>
          <Grid item xs={12} md={4} lg={4}>
            <CardTop1
              name={topData[0].fullName}
              image={topData[0]?.avatarUrl}
              score={topData[0].score}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <CardTop2
              name={topData[1].fullName}
              image={topData[1]?.avatarUrl}
              score={topData[1].score}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <CardTop3
              name={topData[2].fullName}
              image={topData[2]?.avatarUrl}
              score={topData[2].score}
            />
          </Grid>
          <Grid item xs={12}>
            <hr style={{ borderTop: "1px solid #ccc" }} />
          </Grid>
          {remainingData.map((person, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <MultipleInteractionCard1
                index={index + 4}
                name={person.fullName}
                image={person.avatarUrl}
                score={person.score}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Results;
