import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

const ContactSection = () => {
  return (
    <Grid container justifyContent="center" sx={{ width: "100vw" }}>
      {/* <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
        <Typography variant="h3">Liên hệ ngay</Typography>
        <Stack sx={{ justifyContent: "center", width: "100%" }}>
          <TextField label="Địa chỉ email" variant="standard" />
          <Button
            startIcon={<SendIcon sx={{ color: "white" }} />}
            sx={{ mt: 4, mb: 4 }}
            variant="contained"
            color="warning"
          >
            Liên hệ
          </Button>
        </Stack>
      </Grid> */}
    </Grid>
  );
};
export default ContactSection;
