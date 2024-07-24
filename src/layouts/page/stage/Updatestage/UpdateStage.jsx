import { Box, Grid, Stack } from "@mui/material";
import Input from "components/Control/Input";
import React from "react";
import TextArea from "components/Control/TextArea";
import DateTime from "components/Control/DateTime";
import dayjs from "dayjs";

export default function StageUpdate(props) {
  const {
    stagedetail,
    title,
    description,
    limitVoter,
    setDescription,
    setContent,
    content,
    setTitle,
    setEndTime,
    setStartTime,
    setlimitVoter,
  } = props;
  return (
    <>
      <Box sx={{ pt: 4, m: 4 }}>
        <Box
          sx={{
            borderRadius: 2,
            bgcolor: "background.paper",
            m: 1,
            display: "flex",
            justifyContent: "center",
            boxShadow: 12,
            paddingLeft: "7%",
            width: "60%",
            marginLeft: "20%",
            paddingBottom: 3,
          }}
        >
          <Box
            sx={{ float: "left", width: "50%", flexGrow: 1, mt: "2rem" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <Input
                  required
                  variant="outlined"
                  name="title"
                  defaultValue={stagedetail.title}
                  label="Tên giai đoạn"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  required
                  min={1}
                  max={7}
                  variant="outlined"
                  type="number"
                  name="limitVoter"
                  label="Giới hạn phiếu"
                  defaultValue={stagedetail.limitVote}
                  value={limitVoter}
                  onChange={(e) => {
                    setlimitVoter(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  variant="outlined"
                  name="content"
                  required
                  label="Nội dung"
                  defaultValue={stagedetail.content}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <DateTime
                  required
                  variant="outlined"
                  name="startTime"
                  defaultValue={dayjs(stagedetail.startTime)}
                  disablePast
                  label="Thời gian bắt đầu"
                  onChange={(event) => {
                    setStartTime(event.$d);
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <DateTime
                  required
                  variant="outlined"
                  name="endTime"
                  disablePast
                  defaultValue={dayjs(stagedetail.endTime)}
                  label="Thời gian kết thúc"
                  onChange={(event) => {
                    setEndTime(event.$d);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextArea
                  columns={12}
                  width="85%"
                  row={6}
                  maxRows={6}
                  defaultValue={stagedetail.description}
                  multiline
                  marginRight="4rem"
                  variant="outlined"
                  label="Mô tả"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
