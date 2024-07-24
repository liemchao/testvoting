import * as React from "react";
import Grid from "@mui/material/Grid";
import { getstatisticalsById } from "context/redux/action/action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppWidgetSummary from "components/Card/AppWidgetSummary";

export default function Thongke() {
  const id = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getstatisticalsById(id.id, token));
  }, [dispatch]);

  const statistical = useSelector((stage) => {
    return stage.statistical;
  });

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <AppWidgetSummary
          title="Chiến dịch"
          total={statistical.campaign}
          icon="material-symbols:campaign"
          color="primary"
          bgcolor="#D1E9FC"
        />
      </Grid>
      <Grid item xs={6}>
        <AppWidgetSummary
          title="Biểu mẫu"
          total={statistical.form}
          icon="mdi:form"
          color="warning"
          bgcolor="#FFE7D9"
        />
      </Grid>
      <Grid item xs={6}>
        <AppWidgetSummary
          title="Ứng cử viên"
          total={statistical.candidate}
          icon="fa6-solid:people-line"
          color="info"
          bgcolor="#D0F2FF"
        />
      </Grid>
      <Grid item xs={6}>
        <AppWidgetSummary
          title="Số người tham gia"
          total={statistical.voter}
          icon="fluent:people-12-filled"
          color="error"
          bgcolor="#FFF7CD"
        />
      </Grid>
    </Grid>
  );
}
