/// gọi axios
import * as PathAction from "./../PathAction";
import jwt_decode from "jwt-decode";

import { URL_API } from "../../../config/axios/Url/URL";
import API from "../../../config/axios/API/API";
import { CustomizedToast } from "../../../components/toast/ToastCustom";

export const createAction = ({ type, payload }) => {
  return { type, payload };
};

// const [isLoggedIn, setIsLoggedIn] = useState(false);

export const LoginAthen = (user, navigate) => {
  return async (dispatch) => {
    try {
      const res = await API("POST", URL_API + `/api/v1/Authen/login`, user);
      localStorage.setItem("token", res.data.data.token);
      const token = localStorage.getItem("token");
      const detoken = jwt_decode(token);
      dispatch(
        createAction({
          type: PathAction.LOGIN_USER,
          payload: res.data.data,
        })
      );
      if (detoken.RoleName === "user") {
        navigate("/user/campaign");
        CustomizedToast({
          message: "Đăng nhập thành công",
          type: "SUCCESS",
        });
      } else if (detoken.RoleName === "admin") {
        navigate("/admin/dashboard");
        CustomizedToast({
          message: "Đăng nhập thành công",
          type: "SUCCESS",
        });
      } else if (detoken.Permission === 3) {
        CustomizedToast({
          message: "Tài khoản này đã bị khóa",
          type: "ERROR",
        });
      }
    } catch (error) {
      CustomizedToast({
        message: "Tên tài khoản hoặc mật khẩu sai",
        type: "ERROR",
      });
    }
  };
};

export const LoginCheck = (user, SetOpenPopUp) => {
  return async (dispatch) => {
    try {
      const res = await API("POST", URL_API + `/api/v1/Authen/login`, user);
      localStorage.setItem("token", res.data.data.token);
      const token = localStorage.getItem("token");
      const detoken = jwt_decode(token);
      dispatch(
        createAction({
          type: PathAction.LOGIN_USER,
          payload: res.data.data,
        })
      );
      if (detoken.RoleName === "user") {
        SetOpenPopUp(false);
      }
    } catch (error) {
      CustomizedToast({
        message: "Tên đăng nhập hoặc mật khẩu sai",
        type: "ERROR",
      });
    }
  };
};

export const loginFirebase = (idtoken, navigate) => {
  return async (dispatch) => {
    try {
      const res = await API("POST", URL_API + `/api/v1/authen/firebase?idtoken=${idtoken}`);
      if (res) {
        localStorage.setItem("token", res.data.data.token);
        const token = localStorage.getItem("token");
        const detoken = jwt_decode(token);
        dispatch(
          createAction({
            type: PathAction.LOGIN_USER,
            payload: res.data.token,
          })
        );
        if (detoken.RoleName === "user") {
          navigate("/user/campaign");
          CustomizedToast({
            message: "Đăng nhập thành công",
            type: "SUCCESS",
          });
        } else if (detoken.RoleName === "admin") {
          navigate("/admin/account");
          CustomizedToast({
            message: "Đăng nhập thành công",
            type: "SUCCESS",
          });
        } else {
          CustomizedToast({
            message: "Tên tài khoản hoặc mật khẩu sai.",
            type: "ERROR",
          });
        }
      }
    } catch (error) {
      CustomizedToast({
        message: `${error.response.data.message}`,
        type: "ERROR",
      });
    }
  };
};

export const callAPIgetListForm = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/forms`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_FORM,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const callAPIgetListCampaigns = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/campaigns`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_CAMPAIGNS,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const callAPIgetListCampaignsAdmin = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/campaigns/admin-manage`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_CAMPAIGNS_ADMIN,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const callAPIgeCampaignsRepresentative = () => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/campaigns/representative`, null);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_CAMPAIGNS_ONE,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const callAPIgetListCandidates = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/candidates`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_CANDIDATE,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const callAPIgetListHistory = (userName, token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/api/v1/action-histories/user/${userName}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_HISTORY,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};
export const handleGetCampaignById = (id, navigate) => {
  return async (dispatch) => {
    try {
      const req = await API("GET", URL_API + `/api/v1/stages/campaign/${id}`, null);
      navigate(`/user/campaign/stage/${id}`);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_CAMPAINGSTAGEID,
          payload: req.data.data,
        })
      );
    } catch (error) {
      CustomizedToast({
        message: `${error.response.data.message}`,
        type: "ERROR",
      });
    }
  };
};

export const handleGetStage = (id, token) => {
  return async (dispatch) => {
    try {
      const req = await API("GET", URL_API + `/api/v1/stages/campaign/${id}`, null, token);

      dispatch(
        createAction({
          type: PathAction.GET_LIST_CAMPAINGSTAGEID,
          payload: req.data.data,
        })
      );
    } catch (error) {
      CustomizedToast({
        message: `${error.response.data.message}`,
        type: "ERROR",
      });
    }
  };
};
export const GetCampaignById = (id, navigate, token) => {
  return async (dispatch) => {
    try {
      const req = await API("GET", URL_API + `/api/v1/stages/campaign/${id}`, null, token);
      navigate(`/user/newstage/${id}`);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_CAMPAINGSTAGEID,
          payload: req.data.data,
        })
      );
    } catch (error) {}
  };
};

export const handleGetCandidateByIdCampaign = (token, id) => {
  return async (dispatch) => {
    try {
      const req = await API("GET", URL_API + `/api/v1/candidates/campaign/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_CANDIDATE_CAMPAIGN,
          payload: req.data.data,
        })
      );
    } catch (error) {}
  };
};

