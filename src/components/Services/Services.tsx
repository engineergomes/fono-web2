'use client';
import { Mobile } from './Mobile';
import { useWindow } from '@/hooks/useWindow';
import { Desktop } from './Desktop';
import GoogleReviews from '../GoogleReviews';

export const Services = () => {
  return (
    <>
      <div
        id="servicos"
        className="bg-lightPurple bg-paper flex scroll-mt-24 flex-col text-center pt-20 sm:pt-36 pb-36 gap-y-16 md:min-h-[40rem] 
        sm:min-h-[70rem] justify-center relative items-center overflow-visible shadow-lg z-[2]"
      >
        <div className="flex justify-center ">
          <h2 className="bg-strongYellow bg-paper w-fit text-darkBlue text-3xl sm:text-5xl xl:text-6xl px-10 shadow-md">
            Abordagem Especializada e Humanizada
          </h2>
        </div>
        <GoogleReviews />
        {useWindow().isMobile ? <Mobile /> : <Desktop />}
      </div>
    </>
  );
};
