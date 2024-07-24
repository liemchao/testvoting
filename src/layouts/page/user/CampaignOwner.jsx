import { filter } from "lodash";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import React from "react";
import { styled } from "@mui/material/styles";
import { useState } from "react";
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import Page from "components/Layout/Page";
import { useContext } from "react";
import { Authen } from "../../../context/authenToken/AuthenToken";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAPIgetListCampaigns } from "../../../context/redux/action/action";
import NewPopUp from "components/Popup/NewPopUp";
import { useCallback } from "react";

export default function CampaignOwenrList() {
  const navigate = useNavigate();
  const handleinvite = () => {
    navigate("/user/joincampain");
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCC32"),
    backgroundColor: "#FFCC33",
    "&:hover": {
      backgroundColor: "#ffee32",
    },
    display: "center",
  }));

  const [OpenPopUp, SetOpenPopUp] = useState(false);

  const { token } = useContext(Authen);
  const dispatch = useDispatch();
  useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListCampaigns(token));
    };
    callAPI();
  }, [dispatch, token]);

  const campaigns = useSelector((state) => {
    return state.campaigns;
  });

  const handleClickOpen = useCallback(() => {
    SetOpenPopUp(true);
    console.log(OpenPopUp);
  }, []);

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            <ColorButton
              variant="contained"
              // component={RouterLink}
              // to="#"
              onClick={() => {
                handleClickOpen();
              }}
            >
              Thêm Chiến Dịch
            </ColorButton>
          </Typography>
        </Stack>
        <Box sx={{ display: "flex" }}>
          {campaigns.map((item) => {
            return (
              <Card sx={{ maxWidth: 345, paddingLeft: "1rem" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://media.istockphoto.com/id/165515133/vi/vec-to/voting-hands-and-ballot-box.jpg?s=1024x1024&w=is&k=20&c=VKlxd59_HCpxXXTHjcVsUK_IMEgw4D8yGtYkE5CIUgo="
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.userName}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Chia sẻ</Button>
                  <Button type="button" size="small" onClick={handleinvite}>
                    Chỉnh sửa
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Container>
      <NewPopUp OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} />
    </Page>
  );
}
