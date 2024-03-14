import { Pencil } from 'phosphor-react-sc';
import Image from 'next/image';

export const ServicesInfo = (props: any) => {
  return (
    <div className="flex justify-center bg-white w-fit py-16 px-10 rounded-3xl gap-x-10 h-full shadow-md bg-paper">
      <div className="flex flex-col items-center gap-y-5 justify-center">
        <div className="flex flex-col gap-y-5">
          <h2 className="text-3xl text-darkBlue font-medium">{props.data.title}</h2>
          <p className="text-lg text-gray-700 max-w-[45ch] self-center">{props.data.text}</p>
        </div>
        <ul className="[&>*]:flex [&>*]:text-xl [&>*]:text-darkBlue flex flex-col gap-y-5 whitespace-nowrap">
          <li>
            <Pencil size={32} className="mr-2" />
            {props.data.firstListItem}
          </li>
          <li>
            <Pencil size={32} className="mr-2" />
            {props.data.secondListItem}
          </li>
          <li>
            <Pencil size={32} className="mr-2" />
            {props.data.thirdListItem}
          </li>
        </ul>
      </div>
      <Image className="rounded-3xl object-cover" src={props.data.image} width={500} height={300} alt="services" />
    </div>
  );
};
