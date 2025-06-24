import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NTZHB543' });
  }, []);
  return <>{children}</>;
}
