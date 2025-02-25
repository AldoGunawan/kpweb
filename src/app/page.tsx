"use client";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import gam1 from "./assets/gambar.jpg";
import gam2 from "./assets/gambarkedua.jpg";
import gam3 from "./assets/gambarketiga.jpg";
import Body from './body';
import Footer from './footer';

export default function Home() {
  
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center my-5">
        Selamat Datang Di Website UPT SMP Negeri 10 TAPUNG
      </h1>
      
      <Swiper
        className="w-full"
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <div className="w-full h-[600px]">
            <Image src={gam1} alt="Gambar 1" layout="fill" objectFit="cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[600px]">
            <Image src={gam2} alt="Gambar 2" layout="fill" objectFit="cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[600px]">
            <Image src={gam3} alt="Gambar 3" layout="fill" objectFit="cover" />
          </div>
        </SwiperSlide>
      </Swiper>

    <Body />
      <Footer />
    </div>
  );
}
