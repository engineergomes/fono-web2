'use client';
import { useUrl } from '@/providers/UrlProvider';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const Hero = () => {
  // const { ref, inView, entry } = useInView({
  //   /* Optional options */
  //   threshold: 0.5,
  // });

  // const { currentUrl, setCurrentUrl } = useUrl();

  // useEffect(() => {
  //   if (inView) {
  //     setCurrentUrl('#inicio');
  //   }
  // }, [inView, setCurrentUrl]);

  return (
    <>
      <div
        // ref={ref}
        id="inicio"
        className="w-full flex flex-col md:flex-row sm:justify-center items-center scroll-mt-48
      sm:scroll-mt-36 gap-x-7 pb-20 md:pb-32 font-semibold relative z-[6] bg-lightPurple bg-paper p-10 shadow-lg"
      >
        <div className="justify-items-start item-start flex-col flex gap-y-5 mt-5 ">
          <h2 className="bg-[#ef8d51] bg-paper w-fit px-4 py-1 rounded-md self-start text-sm sm:text-xl shadow-md">
            SEJAM BEM VINDOS
          </h2>
          <h1 className="text-4xl max-w-[25rem] sm:max-w-[40rem] text-left xl:text-7xl md:text-5xl sm:text-4xl ">
            Fonoaudióloga Ana Nascimento
          </h1>
          <Link target="_blank" rel="noreferer" href={'https://wa.me/5547997775008'}>
            <h2 className="transition-all bg-strongYellow bg-paper shadow-md hover:shadow-2xl w-fit flex px-12 py-3 self-start rounded-3xl sm:text-xl">
              AGENDAR VISITA
            </h2>{' '}
          </Link>
        </div>
        <div className="mt-14 h-96 relative aspect-square">
          {/* PLACEHOLDER */}

          <Image
            // className="rounded-3xl max-w-[600px]"
            // max-w-[300px] md:max-w-none min-w-[210px]
            src="/4.jpg"
            fill
            alt="hero"
            className="rounded-3xl shadow-md"
          ></Image>
        </div>
      </div>
    </>
  );
};
