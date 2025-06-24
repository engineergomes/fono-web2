import { Whatsapp } from '@/components/widgets/Whatsapp';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`scroll-smooth ${montserrat.variable}`}>
      <div className="scroll-smooth w-screen overflow-x-hidden">
        <Component {...pageProps} />
        <Whatsapp />
      </div>
    </div>
  );
}
