'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { instagramData } from './instagramData';
import { useUrl } from '@/providers/UrlProvider';
import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const Mobile = () => {
  // const { currentUrl, setCurrentUrl } = useUrl();

  // const { ref, inView, entry } = useInView({
  //   /* Optional options */
  //   threshold: 0.55,
  // });

  // useEffect(() => {
  //   if (inView) {
  //     setCurrentUrl('#blog');
  //   }
  // }, [inView, setCurrentUrl]);
  return (
    <>
      <div
        className="bg-white bg-paper w-full text-darkBlue flex flex-col items-center py-16 scroll-mt-20 gap-y-8 h-[32rem]"
        id="blog"
        // ref={ref}
      >
        <h2 className="text-3xl sm:text-6xl bg-strongYellow px-6 bg-paper">Blog</h2>
        <Swiper
          slidesPerView={1.2}
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper w-screen"
        >
          {instagramData.map((item) => {
            return (
              <SwiperSlide key={item.src} className="rounded-lg overflow-hidden">
                <Link href={item.href} target="_blank">
                  <Image className="object-cover" src={item.src} width={400} height={300} alt="instagram-image" />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};