export const GetCampaignbyUserId = (id, token) => {
  return async (dispatch) => {
    try {
      const req = await API("GET", URL_API + `/api/v1/campaigns/user/${id}`, null, token);

      dispatch(
        createAction({
          type: PathAction.GET_CAMPAIGN_OWNER,
          payload: req.data.data,
        })
      );
    } catch (error) {}
  };
};

export const handleGetQuestByIdCampaign = (id, token) => {
  return async (dispatch) => {
    try {
      const req = await API("GET", URL_API + `/api/v1/questions/form/${id}`, null, token);

      console.log("🚀 ~ file: action.js:277 ~ return ~ req:", req);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_QUESTIONS,
          payload: req.data.data,
        })
      );
    } catch (error) {}
  };
};

export const handleVote = (token, data) => {
  return async (dispatch) => {
    try {
      const req = await API("POST", URL_API + `/api/v1/vote`, data, token);

      dispatch(
        createAction({
          type: PathAction.SUBMIT_VOTE,
          payload: req.data.data,
        })
      );

      // CustomizedToast({
      //   message: "Bình chọn thành công ",
      //   type: "SUCCESS",
      // });
    } catch (error) {
      // CustomizedToast({
      //   message: "Bình chọn thất bại",
      //   type: "SUCCESS",
      // });
    }
  };
};

export const handleCreateForm = (token, data) => {
  return async (dispatch) => {
    try {
      const req = await API("POST", URL_API + `/api/v1/forms`, data, token);

      dispatch(
        createAction({
          type: PathAction.CREATE_FORM,
          payload: req.data.data,
        })
      );
    } catch (error) {}
  };
};
export const handleCreateQuestion = (token, data) => {
  return async (dispatch) => {
    try {
      const req = await API("POST", URL_API + `/api/v1/questions`, data, token);

      dispatch(
        createAction({
          type: PathAction.CREATE_QUESTION,
          payload: req.data.data,
        })
      );

      CustomizedToast({
        message: "Thêm câu hỏi thành công ",
        type: "SUCCESS",
      });
    } catch (error) {
      CustomizedToast({
        message: "Thêm câu hỏi thất bại",
        type: "SUCCESS",
      });
    }
  };
};
export const getAllCategory = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/categories`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_CATEGORY,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getAllUser = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/accounts`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_CANDIDATE_ACCOUNT,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getAllType = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/types`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_TYPE,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getFormId = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/forms/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_FORM_BY_ID,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};
export const getCampaignId = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/campaigns/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_CAMPAIGN_ID,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getCampaignRatio = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/ratios/campaign/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_RATIO,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getCampaignID = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/campaigns/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_CAMPAIGN_BY_ID,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const DeleteCampaignId = (id, data, token) => {
  return async (dispatch) => {
    try {
      const res = await API("DELETE", URL_API + `/api/v1/campaigns/${id}`, data, token);
      if (res) {
        CustomizedToast({
          message: "Thêm câu hỏi thành công ",
          type: "SUCCESS",
        });
      }
    } catch (err) {
      CustomizedToast({
        message: "Thêm câu hỏi thất bại",
        type: "ERROR",
      });
    }
  };
};

export const getformbyIdUser = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/forms/user/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_FORM_BY_ID_USER,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getGroupId = (idcampaign, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/groups/campaign/${idcampaign}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_GROUP,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getScore = (campaignid, userId, token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/api/v1/scores?CampaignId=${campaignid}&UserId=${userId}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_SCORE,
          payload: res.data.data.listCandidateScore,
        })
      );
    } catch (err) {}
  };
};

export const getScorebyStage = (stageid, username, token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/api/v1/candidates/stage/${stageid}/user/${username}`,
        null,
        token
      );
      console.log("🚀 ~ file: action.js:537 ~ return ~ res:", res);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_SCORE_STAGE,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const CheckVoter = (userId, campaignid, token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/api/v1/groups/user/${userId}/campaign/${campaignid}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.CHECK_VOTER,
          payload: res.data.success,
        })
      );
    } catch (err) {
      dispatch(
        createAction({
          type: PathAction.CHECK_VOTER,
          payload: err.response.data ? err.response.data.success : false,
        })
      );
    }
  };
};

