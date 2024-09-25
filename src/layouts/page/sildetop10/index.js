import React from "react";
import Carousel, { autoplayPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import image1 from "../../../assets/images/top10/1. Thầy Hoàng.png";
import image2 from "../../../assets/images/top10/2. Thầy Long.png";
import image3 from "../../../assets/images/top10/3. Cô Chi.png";
import image4 from "../../../assets/images/top10/4. Thầy Lâm.png";
import image5 from "../../../assets/images/top10/5. Cô Ngọc.png";
import image6 from "../../../assets/images/top10/6. Cô Tuyền.png";
import image7 from "../../../assets/images/top10/7. Thầy Hiệp.png";
import image8 from "../../../assets/images/top10/8. Cô Mai Chi.png";
import image9 from "../../../assets/images/top10/9. Cô Hà.png";
import image10 from "../../../assets/images/top10/10. Cô Uyên.png";
import { useMediaQuery, useTheme } from "@mui/material";

const SildeTop10 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Carousel
      plugins={[
        "infinite",
        {
          resolve: autoplayPlugin,
          options: {
            interval: 2000,
          },
        },
      ]}
      animationSpeed={3000}
    >
      <img src={image1} style={{ maxWidth: isMobile ? "100%" : "50%", height: "auto" }} />
      <img src={image2} style={{ maxWidth: isMobile ? "100%" : "50%", height: "auto" }} />
      <img src={image3} style={{ maxWidth: isMobile ? "100%" : "50%", height: "auto" }} />
      <img src={image4} style={{ maxWidth: isMobile ? "100%" : "50%", height: "auto" }} />
      <img src={image5} style={{ maxWidth: isMobile ? "100%" : "50%", height: "auto" }} />
      <img src={image6} style={{ maxWidth: isMobile ? "100%" : "50%", height: "auto" }} />
      <img src={image7} style={{ maxWidth: isMobile ? "100%" : "50%", height: "auto" }} />
      <img src={image8} style={{ maxWidth: isMobile ? "100%" : "50%", height: "auto" }} />
      <img src={image9} style={{ maxWidth: isMobile ? "100%" : "50%", height: "auto" }} />
      <img src={image10} style={{ maxWidth: isMobile ? "100%" : "50%", height: "auto" }} />
    </Carousel>
  );
};
export default SildeTop10;
