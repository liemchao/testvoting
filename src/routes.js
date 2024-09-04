import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
// import PrimarySearchAppBar from "layouts/page/LangdingPage";
// import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import jwt_decode from "jwt-decode";

// @mui icons

import DashboardLayout from "components/Layout/DashboardLayout";

import FeedBack from "layouts/page/user/FeedBack";
import CampaignList from "layouts/page/user/Campaign";

import DetailCandidate from "layouts/page/user/Form/Voter/Detail Voter/DetailVoter";

import HistoryUser from "layouts/page/user/Form/Voter/History/History";
import CampaignStage from "layouts/page/user/Campaign/CampaignStage";

import Profile from "layouts/page/profile/Profile";
import AllCampaignList from "layouts/page/AllCampaign";

import ListForm from "layouts/page/user/ListForm";
import NewStage from "layouts/page/stage/NewStage";
import ProfilePage from "layouts/profile/ProfilePage";
import LangdingPage from "layouts/page/Langding_Page/LangdingPage";
import CampaignOwenrList from "layouts/page/user/Campaign/CampaignOwner";
import TopAndTable from "layouts/page/rating";
import AddNewcadidate from "layouts/page/user/Candidate/AddCandidate";
import GetNewStage from "layouts/page/user/Campaign/NewStage";
import { useState } from "react";
import SigninPoppop from "components/Popup/add/FormLogin";
import AddNewPercent from "layouts/page/user/Campaign/Percent";
import IntroducePage from "layouts/page/Langding_Page/Introduce";
import UpdateStage from "components/Popup/updatePopup/UpdateStage";
import Cover from "layouts/authentication/reset-password/cover";
import ManageAccount from "layouts/page/admin/ManageAccount";
import QuestionForm from "layouts/page/user/icontop/Question";
import CampaignJoin from "layouts/page/user/Campaign/CampaignJoin";
import YourChartComponent from "components/Chart/chart";
import BarChartWithDatePicker from "components/Chart/chart";
import ManagerCampaign from "layouts/page/admin/mangerCampain/ManagerCampain";
import ManagerCampaignByID from "layouts/page/admin/mangerCampain/detail/ManagerCampaignByID";
import CandateOneDetail from "layouts/page/user/Form/Voter/List Candidate/CanidateOneDetail";
import Thongke from "layouts/page/admin/mangerCampain/detail/Thongke";
import ModerCampaignByID from "layouts/page/rating/ModeratorMana";
import FeedbackOwer from "layouts/page/user/icontop/FeebackOwner";
import Results from "layouts/page/admin/mangerCampain/detail/Results";
import Test from "layouts/page/user/Campaign/test";
import SildeTop10 from "layouts/page/sildetop10";

//----------------------------------------------------------------

export default function Router() {
  const [open, setOpen] = useState(true);
  const ProtectedRouteAuthen = ({ roles, children }) => {
    const token = localStorage.getItem("token");
    try {
      const decoded = jwt_decode(token);
      if (token === null) {
        return <SigninPoppop OpenPopUp={open} SetOpenPopUp={setOpen} />;
      } else if (token && !decoded.RoleName) {
        return <SigninPoppop OpenPopUp={open} SetOpenPopUp={setOpen} />;
      } else if (roles.includes(decoded.RoleName)) {
        return <> {children} </>;
      }
    } catch (error) {
      return <SigninPoppop OpenPopUp={open} SetOpenPopUp={setOpen} />;
    }
    return <SigninPoppop OpenPopUp={open} SetOpenPopUp={setOpen} />;
  };

  return useRoutes([
    {
      path: "/",
      element: <LangdingPage />,
    },
    {
      path: "/introduce",
      element: <IntroducePage />,
    },
    {
      path: "/resetpassword",
      element: <Cover />,
    },
    {
      path: "/authentication/sign-in",
      element: <SignIn />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "result/:id",
      element: <Results />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRouteAuthen roles="admin">
          <DashboardLayout />
        </ProtectedRouteAuthen>
      ),
      children: [
        {
          path: "account",
          element: <ManageAccount />,
        },
        {
          path: "dashboard",
          element: <Thongke />,
        },
        {
          path: "history",
          element: <HistoryUser />,
        },
        {
          path: "manager-campaign",
          element: <ManagerCampaign />,
        },
        {
          path: "manager-campaign/:id",
          element: <ManagerCampaignByID />,
        },
      ],
    },
    {
      path: "/user",
      element: (
        <ProtectedRouteAuthen roles="user">
          <DashboardLayout />
        </ProtectedRouteAuthen>
      ),
      children: [
        {
          path: "form",
          element: <ListForm />,
        },
        {
          path: "sildetop/:id",
          element: <SildeTop10 />,
        },
        {
          path: "feebackOwer/:id",
          element: <FeedbackOwer />,
        },
        {
          path: "campaign",
          element: <CampaignList />,
        },
        {
          path: "campaignOwner",
          element: <CampaignOwenrList />,
        },
        {
          path: "statistal",
          element: <BarChartWithDatePicker />,
        },
        {
          path: "createCandidate/:id",
          element: <AddNewcadidate />,
        },

        {
          path: "createPercent/:id",
          element: <AddNewPercent />,
        },
        {
          path: "history",
          element: <HistoryUser />,
        },
        {
          path: "campaignjoin",
          element: <CampaignJoin />,
        },

        {
          path: "allcampaign",
          element: <AllCampaignList />,
        },

        {
          path: "campaign/stage/:id",
          element: (
            <ProtectedRouteAuthen roles="user">
              <CampaignStage />
            </ProtectedRouteAuthen>
          ),
        },
        {
          path: "newstage/:id",
          element: <GetNewStage />,
        },
        {
          path: "candidate/:id/stage/:id",
          element: (
            <ProtectedRouteAuthen roles="user">
              <CandateOneDetail />
            </ProtectedRouteAuthen>
          ),
        },

        {
          path: "campaign/updatestage/:id",
          element: <UpdateStage />,
        },
        {
          path: "top10",
          element: <Test />,
        },

        {
          path: "campaign/newStage/:id",
          element: <NewStage />,
        },
        {
          path: "feedback",
          element: <FeedBack />,
        },
        {
          path: "template",
          element: <FeedBack />,
        },

        {
          path: "result/:id",
          element: <TopAndTable />,
        },
        {
          path: "candidate/:id",
          element: (
            <ProtectedRouteAuthen roles="user">
              <DetailCandidate />
            </ProtectedRouteAuthen>
          ),
        },

        {
          path: "moderator-campaign/:id",
          element: <ModerCampaignByID />,
        },

        {
          path: "profilecandidate/:id",
          element: <ProfilePage />,
        },
      ],
    },
  ]);
}
