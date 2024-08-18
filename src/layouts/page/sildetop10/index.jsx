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

const SildeTop10 = () => {
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
      <img src={image1} style={{ maxWidth: "50%", height: "auto" }} />
      <img src={image2} style={{ maxWidth: "50%", height: "auto" }} />
      <img src={image3} style={{ maxWidth: "50%", height: "auto" }} />
      <img src={image4} style={{ maxWidth: "50%", height: "auto" }} />
      <img src={image5} style={{ maxWidth: "50%", height: "auto" }} />
      <img src={image6} style={{ maxWidth: "50%", height: "auto" }} />
      <img src={image7} style={{ maxWidth: "50%", height: "auto" }} />
      <img src={image8} style={{ maxWidth: "50%", height: "auto" }} />
      <img src={image9} style={{ maxWidth: "50%", height: "auto" }} />
      <img src={image10} style={{ maxWidth: "50%", height: "auto" }} />
    </Carousel>
  );
};
export default SildeTop10;
