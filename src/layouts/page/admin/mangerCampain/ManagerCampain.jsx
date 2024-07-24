import { Box, Grid, Pagination, Paper, Stack, TextField } from "@mui/material";
import StageCard from "components/Cards/StageCard";
import UserCard from "components/Cards/cardCampaign";
import Select from "components/Control/Select";
import { CustomizedToast } from "components/toast/ToastCustom";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import { callAPIgetListCampaignsAdmin } from "context/redux/action/action";
import { getFeedBack } from "context/redux/action/action";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ManagerCampaign() {
  const token = localStorage.getItem("token");
  const { Username } = jwtDecode(token);
  const [process, setProcess] = useState("Tất cả");
  const [title, setTitle] = useState("");
  const [seacrchResult, setseacrchResulst] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const candidatesPerPage = 4;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(callAPIgetListCampaignsAdmin(token));
  }, []);

  const campaigns = useSelector((stage) => {
    return stage.campaignsadmin;
  });

  useEffect(() => {
    if (!title) {
      if (process === "Tất cả") {
        setseacrchResulst(campaigns);
      } else {
        setseacrchResulst(() => {
          return campaigns.filter((campaign, index) => {
            return campaign.process == process;
          });
        });
      }
    } else {
      if (process === "Tất cả") {
        setseacrchResulst(() => {
          return campaigns.filter((campaign, index) => {
            return campaign.title.toLowerCase().includes(title.toLowerCase());
          });
        });
      } else {
        setseacrchResulst(() => {
          return campaigns.filter((campaign, index) => {
            return (
              campaign.process == process &&
              campaign.title.toLowerCase().includes(title.toLowerCase())
            );
          });
        });
      }
    }
  }, [title, process, campaigns]);

  const totalPages = Math.ceil(seacrchResult?.length / candidatesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getOptions = () => [
    { id: "Tất cả", title: "Tất cả", nametitle: "Trạng thái tất cả chiến dịch" },
    { id: "Chưa bắt đầu", title: "Chưa bắt đầu", nametitle: "Trạng thái chiến dịch chưa bắt đầu" },
    { id: "Đang diễn ra", title: "Đang diễn ra", nametitle: "Trạng thái chiến dịch đang diễn ra" },
    { id: "Đã kết thúc", title: "Đã kết thúc", nametitle: "Trạng thái chiến dịch đã kết thúc" },
  ];

  const handleViewDetail = (id) => {
    navigate(`/admin/manager-campaign/${id}`);
  };

  const handleDelete = async (id) => {
    const data = {
      userName: Username,
    };
    await API("DELETE", URL_API + `/api/v1/campaigns/${id}`, data, token)
      .then((res) => {
        CustomizedToast({
          message: "Cập nhập trạng thái thành công",
          type: "SUCCESS",
        });
        dispatch(callAPIgetListCampaignsAdmin(token));
      })
      .catch((err) => {
        CustomizedToast({
          message: `${err.response.data.message}`,
          type: "ERROR",
        });
      });
  };

  const handleUnDelete = async (id) => {
    await API("PUT", URL_API + `/api/v1/campaigns/unban/${id}`, null, token)
      .then((res) => {
        CustomizedToast({
          message: "Cập nhập trạng thái thành công",
          type: "SUCCESS",
        });
        dispatch(callAPIgetListCampaignsAdmin(token));
      })
      .catch((err) => {
        CustomizedToast({
          message: `${err.response.data.message}`,
          type: "ERROR",
        });
      });
  };

  const getCurrentCandidates = () => {
    const startIndex = (currentPage - 1) * candidatesPerPage;
    const endIndex = startIndex + candidatesPerPage;
    return seacrchResult.slice(startIndex, endIndex);
  };

  return (
    <Paper
      sx={{
        margin: 2,
        padding: 2,
        paddingLeft: "4rem",
        backgroundColor: "transparent",
        position: "relative",
        border: "none",
      }}
    >
      <Stack direction="row" alignItems="center" mb={1}>
        <Box
          sx={{
            flex: 1,
            paddingRight: "1rem",
          }}
        >
          {" "}
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 0.5, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              inputProps={{ "aria-label": "search candidate" }}
              id="outlined-basic"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              label="Tìm kiếm theo tên"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "transparent",
            position: "relative",
            border: "none",
          }}
        >
          <Select
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: { xs: "100%", md: "13rem" },
              margin: { xs: "1rem 0 0", md: 0 },
            }}
            name="fiter"
            required
            defaultValue={"Tất cả"}
            label="Trạng thái chiến dịch"
            height="10rem"
            onChange={(e) => {
              setProcess(e.target.value);
            }}
            options={getOptions()}
          />
        </Box>
      </Stack>
      <Grid container xs={12} rowGap={1}>
        {getCurrentCandidates().map((item) => (
          <Grid key={item.id} item xs={12}>
            {/* <StageCard
              process={item.process}
              title={item.title}
              starttime={item.startTime}
              endtime={item.endtime}
              admin={false}
              onClickViewDetail={() => handleViewDetail(item.campaignId)}
            /> */}
            <UserCard
              title={item.title}
              process={item.process}
              startTime={item.startTime}
              dayEnd={item.endTime}
              url={item.imgUrl}
              status={item.status}
              admin={false}
              onClickDelete={() => handleDelete(item.campaignId)}
              onClickUnDe={() => handleUnDelete(item.campaignId)}
              onClickViewDetail={() => handleViewDetail(item.campaignId)}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "center",
          }}
          color="primary"
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Paper>
  );
}
