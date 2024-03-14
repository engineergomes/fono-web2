'use client';

import { navigation } from '@/components/Header/navigation';
import { createContext, useContext } from 'react';

import { useState, useEffect } from 'react';
import TagManager from 'react-gtm-module';

const CurrentUrlContext = createContext<any[]>([]);

export default function UrlProvider({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const [currentUrl, setCurrentUrl] = useState<string>('transparent');
  return <CurrentUrlContext.Provider value={[currentUrl, setCurrentUrl]}>{children}</CurrentUrlContext.Provider>;
}

export function useUrl() {
  type ContextType = string;
  const [currentUrl, setCurrentUrl] = useState<ContextType>('transparent');

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NTZHB543' });
  }, []);

  useEffect(() => {
    navigation.map((item) => {
      if (currentUrl === item.href) {
        window.history.replaceState(null, '', item.href);
        // document.getElementById(item.href.slice(1))?.clientHeight;
      } else if (currentUrl === '#horarios') {
        window.history.replaceState(null, '', '#horarios');
      }
    });
  }, [currentUrl]);
  const context = useContext(CurrentUrlContext);
  return { currentUrl, setCurrentUrl };
}
