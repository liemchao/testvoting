import { Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from "../../styles/banner";

export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <BannerContainer>
      <BannerImage src="https://caodang.fpt.edu.vn/wp-content/uploads/33994753_1344286039049043_4727698247643037696_n-500x333.jpg" />
      <BannerContent>
        <BannerDescription variant="subtitle">
          Thoải mái lựa chọn tham gia những chiến dịch mà bạn thích.
        </BannerDescription>
        <Typography variant="h6">Tham gia chiến dịch</Typography>
        <Typography variant="h6">Chia sẻ chiến dịch</Typography>
        <Typography variant="h6">Tạo chiến dịch cho mọi người</Typography>
      </BannerContent>
    </BannerContainer>
  );
}
