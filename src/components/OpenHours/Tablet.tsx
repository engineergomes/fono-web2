import Image from 'next/image';
import Link from 'next/link';

export const Tablet = () => {
  return (
    <>
      <div
        className="bg-white w-screen pt-48 pb-20 justify-center flex flex-col items-center pr-48 gap-y-32 relative px-10"
        id="horarios"
      >
        <div className="bg-white w-full absolute -top-1 left-0 rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1 1440 66" fill="none">
            <path
              d="M0 3.00003L80 1.67503C160 0.250027 320 -2.24997 480 7.00003C640 16.25 800 37.75 960 43C1120 48.25 1280 37.75 1360 32.325L1440 27V67H1360C1280 67 1120 67 960 67C800 67 640 67 480 67C320 67 160 67 80 67H0V3.00003Z"
              fill="#45B3DF"
            />
          </svg>
        </div>
        <div className="absolute z-10">
          <div className="w-[170%] min-h-[12rem] flex flex-col p-3 bg-lightBlue rounded-2xl relative z-1 -right-[15rem] -top-[6rem]">
            <div className="border-2 min-h-[12rem] p-5 border-dashed bg-lightBlue rounded-2xl flex flex-col gap-y-4">
              <h2 className="text-center text-2xl font-semibold">Horários</h2>
              <div className="flex flex-col gap-y-2 w-full">
                <div className="flex gap-x-1">
                  <p className="min-w-[5rem]">Seg - Sex</p>
                  <div className="border-b border-dashed border-white w-full self-center h-1/2"></div>
                  <p className="min-w-[5rem] text-center">Fechado</p>
                </div>
                <div className="flex gap-x-1">
                  <p className="min-w-[5rem]">Seg - Sex</p>
                  <div className="border-b border-dashed border-white w-full self-center h-1/2"></div>
                  <p className="min-w-[5rem] text-center">Fechado</p>
                </div>
                <div className="flex gap-x-1">
                  <p className="min-w-[5rem]">Seg - Sex</p>
                  <div className="border-b border-dashed border-white w-full self-center h-1/2"></div>
                  <p className="min-w-[5rem] text-center">Fechado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image
          className="rounded-3xl -scale-x-100"
          src="/1.webp"
          width={550}
          height={500}
          alt="Mulher em sala representando Intervenção Fonoaudiológica com atendimento personalizado e suporte para os pais em Jaraguá do Sul."
          title="Intervenção Fonoaudióloga em Jaraguá do Sul - Consultório Acolhedor"
        />
        <div className="text-darkBlue font-semibold w-full max-w-xl [&>div]:text-5xl [&>div]:w-fit [&>div]:px-3 gap-y-2 flex flex-col">
          <div className="bg-lightYellow">Espaço Ana Nascimento</div>
          <div className="bg-lightPurple">Desenvolvimento</div>
          <div className="bg-lightBlue">Infantil</div>
          <p className="mt-8 text-lightGray font-light text-lg">
            Um espaço de reabilitação e estimulação infantil que oferece ambientes terapêuticos planejados, materiais
            que estimulam as funções motoras, cognitivas e sensoriais; contando com profissionais atualizados nas mais
            recentes técnicas terapêuticas.
          </p>
          <Link
            target="_blank"
            rel="noreferer"
            href={'https://wa.me/5547997775008'}
            className="cta-button w-56 rounded-3xl py-3 px-12 text-white mt-8 bg-lightPurple whatsapp-button"
          >
            Agende Uma Visita
          </Link>
        </div>
      </div>
    </>
  );
};
