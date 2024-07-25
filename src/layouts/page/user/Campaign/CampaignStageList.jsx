// import { filter } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import * as PathAction from "../../../../context/redux/PathAction";
import { useDispatch, useSelector } from "react-redux";
import { handleGetCandidateByIdCampaign } from "context/redux/action/action";
import { Authen } from "context/authenToken/AuthenToken";
import { useContext } from "react";
import StageCard from "components/Cards/StageCard";
import { handleGetStage } from "context/redux/action/action";
import { getScorebyStage } from "context/redux/action/action";
import { NavigationPopup } from "components/Popup/updatePopup/UpdateGroup";
import { CheckVoter } from "context/redux/action/action";
import { useState } from "react";
import jwt_decode from "jwt-decode";

export const createAction = ({ type, payload }) => {
  return { type, payload };
};

export default function CampaignStageList() {
  //------------
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isopen, setIsopen] = useState(true);

  //------------

  useEffect(() => {
    const callAPIgetList = async () => {
      dispatch(handleGetStage(id, token));
      dispatch(CheckVoter(decode.Username || decode.userId, id, token));
    };
    callAPIgetList();
  }, [id, navigate]);

  const stateList = useSelector((state) => {
    return state.campaignStage;
  });
  const checkvoter = useSelector((state) => {
    return state.checkvoter;
  });
  useEffect(() => {
    setIsopen(checkvoter);
  }, [checkvoter]);

  const handleinvite = (id, token, idForm, idStage) => {
    dispatch(getScorebyStage(idStage, decode.Username, token));
    localStorage.setItem("campaignId", id);
    dispatch(
      createAction({
        type: PathAction.PUT_ID_FORM,
        payload: idForm,
      })
    );
    dispatch(
      createAction({
        type: PathAction.PUT_ID_CAMPAIGN,
        payload: {
          campaignId: id,
        },
      })
    );
    dispatch(
      createAction({
        type: PathAction.PUT_ID_ARRAY,
        payload: undefined,
      })
    );
    navigate(`/user/candidate/${idStage}`);
  };
  if (stateList.length === 1) {
    dispatch(
      createAction({
        type: PathAction.PUT_ID_ARRAY,
        payload: {
          idStage: stateList[0].stageId,
          formid: stateList[0].formId,
          campaignId: stateList[0].campaignId,
        },
      })
    );
    localStorage.setItem("campaignId", stateList[0].campaignId);
    dispatch(
      createAction({
        type: PathAction.PUT_ID_CAMPAIGN,
        payload: undefined,
      })
    );

    navigate(`/user/candidate/${stateList[0].stageId}`);
  } else {
    return (
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 2,
        }}
      >
        {stateList.map((card, index) => (
          <Grid item xs={6} md={4} key={index}>
            <StageCard
              starttime={card.startTime}
              endtime={card.endTime}
              title={card.title}
              content={card.content}
              process={card.process}
              onClickJoin={() => {
                handleinvite(card.campaignId, token, card.formId, card.stageId);
              }}
            />
          </Grid>
        ))}

        {isopen ? (
          <></>
        ) : (
          <>
            <NavigationPopup
              SetisOpen={() => {
                setIsopen(true);
              }}
              id={id}
            />
          </>
        )}
      </Grid>
    );
  }
}
