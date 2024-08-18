import * as React from "react";
import ThemeProvider from "theme/index.js";
import theme from "assets/theme";
import Appbar from "./components/appbar";
import Promotions from "./components/promotions";
import Products from "./components/products";
import { Container, Typography, Box, Stack } from "@mui/material";
import AppDrawer from "./components/drawer";
import { UIProvider } from "./context/ui";
import Footer from "./components/footer";
// import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PromotionCarousel from "./components/campaign";
import MyTimeline from "./components/timeline";
import CountdownTimer from "./components/timecount";
import VotingRules from "./components/rules";
import ImageThele from "../../../assets/images/THỂ LỆ THAM GIA.png";
import ImageMocTime from "../../../assets/images/MỐC THỜI GIAN.png";
import ImageTimeCount from "../../../assets/images/THỜI GIAN CÒN LẠI.png";
import ImageCampaign from "../../../assets/images/Chien dich dang dien ra.png";
import { useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-scroll";
import ScrollToTopButton from "../user/Form/Voter/List Candidate/scollpage";
import ScrollToTopButtonTop from "../user/Form/Voter/List Candidate/scollLandingPage";
import { useDispatch, useSelector } from "react-redux";
import { getDesigin } from "context/redux/action/action";
//----------------------------------------------------------------

export default function LangdingPage() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(getDesigin());
    };
    callAPI();
  }, []);

  const styles = {
    section: {
      position: "relative",
      cursor: "pointer",
    },
    heading: {
      position: "relative",
      display: "inline-block",
    },
    arrow: {
      position: "absolute",
      top: "50%",
      right: "-10px",
      transform: "translateY(-50%)",
    },
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [is125Percent, setIs125Percent] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIs125Percent(window.innerWidth <= 1250);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const design = useSelector((state) => {
    return state.design;
  });

  return (
    <Container
      maxWidth="none"
      sx={{
        background: "#fff",
        backgroundImage: `url("${design.backgroundImage}")`,
        backgroundSize: "cover", // Thêm thuộc tính backgroundSize với giá trị "cover"
      }}
    >
      <Stack sx={{ gap: 1 }}>
        <UIProvider>
          <Appbar />
          <Promotions />
          <Box
            sx={{
              mt: "-2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ExpandMoreIcon
              sx={{
                visibility: "hidden",
                fontSize: "100px",
              }}
            />
            <ExpandMoreIcon
              sx={{
                visibility: "hidden",
                fontSize: "100px",
              }}
            />

            <ScrollToTopButtonTop />
          </Box>
          <Box display="flex" justifyContent="center" sx={{ p: 10, visibility: "hidden" }}></Box>

          {/* <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
              <Typography variant="h2">Ứng cử viên</Typography>
            </Box>
            <Products /> */}
          {/* <BannerLeft />
            <Section2 />
            <SearchBox /> */}
          <Box
            id="section2"
            display="flex"
            justifyContent="center"
            sx={{ p: 1, marginTop: isMobile ? "-20rem" : "-14rem" }}
          >
            <img
              style={{
                width: isMobile ? "90%" : is125Percent ? "30%" : "38%",
              }}
              src={ImageThele}
            ></img>
          </Box>
          <VotingRules />
          <Box display="flex" justifyContent="center" sx={{ p: 10, visibility: "hidden" }}></Box>

          <Box
            id="section3"
            sx={{
              // backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/sjwd61p3aomt6edqu6sf")`,
              backgroundSize: "100% 100%",
              mt: isMobile ? -16 : -2,
            }}
          >
            <Box display="flex" justifyContent="center" sx={{ p: 1, mt: "-1%" }}>
              <img style={{ width: isMobile ? "100%" : "40%" }} src={ImageMocTime}></img>
            </Box>
            <MyTimeline />
          </Box>
          <Box display="flex" justifyContent="center" sx={{ p: 10, visibility: "hidden" }}></Box>

          <Box
            sx={{
              // backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/sjwd61p3aomt6edqu6sf")`,
              backgroundSize: "100% 100%",
            }}
          >
            <Box
              id="section4"
              display="flex"
              justifyContent="center"
              sx={{ p: 2, mt: isMobile ? -3 : 5 }}
            >
              <img style={{ width: isMobile ? "100%" : "37%" }} src={ImageTimeCount}></img>
            </Box>
            <CountdownTimer />
            <Box display="flex" justifyContent="center" sx={{ p: 2, visibility: "hidden" }}>
              <img src={ImageMocTime}></img>
            </Box>
          </Box>

          {/* <ContactSection /> */}
          <Footer />

          <AppDrawer />
          <ScrollToTopButton />
        </UIProvider>
      </Stack>
    </Container>
  );
}
