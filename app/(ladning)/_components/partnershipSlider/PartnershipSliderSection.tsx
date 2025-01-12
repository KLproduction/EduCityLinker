"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./partnership-style.css";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { useEffect } from "react";

interface ImageSwiperProps {
  onSlideChange: (index: number) => void;
}

export default function ImageSwiper({ onSlideChange }: ImageSwiperProps) {
  return (
    <Swiper
      onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      navigation={true}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img
          src="pexels-christina99999-29434940.jpg"
          className="object-cover h-[300px] w-[300px] rounded-lg object-center"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="pexels-daria-agafonova-2147746189-30173102.jpg"
          className="object-cover h-[300px] w-[300px] rounded-lg object-center"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="pexels-matreding-11363619.jpg"
          className="object-cover h-[300px] w-[300px] rounded-lg object-center"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="pexels-wolfgang-weiser-467045605-30176440.jpg"
          className="object-cover h-[300px] w-[300px] rounded-lg object-center"
        />
      </SwiperSlide>
    </Swiper>
  );
}
