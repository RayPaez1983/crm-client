// ParentComponent.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { Menu } from './menu';
import { useAuth } from '@/context/sign-in.context';
import { useRouter } from 'next/router';
import { logOutMenu, dataMenu } from '../localData/Menu';
import { wrapperStyles } from './styles';

interface ParentProps {
  children: ReactNode;
}

const WrapperComponent: React.FC<ParentProps> = ({ children }) => {
  const [token, setToken] = useState<String>('');
  const router = useRouter();
  const { authState } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(window.localStorage.getItem('token') as string);
    }
  }, [authState.dataLogin.token]);



return (
  <>
    <Menu dataMenu={token ? dataMenu : logOutMenu} />
    <div style={wrapperStyles}>{children}</div>
  </>
);
};

export default WrapperComponent;
