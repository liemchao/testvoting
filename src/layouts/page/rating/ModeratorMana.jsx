import { Button } from "@mui/joy";
import { Box, Divider, Paper } from "@mui/material";
import TableFeedback from "components/table/TableFeedback";
import TablePeople from "components/table/TablePeople";
import TableStatistical from "components/table/TableStatistical";
import { CustomizedToast } from "components/toast/ToastCustom";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import { handleGetCandidateByIdCampaign } from "context/redux/action/action";
import { handleGetStage } from "context/redux/action/action";
import { getFeedBack } from "context/redux/action/action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { getCampaignID } from "context/redux/action/action";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import VoteofCandidate from "../admin/mangerCampain/detail/VoteofCandidate";
import Group from "../admin/mangerCampain/detail/Group";
import Results from "../admin/mangerCampain/detail/Results";
import { getFeedBackCampaign } from "context/redux/action/action";
import jwt_decode from "jwt-decode";
import { getScore } from "context/redux/action/action";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function ModerCampaignByID() {
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);

  const dispatch = useDispatch();
  const id = useParams();

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  ///================================

  useEffect(() => {
    dispatch(getFeedBackCampaign(id.id, token));
    dispatch(getScore(id.id, decode.Username, token));
    dispatch(handleGetStage(id.id, token));
    dispatch(getCampaignID(id.id, token));
  }, []);

  const feedback = useSelector((stage) => {
    return stage.feedbackcampaign;
  });

  const campaignById = useSelector((stage) => {
    return stage.campaignById;
  });

  const candidate = useSelector((stage) => {
    return stage.listscore;
  });
  const campaignStage = useSelector((state) => {
    return state.campaignStage;
  });

  const updateCampaigns = async () => {
    await API("PUT", URL_API + `/api/v1/campaigns/representative/${id.id}`, null, token)
      .then((res) => {
        CustomizedToast({
          message: "Đã chọn chiến dịch tiêu biểu thành công",
          type: "SUCCESS",
        });
      })
      .catch((err) => {
        CustomizedToast({
          message: `${err.response.data.message}`,
          type: "SUCCESS",
        });
      });
  };

  const handleScript = async () => {
    await API(
      "GET",
      URL_API + `/api/v1/scrip/campaign/${id.id}/stage/${campaignStage[0].stageId}`,
      null,
      token
    )
      .then((res) => {
        CustomizedToast({
          message: "chạy script thành công",
          type: "SUCCESS",
        });
      })
      .catch((err) => {
        CustomizedToast({
          message: `${err.response.data.message}`,
          type: "ERROR",
        });
      });
  };

  //================================
  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar sx={{ bgcolor: "#B83490" }} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {/* <Tab label="Thống kê" {...a11yProps(0)} /> */}
          <Tab color="#B83490" label="Thống kê số lượng phiếu bầu" {...a11yProps(0)} />
          <Tab color="#B83490" label="Theo nhóm bình chọn" {...a11yProps(1)} />
          <Tab color="#B83490" label="Theo nhóm ứng viên" {...a11yProps(2)} />
          <Tab
            disabled={campaignById.process === "Đã kết thúc" ? false : true}
            sx={{
              backgroundColor: campaignById.process === "Đã kết thúc" ? "#096BDE" : "gray",
              color: campaignById.process === "Đã kết thúc" ? "white" : "white",
            }}
            label="Top"
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box sx={{ mt: 4 }}>
            <Box sx={{ marginTop: 4 }}>
              <div style={{ display: "flex" }}>
                <Box sx={{ padding: 4 }}>
                  <TableFeedback feedback={feedback} />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ padding: 4 }}>
                  <TablePeople people={candidate} />
                </Box>
              </div>
              <Divider />
              <Box sx={{ padding: 4 }}>
                <TableStatistical id={id.id} />
              </Box>
            </Box>
          </Box>
        </TabPanel>
        {/* <TabPanel value={value} index={1} dir={theme.direction}>
          <Thongke />
        </TabPanel> */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Group />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <VoteofCandidate />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Results />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
