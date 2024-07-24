import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AdSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    width: 400,
    height: 300,
  };

  return (
    <Slider {...settings}>
      <div>
        <img
          src="https://s3.cloud.cmctelecom.vn/tinhte1/2018/07/4368235_astrooftheyear-11-800x400.jpg"
          alt="Ad 1"
        />
      </div>
      <div>
        <img
          src="https://cdn.tgdd.vn/hoi-dap/906425/chup-anh-panorama-toan-canh-tren-camera-cua-smar%204-800x400.jpg"
          alt="Ad 2"
        />
      </div>
      <div>
        <img
          src="https://s3.cloud.cmctelecom.vn/tinhte1/2018/07/4368235_astrooftheyear-11-800x400.jpg"
          alt="Ad 3"
          height={400}
          with={300}
        />
      </div>
    </Slider>
  );
};

export default AdSlider;
