import { useContext, useEffect, useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from "@mui/material";
import MenuPopover from "./MenuPopover";
import { useDispatch, useSelector } from "react-redux";
import { Authen } from "../../context/authenToken/AuthenToken";
// ----------------------------------------------------------------------
import jwt_decode from "jwt-decode";
import Iconify from "assets/theme/components/icon/Iconify";
import LogoutIcon from "@mui/icons-material/Logout";
import { getImageUser } from "context/redux/action/action";
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const MENU_OPTIONS = [
  {
    label: "Trang chủ",
    icon: getIcon("eva:home-fill"),
    linkTo: "/",
  },
  {
    label: "Thông tin cá nhân",
    icon: getIcon("eva:person-fill"),
    linkTo: "/profile",
  },
];

// ----------------------------------------------------------------------

const WIDTH = 170;

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  // const { token } = useContext(Authen);
  const token = localStorage.getItem("token");
  const design = useSelector((state) => {
    return state.design;
  });
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

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

  // useEffect(() => {
  //   dispatch(getImageUser((hanldenullToken()[0]?.Username || hanldenullToken()[0]?.Email)),);
  // }, [token]);

  // const detailCandate = useSelector((state) => {
  //   return state.candidateOne;
  // });

  const handleClose = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("campaignId");
    navigate("/");
  };
  const handleCloseNotion = (event) => {
    setOpen(!open);
  };
  return (
    <>
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
          src={hanldenullToken()[0]?.Avatar || hanldenullToken()[0]?.Photo}
          alt="photoURL"
          sx={{
            zIndex: "modal",
            position: "absolute",
            left: `${
              (hanldenullToken()[0]?.Username || hanldenullToken()[0]?.Email)?.length * 0.03
            }%`,
            // left: 3,
          }}
        />
        <Box
          paddingLeft="3rem"
          paddingTop="0.2em"
          sx={{
            width: `${
              (hanldenullToken()[0]?.Username || hanldenullToken()[0]?.Email)?.length * 20
            }%`,
            height: 40,
            borderRadius: 4,
            zIndex: "toolip",
            marginRight: "2%",
          }}
        >
          <Typography variant="h5">
            {/* {hanldenullToken()[0]?.Username || hanldenullToken()[0]?.Email} */}
          </Typography>
        </Box>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseNotion}
        sx={{
          backgroundImage: `url("${"https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/w7laacajw71xpbvsmvue"}")`,
          overflow: "hidden",
          backgroundColor: "transparent",

          backgroundSize: "100% 100%",
          backgroundPosition: "center",
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
          <Typography
            variant="h8"
            fontWeight="bold"
            sx={{
              color: "white",
              fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
            }}
            noWrap
          >
            {hanldenullToken()[0]?.Username}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "white",
              //   color: design.textColor,
              fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
            }}
            noWrap
          >
            Người bình chọn
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
              sx={{
                color: "white",
                // color: design.textColor,
                fontFamily: "UTM Swiss Condensed Regular",
                fontWeight: "bold",
              }}
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
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "white",
              //   color: design.textColor,
              fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
            }}
          >
            Đăng xuất
          </Typography>
          <LogoutIcon sx={{ marginLeft: 2, color: "white" }} />
        </MenuItem>
      </MenuPopover>
    </>
  );
}
