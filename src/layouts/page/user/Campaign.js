import { Link as RouterLink, useLocation, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useState } from "react";
import Select from "components/Control/Select";

// material
import { Stack, Container, Typography, Box, TextField, Pagination } from "@mui/material";
import QRPopUp from "components/Popup/create/QRPopUp";

import Page from "components/Layout/Page";
import { useContext } from "react";
import { Authen } from "context/authenToken/AuthenToken";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAPIgetListCampaigns } from "context/redux/action/action";
import { filter } from "lodash";

import { useCallback } from "react";
import NewPopUp from "components/Popup/create/NewPopUp";
import UserCard from "components/Cards/cardCampaign";
import dayjs from "dayjs";
import { handleGetCampaignById } from "context/redux/action/action";
import { useTheme, useMediaQuery } from "@mui/material";

export const createAction = ({ type, payload }) => {
  return { type, payload };
};

export default function CampaignList() {
  const [Link, setLink] = useState(window.location.href);
  const [open, setopen] = useState(false);
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 4;
  const [title, setTitle] = useState("");
  const [id, setId] = useState();
  const [process, setProcess] = useState("Tất cả");
  const [seacrchResult, setseacrchResulst] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListCampaigns(token));
    };
    callAPI();
  }, [dispatch, token]);

  const campaigns = useSelector((state) => {
    return state.campaigns;
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

  const handleGetQR = useCallback((id) => {
    setopen(true);
    setLink(window.location.href + "/stage/" + id);
  }, []);

  const handleClickResult = useCallback((id) => {
    setId(id);
    navigate(`/result/${id}`);
  }, []);

  const getOptions = () => [
    { id: "Tất cả", title: "Tất cả", nametitle: "Trạng thái tất cả chiến dịch" },
    { id: "Chưa bắt đầu", title: "Chưa bắt đầu", nametitle: "Trạng thái chiến dịch chưa bắt đầu" },
    { id: "Đang diễn ra", title: "Đang diễn ra", nametitle: "Trạng thái chiến dịch đang diễn ra" },
    { id: "Đã kết thúc", title: "Đã kết thúc", nametitle: "Trạng thái chiến dịch đã kết thúc" },
  ];

  const handleCampaignStage = useCallback(
    async (id, navigate, token) => {
      await dispatch(handleGetCampaignById(id, navigate, token));
    },
    [id, navigate]
  );
  const getCurrentCandidates = () => {
    const startIndex = (currentPage - 1) * candidatesPerPage;
    const endIndex = startIndex + candidatesPerPage;
    return seacrchResult.slice(startIndex, endIndex);
  };

  return (
    <Page title="Campaign">
      <Container>
        {isMobile ? (
          <></>
        ) : (
          <Stack direction="row" alignItems="center" mb={1}>
            <Box sx={{ flex: 1, paddingRight: "1rem" }}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 0.5, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  sx={{
                    "& label": {
                      color: "white",
                    },
                    "& label.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                      "& input": {
                        color: "white",
                      },
                      "&::placeholder": {
                        color: "white",
                      },
                      "&.Mui-focused input": {
                        color: "white",
                      },
                    },
                  }}
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
            <Box sx={{ display: "flex", justifyContent: "flex-start", padding: 1 }}>
              {/* <Select
                InputLabelProps={{
                  sx: {
                    color: "white",
                  },
                }}
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
              /> */}
            </Box>
          </Stack>
        )}

        <Box
          sx={{
            backgroundColor: "transparent",
            position: "relative",
            border: "none",
          }}
        >
          {getCurrentCandidates().map((item, index) => (
            <UserCard
              key={item.campaignId}
              id={item.campaignId}
              title={item.title}
              publishTheResult={item.publishTheResult}
              totalCandidate={item.totalCandidate}
              process={item.process}
              visibilityCandidate={item.visibilityCandidate}
              creater={item.userId}
              url={item.imgUrl}
              dayEnd={dayjs(item.endTime).format("DD-MM-YYYY HH:mm:ss")}
              startTime={dayjs(item.startTime).format("DD-MM-YYYY HH:mm:ss")}
              onClickShare={() => {
                handleGetQR(item.campaignId);
              }}
              onClickJoin={() => {
                handleCampaignStage(item.campaignId, navigate);
              }}
              onClickResult={() => {
                handleClickResult(item.campaignId, navigate);
              }}
            />
          ))}
        </Box>
      </Container>

      <QRPopUp OpenPopUp={open} SetOpenPopUp={setopen} link={Link} />
      <NewPopUp OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} />
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
    </Page>
  );
}
