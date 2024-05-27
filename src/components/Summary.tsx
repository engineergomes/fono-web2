'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'phosphor-react-sc';
import Container from './Container';
import { useWindow } from '@/hooks/useWindow';

export const Summary = () => {
  const { isMobile } = useWindow();

  const SummaryItem = (props: any) => {
    return (
      <>
        <div className="grid grid-cols-1 grid-rows-auto items-center gap-y-5 sm:scroll-mt-80 scroll-mt-32 overflow-hidden">
          <div className="h-40 sm:h-64 flex items-center justify-center w-full">
            <Image
              className="object-cover"
              src={props.data.src}
              width={props.data.width}
              height={props.data.height}
              alt="Ana Nascimento"
            ></Image>
          </div>
          <h2 className="text-3xl text-center">{props.data.title}</h2>
          <Link href="#servicos" className="mx-auto">
            <p className="text-xl flex gap-x-[2.5px] items-center">
              Saiba mais
              <ArrowRight className="" size={20} />
            </p>
          </Link>
        </div>
      </>
    );
  };
  return (
    <div
      className="bg-white bg-paper w-full relative z-[5] py-16 lg:py-20 scroll-mt-20 shadow-lg text-[#493d3d] font-medium flex flex-col gap-y-10"
      id="sobre"
    >
      <div className="flex flex-col items-center gap-y-10 justify-center">
        <h2 className="sm:text-7xl text-4xl font-medium">Sobre mim:</h2>
        <div className="flex flex-col items-center gap-y-6 justify-center">
          <p className="sm:w-1/2 text-lg w-[90%] sm:text-xl">
            Olá! Sou a Ana Lígia, fonoaudióloga formada pela Universidade Federal de Santa Catarina - UFSC e
            especialista em saúde da família pela Universidade do Vale do Itajaí - UNIVALI.
          </p>

          <p className="sm:w-1/2 text-lg w-[90%] sm:text-xl">
            Minha paixão e expertise estão na linguagem e na fala infantil. Acredito que cada criança merece ser
            compreendida e respeitada em suas diferentes formas de expressão.
          </p>

          <p className="sm:w-1/2 text-lg w-[90%] sm:text-xl">
            Tenho anos de experiência na intervenção com crianças do Transtorno do Espectro Autista – TEA, Transtorno de
            Déficit de Atenção – TDAH, Transtorno do Desenvolvimento Intelectual e Síndrome de Down.
          </p>

          <p className="sm:w-1/2 text-lg w-[90%] sm:text-xl">
            Minha abordagem respeita a individualidade de cada criança, criando um espaço onde elas podem se expressar à
            vontade.
          </p>

          <p className="sm:w-1/2 text-lg w-[90%] sm:text-xl">
            Meu trabalho com as crianças acontece de forma lúdica e atrativa, fazendo com que a intervenção
            fonoaudiológica seja algo leve para os pais e pacientes.
          </p>
        </div>
      </div>
      <Container className="sm:flex-row flex flex-col items-center justify-around gap-y-14 gap-x-8 px-10">
        <SummaryItem
          data={{
            width: isMobile ? 200 : 300,
            height: isMobile ? 200 : 200,
            title: 'Avaliação Fonoaudiológica',
            // text: 'Programas de terapia personalizados para atender às necessidades individuais de cada criança.',
            src: '/lion.webp',
          }}
        />
        <SummaryItem
          data={{
            width: isMobile ? 200 : 300,
            height: isMobile ? 200 : 220,
            title: 'Terapia Fonoaudiológica',
            // text: 'Terapia focada no desenvolvimento das habilidades de comunicação social em crianças.',
            src: '/monkey.webp',
          }}
        />
      </Container>
    </div>
  );
};
