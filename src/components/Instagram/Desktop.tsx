import Image from 'next/image';
import Link from 'next/link';
import { instagramData } from './instagramData';

export const Desktop = () => {
  return (
    <div
      className="bg-lightPurple bg-paper w-full text-darkBlue flex flex-col items-center py-20 px-5 scroll-mt-20 gap-y-20 shadow-lg z-[3]"
      id="depoimentos"
    >
      <h2 className="text-3xl sm:text-6xl bg-lightYellow px-16 bg-paper shadow-md font-regular pb-2">Depoimentos</h2>
      <div className="grid grid-cols-3 gap-14">
        {instagramData.map((item) => {
          return (
            <Link
              href={item.href}
              target="_blank"
              key={item.href}
              className="transition-all hover:opacity-90 hover:shadow-2xl shadow-md rounded-2xl overflow-hidden"
            >
              <Image src={item.src} width={400} height={300} alt={item.alt} title={item.title} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
