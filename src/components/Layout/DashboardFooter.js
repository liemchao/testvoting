import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { alpha, styled } from "@mui/material/styles";

const RootStyleClose = styled("div")(({ theme }) => ({
  // boxShadow: "none",
  backdropFilter: "blur(6px)",
  alignItems: "center",
  display: "center",
  justifyContent: "center",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));
//----------------------------------------------------------------
export default function DashboardFooter({ open }) {
  const currentYear = new Date().getFullYear();
  return (
    <>
      {open ? (
        <>
          <Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                {currentYear}
                &copy; Voting System. All Rights Reserved.
              </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <RootStyleClose>
            <Box bgcolor="grey.200">
              <Typography variant="body2" align="center" color="textSecondary">
                {currentYear}
                &copy; Voting System
              </Typography>
            </Box>
          </RootStyleClose>
        </>
      )}
    </>
  );
}
