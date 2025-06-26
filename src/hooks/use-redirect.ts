'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/fonoaudiologa-jaragua-sul');
  }, [router]); // Isso garante que o redirecionamento ocorra apenas uma vez, na montagem do componente
};
