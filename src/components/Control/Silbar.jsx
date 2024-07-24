import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Avatar, Box } from "@mui/material";

const images = [
  {
    id: 1,
    url: "https://www.exibartstreet.com/wp-content/uploads/avatars/2465/5e0de52aeee8b-bpfull.jpg",
    name: "John Doe",
  },
  {
    id: 2,
    url: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    name: "Jane Smith",
  },
  {
    id: 3,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTEJcABb9jKdtNRg7y9egskdQ--Kllp7yG0kJP4Ravuo1L5ljoj0_NROdg6sew2YQNh_A&usqp=CAU",
    name: "Bob Johnson",
  },
  {
    id: 3,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi09myAGaJCeI84VLl3UzkeJkpnzyWF_2p-gYmZhsJFtZbbK5IysL5dDV009q32D3UJNg&usqp=CAU",
    name: "Bob Johnson",
  },
  {
    id: 3,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVHXtcBfOr6T8TLeArGk595LPMr_1Kq0QLDbFxUCr3Ww-KCK-UfPaRyWyuhzRXAWiUb2w&usqp=CAU",
    name: "Bob Johnson",
  },
];

const ImageSlider = () => {
  const [avatarSize, setAvatarSize] = useState(150);

  const handleResizeAvatar = () => {
    // Lấy kích thước của slide hiện tại
    const currentSlide = document.querySelector(".slick-current");
    const slideWidth = currentSlide?.offsetWidth;

    // Tính toán kích thước mới của Avatar
    const newSize = slideWidth * 0.8;
    setAvatarSize(newSize);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    onReInit: handleResizeAvatar, // Thay đổi kích thước Avatar khi khởi tạo Slider
    beforeChange: handleResizeAvatar, // Thay đổi kích thước Avatar trước khi chuyển slide
  };

  return (
    <Box sx={{ maxWidth: "600px", margin: "0 auto" }}>
      <Slider {...settings}>
        {images.map((image) => (
          <Box key={image.id} sx={{ textAlign: "center" }}>
            <Avatar
              alt={image.name}
              src={image.url}
              sx={{
                width: avatarSize,
                height: avatarSize,
                margin: "0 auto 1rem",
              }}
            />
            <div>{image.name}</div>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
