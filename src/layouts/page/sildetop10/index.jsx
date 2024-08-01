import React from "react";
import Carousel, { autoplayPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import image1 from "../../../assets/images/top10/1. Nguyễn Thế Hoàng.png";
import image2 from "../../../assets/images/top10/2. Trương Long.jpg";
import image3 from "../../../assets/images/top10/3. Hồ Trúc Chi.jpg";
import image4 from "../../../assets/images/top10/4. Nguyễn Ngọc Lâm.png";
import image5 from "../../../assets/images/top10/5. Trương Thị Mỹ Ngọc.jpg";
import image6 from "../../../assets/images/top10/6. Trương Thanh Tuyền.png";
import image7 from "../../../assets/images/top10/7. Đặng Hồng Hiệp.png";
import image8 from "../../../assets/images/top10/8. Phan Mai Chi.png";
import image9 from "../../../assets/images/top10/9. Nguyễn Ngọc My Hà.png";
import image10 from "../../../assets/images/top10/10. Nguyễn Vi Thảo Uyên.png";

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
      <img src={image1} />
      <img src={image2} />
      <img src={image3} />
      <img src={image4} />
      <img src={image5} />
      <img src={image6} />
      <img src={image7} />
      <img src={image8} />
      <img src={image9} />
      <img src={image10} />
    </Carousel>
  );
};
export default SildeTop10;
