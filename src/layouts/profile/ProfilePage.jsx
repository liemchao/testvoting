import React from "react";
import { makeStyles } from "@mui/styles";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { Box, Button, ButtonGroup, CardContent, Stack } from "@mui/material";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import * as yup from "yup";
import BottomActionsCard from "./BottomActionsCard";
import BioCard from "./BioCard";
import RecipeReviewCard from "./RecipeReviewCard";
import { useState } from "react";
import EditProfile from "components/Popup/create/EditProfile";
import NewActive from "components/Popup/create/NewActive";
import ActityCard from "./Actitycard";
import jwt_decode from "jwt-decode";
import { getActivity } from "context/redux/action/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const schema = yup.object().shape({
  fullName: yup.string().required().trim(),
  phone: yup.string().required().trim(),
  email: yup.string().required().trim(),
});

// const blogs = [
//   {
//     img: liem,
//     title: "Chiến dịch mùa hè xanh!",
//     subtitle:
//       "Some quick example text to build on the card title and make up the bulk of the card's content.",
//     btncolor: "error",
//   },
//   {
//     img: liem,
//     title: "Chiến dịch mùa xuân xanh",
//     subtitle:
//       "Some quick example text to build on the card title and make up the bulk of the card's content.",
//     btncolor: "warning",
//   },
//   {
//     img: liem,
//     title: "Chiến dịch mùa xanh cỏ ",
//     subtitle:
//       "Some quick example text to build on the card title and make up the bulk of the card's content.",
//     btncolor: "primary",
//   },
// ];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "fullwidth",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

function ProfilePage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const dispath = useDispatch();

  useEffect(() => {
    const callAPI = async () => {
      await dispath(getActivity(decoded.Username, token));
    };
    callAPI();
  }, [dispath, token]);

  const activityData = useSelector((state) => {
    return state.activy;
  });
  const handleEditPropfile = () => {
    setOpen(true);
  };

  const handleNewActivity = () => {
    setOpenNew(true);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Card>
          <CardHeader sx={{ backgroundColor: "success.main" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <h4 className={classes.cardTitleWhite}>Chỉnh sửa trang cá nhân</h4>
                <p>FVS Voting System</p>
              </Box>
              <Box>
                <ButtonGroup>
                  <ButtonLangding
                    nameButton="Thêm"
                    bgColor="#FFA500"
                    hovercolor="#F7941D"
                    onClick={() => handleNewActivity()}
                  />
                </ButtonGroup>
              </Box>
            </Box>
          </CardHeader>
          <CardBody>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <BioCard
                  avatar="https://sohanews.sohacdn.com/thumb_w/660/160588918557773824/2020/6/26/1045888601851701862892902946201527489832653o-1593155817343264355681.jpg"
                  name={activityData?.map((item) => item.fullName)}
                  // sologan="Code ngu nhưng hay code"
                />
              </Grid>
              <Grid item xs={7}>
                <ActityCard />
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </Paper>
      {activityData && <NewActive setOpen={setOpenNew} open={openNew} />}
    </div>
  );
}

export default ProfilePage;
