import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
const VotingRules = () => {
  const theme = useTheme();
  const [showMore, setShowMore] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleHideMore = () => {
    setShowMore(false);
  };
  const design = useSelector((state) => {
    return state.design;
  });
  return (
    <Container sx={{ marginTop: isMobile ? "-1rem" : "-5rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "transparent",
              position: "relative",
              border: "none",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: design.textColor,
                fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
                "@media (max-width: 600px)": {
                  fontSize: "1.2rem",
                  // Kích thước chữ khi màn hình nhỏ hơn 600px
                },
                "@media (max-width: 1250px)": {
                  fontSize: "1.2rem",
                },
              }}
            >
              Quy tắc bình chọn:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: design.textColor,
                fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
                "@media (max-width: 600px)": {
                  fontSize: "1.2rem",
                  // Kích thước chữ khi màn hình nhỏ hơn 600px
                },
                "@media (max-width: 1250px)": {
                  fontSize: "1.2rem",
                },
              }}
            >
              1 sinh viên có 1 lần tham gia với 3 phiếu bình chọn.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: design.textColor,
                fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                "@media (max-width: 600px)": {
                  fontSize: "1.2rem",
                  // Kích thước chữ khi màn hình nhỏ hơn 600px
                },
                "@media (max-width: 1250px)": {
                  fontSize: "1.2rem",
                },
              }}
            >
              1 lượt bình chọn dành cho 1 giảng viên.
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontStyle={"italic"}
              sx={{
                color: design.textColor,
                fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                "@media (max-width: 600px)": {
                  fontSize: "1.1rem",
                  // Kích thước chữ khi màn hình nhỏ hơn 600px
                },
                "@media (max-width: 1250px)": {
                  fontSize: "1.1rem",
                },
              }}
            >
              Quy tắc tính điểm phụ thuộc vào giai đoạn học của sinh viên:
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{
                backgroundColor: "transparent",
                position: "relative",
                border: "none",
                marginTop: "-1rem",
              }}
            >
              <Grid
                item
                xs={4}
                sx={{
                  backgroundColor: "transparent",
                  position: "relative",
                  border: "none",
                  "@media (max-width: 600px)": {
                    xs: 12,
                  },
                }}
              >
                <Card
                  sx={{
                    marginTop: "-1%",
                    backgroundColor: "transparent",
                    backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/sjwd61p3aomt6edqu6sf")`,
                    backgroundSize: "100% 100%",
                    border: "none",
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      Giai đoạn
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      DỰ BỊ
                    </Typography>
                    <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Grid item>
                        <FavoriteIcon
                          sx={{
                            color: "#EBB600",
                            fontSize: 30,
                            "@media (max-width: 600px)": {
                              fontSize: "1.2rem",
                              // Kích thước chữ khi màn hình nhỏ hơn 600px
                            },
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <FavoriteIcon
                          sx={{
                            color: "#EBB600",
                            fontSize: 30,
                            "@media (max-width: 600px)": {
                              fontSize: "1.2rem",
                              // Kích thước chữ khi màn hình nhỏ hơn 600px
                            },
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <FavoriteIcon
                          sx={{
                            color: "#EBB600",
                            fontSize: 30,
                            "@media (max-width: 600px)": {
                              fontSize: "1.2rem",
                              // Kích thước chữ khi màn hình nhỏ hơn 600px
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h5"
                      sx={{
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      3 giảng viên
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      nhóm môn chung
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  backgroundColor: "transparent",
                  position: "relative",
                  border: "none",
                  "@media (max-width: 600px)": {
                    xs: 6,
                    // Thay đổi kích thước card khi màn hình nhỏ hơn 600px
                  },
                }}
              >
                <Card
                  sx={{
                    "@media (max-width: 1250px)": {
                      height: "87%",
                      marginTop: "-1%",
                    },
                    backgroundColor: "transparent",
                    backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/sjwd61p3aomt6edqu6sf")`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: 20,
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      Giai đoạn
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        fontSize: 20,
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      CHUYÊN NGÀNH
                    </Typography>
                    <Typography
                      variant="body"
                      fontWeight="bold"
                      sx={{
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      (HK1 - HK6)
                    </Typography>
                    <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Grid item>
                        <FavoriteIcon
                          sx={{
                            color: "#EBB600",
                            fontSize: 30,
                            "@media (max-width: 600px)": {
                              fontSize: "1.2rem",
                              // Kích thước chữ khi màn hình nhỏ hơn 600px
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h5"
                      sx={{
                        marginTop: "-0.5rem",
                        fontSize: 20,
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      1 giảng viên
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        fontSize: 20,
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      nhóm môn chung
                    </Typography>
                    <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Grid item>
                        <FavoriteIcon
                          sx={{
                            color: "#EBB600",
                            fontSize: 30,
                            "@media (max-width: 600px)": {
                              fontSize: "1.2rem",
                              // Kích thước chữ khi màn hình nhỏ hơn 600px
                            },
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <FavoriteIcon
                          sx={{
                            color: "#EBB600",
                            fontSize: 30,
                            "@media (max-width: 600px)": {
                              fontSize: "1.2rem",
                              // Kích thước chữ khi màn hình nhỏ hơn 600px
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h5"
                      sx={{
                        marginTop: "-0.5rem",
                        "@media (max-width: 1250px)": {
                          fontSize: "20px",
                        },
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      2 giảng viên
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      chuyên ngành
                    </Typography>
                    <Typography
                      visibility="hidden"
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        fontSize: 20,
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      chuyên ngành
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  backgroundColor: "transparent",
                  position: "relative",
                  border: "none",
                  "@media (max-width: 600px)": {
                    xs: 6,
                    // Thay đổi kích thước card khi màn hình nhỏ hơn 600px
                  },
                  "@media (max-width: 1250px)": {
                    paddingBottom: "5rem",
                  },
                }}
              >
                <Card
                  sx={{
                    marginTop: "-1%",
                    backgroundColor: "transparent",
                    backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/sjwd61p3aomt6edqu6sf")`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      Giai đoạn
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      CHUYÊN NGÀNH
                    </Typography>
                    <Typography
                      variant="body"
                      fontWeight="bold"
                      sx={{
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      (HK7 - HK9)
                    </Typography>
                    <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Grid item>
                        <FavoriteIcon
                          sx={{
                            color: "#EBB600",
                            fontSize: 30,
                            "@media (max-width: 600px)": {
                              fontSize: "1.2rem",
                              // Kích thước chữ khi màn hình nhỏ hơn 600px
                            },
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <FavoriteIcon
                          sx={{
                            color: "#EBB600",
                            fontSize: 30,
                            "@media (max-width: 600px)": {
                              fontSize: "1.2rem",
                              // Kích thước chữ khi màn hình nhỏ hơn 600px
                            },
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <FavoriteIcon
                          sx={{
                            color: "#EBB600",
                            fontSize: 30,
                            "@media (max-width: 600px)": {
                              fontSize: "1.2rem",
                              // Kích thước chữ khi màn hình nhỏ hơn 600px
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h5"
                      sx={{
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      3 giảng viên
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: design.textColor,
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                        "@media (max-width: 600px)": {
                          fontSize: "10px",
                          // Kích thước chữ khi màn hình nhỏ hơn 600px
                        },
                      }}
                    >
                      chuyên ngành
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VotingRules;
