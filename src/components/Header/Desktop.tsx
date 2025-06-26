import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigation } from './navigation';
import InstagramIcon from '@/assets/InstagramIcon';
import { Menu, Transition } from '@headlessui/react';
import { CaretDown } from 'phosphor-react-sc';
import WhatsIcon from '@/assets/WhatsIcon';

export const Desktop = () => {
  return (
    <div className="items-center justify-between flex font-bold gap-x-8 px-5">
      <div>
        <Link href="/">
          <Image
            src={'/logo-full-text-black.webp'}
            alt={'Fonoaudióloga Ana Nascimento - Desenvolvimento Infantil em Jaraguá do Sul'}
            width={350}
            height={100}
            priority
          />
        </Link>
      </div>
      {navigation.map((item) => {
        if (item.href === '#sobre') {
          return (
            <Menu as="div" className="relative" key={item.href}>
              <div
                key={item.href}
                className={`flex gap-4 cursor-pointer border-transparent border-b-2 hover:border-lightPurple text-xl`}
              >
                <Menu.Button className="flex">
                  <p className="text-lightPurple whitespace-nowrap">{item.name}</p>
                  <CaretDown size={20} weight="fill" className="self-center fill-lightPurple" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="absolute -right-2 mt-2 w-44 origin-top-right
                 rounded-md bg-[#f0f0f0] border border-lightPurple  shadow-md focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="#sobre">
                        <button
                          className={`${
                            active ? 'bg-lightPurple text-white' : 'text-lightPurple'
                          } group flex w-full items-center rounded-md px-2 py-2 text-xl transition-all justify-end pr-3`}
                        >
                          Sobre mim
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="#horarios">
                        <button
                          className={`${
                            active ? 'bg-lightPurple text-white' : 'text-lightPurple'
                          } group flex w-full items-center rounded-md px-2 py-2 text-xl transition-all justify-end pr-3`}
                        >
                          Horários
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          );
        } else if (item.href === '#saiba-mais') {
          return (
            <Menu as="div" className="relative" key={item.href}>
              <div
                key={item.href}
                className={`flex gap-4 cursor-pointer border-transparent border-b-2 hover:border-lightPurple text-xl`}
              >
                <Menu.Button className="flex">
                  <p className="text-lightPurple whitespace-nowrap">{item.name}</p>
                  <CaretDown size={20} weight="fill" className="self-center fill-lightPurple" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="absolute -right-2 mt-2 w-44 origin-top-right 
                 rounded-md bg-[#f0f0f0] border border-lightPurple  shadow-md focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="#instagram">
                        <button
                          className={`${
                            active ? 'bg-lightPurple text-white' : 'text-lightPurple'
                          } group flex w-full items-center rounded-md px-2 py-2 text-xl transition-all justify-end pr-3`}
                        >
                          Instagram
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/blog">
                        <button
                          className={`${
                            active ? 'bg-lightPurple text-white' : 'text-lightPurple'
                          } group flex w-full items-center rounded-md px-2 py-2 text-xl transition-all justify-end pr-3`}
                        >
                          Blog
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          );
        } else {
          return (
            <div
              key={item.href}
              className={`flex gap-4 cursor-pointer border-b-2 border-transparent hover:border-lightPurple text-xl`}
            >
              <Link href={item.href} className="px-3 py-1">
                <p className="text-lightPurple whitespace-nowrap">{item.name}</p>
              </Link>
            </div>
          );
        }
      })}
      <div className="flex items-center gap-x-5">
        <Link
          href="https://www.instagram.com/fonoananascimento/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full transition-all hover:shadow-lg hover:brightness-105"
          aria-label="Siga a Fonoaudióloga Ana Nascimento no Instagram"
        >
          <InstagramIcon className="w-10" />
        </Link>
        <Link
          href="https://wa.me/5547997775008"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button rounded-full transition-all hover:shadow-lg hover:brightness-105"
          aria-label="Entre em contato via WhatsApp com a Fonoaudióloga Ana Nascimento"
        >
          <WhatsIcon className="w-10 whatsapp-button" />
        </Link>
      </div>
    </div>
  );
};
