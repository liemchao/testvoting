import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import jwt_decode from "jwt-decode";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Grid } from "@mui/material";
import NewActive from "components/Popup/create/NewActive";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivity } from "context/redux/action/action";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ActivityCard(props) {
  const dispath = useDispatch();
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [openNew, setOpenNew] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const handleNewActivity = () => {
    setOpenNew(true);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const callAPI = async () => {
      await dispath(getActivity(decoded.Username, token));
    };
    callAPI();
  }, [dispath, token]);

  const activityData = useSelector((state) => {
    return state.activy;
  });

  return (
    <Grid container spacing={3}>
      {activityData?.map((activity) => (
        <Grid item xs={12} sm={6} md={12} key={activity.campaignId}>
          <Card key={activity.campaignId} sx={{ maxWidth: 600, mb: 2 }}>
            <CardHeader
              title={"Tên chiến dịch"}
              subheader={activity.campaignName}
              action={
                <IconButton aria-label="settings" onClick={handleNewActivity}>
                  <EditIcon />
                </IconButton>
              }
            />
            <CardContent>
              {activity?.listActivity?.map((activityItem) => (
                <div key={activityItem.activityId}>
                  <Typography variant="h6" fontWeight="bold">
                    {activityItem.title}
                  </Typography>
                  {activityItem?.listContent?.map((content) => (
                    <Typography key={content.activityContentId}>
                      {"Nội dung" + ":" + "  " + content.content}
                    </Typography>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
      <NewActive setOpen={setOpenNew} open={openNew} />
    </Grid>
  );
}
