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
        <Link href="">
          <Image src={'/logo-full-text-black.webp'} alt={'logo'} width={350} height={100} />
        </Link>
      </div>
      {navigation.map((item) => {
        if (item.href !== '#sobre') {
          return (
            <div key={item.href} className={`flex gap-4 cursor-pointer border-b-2 hover:border-lightPurple text-xl`}>
              <Link href={item.href} className="px-3 py-1">
                <p className="text-lightPurple whitespace-nowrap">{item.name}</p>
              </Link>
            </div>
          );
        } else {
          return (
            <Menu as="div" className="relative" key={item.href}>
              <div key={item.href} className={`flex gap-4 cursor-pointer border-b-2 hover:border-lightPurple text-xl`}>
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
                  className="absolute -right-24 mt-2 w-56 origin-top-right 
                 rounded-md bg-[#f0f0f0] border border-lightPurple  shadow-md focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="#sobre">
                        <button
                          className={`${
                            active ? 'bg-lightPurple text-white' : 'text-lightPurple'
                          } group flex w-full items-center rounded-md px-2 py-2 text-xl transition-all`}
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
                          } group flex w-full items-center rounded-md px-2 py-2 text-xl transition-all`}
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
        }
      })}
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
          <WhatsIcon className="w-10" />
        </Link>
      </div>
    </div>
  );
};
