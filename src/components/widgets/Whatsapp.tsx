// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import WhatsIcon from '@/assets/WhatsIcon';

export function Whatsapp() {
  return (
    <>
      <a
        href="https://wa.me/5548984727432"
        target="_blank"
        rel="noreferrer"
        className="shaking bg-[#25D366] rounded-full hover:pr-6 text-white whatsapp-button items-center flex group fixed bottom-10 
        right-5 lg:bottom-10 lg:right-10 drop-shadow-xl z-50 font-bold"
      >
        <WhatsIcon className="lg:h-20 lg:w-20 h-16 w-16" />
        <span className="max-w-0 group-hover:-ml-2 overflow-hidden group-hover:max-w-xs duration-700 whitespace-nowrap">
          Converse agora!
        </span>
      </a>
    </>
  );
}
