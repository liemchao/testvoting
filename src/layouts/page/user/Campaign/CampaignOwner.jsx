import { Link as RouterLink, useLocation, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { styled } from "@mui/material/styles";
import { useState } from "react";
// material
import Tooltip from "@mui/joy/Tooltip";
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
  LinearProgress,
} from "@mui/material";
import Page from "components/Layout/Page";
import { useContext } from "react";
import { Authen } from "context/authenToken/AuthenToken";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "@mui/joy/ButtonGroup";
import { useCallback } from "react";
import { GetCampaignbyUserId } from "context/redux/action/action";
import jwt_decode from "jwt-decode";
import NewPopUp from "components/Popup/create/NewPopUp";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import UpdateCampaign from "components/Popup/updatePopup/UpdateCampaign";
import AlertDialog from "components/Popup/delete/Dialog";
import AddCandidate from "components/Popup/add/AddCandidate";
import { getCampaignID } from "context/redux/action/action";
import NewAccount from "components/Popup/create/NewAccount";
import IconButton from "@mui/joy/IconButton";
import ReviewsIcon from "@mui/icons-material/Reviews";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PolicyIcon from "@mui/icons-material/Policy";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PercentIcon from "@mui/icons-material/Percent";
import GroupsIcon from "@mui/icons-material/Groups";
import moment from "moment/moment";
import { GetCampaignById } from "context/redux/action/action";
import { AddGroup } from "components/Popup/create/AddGroup";
import Policy from "components/Popup/add/Policy";
import PolicyOwer from "components/Popup/add/PolicyOwer";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { AspectRatio } from "@mui/joy";
import StarsIcon from "@mui/icons-material/Stars";
import axios from "axios";
import { CustomizedToast } from "components/toast/ToastCustom";

