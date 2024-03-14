import Image from 'next/image';
import Link from 'next/link';

export const Mobile = () => {
  return (
    <>
      <div
        id="horarios"
        className="bg-lightPurple bg-paper w-full py-16 justify-center flex flex-col items-center gap-y-14 px-5 scroll-m-20"
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
        <Image className="rounded-3xl -scale-x-100" src="/1.webp" width={500} height={500} alt="services" />
        <div className="max-w-[500px] flex flex-col p-4 bg-lightBlue rounded-2xl items-center justify-center">
          <div className="border-2 p-5 border-dashed bg-lightBlue rounded-2xl flex flex-col gap-y-2">
            <h2 className="text-center text-2xl font-semibold">Horários</h2>
            <div className=" gap-y-2 w-full min-w-[10rem] flex flex-col items-center justify-center">
              <p className="flex-nowrap whitespace-nowrap">Seguda a Sexta</p>

              <p className="flex-nowrap whitespace-nowrap text-center">Das 8h às 18h30</p>
            </div>
          </div>
        </div>
        <Link
          target="_blank"
          rel="noreferer"
          href={'https://wa.me/5547997775008'}
          className="cta-button rounded-3xl py-3 px-12 text-white bg-strongYellow text-lg bg-paper shadow-md transition-all hover:shadow-2xl"
        >
          Agende Uma Visita
        </Link>
      </div>
    </>
  );
};
