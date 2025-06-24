import { Disclosure, Transition } from '@headlessui/react';
import { CaretUp, Pencil } from 'phosphor-react-sc';
import Image from 'next/image';
import { services } from './data';

import React from 'react';

export const Mobile = () => {
  return (
    <>
      <div className="w-full p-2 flex items-center justify-center">
        <div className=" w-full max-w-md  sm:max-w-lg md:max-w-2xl rounded-2xl py-10 px-4 md:px-8 md:py-10 bg-white bg-paper flex flex-col gap-y-8">
          {Object.values(services).map((service, index) => {
            return (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className="flex w-full justify-between rounded-lg items-center
                         bg-lightBlue bg-paper px-4 py-2 text-left text-sm font-medium text-white
                          hover:bg-lightBlue focus:outline-none focus-visible:ring
                           focus-visible:bg-lightBlue focus-visible:ring-opacity-75"
                    >
                      <span className="text-lg">{service.name}</span>
                      <CaretUp
                        className={`${open ? ' transform' : 'rotate-180'} transition-all h-5 w-5 text-white-500`}
                      />
                    </Disclosure.Button>
                    <Transition
                      as={React.Fragment}
                      enter="duration-300 ease-out"
                      enterFrom="opacity-0 -translate-y-20"
                      enterTo="opacity-100 translate-y-0"
                      leave="duration-200 ease-in"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-20"
                    >
                      <Disclosure.Panel className="px-4 pb-2 text-sm text-[#493d3d]">
                        <div className="flex flex-col items-center gap-y-5">
                          <Image
                            className="rounded-3xl"
                            src={service.image}
                            width={300}
                            height={120}
                            alt="Mulher em sala representando Intervenção Fonoaudiológica com atendimento personalizado e suporte para os pais em Jaraguá do Sul."
                            title="Intervenção Fonoaudióloga em Jaraguá do Sul - Consultório Acolhedor"
                          />
                          <div className="flex flex-col gap-y-5 mt-5">
                            <h2 className="text-xl text-darkBlue">{service.title}</h2>
                            <p className="text-sm font-normal sm:text-lg sm:font-light">{service.text}</p>
                          </div>
                          <ul className="[&>*]:flex text-sm leading-6  [&>*]:text-darkBlue grid grid-rows-3 gap-y-5">
                            <li className="flex items-center justify-start ">
                              <Pencil size={20} className="mr-2" />
                              <p className="text-left"> {service.firstListItem}</p>
                            </li>
                            <li className="flex items-center justify-start">
                              <Pencil size={20} className="mr-2" />
                              <p className="text-left"> {service.secondListItem}</p>
                            </li>
                            <li className="flex items-center justify-start">
                              <Pencil size={20} className="mr-2" />
                              <p className="text-left">{service.thirdListItem}</p>
                            </li>
                          </ul>
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            );
          })}
        </div>
      </div>
    </>
  );
};
