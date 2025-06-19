import { useEffect, useRef, useState } from 'react';
import { ServicesInfo } from './ServicesInfo';
import { ServicesType, services } from './data';
import { Transition } from '@headlessui/react';
import { useInView } from 'react-intersection-observer';
import { useUrl } from '@/providers/UrlProvider';

export const Desktop = () => {
  const [showService, setShowService] = useState<ServicesType | ''>('linguagem');
  const [aux, setAux] = useState<number>(1);

  const handleClick = (e: any) => {
    serviceRef.current = showService as ServicesType;
    setShowService('');

    return setTimeout(() => {
      return setShowService(e);
    }, 300);
  };

  const serviceRef = useRef<ServicesType>('linguagem');

  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });

  const { currentUrl, setCurrentUrl } = useUrl();

  useEffect(() => {
    if (inView) {
      setCurrentUrl('#servicos');
    }
  }, [inView, setCurrentUrl]);

  return (
    <>
      <div className="flex justify-center" ref={ref}>
        <div
          className="flex flex-wrap border-2 border-lightBlue border-dashed rounded-full
       justify-center font-semibold select-none
       items-center p-4 max-w-[1200px]"
        >
          {Object.values(services).map((service, index) => {
            return (
              <button
                key={service.name}
                onClick={(e) => {
                  const target = e.target as Element;
                  setAux(service.order);
                  return handleClick(target.id.toString());
                }}
                id={Object.keys(services).find((key) => services[key as ServicesType].name === service.name)}
                className={`px-8 py-3 rounded-3xl whitespace-nowrap transition-all font-bold ${
                  aux === service.order ? 'bg-lightBlue text-white bg-paper' : 'text-white hover:brightness-110'
                } `}
              >
                {service.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="h-[508px] px-10 flex w-full items-center justify-center">
        <Transition
          show={Object.keys(services).includes(showService)}
          enter="transform transition duration-[500ms]"
          enterFrom="opacity-0  scale-50"
          enterTo="opacity-100 rotate-0 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100 "
          leaveTo="opacity-0 scale-50 "
          className="h-full"
        >
          <ServicesInfo data={services[showService ? showService : serviceRef.current]} />
        </Transition>
      </div>
    </>
  );
};
