import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { navigation } from './navigation';
import { List, X } from 'phosphor-react-sc';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Container from '../../Container';
import InstagramIcon from '@/assets/InstagramIcon';

export const Mobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      // Block scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Remove scroll block when menu is closed
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <>
      <Popover as={React.Fragment}>
        <div className="flex w-full justify-center sm:justify-between items-center h-16 sm:h-20">
          <Link className="px-4" href="/">
            <Image src={'/logo-full-text-black.webp'} alt={'logo'} width={300} height={70} />
          </Link>
          <Popover.Button
            className={`h-full px-4 mr-4`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu de navegação"
          >
            <List className="w-8 h-8" />
          </Popover.Button>
        </div>
        <Transition
          as={Fragment}
          enter="duration-300 ease-out"
          enterFrom="opacity-100 -translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-full"
        >
          <Popover.Panel className="absolute z-50 inset-0 bg-lightGreen bg-paper h-screen w-screen overflow-hidden">
            <Container>
              <div className="flex w-screen items-center justify-between z-50 p-4">
                <div className="flex-grow"></div>
                <div className="flex-shrink-0">
                  <Link href="/" className="px-4">
                    <Popover.Button aria-label="Voltar à página inicial">
                      <Image src={'/logo-full-text-black.webp'} alt={'logo'} width={260} height={70} />
                    </Popover.Button>
                  </Link>
                </div>
                <div className="flex-grow flex justify-end">
                  <Popover.Button
                    className="h-full pb-6 pt-2"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Fechar menu de navegação"
                  >
                    <X weight="bold" className="h-6 w-6 fill-lightPurple hover:fill-black/70" />
                  </Popover.Button>
                </div>
              </div>

              <div className="flex flex-col text-left mt-10 gap-y-4 items-center">
                {navigation.map((item) => (
                  <Link href={item.href} key={item.href}>
                    <Popover.Button
                      className=" text-xl font-semibold flex items-center justify-center py-4 w-full px-20  hover:bg-lightPurple hover:bg-paper rounded-full "
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      {item.name}
                    </Popover.Button>
                  </Link>
                ))}
                <Link href="https://www.instagram.com/fonoananascimento/" target="_blank">
                  <Popover.Button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-full transition-all hover:shadow-lg hover:brightness-105"
                    aria-label="Siga a Fonoaudióloga Ana Nascimento no Instagram"
                  >
                    <InstagramIcon className="w-10" />
                  </Popover.Button>
                </Link>
              </div>
            </Container>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};
