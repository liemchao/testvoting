import React, { useContext, useEffect } from "react";
import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useRef } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Authen } from "context/authenToken/AuthenToken";
import { useDispatch, useSelector } from "react-redux";
import { callAPIgetListCampaigns } from "context/redux/action/action";
import CampaignCard from "components/Cards/Cardlangpage";
import { useCallback } from "react";
import { handleGetCampaignById } from "context/redux/action/action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ListCandidate from "./listcandidate";

import dayjs from "dayjs";
import moment from "moment/moment";
import { PromotionsContainer } from "../../styles/promotions";
import QRPopUp from "components/Popup/create/QRPopUp";

export default function PromotionCarousel() {
  const containerRef = useRef();
  const navigate = useNavigate();
  const [OpenDiaLog, SetOpenDialog] = useState(false);
  const { token } = useContext(Authen);
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 19);
  const [Link, setLink] = useState(window.location.href);

  useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListCampaigns(token));
    };
    callAPI();
  }, [dispatch, token]);
  const handleCampaignStage = useCallback(
    async (id, navigate) => {
      await dispatch(handleGetCampaignById(id, navigate, token));
    },
    [dispatch]
  );
  const handleGetQR = useCallback((id) => {
    setopen(true);
    setLink(window.location.href + "/stage/" + id);
  }, []);

  const handleClickResult = useCallback((id) => {
    setId(id);
    navigate(`/result/${id}`);
  }, []);

  const handleCheckDay = useCallback((endday) => {
    const now = moment();
    if (now.isAfter(endday)) {
      return true;
    } else if (now.isSameOrBefore(endday)) {
      return false;
    }
  }, []);

  const handleClickOpenDialog = useCallback(
    (id) => {
      setId(id);
      SetOpenDialog(true);
    },
    [id]
  );

  const campaigns = useSelector((state) => {
    return state.campaigns;
  });

  return (
    <>
      <Carousel
        ref={containerRef}
        plugins={[
          "arrows",
          "infinite",
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 3,
            },
          },
        ]}
        breakpoints={{
          640: {
            plugins: [
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 1,
                },
              },
            ],
          },
          900: {
            plugins: [
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 2,
                },
              },
            ],
          },
          300: {
            plugins: [
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 1,
                },
              },
            ],
          },
        }}
      >
        {campaigns.map((card, index) => (
          <PromotionsContainer
            ref={containerRef}
            overflow="hidden"
            sx={{ backgroundColor: "transparent", position: "relative" }}
          >
            <Box key={card.campaignId} display="flex" justifyContent="center" alignItems="center">
              <CampaignCard
                id={card.imgUrl}
                process={card.process}
                title={card.title}
                check={handleCheckDay(moment(card.endTime))}
                creater={card.userId}
                publishTheResult={card.publishTheResult}
                url={card.imgUrl}
                visibilityCandidate={card.visibilityCandidate}
                totalCandidate={card.totalCandidate}
                dayEnd={dayjs(card.endTime).format("DD-MM-YYYY HH:mm:ss")}
                startTime={dayjs(card.startTime).format("DD-MM-YYYY HH:mm:ss")}
                onClickJoin={() => {
                  handleCampaignStage(card.campaignId, navigate);
                }}
                onClickShare={() => {
                  handleGetQR(item.campaignId);
                }}
                onClickResult={() => {
                  handleClickResult(item.campaignId, navigate);
                }}
              />
            </Box>
          </PromotionsContainer>
        ))}
      </Carousel>
      <QRPopUp OpenPopUp={open} SetOpenPopUp={setopen} link={Link} />

      <ListCandidate OpenDialog={OpenDiaLog} SetOpenDialog={SetOpenDialog} id={id} />
    </>
  );
}
