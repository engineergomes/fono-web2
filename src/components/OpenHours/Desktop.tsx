import Image from 'next/image';
import Link from 'next/link';
import { Fingerprint, Heart, MapPin } from 'phosphor-react-sc';

export const Desktop = () => {
  return (
    <>
      <div
        id="horarios"
        className="bg-white bg-paper w-screen pt-20 pb-24 justify-center grid grid-cols-2 gap-x-16 relative px-10 shadow-lg z-[4]"
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative">
            <Image
              className="rounded-3xl -scale-x-100 z-0 shadow-md"
              src="/intervencao-fonoaudiologa.webp"
              width={700}
              height={700}
              alt="Mulher em sala representando Intervenção Fonoaudiológica com atendimento personalizado e suporte para os pais em Jaraguá do Sul."
              title="Intervenção Fonoaudióloga em Jaraguá do Sul - Consultório Acolhedor"
            />

            <div className="max-w-xs flex flex-col p-3 bg-lightBlue rounded-2xl absolute lg:-bottom-10 lg:-right-10 xl:-right-10 bg-paper shadow-md">
              <div className="border-2 p-5 border-dashed bg-lightBlue rounded-2xl flex flex-col gap-y-2 bg-paper text-darkBlue">
                <h2 className="text-center text-2xl font-semibold">Horários</h2>
                <div className=" gap-y-2 w-full min-w-[10rem] flex flex-col items-center justify-center">
                  <p className="flex-nowrap whitespace-nowrap">Segunda a Sexta</p>

                  <p className="flex-nowrap whitespace-nowrap text-center">Das 8h às 18h30</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-darkBlue font-medium w-full max-w-xl text-4xl xl:text-5xl  [&>*]:px-3 gap-y-2 flex flex-col">
          <div className="text-2xl sm:text-5xl bg-lightYellow whitespace-nowrap bg-paper w-[95%]">Fonoaudióloga</div>
          <div className="text-2xl sm:text-5xl bg-lightGreen whitespace-nowrap bg-paper w-[85%]">Ana Nascimento</div>
          <div className="text-2xl sm:text-5xl bg-lightBlue bg-paper w-fit">Desenvolvimento</div>
          <div className="text-2xl sm:text-5xl bg-white bg-paper w-[50%]">Infantil</div>
          <p className="mt-8 text-[#493d3d] font-light text-lg">
            O consultório está localizado no centro de Jaraguá do Sul, em um espaço projetado para oferecer um ambiente
            adequado e acolhedor para o atendimento de crianças e suas famílias.
          </p>
          <Link
            target="_blank"
            rel="noreferer"
            href={'https://wa.me/5547997775008'}
            className="cta-button flex justify-center items-center w-56 rounded-3xl py-3 px-12 text-white mt-8 bg-strongYellow 
            text-lg bg-paper shadow-md transition-all hover:shadow-2xl whatsapp-button"
          >
            Agende Uma Visita
          </Link>
        </div>
      </div>
      <div className="text-darkBlue bg-white bg-paper w-screen pt-20 pb-24 justify-center flex gap-x-16 relative px-10 shadow-lg z-[4]">
        <div className="flex gap-x-3 items-center">
          <MapPin size={50} />
          <div className="flex flex-col gap-y-2 w-72 [&>p]:text-sm">
            <h3>Consultório Acessível</h3>
            <p>
              Estamos localizados no centro de Jaraguá do Sul, oferecendo ambiente acolhedor para crianças e famílias.
            </p>
          </div>
        </div>
        <div className="flex gap-x-3 items-center">
          <Heart size={60} />
          <div className="flex flex-col gap-y-2 w-72 [&>p]:text-sm">
            <h3>Abordagem Humanizada</h3>
            <p>
              Experiência em atender crianças e famílias com intervenção fonoaudiológica, combinando especialização e
              empatia.
            </p>
          </div>
        </div>
        <div className="flex gap-x-3 items-center">
          <Fingerprint size={60} />
          <div className="flex flex-col gap-y-2 w-72 [&>p]:text-sm">
            <h3>Acompanhamento Individualizado</h3>
            <p>
              Acompanhamento personalizado para cada criança, adaptando sessões às suas necessidades e ritmo de
              desenvolvimento.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
