import Image from 'next/image';
import Container from '../Container';
import Link from 'next/link';
import InstagramIcon from '@/assets/InstagramIcon';
import WhatsIcon from '@/assets/WhatsIcon';

export default function Footer() {
  return (
    <>
      <div
        id="contato"
        className="w-full bg-lightGreen bg-paper relative text-sm h-[110%] text-blue-950 shadow-md py-7 px-2 sm:py-14"
      >
        <Container className="py-10">
          <div className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-3 w-full justify-center items-center gap-x-4 gap-y-8">
            <div className="flex flex-col items-center justify-center  gap-y-4 sm:gap-y-8">
              <Image src="/logo-full-text-black.webp" alt="Logo" width={300} height={200} />
            </div>
            <div className="flex flex-col items-center justify-center  gap-y-3 sm:gap-y-4 w-full">
              <h2 className="font-semibold text-xl">Contatos</h2>
              <div className="grid grid-rows-3 gap-y-4">
                <Link
                  className="flex gap-5 items-center justify-start group"
                  href={
                    'https://www.google.com/maps/place/R.+Guilherme+Dancker,+131+-+Centro,+Jaragu%C3%A1+do+Sul+-+SC,+89251-460/@-26.4928308,-49.0772724,17z/data=!3m1!4b1!4m6!3m5!1s0x94de951eaf5a3439:0x8a8b333557ac4a10!8m2!3d-26.4928308!4d-49.0772724!16s%2Fg%2F11f2t09lc3?entry=ttu'
                  }
                  target="_blank"
                >
                  <Image
                    src={'/location-icon.webp'}
                    alt={''}
                    width={26}
                    height={26}
                    className="transition-all group-hover:animate-bounce"
                  />
                  <p className="text-sm max-w-[250px]">
                    R. Guilherme Dancker, 131 - Centro, Jaraguá do Sul - SC, 89251-460
                  </p>
                </Link>
                <a
                  className="flex gap-5 items-center justify-start group"
                  href={'tel:+554799777-5008'}
                  target="_blank"
                  rel="noreferer"
                >
                  <Image
                    src={'/phone-icon.webp'}
                    alt={''}
                    width={36}
                    height={36}
                    className="transition-all group-hover:animate-bounce"
                  />
                  <p className="text-sm">+55 47 99777-5008</p>
                </a>
                <a
                  className="flex gap-5 items-center justify-start group"
                  href="mailto:analigiaanascimento@gmail.com"
                  target="_blank"
                  rel="noreferer"
                >
                  <Image
                    src={'/mail-icon.webp'}
                    alt={''}
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
                  rel="noreferer"
                  href={'https://www.instagram.com/fonoananascimento/'}
                  className="rounded-full transition-all hover:shadow-lg hover:brightness-105"
                >
                  <InstagramIcon className="w-10" alt="Instagram" />
                </Link>
                <Link
                  target="_blank"
                  rel="noreferer"
                  href={'https://wa.me/5547997775008'}
                  className="cta-button rounded-full transition-all hover:shadow-lg hover:brightness-105"
                >
                  <WhatsIcon className="w-10 whatsapp-button" alt="Whatsapp" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center  gap-y-4 sm:gap-y-8">
              <div className="max-w-sm min-w-[250px] flex flex-col p-3 bg-lightBlue rounded-2xl bg-paper shadow-md">
                <div className="border-2 p-5 border-dashed bg-lightBlue rounded-2xl flex flex-col gap-y-2 bg-paper">
                  <h2 className="text-center text-2xl font-semibold">Horários</h2>
                  <div className=" gap-y-2 w-full min-w-[10rem] flex flex-col items-center justify-center">
                    <p className="flex-nowrap whitespace-nowrap">Segunda a Sexta</p>

                    <p className="flex-nowrap whitespace-nowrap text-center">Das 8h às 18h30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="flex w-full py-3 items-center justify-center gap-x-1 text-xs bg-lightYellow bg-paper">
        <p className="text-center">
          <span className="font-semibold">Fono Ana Lígia </span> by
          <Link href={'https://www.coldbrewdao.com/'} target="_blank" rel="noreferrer" className="font-semibold">
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
