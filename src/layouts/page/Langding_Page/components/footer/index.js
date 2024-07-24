import styled from "@emotion/styled";
import { Grid, List, ListItemText, Typography, Button, Stack, Container } from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../../styles/theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SubscribeTf, FooterTitle } from "../../styles/footer";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link } from "react-router-dom";
function Copyright(props) {
  return (
    <Typography fontSize="20px" variant="body" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" to={"/"}>
        Voting system
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        color: Colors.black,
        p: { xs: 2, md: 10 }, // Điều chỉnh padding theo kích thước màn hình
        pt: 1,
        pb: 1,
        fontSize: { xs: "12px", md: "14px" },
        mt: { xs: "2rem", md: "3rem" }, // Điều chỉnh margin-top theo kích thước màn hình
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={6}>
          <FooterTitle
            variant="h4"
            fontWeight="bold"
            sx={{
              fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
            }}
          >
            Liên hệ
          </FooterTitle>
          <List>
            <ListItemText>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                }}
              >
                <a
                  href="https://www.facebook.com/srofptuhcmc?mibextid=ZbWKwL"
                  target="_blank"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FacebookIcon sx={{ marginRight: 1 }} />
                    <span>Phòng CTSV ĐH FPT TPHCM</span>
                  </Box>
                </a>
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2"></Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                lineHeight={3}
                variant="h6"
                sx={{
                  fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      display: "flex",
                      width: 25,
                      height: 25,
                      borderRadius: "20%",
                      backgroundColor: "black",
                      marginRight: 10,
                    }}
                  >
                    <MailOutlineIcon style={{ mt: "-10px", color: "white" }} />
                  </span>
                  <span>anltd@fe.edu.vn</span>
                </span>
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item xs={12} md={6} lg={6} sx={{ textAlign: "right" }}>
          <Copyright
            sx={{
              position: "relative",
              float: "right",
              "& > span": {
                marginLeft: "8px",
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
