import WhatsIcon from '@/assets/WhatsIcon';
import Image from 'next/image';
import Link from 'next/link';

export const Mobile = () => {
  return (
    <>
      <div
        id="horarios"
        className="bg-white bg-paper w-full py-16 justify-center flex flex-col items-center gap-y-14 px-5 scroll-m-20"
      >
        <div className="text-darkBlue font-semibold [&>*]:px-3 gap-y-2 flex flex-col sm:justify-center sm:w-full sm:items-center">
          <div className="text-2xl sm:text-5xl bg-lightYellow whitespace-nowrap bg-paper w-[95%]">Fonoaudióloga</div>
          <div className="text-2xl sm:text-5xl bg-lightGreen whitespace-nowrap bg-paper w-[85%]">Ana Nascimento</div>
          <div className="text-2xl sm:text-5xl bg-lightBlue bg-paper w-fit">Desenvolvimento</div>
          <div className="text-2xl sm:text-5xl bg-white bg-paper w-[50%]">Infantil</div>
          <p className="mt-8 text-black/90 font-light text-lg sm:text-center">
            O consultório está localizado no centro de Jaraguá do Sul, em um espaço projetado para oferecer um ambiente
            adequado e acolhedor para o atendimento de crianças e suas famílias.
          </p>
        </div>
        <Image
          className="rounded-3xl -scale-x-100"
          src="/intervencao-fonoaudiologa.webp"
          width={500}
          height={500}
          alt="Mulher em sala representando Intervenção Fonoaudiológica com atendimento personalizado e suporte para os pais em Jaraguá do Sul."
          title="Intervenção Fonoaudióloga em Jaraguá do Sul - Consultório Acolhedor"
        />
        <div className="max-w-[500px] flex flex-col p-4 bg-lightBlue rounded-2xl items-center justify-center">
          <div className="border-2 p-5 border-dashed bg-lightBlue rounded-2xl flex flex-col gap-y-2 bg-paper text-darkBlue">
            <h2 className="text-center text-2xl font-semibold">Horários</h2>
            <div className="gap-y-2 w-full min-w-[10rem] flex flex-col items-center justify-center">
              <p className="flex-nowrap whitespace-nowrap">Segunda à Quinta</p>
              <p className="flex-nowrap whitespace-nowrap text-center">Das 13h00 às 19h00</p>
            </div>
            <div className="gap-y-2 w-full min-w-[10rem] flex flex-col items-center justify-center">
              <p className="flex-nowrap whitespace-nowrap">Sexta</p>
              <p className="flex-nowrap whitespace-nowrap text-center">Das 09h00 às 17h00</p>
            </div>
          </div>
        </div>
        <Link
          target="_blank"
          rel="noreferer"
          href={'https://wa.me/5547997775008'}
          className="flex items-center gap-3 cta-button rounded-3xl py-2 px-8 text-white bg-strongYellow text-lg bg-paper shadow-md transition-all hover:shadow-2xl whatsapp-button"
        >
          <p>Agende Uma Visita</p>
          <WhatsIcon className="w-10" />
        </Link>
      </div>
    </>
  );
};
