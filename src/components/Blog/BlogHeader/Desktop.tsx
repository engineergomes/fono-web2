import Link from 'next/link';
import Image from 'next/image';
import { navigation } from './navigation';
import InstagramIcon from '@/assets/InstagramIcon';
import WhatsIcon from '@/assets/WhatsIcon';

export const Desktop = () => {
  return (
    <div className="items-center justify-between flex font-bold gap-x-8 px-5">
      <div>
        <Link href="/">
          <Image src={'/logo-full-text-black.webp'} alt={'logo'} width={350} height={100} />
        </Link>
      </div>
      <div className="flex items-center gap-x-5">
        {navigation.map((item) => (
          <div
            key={item.href}
            className={`flex gap-4 cursor-pointer border-b-2 border-transparent hover:border-lightPurple text-xl`}
          >
            <Link href={item.href} className="px-3 py-1">
              <p className="text-lightPurple whitespace-nowrap">{item.name}</p>
            </Link>
          </div>
        ))}

        <div className="flex items-center gap-x-5">
          <Link
            href="https://www.instagram.com/fonoananascimento/"
            target="_blank"
            className="rounded-full transition-all hover:shadow-lg hover:brightness-105"
          >
            <InstagramIcon className="w-10" />
          </Link>
          <Link
            href="https://wa.me/5547997775008"
            target="_blank"
            className="cta-button rounded-full transition-all hover:shadow-lg hover:brightness-105"
          >
            <WhatsIcon className="w-10 whatsapp-button" />
          </Link>
        </div>
      </div>
    </div>
  );
};
