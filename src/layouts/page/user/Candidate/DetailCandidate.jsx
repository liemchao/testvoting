import {
  Dialog,
  DialogTitle,
  Slide,
  Box,
  DialogContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import IconButton from "@mui/joy/IconButton";

import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { Product, ProductImage } from "../../../page/Langding_Page/styles/product";
import Favorite from "@mui/icons-material/Favorite";

import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
// import Favorite from "@mui/icons-material/Favorite";
import Iconify from "assets/theme/components/icon/Iconify";
import QuestionPopUp from "components/Popup/create/QuestionPopUp";
import { useContext } from "react";
import { Authen } from "context/authenToken/AuthenToken";
import { useState } from "react";
import { handleGetQuestByIdCampaign } from "context/redux/action/action";
import { useDispatch } from "react-redux";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import { CustomizedToast } from "components/toast/ToastCustom";

const getIcon = (name) => <Iconify icon={name} width={40} height={40} />;
function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}
const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
}));

export default function CandateDetail(props) {
  const { OpenPopUp, SetOpenPopUp, name, image, idform, IdStage, idCandi, score, namegroup } =
    props;
  const { decode, token } = useContext(Authen);
  const [open, setopen] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [IdCanidate, setIdCanidate] = useState();
  const handleClose = () => {
    SetOpenPopUp(false);
  };
  const hanldeGetQuestion = async (token) => {
    await dispatch(handleGetQuestByIdCampaign(idform, token));
    setIdCanidate(idCandi);
    setopen(true);
  };

  const handleVotingLike = async (token) => {
    const data = {
      sendingTime: date,
      userId: decode.Username,
      candidateId: idCandi,
      stageId: IdStage,
    };
    try {
      const req = await API("POST", URL_API + `/api/v1/votes/like`, data, token);

      if (req.statusCode === 400) {
        CustomizedToast({
          message: "Bình chọn thất bại",
          type: "ERROR",
        });
      } else if (req.statusCode === 404) {
        CustomizedToast({
          message: "Bạn đã bình chọn này rồi.",
          type: "ERROR",
        });
      } else if (req.data.statusCode === 200) {
        CustomizedToast({
          message: "Bình chọn thành công",
          type: "SUCCESS",
        });
        await dispatch(getScorebyStage(id, decode.Username, token));
      }
    } catch (error) {
      if (error.response.data.message === "Bạn đã hết phiếu để bình chọn cho giai đoạn này rồi") {
        CustomizedToast({
          message: "Bạn đã hết phiếu",
          type: "ERROR",
        });
      } else if (error.response.data.statusCode === 404) {
        CustomizedToast({
          message: "Bạn đã hết phiếu",
          type: "ERROR",
        });
      } else if (error.response.data.statusCode === 500) {
        CustomizedToast({
          message: "Lỗi mạng",
          type: "ERROR",
        });
      } else if (
        error.response.data.message == "Bạn chưa chọn nhóm của mình khi tham gia chiến dịch này"
      ) {
        CustomizedToast({
          message: "Bạn chưa chọn nhóm",
          type: "ERROR",
        });
      }
    }
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Dialog
        TransitionComponent={SlideTransition}
        variant="permanant"
        open={OpenPopUp}
        onClose={handleClose}
        fullScreen
      >
        <DialogTitle
          sx={{
            background: "#F27323",
            color: "white",
          }}
        >
          <Box display="flex" alignItems="center" justifyContent={"space-between"}>
            Thông tin ứng cử viên
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <ProductDetailWrapper display={"flex"} flexDirection={matches ? "column" : "row"}>
            <Product sx={{ mr: 4 }}>
              <ProductImage
                src={
                  image !== null && image !== undefined
                    ? image
                    : "https://channel.mediacdn.vn/428462621602512896/2023/1/9/photo-1-16732522455271066822293.png"
                }
              />
            </Product>
            <ProductDetailInfoWrapper>
              <Typography variant="subtitle">Giảng viên FPT</Typography>
              <Typography sx={{ lineHeight: 2 }} variant="h4">
                {name}
              </Typography>
              <Typography fontStyle={"inherit"} variant="body">
                Chuyên ngành: {namegroup}
              </Typography>
              <Typography variant="body2">
                "Truyền thống người dẫn đầu trong các lĩnh vực trong yếu của kinh tế nước nhà.Là
                người tiên phong lèo lái những con người thành công trong xã hội."
              </Typography>
              {idform ? (
                <Box
                  sx={{ mt: 4 }}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {
                    <IconButton>
                      {getIcon("mdi:fire")}
                      {score}
                    </IconButton>
                  }
                  <ButtonCustomize
                    nameButton="Binh chọn"
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
                    <IconButton color="danger">
                      <Favorite />
                      {score}
                    </IconButton>
                  }
                  <IconButton
                    aria-label="Like minimal photography"
                    size="lg"
                    variant="solid"
                    color="danger"
                    onClick={() => {
                      handleVotingLike(token);
                    }}
                    sx={{
                      borderRadius: "50%",
                      backgroundColor: "#DFE0E3",
                      width: "2rem",
                      height: "2rem",
                    }}
                  >
                    <Favorite />
                  </IconButton>
                </Box>
              )}
            </ProductDetailInfoWrapper>
          </ProductDetailWrapper>
        </DialogContent>
      </Dialog>
     
    </>
  );
}
