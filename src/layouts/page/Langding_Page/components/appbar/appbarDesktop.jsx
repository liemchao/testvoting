import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from "@mui/material";
import { AppbarContainer, AppbarHeader, MyList } from "../../styles/appbar";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import Actions from "./actions";
import { useUIContext } from "../../context/ui";
import { useRef } from "react";
import { useState } from "react";
import MenuPopover from "components/Layout/MenuPopover";
import Iconify from "assets/theme/components/icon/Iconify";
import LogoutIcon from "@mui/icons-material/Logout";
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
import Logo from "assets/images/Logo_main.png";
import Logo2 from "assets/images/styled pink.png";
import Logo1 from "assets/images/full.png";
import { useSelector } from "react-redux";
const MENU_OPTIONS = [
  {
    label: "Thông tin cá nhân",
    icon: getIcon("eva:person-fill"),
    linkTo: "/user/profile",
  },
];

export default function AppbarDesktop({ matches }) {
  const { setShowSearchBox } = useUIContext();
  const anchorRef = useRef(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  // const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const hanldenullToken = () => {
    const isNonPeople = "Ẩn danh";
    const arr = [];
    if (token === null || token === undefined || !token) {
      return isNonPeople;
    } else {
      const decode = jwt_decode(token);
      arr.push(decode);
      return arr;
    }
  };
  hanldenullToken();

  const handleClose = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleCloseNotion = (event) => {
    setOpen(!open);
  };
  const design = useSelector((state) => {
    return state.design;
  });
  return (
    <AppbarContainer>
      {/* <AppbarHeader color="white" variant="h3">
        bình chọn{" "}
      </AppbarHeader> */}
      <MyList type="row" sx={{ display: "flex", alignItems: "center", marginTop: "1.5%" }}>
        <img
          src={design.icon}
          alt="Logo"
          style={{
            width: "70%",
            height: "auto",
            position: "absolute",
            left: 0,
            transform: "translateX(0)",
          }}
        />
      </MyList>
      {token ? (
        <Box sx={{ marginTop: "1rem" }}>
          <IconButton
            ref={anchorRef}
            onClick={handleOpen}
            disableRipple
            sx={{
              variant: "contained",
              py: "-200px",

              ...(open && {
                "&:before": {
                  variant: "contained",
                },
              }),
              "&.MuiIconButton-root": {
                ":hover": { backgroundColor: "transparent" },
              },
            }}
          >
            <Avatar
              src={hanldenullToken()[0]?.Photo}
              alt="photoURL"
              sx={{
                zIndex: "modal",
                position: "absolute",
                color: "white",
                left: `${hanldenullToken()[0]?.Username?.length * 0.03}%`,
                // left: 3,
              }}
            />
            <Box
              paddingLeft="3rem"
              paddingTop="0.2em"
              sx={{
                // width: `${(decode?.Username || decode?.Email)?.length * 20}%`,
                height: 40,
                borderRadius: 4,
                zIndex: "toolip",
                marginRight: "2%",
              }}
            >
              <Typography color={"white"} variant="h5">
                {hanldenullToken()[0]?.Username}
              </Typography>
            </Box>
          </IconButton>

          <MenuPopover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseNotion}
            sx={{
              p: 0,
              mt: 1.5,
              ml: -5,
              "&.MuiMenuItem-root": {
                typography: "body2",
                borderRadius: 0.75,
              },
            }}
          >
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {/* {hanldenullToken()[0]?.Username} */}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
                {hanldenullToken()[0]?.RoleName}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Stack sx={{ p: 1 }}>
              {MENU_OPTIONS.map((option) => (
                <MenuItem
                  key={option.label}
                  to={option.linkTo}
                  component={RouterLink}
                  onClick={handleCloseNotion}
                >
                  {option.icon} {option.label}
                </MenuItem>
              ))}
              {/* <MenuItem component={RouterLink} to="/profile">
               Profile
             </MenuItem> */}
            </Stack>

            <Divider sx={{ borderStyle: "dashed" }} />

            <MenuItem onClick={handleClose} sx={{ m: 1 }}>
              Đăng xuất
              <LogoutIcon sx={{ marginLeft: 2 }} />
            </MenuItem>
          </MenuPopover>
        </Box>
      ) : (
        <>
          <Actions matches={matches} />
        </>
      )}
    </AppbarContainer>
  );
}
