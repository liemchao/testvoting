import { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Container, Grid } from "@mui/material";
import CampaignStageList from "./CampaignStageList";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Authen } from "context/authenToken/AuthenToken";
import { getCampaignId } from "context/redux/action/action";
import moment from "moment";
import CommentSection from "layouts/page/comment";
//----------------------------------------------------------------

export default function CampaignStage() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  useEffect(() => {
    const callAPI = async () => {
      await dispatch(getCampaignId(id, token));
    };
    callAPI();
  }, [id, token]);

  const getcampaignById = useSelector((state) => {
    return state.getcampaignById;
  });

  return (
    <>
      <Card sx={{ maxheight: "100px", marginTop: "1rem" }}>
        <Grid container>
          <Grid item xs={10.8}>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                {getcampaignById.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {moment(getcampaignById.startTime).format("DD-MM-YYYY HH:mm:ss")} đến{" "}
                {moment(getcampaignById.endTime).format("DD-MM-YYYY HH:mm:ss")}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "-2%" }}>
        <CampaignStageList />
      </Box>
      {/* <CommentSection /> */}
    </>
  );
}
