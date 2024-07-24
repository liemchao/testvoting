import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Container, styled } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HeaderUnthor from "layouts/header/headerUnthor";
import Iconify from "assets/theme/components/icon/Iconify";
import logo from "assets/images/logos/LogoFVS.svg";
//----------------------------------------------------------------
import { useTheme, useMediaQuery } from "@mui/material";

export default function PrimarySearchAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const currentYear = new Date().getFullYear();
  return (
    <>
      <HeaderUnthor />
      <Box
        sx={{
          height: "5%",
          backgroundColor: "#FFFFFF",
          width: "99%",
        }}
      >
        <Badge
          sx={{
            height: "1%",
          }}
        ></Badge>
      </Box>
      <Box sx={{}}>
        <h3 style={{ textAlign: "center", fontStyle: "normal" }}> Vì sao nên chọn chúng tôi ?</h3>
        <h1 style={{ textAlign: "center", maxWidth: "300" }}>
          Chúng tôi để để lại những chiến dịch bình chọn ứng cử viên không thể quên.
        </h1>
        <Container sx={{ display: "flex", marginTop: "2rem" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{
                  borderRadius: "50%",
                  height: "4rem",
                  width: "4rem",
                  marginTop: "0.5rem",
                  marginLeft: "1.5rem",
                  marginRight: "0.5rem",
                }}
                image="https://static.thenounproject.com/png/4038155-200.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Bảo mật thông tin
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Thông tin của các bên liên quan sẽ được bảo mật tyệt đối
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345, marginLeft: "3%" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{
                  borderRadius: "50%",
                  height: "4rem",
                  width: "4rem",
                  marginTop: "0.5rem",
                  marginLeft: "1.5rem",
                  marginRight: "0.5rem",
                }}
                image="https://cdn.icon-icons.com/icons2/2066/PNG/512/check_mark_circle_icon_125343.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lựa chọn dễ dàng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Với giao diện trực quan. Lựa chọn ứng củ viên thật dễ dàng.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345, marginLeft: "3%" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{
                  height: "4rem",
                  width: "4rem",
                  marginTop: "0.5rem",
                  marginLeft: "1.5rem",
                  marginRight: "0.5rem",
                }}
                image="https://cdn-icons-png.flaticon.com/512/684/684833.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Thông tin xác thực
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Người tham gia và các ứng cử viên đều là người thật.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345, marginLeft: "3%" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{
                  height: "4.5rem",
                  width: "4rem",
                  marginTop: "0.5rem",
                  marginLeft: "1.5rem",
                  marginRight: "0.5rem",
                }}
                image="https://img.uxwing.com/wp-content/themes/uxwing/download/crime-security-military-law/shield-checkmark-line-icon.svg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Tính chính xác kết quả
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kết quả của các cuộc bình chọn là chính xác. Không có sự can thiệp
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Container>
        <Box
          sx={{
            height: "5%",
            backgroundColor: "#FFFFFF",
            width: "99%",
            marginTop: "2%",
          }}
        >
          <Badge
            sx={{
              height: "1%",
            }}
          ></Badge>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card
                sx={{
                  maxWidth: 400,
                  marginTop: "2%",
                  backgroundColor: "#5BD1D5",
                  marginLeft: "20%",
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h2" component="div" color="#EFFAFB">
                      8000+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Biểu Mẫu
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card
                sx={{
                  maxWidth: 400,
                  marginTop: "2%",
                  backgroundColor: "#FDF8EB",
                  marginLeft: "35%",
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h2" component="div" color="#E8B63A">
                      10500+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Người dùng
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card
                sx={{
                  maxWidth: 400,
                  marginTop: "2%",
                  backgroundColor: "#FFEEE9",
                  marginLeft: "22%",
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h2" component="div" color="#FF5522">
                      500+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Chiến dịch
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ marginTop: "2%" }} variant="h3" component="div">
                Tại sao nên dùng hệ thống VFS
              </Typography>
              <Typography gutterBottom variant="h5" color="text.secondary">
                Chúng tôi mang đến sự thoải mái phù hợp nhu cầu cho bạn
              </Typography>
              <Typography
                sx={{ marginTop: "2%", maxWidth: 500 }}
                variant="body2"
                color="text.secondary"
              >
                Hệ thống bình chọn của chúng tôi cam kết mang đến sự thoải mái và phù hợp với nhu
                cầu của bạn. Chúng tôi luôn tìm cách cải thiện trải nghiệm của người dùng và đưa ra
                các giải pháp tốt nhất để đáp ứng nhu cầu của khách hàng.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            height: "5%",
            backgroundColor: "#FFFFFF",
            width: "99%",
            marginTop: "2%",
          }}
        >
          <Badge
            sx={{
              height: "1%",
            }}
          ></Badge>
        </Box>
        <Box></Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              variant="h5"
              color="text.secondary"
              sx={{ marginTop: "2%" }}
              textAlign={"center"}
            >
              Những ứng cử viên hàng đầu trong các chiến dịch
            </Typography>
            <Typography
              textAlign={"center"}
              sx={{ marginTop: "2%", maxWidth: 400, marginLeft: "38%" }}
              variant="body2"
              color="text.secondary"
            >
              Trong hệ thống bình chọn, chúng tôi luôn tìm kiếm những ứng cử viên hàng đầu để đảm
              bảo rằng quyền lợi và mong muốn của cộng đồng được đại diện một cách tốt nhất. Chúng
              tôi đánh giá các ứng cử viên dựa trên kinh nghiệm, năng lực, và cam kết của họ đối với
              các vấn đề quan trọng đang diễn ra. Sự lựa chọn của chúng tôi đảm bảo sự đa dạng và sự
              phù hợp với nhu cầu của cộng đồng.
            </Typography>
          </Grid>
          <Container sx={{ display: "flex" }}>
            <Card
              sx={{
                marginTop: "3%",
                backgroundColor: "#E2E8F0",
                width: 170,
                height: 110,
                border: "4px solid white",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            >
              <Avatar
                src="data:image/jpeg;base64,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"
                style={{ width: 100, height: 100, fontSize: 40, marginLeft: "10%" }}
              />
            </Card>
            <Card
              sx={{
                marginTop: "3%",
                backgroundColor: "#E2E8F0",
                width: 170,
                height: 110,
                border: "4px solid white",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            >
              <Avatar
                src="data:image/jpeg;base64,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"
                style={{ width: 100, height: 100, fontSize: 40, marginLeft: "10%" }}
              />
            </Card>
            <Card
              sx={{
                marginTop: "3%",
                backgroundColor: "#E2E8F0",
                width: 170,
                height: 110,
                border: "4px solid white",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            >
              <Avatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80"
                style={{ width: 100, height: 100, fontSize: 40, marginLeft: "10%" }}
              />
            </Card>
            <Card
              sx={{
                marginTop: "3%",
                backgroundColor: "#E2E8F0",
                width: 170,
                height: 110,
                border: "4px solid white",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            >
              <Avatar
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80"
                style={{ width: 100, height: 100, fontSize: 40, marginLeft: "10%" }}
              />
            </Card>
            <Card
              sx={{
                marginTop: "1%",
                backgroundColor: "#E2E8F0",
                width: 210,
                height: 220,
                border: "4px solid white",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            >
              <Avatar
                src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                style={{
                  width: 150,
                  height: 200,
                  fontSize: 40,
                  backgroundColor: "#FDBA74",
                  textAlign: "center",
                  marginLeft: "5%",
                }}
              />
            </Card>
            <Card
              sx={{
                marginTop: "3%",
                backgroundColor: "#E2E8F0",
                width: 170,
                height: 110,
                border: "4px solid white",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            >
              <Avatar
                src="https://www.exibartstreet.com/wp-content/uploads/avatars/2465/5e0de52aeee8b-bpfull.jpg"
                style={{ width: 100, height: 100, fontSize: 40, marginLeft: "10%" }}
              />
            </Card>
            <Card
              sx={{
                marginTop: "3%",
                backgroundColor: "#E2E8F0",
                width: 170,
                height: 110,
                border: "4px solid white",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            >
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTEJcABb9jKdtNRg7y9egskdQ--Kllp7yG0kJP4Ravuo1L5ljoj0_NROdg6sew2YQNh_A&usqp=CAU"
                style={{ width: 100, height: 100, fontSize: 40, marginLeft: "10%" }}
              />
            </Card>
            <Card
              sx={{
                marginTop: "3%",
                backgroundColor: "#E2E8F0",
                width: 170,
                height: 110,
                border: "4px solid white",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            >
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi09myAGaJCeI84VLl3UzkeJkpnzyWF_2p-gYmZhsJFtZbbK5IysL5dDV009q32D3UJNg&usqp=CAU"
                style={{ width: 100, height: 100, fontSize: 40, marginLeft: "10%" }}
              />
            </Card>
            <Card
              sx={{
                marginTop: "3%",
                backgroundColor: "#E2E8F0",
                width: 170,
                height: 110,
                border: "4px solid white",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            >
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVHXtcBfOr6T8TLeArGk595LPMr_1Kq0QLDbFxUCr3Ww-KCK-UfPaRyWyuhzRXAWiUb2w&usqp=CAU"
                style={{ width: 100, height: 100, fontSize: 40, marginLeft: "10%" }}
              />
            </Card>
          </Container>
          <Box
            sx={{
              background: "#DEF6F7",
              margin: "2%",
              borderRadius: "20px",
              width: "100%",
              height: "20%",
              textAlign: "center",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h3"
                  color="text.secondary"
                  sx={{ marginTop: "1%", marginLeft: "7%" }}
                >
                  Chúng tôi có thể giúp gì cho bạn?
                </Typography>

                <Container sx={{ flexDirection: "row" }}>
                  <Typography variant="h6">The VFS</Typography>
                  <Typography
                    sx={{ maxWidth: 400, marginLeft: "32%" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Gửi email để có thể nhận được sử hỗ trợ của chúng tôi.
                  </Typography>
                  <TextField
                    sx={{
                      width: "40ch",
                      marginRight: "3%",
                      marginTop: "2%",
                      marginBottom: "2%",
                    }}
                    id="outlined-basic"
                    label="Email"
                    placeholder="Your emaill address"
                    variant="outlined"
                    color="primary"
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                      },
                    }}
                  />
                  <Button
                    sx={{
                      marginLeft: "1%",
                      marginTop: "2rem",
                      backgroundColor: "#E8B63A",
                      height: "20%",
                      height: "20%",
                    }}
                    variant="contained"
                  >
                    Send
                  </Button>
                </Container>
              </Grid>
              {/* <Grid item xs={6}>
                <Card sx={{ backgroundColor: "#DEF6F7", marginTop: "1%" }}>
                  <CardMedia
                    component="img"
                    alt="My Image"
                    height="180"
                    with="160"
                    image={letterimge}
                    title="My Image"
                  />{" "}
                </Card>
              </Grid> */}
            </Grid>
          </Box>
        </Grid>
        <Box sx={{ marginLeft: "3%", display: "flex" }}>
          <Box>
            <Avatar sx={{ width: "10rem", height: "4rem" }} src={logo} />
            <div>
              <Iconify icon="ic:outline-place" width={22} height={22} color="red" />
              <span style={{ marginLeft: "2%", maxHeight: 400 }}>21/12/Lê Văn Việt</span>
            </div>
            <div>
              <Iconify icon="ph:phone" width={22} height={22} color="red" />
              <span style={{ marginLeft: "2%" }}>0733898497</span>
            </div>
            <div>
              <Iconify icon="ic:outline-email" width={22} height={22} color="red" />
              <span style={{ marginLeft: "2px" }}>liemro9x@gmail.com</span>
            </div>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              <Box>
                <Iconify icon="iconoir:facebook" width={22} height={22} color="#5BA9D5" />
              </Box>
              <Box>
                <Iconify icon="ri:twitter-line" width={22} height={22} color="#E8B63A" />
              </Box>
              <Box>
                <Iconify icon="basil:linkedin-outline" width={22} height={22} color="#5BD1D5" />
              </Box>
              <Box>
                <Iconify icon="ri:youtube-line" width={22} height={22} color="#FF5522" />
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginLeft: "40%", marginRight: "20%" }}>
            <Typography variant="h3">Top Destion</Typography>
            <div>
              <span style={{ marginLeft: 10 }}>FPT Hồ Chí Minh</span>
            </div>
            <div>
              <span style={{ marginLeft: 10 }}>FPT Đà Nẵng</span>
            </div>
            <div>
              <span style={{ marginLeft: 10 }}>FPT Cần Thơ</span>
            </div>
            <div>
              <span style={{ marginLeft: 10 }}>FPT Hà Nội</span>
            </div>
          </Box>
          <Box>
            <Typography variant="h3">Useful Links</Typography>
            <div>
              <span style={{ marginLeft: 10 }}>About Us</span>
            </div>
            <div>
              <span style={{ marginLeft: 10 }}>Company Profile</span>
            </div>
            <div>
              <span style={{ marginLeft: 10 }}>Team Members</span>
            </div>
            <div>
              <span style={{ marginLeft: 10 }}>Support</span>
            </div>
            <div>
              <span style={{ marginLeft: 10 }}>Career</span>
            </div>
          </Box>
        </Box>
        <Box bgcolor="grey.200" py={2}>
          <Typography variant="body2" align="center" color="textSecondary">
            &copy; {currentYear} My Company. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
