'use client';

import { useWindow } from '@/hooks/useWindow';
import { Mobile } from './Mobile';
import { Desktop } from './Desktop';

export const Instagram = () => {
  const windowSize = useWindow().windowSize;
  if (windowSize < 500) {
    return <Mobile />;
  } else {
    return <Desktop />;
  }
};
