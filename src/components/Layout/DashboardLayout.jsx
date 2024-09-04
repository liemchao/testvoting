import { useCallback, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { Box, IconButton } from "@mui/material";
import Iconify from "assets/theme/components/icon/Iconify";
import DashboardFooter from "./DashboardFooter";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { id } = useParams();
  const design = useSelector((state) => {
    return state.design;
  });
  const [open, setOpen] = useState(false);
  const RootStyle = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
    backgroundImage:
      id == 10
        ? `url("https://res.cloudinary.com/dxevluwyr/image/upload/v1694155547/BackGround_xhgdfp.png?fbclid=IwAR39NUtxnEeju10pZTzJFAqpQiDKjpW2are7Q_MAfYpZVf50ca-jnF-rmXo")`
        : `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/ijbissnt3d2gu1gru8zc")`,
    backgroundColor: "transparent",

    backgroundSize: "100% 100%",
    backgroundPosition: "center",
  });

  const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("lg")]: {
      paddingTop: APP_BAR_DESKTOP + 24,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: "20%",
            right: 0,
          }}
        >
          <DashboardFooter />
        </Box>
      </MainStyle>
    </RootStyle>
  );

  /* ) : (
        <RootStyleClose>
          <DashboardNavbar onOpenSidebar={() => setOpen(false)} />
          <DashboardSidebar
            open={open}
            handleClickOpen={handleClickOpen}
            onOpenSidebar={() => setOpen(true)}
            onCloseSidebar={() => setOpen(false)}
          />
          <MainStyle>
            <Outlet />
          </MainStyle>
          <DashboardFooter />
        </RootStyleClose>
      )} */
}

// <RootStyle>
//   <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
//   <DashboardSidebar
//     open={open}
//     handleClickOpen={handleClickOpen}
//     onOpenSidebar={() => setOpen(true)}
//     onCloseSidebar={() => setOpen(false)}
//   />
//   <MainStyle>
//     <Outlet />
//   </MainStyle>
// </RootStyle>

// <Box
//   sx={{
//     position: "fixed",
//     bottom: 0,
//     left: "20%",
//     right: 0,
//   }}
// >
//   <DashboardFooter />
// </Box>;
