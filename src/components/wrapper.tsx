// ParentComponent.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { Menu } from './menu';
import { useAuth } from '@/context/sign-in.context';
import { useRouter } from 'next/router';
import { logOutMenu, dataMenu } from '../localData/Menu';

interface ParentProps {
  children: ReactNode;
}

const WrapperComponent: React.FC<ParentProps> = ({ children }) => {
  const [token, setToken] = useState<String>('');
  const router = useRouter();
  const { authState } = useAuth();
  const wrapperStyles: React.CSSProperties = {
    backgroundColor: '#44c3c3',
    height: '100vh',
    padding: '40px 20px',
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(window.localStorage.getItem('token') as string);
    }
  }, [authState.dataLogin.token]);

  const isSignInPage = router.pathname === '/sign-in';

  return (
    <>
      <Menu dataMenu={!isSignInPage && token ? dataMenu : logOutMenu} />
      <div style={wrapperStyles}>{children}</div>
    </>
  );
};

export default WrapperComponent;
