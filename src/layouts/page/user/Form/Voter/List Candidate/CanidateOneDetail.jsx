import {
  Dialog,
  DialogTitle,
  Slide,
  Box,
  DialogContent,
  Typography,
  Button,
  Stack,
  Container,
} from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "@emotion/styled";
import Favorite from "@mui/icons-material/Favorite";

// import Favorite from "@mui/icons-material/Favorite";
import Iconify from "assets/theme/components/icon/Iconify";
import QuestionPopUp from "components/Popup/create/QuestionPopUp";
import { useContext, useEffect } from "react";
import { Authen } from "context/authenToken/AuthenToken";
import { useState } from "react";
import { handleGetQuestByIdCampaign } from "context/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import { CustomizedToast } from "components/toast/ToastCustom";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { getDetailCanidate } from "context/redux/action/action";
import { getScorebyStage } from "context/redux/action/action";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

const getIcon = (name) => <Iconify icon={name} width={40} height={40} />;
function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}
const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 600,
  lineHeight: 1.5,
}));

export default function CandateOneDetail() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  const [open, setopen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [voted, setVoted] = useState(false);
  const url = window.location.href;
  // Cắt idCanidate từ URL
  const idStage = url.split("/candidate/")[1].split("/stage/")[0];
  // Cắt idStage từ URL
  const idCanidate = url.split("/stage/")[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDetailCanidate(idCanidate, idStage, token));
  }, [dispatch, idCanidate, idStage]);

  const detailCandate = useSelector((state) => {
    return state.candidateOne;
  });

  const hanldeGetQuestion = async (token) => {
    await dispatch(handleGetQuestByIdCampaign(detailCandate?.formId, token));
    setopen(true);
  };

  const goBack = () => {
    navigate(`/user/candidate/${idStage}`);
  };
  const handleVotingLike = async (token) => {
    const data = {
      userId: decoded.Username || decoded.userId,
      candidateId: idCanidate,
      stageId: idStage,
    };
    try {
      const req = await API("POST", URL_API + `/api/v1/votes/like`, data, token);
      if (req) {
        CustomizedToast({
          message: `${req.data.message}`,
          type: "SUCCESS",
        });
        await dispatch(getDetailCanidate(idCanidate, idStage, token));
      }
    } catch (error) {
      if (error.response.data.statusCode === 404) {
        CustomizedToast({
          message: `${error.response.data.message}`,
          type: "ERROR",
        });
      } else if (error.response.data.statusCode === 400) {
        CustomizedToast({
          message: `${error.response.data.message}`,
          type: "ERROR",
        });
      } else {
        CustomizedToast({
          message: "Có lỗi khi xác nhận tài khoản.Vui lòng đăng nhập lại",
          type: "ERROR",
        });
      }
    }
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Container variant="permanant" fullScreen>
        <IconButton onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          {detailCandate?.campaignId === "6097a517-11ad-4105-b26a-0e93bea2cb43" ? (
            <Typography
              fontSize={isMobile ? "30px" : "60px"}
              sx={{
                color: "white",
                fontFamily: "VLABRAHAMLINCOLN",
                textAlign: "start", // Đặt font chữ tùy chỉnh
              }}
            >
              Thông tin giảng viên
            </Typography>
          ) : (
            <Typography
              fontSize="60px"
              sx={{
                color: "white",
                fontFamily: "VLABRAHAMLINCOLN",
                textAlign: "start", // Đặt font chữ tùy chỉnh
              }}
            >
              Thông tin ứng viên
            </Typography>
          )}

          <Box
            display={matches ? "block" : "flex"}
            flexDirection={matches ? "column" : "row"}
            alignItems="center"
          >
            <Box sx={{ mr: isMobile ? -10 : 4 }}>
              <img
                src={
                  detailCandate.avatarUrl !== null && detailCandate.avatarUrl !== undefined
                    ? detailCandate.avatarUrl
                    : "https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/pg5l7ve7r98mlaffpkuu"
                }
                style={{
                  width: "80%",
                  background: "light_gray",
                  padding: "10px",
                }}
              />
            </Box>
            <Box sx={{}}>
              <Typography
                fontSize={isMobile ? "30px" : "70px"}
                sx={{
                  whiteSpace: "nowrap",
                  color: "white",
                  fontFamily: "VLABRAHAMLINCOLN",
                  textAlign: "start",
                  // Đặt font chữ tùy chỉnh
                }}
              >
                {detailCandate.fullName}
              </Typography>
              <Typography
                fontSize={isMobile ? "15px" : "30px"}
                fontWeight="bold"
                sx={{
                  color: "white",
                  fontFamily: "VLABRAHAMLINCOLN",
                  textAlign: "start", // Đặt font chữ tùy chỉnh
                }}
              >
                {detailCandate.groupName}
              </Typography>
              {detailCandate.description === "NULL" ? (
                <></>
              ) : (
                <Typography
                  variant="body2"
                  fontSize={isMobile ? "20px" : "30px"}
                  sx={{
                    color: "white",
                    fontFamily: "VLABRAHAMLINCOLN",
                    textAlign: "start", // Đặt font chữ tùy chỉnh
                  }}
                >
                  "{detailCandate.description}".
                </Typography>
              )}
              {detailCandate.formId ? (
                <Box
                  sx={{ mt: 4 }}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {
                    <IconButton
                      sx={{
                        color: "#FF4267",
                      }}
                    >
                      {getIcon("mdi:fire")}
                      {detailCandate.score}
                    </IconButton>
                  }
                  <ButtonLangding
                    nameButton="Bình chọn"
                    bgColor="#FFA500"
                    hovercolor="#F7941D"
                    onClick={() => {
                      hanldeGetQuestion(token);
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{ mt: 4 }}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {
                    <Typography level="body" sx={{ fontWeight: "md", color: "white" }}>
                      {
                        <IconButton disabled>
                          <Favorite sx={{ color: "#FF4267" }} /> {detailCandate.score}
                        </IconButton>
                      }
                    </Typography>
                  }
                  <IconButton
                    aria-label="Like minimal photography"
                    size="lg"
                    variant="solid"
                    color="danger"
                    onClick={() => {
                      handleVotingLike(token);
                      setVoted(true);
                    }}
                    sx={{
                      borderRadius: "50%",
                      backgroundColor: voted ? "#FFA500" : "#FF4267",
                      width: "2rem",
                      height: "2rem",
                    }}
                  >
                    <Favorite />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
