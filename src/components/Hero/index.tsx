'use client';
import WhatsIcon from '@/assets/WhatsIcon';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  return (
    <>
      <div
        id="inicio"
        className="w-full flex flex-col md:flex-row sm:justify-center items-center scroll-mt-48
      sm:scroll-mt-36 gap-x-7 pb-14 md:pb-32 font-semibold relative z-[6] bg-lightPurple bg-paper p-10 shadow-lg"
      >
        <div className="justify-items-start item-start flex-col flex gap-y-5 mt-5 ">
          <h2 className="bg-[#ef8d51] bg-paper w-fit px-4 py-1 rounded-md self-start text-sm sm:text-xl shadow-md">
            SEJAM BEM VINDOS
          </h2>
          <h1 className="text-4xl max-w-[25rem] sm:max-w-[40rem] text-left xl:text-7xl md:text-5xl sm:text-4xl ">
            Fonoaudióloga em Jaraguá do Sul
          </h1>
          <h2 className="text-lg max-w-[25rem] sm:max-w-[40rem] text-left xl:text-lg md:text-5xl sm:text-4xl ">
            Minha missão é tornar a terapia lúdica e envolvente para pais e pacientes, onde cada criança se sinta
            valorizada e capaz de se expressar livremente. Estou aqui para ajudar você e seu filho a superar desafios na
            linguagem e fala!
          </h2>
          <Link target="_blank" rel="noreferer" href={'https://wa.me/5547997775008'}>
            <button
              className="transition-all items-center bg-strongYellow bg-paper shadow-md hover:shadow-2xl w-fit flex 
            sm:px-10 px-3 py-3 gap-x-3 self-start rounded-3xl sm:text-xl whatsapp-button"
            >
              <WhatsIcon className="sm:w-10 w-8" />
              <h3 className="sm:text-base text-xs">Falar com a Fonoaudióloga</h3>
            </button>
          </Link>
        </div>
        <div className="mt-8 sm:mt-14 rounded-3xl shadow-md overflow-hidden">
          {/* PLACEHOLDER */}
          <Image
            src="/fonoaudiologa-ana-nascimento.webp"
            alt="A fonoaudióloga Ana Nascimento tem anos de experiência com linguagem e fala infantil. Sua abordagem respeita a individualidade de cada criança e acontece de forma lúdica tornando leve para os pais e pacientes."
            width={500}
            height={500}
            quality={75}
            priority
            title={'Fonoaudióloga Ana Nascimento - Experiência em Linguagem e Fala Infantil'}
          ></Image>
        </div>
      </div>
    </>
  );
};
