import Box from "@mui/joy/Box";
import { Card } from "@mui/material";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";

// import boderimage from "../../assets/images/GIOI THIEU - KHUNG TEXT 1.png";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import Logo1 from "assets/images/Group 9.png";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getDesiginHome } from "context/redux/action/action";
import { borderRadius } from "polished";

export default function Section2() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [is125Percent, setIs125Percent] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIs125Percent(window.innerWidth <= 1250);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const callAPI = async () => {
      await dispatch(getDesiginHome());
    };
    callAPI();
  }, []);
  const designhome = useSelector((state) => {
    return state.designhome;
  });
  return (
    <section id="section-2">
      <>
        <Box
          display="flex"
          mt={isMobile ? "-6rem" : "1rem"}
          justifyContent="center"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }} // Flex direction sẽ thay đổi khi trên web hoặc mobile
          style={{
            borderRadius: "20px",
            border: "2px solid white",
          }}
        >
          <img
            src="https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/bekdizg3bqwbffiauchc"
            // {designhome.logo2}
            alt="Logo"
            style={{
              padding: "2rem",
              width: isMobile ? "20rem" : is125Percent ? "30rem" : "36rem",
              height: "auto",
              marginTop: isMobile ? "-1rem" : is125Percent ? "1rem" : "1rem",
              height: "auto",
              marginLeft: isMobile ? "0%" : is125Percent ? "3%" : "3%",
            }}
          />
          <Box
            sx={{
              width: "100%",
              position: "relative",
              overflow: { xs: "initial", sm: "initial" }, // Overflow thay đổi khi trên web hoặc mobile
              marginTop: isMobile ? "-6rem" : "-1rem",
              marginRight: isMobile ? "3rem" : "9.2rem",
              marginLeft: isMobile ? "15%" : is125Percent ? "10%" : "15%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                display: "block",
                width: "1px",
                left: "500px",
                top: "-24px",
                bottom: "-24px",
                "&::before": {
                  top: "4px",
                  display: "block",
                  position: "absolute",
                  right: "0.5rem",
                  color: "text.tertiary",
                  fontSize: "sm",
                  fontWeight: "lg",
                },
                "&::after": {
                  top: "4px",
                  display: "block",
                  position: "absolute",
                  left: "0.5rem",
                  color: "white",
                  fontSize: "sm",
                  fontWeight: "lg",
                },
              }}
            />
            <Card
              orientation="horizontal"
              sx={{
                width: "90%",
                flexWrap: "wrap",
                [`& > *`]: {
                  "--stack-point": "500px",
                  minWidth:
                    "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                },
                overflow: "auto",
                resize: "horizontal",
                position: "relative", // Thêm thuộc tính position: "relative"
                backgroundColor: "transparent", // Đặt màu nền của card là trong suốt
                boxShadow: "none",

                backgroundSize: "100% 100%",
              }}
            >
              <CardContent>
                <Sheet
                  sx={{
                    borderRadius: "sm",
                    p: 7.5,
                    my: 1.5,
                    mt: 0,
                    display: "flex",
                    alignItems: "center", // Canh giữa dọc
                    justifyContent: "center", // Canh giữa ngang
                    gap: 1,
                    "& > div": { flex: 1 },
                    backgroundColor: "transparent",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      marginTop: isMobile ? "1rem" : is125Percent ? "1rem" : "-2rem",
                    }}
                  >
                    <Typography
                      fontSize={isMobile ? "30px" : is125Percent ? "40px" : "60px"} // Kích thước font chữ thay đổi khi trên web hoặc mobile
                      sx={{
                        whiteSpace: "nowrap",
                        color: designhome.textColor,
                        fontFamily: "VLABRAHAMLINCOLN",
                        textAlign: "start", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      Các mốc thời gian
                    </Typography>

                    <Typography
                      level="body"
                      fontWeight="normal"
                      fontSize={isMobile ? "15px" : is125Percent ? "20px" : "27px"} // Kích thước font chữ thay đổi khi trên web hoặc mobile
                      sx={{
                        color: designhome.textColor,
                        fontFamily: "UTM Swiss Condensed Regular",
                        // Đặt font chữ tùy chỉnh
                        marginTop: isMobile ? "0rem" : "0.5rem",
                        marginLeft: isMobile ? "5%" : is125Percent ? "1rem" : "2rem",
                        textAlign: "start", // Căn giữa nội dung
                      }}
                    >
                      {/* {designhome.description2?.split(".").map((sentence, index) => (
                        <React.Fragment key={index}>
                          {index > 0} 
                          {sentence}
                          <br /> 
                        </React.Fragment>
                      ))} */}

                      <li>Bình chọn</li>
                      <li>Kết thúc bình chọn</li>
                      <li>Công bố top 10</li>
                      <li>Vinh danh top 10</li>
                    </Typography>
                  </div>
                </Sheet>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </>
    </section>
  );
}