export const CheckFeedback = (userId, campaignid, token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/api/v1/feedbacks/user/${userId}/campaign/${campaignid}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.CHECK_FEEDBACK,
          payload: true,
        })
      );
    } catch (err) {
      dispatch(
        createAction({
          type: PathAction.CHECK_FEEDBACK,
          payload: false,
        })
      );
    }
  };
};

export const getStagebyId = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/stages/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_STAGE_BY_ID,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const callAPIProfile = (userid, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/users/id?id=${userid}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_PROFILE,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getAccount = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/users`, null, token);

      dispatch(
        createAction({
          type: PathAction.GET_ACCOUNT,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getFeedBack = (token, id) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/feedbacks/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_FEEDBACK,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getFeedBackCampaign = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/feedbacks/campaign/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_CAMPAIGN_FEEDBACK,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};
//================

export const getFeedBackUser = (userName, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/feedbacks/user/${userName}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_USER_FEEDBACK,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};
//----------------------------

export const getListThongke = (token, id, DateAt, ToDate) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/api/v1/votes/statistical?CampaignId=${id}&DateAt=${DateAt}&ToDate=${ToDate}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_THONGKE,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getFeeback = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/feedbacks`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_FEEDBACK,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getCandidateID = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/candidates/user/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_CANDIDATE_ID,
          payload: res.data.data[0].candidateId,
        })
      );
    } catch (err) {}
  };
};

export const getActivity = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/candidates/user/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_ACTIVITY,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getDetailCanidate = (idCandidate, idStage, token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/api/v1/candidates/${idCandidate}/stage/${idStage}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_DETAIL_CANDIDATE,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getCandidatebyId = (idCandidate, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/candidates/${idCandidate}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_DETAIL_ONE_CANDIDATE,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getstatisticalsById = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/statisticals/`, id, token);
      dispatch(
        createAction({
          type: PathAction.GET_STATISTICAL,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getGroupMajorById = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/api/v1/statisticals/statistical-voter/${id}`,
        null,
        token
      );

      dispatch(
        createAction({
          type: PathAction.GET_GROUP_OF_VOTER,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getStatisticalCandidateById = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/api/v1/statisticals/statistical-candidate/${id}`,
        null,
        token
      );

      dispatch(
        createAction({
          type: PathAction.GET_STATISTICAL_CANDIDATES_ID,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const callAPIgetListResult = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/statisticals/campaign/${id}`, null, token);

      dispatch(
        createAction({
          type: PathAction.GET_RESULTS,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};
export const callAPIgetDetailQuestion = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/questions/${id}`, null, token);
      console.log("🚀 ~ file: action.js:784 ~ return ~ res:", res);
      dispatch(
        createAction({
          type: PathAction.GET_DETAIL_QUESTION,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

// export const getCandidateinUpdateGroup = (id, token) => {
//   return async (dispatch) => {
//     try {
//       const res = await API("GET", URL_API + `/api/v1/candidates/state/6097a517-11ad-4105-b26a-0e93bea2cb43/user/${id}`, null, token);
//       console.log("🚀 ~ file: action.js:784 ~ return ~ res:", res);
//       dispatch(
//         createAction({
//           type: PathAction.GET_DETAIL_QUESTION,
//           payload: res.data.data,
//         })
//       );
//     } catch (err) { }
//   };
// };

export const getAccountStatic = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/statisticals/voteOfVoter`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_ACCOUNT_THONGKE,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getDesigin = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/designs/introduction`, null);
      dispatch(
        createAction({
          type: PathAction.GET_DESGN,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getSettingDesign = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/designs`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_SETTING_DESGN,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};

export const getDesiginHome = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/api/v1/designs/home`, null);
      dispatch(
        createAction({
          type: PathAction.GET_DESGN_HOME,
          payload: res.data.data,
        })
      );
    } catch (err) {}
  };
};
