import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
  IconButton,
  Container,
} from "@mui/material";

import navConfig from "./NavConfig";
import NavSection from "./NavSection";
import useResponsive from "./useResponsive";
import Scrollbar from "./Scrollbar";
import { Authen } from "../../context/authenToken/AuthenToken";
import logo from "../../assets/images/logos/LogoFVS.svg";
import Iconify from "assets/theme/components/icon/Iconify";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 260;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  onOpenSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const getIcon = (name) => <Iconify icon={name} width={50} height={50} color="white" />;

  const { pathname } = useLocation();

  const { decode } = useContext(Authen);

  const isDesktop = useResponsive("up", "lg");

  // useEffect(() => {
  //   if (isOpenSidebar) {
  //     onCloseSidebar();
  //   }
  // }, [pathname]);

  const renderContent = (
    // <Scrollbar
    //   sx={{
    //     height: 1,
    //     "& .simplebar-content": {
    //       height: 1,
    //       // display: "flex",
    //       // flexDirection: "column",
    //     },
    //   }}
    // >
    <>
      <Box sx={{ mx: 2, visibility: "hidden" }}>
        <Link underline="none" component={RouterLink} to="campaign">
          <AccountStyle>
            <Avatar sx={{ width: 50, height: 120 }} src={logo} />
            <Box sx={{ ml: 1 }}></Box>
          </AccountStyle>
        </Link>
      </Box>
      <NavSection navConfig={navConfig} />
    </>
    // </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              backgroundImage: `url("${"https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/w7laacajw71xpbvsmvue"}")`,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              backgroundImage: `url("${"https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/w7laacajw71xpbvsmvue"}")`,
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