export default function CampaignOwenrList() {
  const navigate = useNavigate();
  const ColorButton = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    backgroundColor: "#2BB557",
    "&:hover": {
      backgroundColor: "#ffee32",
    },
    display: "center",
  }));

  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [OpenDiaLog, SetOpenDialog] = useState(false);
  const [OpenUpdate, SetOpenUpdate] = useState(false);
  const [newCandidate, setNewCandidate] = useState(false);
  const [Isopen, setIsopen] = useState(false);
  const [OpenArlert, setOpenArlert] = useState(false);
  const [OpenArlert1, setOpenArlert1] = useState(false);
  const [newAccountCandidate, setAccountNewCandidate] = useState(false);
  const [id, setId] = useState();
  const { token } = useContext(Authen);
  const decode = jwt_decode(token);
  const [nameButton] = useState("Stage");

  const dispatch = useDispatch();

  useEffect(() => {
    const callAPI = async () => {
      await dispatch(GetCampaignbyUserId(decode.Username, token));
    };
    callAPI();
  }, [dispatch, token]);

  const campainOwner = useSelector((state) => {
    return state.campainOwner;
  });

  const handleCampaignStage = async (id, navigate, token) => {
    await dispatch(GetCampaignById(id, navigate, token));
  };

  const handleClickOpen = useCallback(() => {
    SetOpenPopUp(true);
  }, []);

  const handleClickOpenDialog = useCallback(
    (id) => {
      setId(id);
      SetOpenDialog(true);
    },
    [id]
  );
  const handleClickUpdate = useCallback(
    (id) => {
      setId(id);
      dispatch(getCampaignID(id, token));
      SetOpenUpdate(true);
    },
    [id]
  );

  const handleAddGroup = useCallback(
    (id) => {
      setId(id);
      setIsopen(true);
    },
    [id]
  );
  const handlePolicy = useCallback(() => {
    setOpenArlert(true);
  }, []);

  const handlePolicy1 = useCallback(
    (id) => {
      setId(id);
      setOpenArlert1(true);
    },
    [id]
  );

  const handleClickNewUser = useCallback((id) => {
    setId(id);
    navigate(`/user/createCandidate/${id}`);
  }, []);

  const handleUpdateProcess = useCallback(async (id) => {
    try {
      const response = await axios.put(
        `https://liemtroller-001-site1.jtempurl.com/api/v1/campaigns/update-process`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        CustomizedToast({
          message: `Cập nhật tiến trình thành công`,
          type: "SUCCESS",
        });
      }
      await dispatch(GetCampaignbyUserId(decode.Username, token));
    } catch (error) {
      CustomizedToast({
        message: `Cập nhật tiến trình  thất bại`,
        type: "ERROR",
      });
    }
  }, []);
  const handleUpdateRelust = useCallback(async (id) => {
    try {
      const response = await axios.put(
        `https://liemtroller-001-site1.jtempurl.com/api/v1/campaigns/publish-result/6097a517-11ad-4105-b26a-0e93bea2cb43`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        CustomizedToast({
          message: `Cập nhật công bố kết quả thành công`,
          type: "SUCCESS",
        });
      }
      await dispatch(GetCampaignbyUserId(decode.Username, token));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        CustomizedToast({
          message: `Unauthorized Access: Đăng nhập lại để tiếp tục`,
          type: "ERROR",
        });
      } else {
        CustomizedToast({
          message: `Cập nhật công bố kết quả thất bại`,
          type: "ERROR",
        });
      }
    }
  }, []);

  const handleRatio = useCallback(
    (id) => {
      setId(id);
      navigate(`/user/createPercent/${id}`);
    },
    [id]
  );

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5}>
          <Typography variant="h4" gutterBottom>
            <ButtonLangding
              nameButton="Thêm chiến dịch"
              bgColor="#FFA500"
              hovercolor="#F7941D"
              onClick={() => {
                handleClickOpen();
              }}
            />
          </Typography>
        </Stack>
        <Box>
          {campainOwner.map((item) => {
            return (
              <Card
                sx={{
                  display: "flex",
                  maxWidth: 1300,
                  maxHeight: 400,
                  paddingLeft: "1rem",
                  marginTop: "2%",
                }}
              >
                <AspectRatio
                  ratio="1"
                  maxHeight={180}
                  backgroundColor="transparent"
                  sx={{ minWidth: 182, flex: 1, borderRadius: "10px", marginTop: "2%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                    borderRadius={"50px"}
                  >
                    <img
                      src={item.imgUrl}
                      srcSet={item.imgUrl}
                      loading="lazy"
                      alt=""
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </AspectRatio>
                <CardContent
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: "25px",
                        color: "#B83490",
                        fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: "20px",
                        color: "#B83490",
                        fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      {moment(item.startTime).format("DD-MM-YYYY HH:mm:ss")} đến{" "}
                      {moment(item.endTime).format("DD-MM-YYYY HH:mm:ss")}
                    </Typography>

                    <Typography
                      variant="h7"
                      component="div"
                      fontWeight="bold"
                      sx={{
                        marginTop: "-0.2rem",
                        color:
                          item.process === "Chưa diễn ra"
                            ? "black"
                            : item.process === "Đang diễn ra"
                            ? "green"
                            : "green",
                      }}
                    >
                      {item.process}
                    </Typography>

                    <Typography variant="h8" color="text.secondary" fontWeight="bold">
                      Số ứng cử viên: {item.totalCandidate}
                    </Typography>
                  </div>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <ButtonGroup variant="soft" aria-label="tooltip button group">
                      {item.campaignId === "6097a517-11ad-4105-b26a-0e93bea2cb43" && (
                        <Tooltip title="Tham gia chiến dịch" variant="outlined">
                          <IconButton
                            sx={{
                              backgroundColor: "#D75BAF",
                              "&:hover": {
                                background: "linear-gradient(to right, #d44fac, #890761)",
                                color: "white",
                              },
                            }}
                            variant="solid"
                            onClick={() => {
                              navigate(`/user/candidate/6097a517-11ad-4105-b26a-0e93bea2cb43`);
                            }}
                          >
                            <LabelImportantIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Cập nhật tiến trình" variant="outlined">
                        <IconButton
                          sx={{
                            backgroundColor: "#D75BAF",
                            "&:hover": {
                              background: "linear-gradient(to right, #d44fac, #890761)",
                              color: "white",
                            },
                          }}
                          variant="solid"
                          onClick={() => {
                            handleUpdateProcess(item.campaignId);
                          }}
                        >
                          <AccessAlarmIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Công bố kết quả" variant="outlined">
                        <IconButton
                          sx={{
                            backgroundColor: "#D75BAF",
                            "&:hover": {
                              background: "linear-gradient(to right, #d44fac, #890761)",
                              color: "white",
                            },
                          }}
                          variant="solid"
                          onClick={() => {
                            handleUpdateRelust(item.campaignId);
                          }}
                        >
                          <StarsIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Thêm giai đoạn" variant="outlined">
                        <IconButton
                          sx={{
                            backgroundColor: "#D75BAF",
                            "&:hover": {
                              background: "linear-gradient(to right, #d44fac, #890761)",
                              color: "white",
                            },
                          }}
                          name="stagebutton"
                          variant="solid"
                          onClick={() => {
                            handleCampaignStage(item.campaignId, navigate);
                          }}
                        >
                          <SettingsIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Thêm nhóm" variant="outlined">
                        <IconButton
                          variant="solid"
                          sx={{
                            backgroundColor: "#D75BAF",
                            "&:hover": {
                              background: "linear-gradient(to right, #d44fac, #890761)",
                              color: "white",
                            },
                          }}
                          onClick={() => {
                            handleRatio(item.campaignId);
                          }}
                        >
                          <GroupsIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Thêm ứng cử viên" variant="outlined">
                        <IconButton
                          variant="solid"
                          sx={{
                            backgroundColor: "#D75BAF",
                            "&:hover": {
                              background: "linear-gradient(to right, #d44fac, #890761)",
                              color: "white",
                            },
                          }}
                          onClick={() => {
                            handleClickNewUser(item.campaignId);
                          }}
                        >
                          <PersonAddIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Kết quả chiến dịch" variant="outlined">
                        <IconButton
                          sx={{
                            backgroundColor: "#D75BAF",
                            "&:hover": {
                              background: "linear-gradient(to right, #d44fac, #890761)",
                              color: "white",
                            },
                          }}
                          variant="solid"
                          onClick={() => {
                            navigate(`/user/moderator-campaign/${item.campaignId}`);
                          }}
                        >
                          <ListAltIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xem đánh giá" variant="outlined">
                        <IconButton
                          sx={{
                            backgroundColor: "#D75BAF",
                            "&:hover": {
                              background: "linear-gradient(to right, #d44fac, #890761)",
                              color: "white",
                            },
                          }}
                          variant="solid"
                          onClick={() => {
                            navigate(`/user/feebackOwer/${item.campaignId}`);
                            // handleClickUpdate(item.campaignId);
                          }}
                        >
                          <ReviewsIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Chỉnh sửa chiến dịch" variant="outlined">
                        <IconButton
                          sx={{
                            backgroundColor: "#D75BAF",
                            "&:hover": {
                              background: "linear-gradient(to right, #d44fac, #890761)",
                              color: "white",
                            },
                          }}
                          variant="solid"
                          onClick={() => {
                            handleClickUpdate(item.campaignId);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa chiến dịch" variant="outlined">
                        <IconButton
                          sx={{
                            backgroundColor: "#D75BAF",
                            "&:hover": {
                              background: "linear-gradient(to right, #d44fac, #890761)",
                              color: "white",
                            },
                          }}
                          variant="solid"
                          onClick={() => {
                            handleClickOpenDialog(item.campaignId);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>
                  </CardActions>
                  {!item.isApprove ? (
                    <div>
                      <Typography variant="h8" color="text.secondary" fontWeight="bold">
                        Chiến dịch của bạn chưa kích hoạt !{" "}
                      </Typography>
                      <Typography
                        variant="h8"
                        color="text.secondary"
                        fontWeight="bold"
                        sx={{
                          color: "red", // Thay đổi màu thành "red" hoặc mã màu tùy chỉnh
                          cursor: "pointer", // Thêm hiệu ứng con trỏ khi di chuột vào
                          padding: "2px", // Thêm khoảng đệm để tăng độ rõ ràng
                        }}
                        onClick={() => {
                          handlePolicy1(item.campaignId);
                        }}
                      >
                        Nhấn vào đây để kích hoạt
                      </Typography>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
      <Policy OpenAlret={OpenArlert} SetOpenAlret={setOpenArlert} />
      <PolicyOwer OpenAlret={OpenArlert1} SetOpenAlret={setOpenArlert1} id={id} />
      <AddCandidate OpenPopUp={newCandidate} SetOpenPopUp={setNewCandidate} id={id} />
      <AddGroup OpenPopUp={Isopen} SetOpenPopUp={setIsopen} id={id} />
      <UpdateCampaign OpenEditCampaign={OpenUpdate} SetOpenEditCampaign={SetOpenUpdate} id={id} />
      <AlertDialog OpenDialog={OpenDiaLog} SetOpenDialog={SetOpenDialog} id={id} />
      <NewPopUp OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} />
      <NewAccount OpenPopUp={newAccountCandidate} SetOpenPopUp={setAccountNewCandidate} id={id} />
    </Page>
  );
}
