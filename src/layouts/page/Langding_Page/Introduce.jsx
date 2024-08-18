import * as React from "react";
import ThemeProvider from "theme/index.js";
import theme from "assets/theme";
import Appbar from "./components/appbar";
import { Container, Stack, useMediaQuery } from "@mui/material";
import AppDrawer from "./components/drawer";
import { UIProvider } from "./context/ui";
import Footer from "./components/footer";
import BannerLeft from "./components/banner/bannerleft";
import Section2 from "./components/feature";
import Section3 from "./components/intion";
import MyComponent from "./components/search";
import Select2 from "./components/search";
import Select3 from "./components/search";
import ScrollToTopButton from "../user/Form/Voter/List Candidate/scollpage";
import { getDesigin } from "context/redux/action/action";
import { useDispatch, useSelector } from "react-redux";

//----------------------------------------------------------------

export default function IntroducePage() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(getDesigin());
    };
    callAPI();
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
        backgroundSize: "cover",
      }}
    >
      <Stack sx={{ gap: isMobile ? "3rem" : "0px" }}>
        <UIProvider>
          <Appbar />
          <BannerLeft />
          <Section2 />
          <Select3 />
          <Section3 />
          <Footer />
          <AppDrawer />
        </UIProvider>
        <ScrollToTopButton />
      </Stack>
    </Container>
  );
}
