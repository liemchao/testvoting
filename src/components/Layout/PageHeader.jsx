import { Box, Card, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";

export default function PageHeader(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#fdfdff",
      // width: { width },
    },
    pageHeader: {
      padding: theme.spacing(4),
      display: "flex",
      justifyContent: "center",
    },
    pageIcon: {
      display: "inline-block",
      padding: theme.spacing(1),
      color: "#303031",
      paddingleft: theme.spacing(5),
    },
    pageTitle: {
      paddingRight: theme.spacing(2),
      "& .MuiTypography-subtitle2": {
        opacity: "0.6",
      },
    },
  }));
  const classes = useStyles();
  const { title, subTitle, icon, width, marginLeft } = props;
  return (
    <Paper
      elevation={0}
      square
      className={classes.root}
      sx={{ width: { width }, marginLeft: { marginLeft } }}
    >
      <div className={classes.pageHeader}>
        <div className={classes.pageTitle}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "black",
              fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
              fontSize: isMobile ? "15px" : "40px",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "black",
              fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
              fontSize: isMobile ? "10px" : "20px",
            }}
          >
            {subTitle}
          </Typography>
        </div>
        <Box className={classes.pageIcon}>{icon}</Box>
      </div>
    </Paper>
  );
}
