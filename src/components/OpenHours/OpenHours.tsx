'use client';

import { useWindow } from '@/hooks/useWindow';
import { Mobile } from './Mobile';
import { Desktop } from './Desktop';

export const OpenHours = () => {
  const windowSize = useWindow().windowSize;
  if (windowSize < 1024) {
    return <Mobile />;
  }
  return <Desktop />;
};
