import { createContext, useContext } from 'react';

export const MobileContext = createContext(false);

export function useMobile() {
  const isSsrMobile = useContext(MobileContext);
  return isSsrMobile;
}
