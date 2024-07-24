/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

// Authentication layout components

// Images
import bgImage from "assets/images/logo-ct.png";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";

function Cover() {
  return (
    <Box
      coverHeight="50vh"
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card>
        <Box
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <Typography variant="h3" fontWeight="medium" color="black" mt={1}>
            Tạo lại mật khẩu cho tài khoản
          </Typography>
          <Typography display="block" variant="button" color="black" my={1}>
            Bạn sẽ nhận được email việc thay đổi mật khẩu
          </Typography>
        </Box>
        <Box pt={4} pb={3} px={3}>
          <Box component="form" role="form">
            <Box mb={4} display={"flex"} justifyContent={"center"}>
              <Input type="email" label="Email" variant="standard" />
            </Box>
            <Box mt={6} mb={1} display={"flex"} justifyContent={"center"}>
              <ButtonCustomize variant="gradient" bgColor="#F6911B" nameButton="Gửi lại email" />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default Cover;
