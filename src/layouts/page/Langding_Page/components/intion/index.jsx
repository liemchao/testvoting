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
import React, { useEffect } from "react";

export default function Section3() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
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
              width: isMobile ? "15rem" : "30rem",
              marginRight: "9.2rem",
              marginTop: "2%",
              height: "auto",
              marginLeft: isMobile ? "40%" : "3%",
            }}
          />
          <Box
            sx={{
              width: "100%",
              position: "relative",
              overflow: { xs: "initial", sm: "initial" }, // Overflow thay đổi khi trên web hoặc mobile
              marginTop: isMobile ? "1rem" : "-1rem",
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
                      fontSize={{ xs: "30px", sm: "60px" }} // Kích thước font chữ thay đổi khi trên web hoặc mobile
                      sx={{
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
                      fontSize={{ xs: "15px", sm: "25px" }} // Kích thước font chữ thay đổi khi trên web hoặc mobile
                      sx={{
                        marginLeft: "2rem",
                        color: designhome.textColor,
                        fontFamily: "UTM Swiss Condensed Regular",
                        // Đặt font chữ tùy chỉnh
                        marginTop: isMobile ? "0.3rem" : "0rem",
                        textAlign: "start", // Căn giữa nội dung
                        textIndent: isMobile ? "-1.5rem" : "0.1rem",
                      }}
                    >
                      <li>
                        Top 10 giảng viên đạt danh hiệu{" "}
                        <strong>"Inspiring Instructor Awards"</strong> sẽ được vinh danh trong buổi
                        lễ trang trọng tại Đại học FPT campus Thành phố Hồ Chí Minh.
                      </li>
                      <li>
                        Trao tặng<strong> bộ quà tặng danh riêng cho danh hiệu này.</strong>
                      </li>
                      {/* {designhome.description4?.split(".").map((sentence, index) => {
                        console.log(sentence);
                        return (
                          <React.Fragment>
                            {index > 0} 
                            {sentence}
                            <br /> 
                          </React.Fragment>
                        );
                      })} */}

                      {/* <li>
                        Top 10 giảng viên đạt danh hiệu{" "}
                        <strong>"Inspiring Instructor Awards"</strong> sẽ được vinh danh tại ngày
                        hội Convocation Day.
                      </li> */}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 3,
                        mt: 2,
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    ></Box>
                    <div style={{ visibility: "hidden" }}>
                      <ButtonLangding
                        height={"3.5rem"}
                        width={"15rem"}
                        nameButton="THAM GIA"
                        bgColor="#d44fac"
                        borderRadius={"50px"}
                      />
                    </div>
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
