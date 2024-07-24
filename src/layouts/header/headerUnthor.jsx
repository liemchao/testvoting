import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logos/LogoFVS.svg";
import CardMedia from "@mui/material/CardMedia";
import { Authen } from "context/authenToken/AuthenToken";
import AccountPopover from "components/Layout/AccountPopover";
//----------------------------------------------------------------

export default function HeaderUnthor() {
  const navigate = useNavigate();
  const { token, decode } = React.useContext(Authen);
  const hanldeNavigate = () => {
    navigate("/authentication/sign-in");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: "1rem",
        marginTop: "1rem",
        marginLeft: "3rem",
        marginRight: "3rem",
        "@media(max-width: 768px)": {
          marginLeft: "0",
          marginRight: "0",
          padding: "1rem",
          marginTop: "2rem",
          marginBottom: "2rem",
        },
      }}
    >
      <AppBar position="static" sx={{ bgcolor: "white", borderRadius: "2rem", padding: "1rem" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            "@media(max-width: 768px)": {
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CardMedia
              component="img"
              sx={{
                height: "6rem",
                width: "10rem",
                marginRight: "1rem",
              }}
              image={logo}
              alt="green iguana"
            />
            <Typography variant="h2" component="div" sx={{ flexGrow: 1, color: "black" }}>
              Voting System
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "@media(max-width: 768px)": { marginTop: "1rem" },
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, gap: 4 }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }}>
                Trang chủ
              </Typography>
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, gap: 4 }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: "1%", color: "black" }}>
                Tính năng
              </Typography>
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, gap: 4 }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: "1%", color: "black" }}>
                Hỗ Trợ
              </Typography>
            </IconButton>
            {token ? (
              <AccountPopover />
            ) : (
              <ButtonCustomize
                nameButton="Đăng nhập"
                border="10px"
                borderRadius={"25px"}
                bgColor="#F6911B"
                width="100px"
                height="2.2rem"
                boxShadow="2"
                color="white"
                to="/authentication/sign-in"
                onClick={() => hanldeNavigate()}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
