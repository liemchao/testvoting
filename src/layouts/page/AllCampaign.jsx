import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Iconify from "assets/theme/components/icon/Iconify";
// material
import { Card, Stack, Button, Container, Typography, Box } from "@mui/material";
import Page from "components/Layout/Page";
import { useContext } from "react";
import { Authen } from "../../context/authenToken/AuthenToken";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAPIgetListCampaigns, handleGetCampaignById } from "../../context/redux/action/action";
import { useCallback } from "react";
import NewPopUp from "components/Popup/create/NewPopUp";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import UserCard from "components/Cards/cardCampaign";
import moment from "moment";
import QRPopUp from "components/Popup/create/QRPopUp";
import dayjs from "dayjs";

export default function AllCampaignList() {
  const param = useParams();
  const navigate = useNavigate();
  const [Link, setLink] = useState(window.location.href);
  const [open, setopen] = useState(false);
  const handleinvite = () => {
    navigate("/user/allcampaign");
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    backgroundColor: "#2BB557",
    "&:hover": {
      backgroundColor: "#71C043",
    },
    display: "center",
  }));

  const BootstrapButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    color: "black",
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });

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
  const handleGetQR = useCallback((id) => {
    setopen(true);
    setLink(window.location.href + "/" + id);
  }, []);

  const handleClickOpen = useCallback(() => {
    SetOpenPopUp(true);
  }, []);

  const handleCampaignStage = useCallback(
    (id, navigate) => {
      dispatch(handleGetCampaignById(id, navigate, token));
    },
    [dispatch]
  );

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={3}>
          <Typography variant="h4" gutterBottom>
            <ButtonCustomize
              nameButton="Thêm chiến dịch"
              bgColor="#FFA500"
              hovercolor="#F7941D"
              onClick={() => {
                handleClickOpen();
              }}
            />
          </Typography>
        </Stack>

        {campaigns.map((item) => {
          return (
            <Box sx={{ gap: 2 }}>
              <UserCard
                id={item.campaignId}
                title={item.title}
                totalCandidate={item.totalCandidate}
                process={item.process}
                creater={item.userId}
                url={item.imgUrl}
                dayEnd={dayjs(item.endTime).format("DD-MM-YYYY HH:mm:ss")}
                onClickShare={() => {
                  handleGetQR(item.campaignId);
                }}
                onClickJoin={() => {
                  handleCampaignStage(item.campaignId, navigate);
                }}
              />
            </Box>
          );
        })}
      </Container>
      <QRPopUp OpenPopUp={open} SetOpenPopUp={setopen} link={Link} />;
      <NewPopUp OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} />
    </Page>
  );
}
