import { Pencil } from 'phosphor-react-sc';
import Image from 'next/image';

export const ServicesInfo = (props: any) => {
  return (
    <div className="flex justify-center bg-white w-fit py-10 xl:py-16 px-10 xl:px-10 rounded-3xl gap-x-10 h-full shadow-md bg-paper">
      <div className="grid grid-cols-2 gap-x-10">
        <div className="flex flex-col items-start gap-y-5 justify-center">
          <div className="flex flex-col gap-y-5">
            <h2 className="text-xl xl:text-2xl text-darkBlue font-medium  text-left">
              {props.data.title.split('\n').map((line: string, index: number) => (
                <span key={index}>
                  {line}
                  {index < props.data.title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="text-base xl:text-lg text-gray-700  text-left">{props.data.text}</p>
          </div>
          <ul className="[&>*]:flex [&>*]:text-xl [&>*]:text-darkBlue flex flex-col gap-y-5 whitespace-nowrap">
            <li className="whitespace-normal text-left">
              <Pencil size={32} className="mr-2" />
              {props.data.firstListItem}
            </li>
            <li className="whitespace-normal text-left">
              <Pencil size={32} className="mr-2" />
              {props.data.secondListItem}
            </li>
            <li className="whitespace-normal text-left">
              <Pencil size={32} className="mr-2" />
              {props.data.thirdListItem}
            </li>
          </ul>
        </div>
        <Image
          className="rounded-3xl object-cover my-auto"
          src={props.data.image}
          width={500}
          height={300}
          alt={props.data.alt}
          title={props.data.title}
        />
      </div>
    </div>
  );
};
