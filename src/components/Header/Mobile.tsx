import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { navigation } from './navigation';
import { List, X } from 'phosphor-react-sc';
import Image from 'next/image';
import React, { useEffect } from 'react'; // Importe o useEffect
import Container from '../Container';
import { useUrl } from '@/providers/UrlProvider';
import InstagramIcon from '@/assets/InstagramIcon';

export const Mobile = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar se o menu está aberto

  const { currentUrl, setCurrentUrl } = useUrl();

  useEffect(() => {
    if (menuOpen) {
      // Bloqueie o scroll quando o menu estiver aberto
      document.body.style.overflow = 'hidden';
    } else {
      // Remova o bloqueio de scroll quando o menu estiver fechado
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <>
      <Popover as={React.Fragment}>
        <div className="flex w-full justify-between items-center h-16">
          <Link className="px-4" href="/">
            <Image src={'/logo-full-text-black.webp'} alt={'logo'} width={300} height={70} />
          </Link>
          <Popover.Button className={`h-full px-4`} onClick={() => setMenuOpen(!menuOpen)}>
            {' '}
            {/* Altere o estado do menu quando o botão for clicado */}
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
              <div className="flex w-full items-center justify-between z-50">
                <Link href="/" className="px-4">
                  <Popover.Button>
                    <Image src={'/logo-full-text-black.webp'} alt={'logo'} width={260} height={70} />
                  </Popover.Button>
                </Link>

                <Popover.Button className={`h-full px-4 pb-6 pt-2`} onClick={() => setMenuOpen(false)}>
                  {' '}
                  {/* Feche o menu quando o botão for clicado */}
                  <X weight="bold" className="h-6 w-6  fill-lightPurple hover:fill-black/70"></X>
                </Popover.Button>
              </div>
              <div className="flex flex-col text-left mt-10 gap-y-4 items-center">
                {navigation.map((item) => {
                  return (
                    <Link href={item.href} key={item.href}>
                      <Popover.Button
                        className={`text-xl font-semibold flex items-center justify-center py-4 w-full px-20 
                          ${item.href === currentUrl ? 'bg-lightPurple bg-paper rounded-full' : 'text-lightPurple'}
                        `}
                        onClick={() => setMenuOpen(!menuOpen)}
                      >
                        {item.name}
                      </Popover.Button>
                    </Link>
                  );
                })}
                <Link href="https://www.instagram.com/fonoananascimento/" target="_blank">
                  <Popover.Button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-full transition-all hover:shadow-lg hover:brightness-105"
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
