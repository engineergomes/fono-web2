import Image from 'next/image';
import Container from '../Container';
import Link from 'next/link';
import InstagramIcon from '@/assets/InstagramIcon';
import WhatsIcon from '@/assets/WhatsIcon';

export default function Footer() {
  return (
    <>
      <footer
        id="contato"
        className="w-full bg-lightGreen bg-paper relative text-sm h-[110%] text-blue-950 shadow-md py-7 px-2 sm:py-14"
      >
        <Container className="py-10">
          <div className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-3 w-full justify-center items-center gap-x-4 gap-y-8">
            <div className="flex flex-col items-center justify-center  gap-y-4 sm:gap-y-8">
              <Image
                src="/logo-full-text-black.webp"
                alt="Fonoaudióloga Ana Nascimento - Desenvolvimento Infantil em Jaraguá do Sul"
                width={300}
                height={200}
              />
            </div>
            <div className="flex flex-col items-center justify-center  gap-y-3 sm:gap-y-4 w-full">
              <h2 className="font-semibold text-xl">Contatos</h2>
              <div className="grid grid-rows-3 gap-y-4">
                <Link
                  className="flex gap-5 items-center justify-start group"
                  href={
                    'https://www.google.com/maps/place/Fonoaudi%C3%B3loga+Ana+Nascimento/@-26.4857698,-49.0800154,17z/data=!3m1!4b1!4m6!3m5!1s0x94de95ecec96ade3:0xbaacef9443f462f0!8m2!3d-26.4857698!4d-49.0800154!16s%2Fg%2F11v66bl9zp?entry=ttu&g_ep=EgoyMDI1MDYyMi4wIKXMDSoASAFQAw%3D%3D'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver localização do consultório da Fonoaudióloga Ana Nascimento no Google Maps"
                >
                  <Image
                    src={'/location-icon.webp'}
                    alt={'Ícone de localização do consultório'}
                    width={26}
                    height={26}
                    className="transition-all group-hover:animate-bounce"
                  />
                  <p className="text-sm max-w-[250px]">
                    Rua João Marcatto, nº 260 - quarto andar, sala 401 Edifício Tower Center - Centro, Jaraguá do Sul
                  </p>
                </Link>
                <a
                  className="flex gap-5 items-center justify-start group"
                  href={'tel:+5547997775008'}
                  rel="noopener noreferrer"
                  aria-label="Ligar para a Fonoaudióloga Ana Nascimento"
                >
                  <Image
                    src={'/phone-icon.webp'}
                    alt={'Ícone de telefone para contato'}
                    width={36}
                    height={36}
                    className="transition-all group-hover:animate-bounce"
                  />
                  <p className="text-sm">+55 47 99777-5008</p>
                </a>
                <a
                  className="flex gap-5 items-center justify-start group"
                  href="mailto:analigiaanascimento@gmail.com"
                  rel="noopener noreferrer"
                  aria-label="Enviar email para a Fonoaudióloga Ana Nascimento"
                >
                  <Image
                    src={'/mail-icon.webp'}
                    alt={'Ícone de email para contato'}
                    width={36}
                    height={36}
                    className="transition-all group-hover:animate-bounce"
                  />{' '}
                  <p className="text-sm"> analigiaanascimento@gmail.com</p>
                </a>
              </div>
              <div className="flex gap-x-4">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={'https://www.instagram.com/fonoananascimento/'}
                  className="rounded-full transition-all hover:shadow-lg hover:brightness-105"
                  aria-label="Siga a Fonoaudióloga Ana Nascimento no Instagram"
                >
                  <InstagramIcon className="w-10" />
                </Link>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={'https://wa.me/5547997775008'}
                  className="cta-button rounded-full transition-all hover:shadow-lg hover:brightness-105"
                  aria-label="Entre em contato via WhatsApp com a Fonoaudióloga Ana Nascimento"
                >
                  <WhatsIcon className="w-10 whatsapp-button" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center  gap-y-4 sm:gap-y-8">
              <div className="max-w-sm min-w-[250px] flex flex-col p-3 bg-lightBlue rounded-2xl bg-paper shadow-md">
                <div className="border-2 p-5 border-dashed bg-lightBlue rounded-2xl flex flex-col gap-y-2 bg-paper text-darkBlue">
                  <h3 className="text-center text-2xl font-semibold">Horários</h3>
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
            </div>
          </div>
        </Container>
      </footer>
      <div className="flex w-full py-3 items-center justify-center gap-x-1 text-xs bg-lightYellow bg-paper">
        <p className="text-center">
          <span className="font-semibold">Fono Ana Lígia </span> by
          <Link
            href={'https://www.coldbrewdao.com/'}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            {' '}
            COLD BREW © 2023.
          </Link>{' '}
          <br className="sm:hidden block" />
          Todos os direitos reservados.
        </p>
      </div>
    </>
  );
}
