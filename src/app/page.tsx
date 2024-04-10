'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/fonoaudiologa-juaragua-sul');
  }, []); // Isso garante que o redirecionamento ocorra apenas uma vez, na montagem do componente

  return <></>;
}
