import Box from "@mui/joy/Box";
import { Card } from "@mui/material";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

// import boderimage from "../../assets/images/GIOI THIEU - KHUNG TEXT 1.png";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import Logo1 from "assets/images/award.png";

// import các icon từ '@mui/icons-material'
import { Assessment, CheckCircle, Security } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { getDesiginHome } from "context/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

export default function Section3() {
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
          style={{ width: "100%", border: "2px solid white", borderRadius: "20px" }}
        >
          <img
            src="https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/mfejvdv2dtpkzhy2mg3w"
            // src={designhome.logo4}
            alt="Logo"
            style={{
              width: isMobile ? "15rem" : is125Percent ? "25rem" : "30rem",
              height: "auto",
              marginTop: isMobile ? "1rem" : is125Percent ? "1%" : "2%",
              height: "auto",
              marginLeft: isMobile ? "40%" : is125Percent ? "2%" : "3%",
              marginRight: "9.2rem",
            }}
          />
          <Box
            sx={{
              width: "100%",
              position: "relative",
              overflow: { xs: "initial", sm: "initial" }, // Overflow thay đổi khi trên web hoặc mobile
              marginTop: isMobile ? "-7%" : "-1rem",
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
                  <div style={{ marginTop: "-2rem" }}>
                    <Typography
                      fontSize={isMobile ? "30px" : is125Percent ? "40px" : "60px"} // Kích thước font chữ thay đổi khi trên web hoặc mobile
                      sx={{
                        whiteSpace: "nowrap",
                        color: designhome.textColor,
                        fontFamily: "VLABRAHAMLINCOLN",
                        textAlign: "start", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      Vinh danh top 10 giảng viên
                    </Typography>

                    <Typography
                      level="body"
                      fontWeight="normal"
                      fontSize={isMobile ? "15px" : is125Percent ? "20px" : "27px"}
                      sx={{
                        marginLeft: "2rem",
                        color: designhome.textColor,
                        fontFamily: "UTM Swiss Condensed Regular",
                        marginTop: isMobile ? "0.3rem" : "0rem",
                        textAlign: "start",
                      }}
                    >
                      <ul>
                        <li>
                          Top 10 giảng viên đạt danh hiệu{" "}
                          <strong>"Inspiring Instructor Awards"</strong> sẽ được vinh danh trong
                          ngày hội Convocation Day tại Đại học FPT cơ sở Hồ Chí Minh.
                        </li>
                        <li>
                          Trao tặng <strong>bộ quà tặng dành riêng cho danh hiệu này.</strong>
                        </li>
                      </ul>
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
