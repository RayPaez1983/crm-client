import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/sign-in.context';
import { useToken } from '@/context/token.context';
import { menuStyles } from './styles';

interface MenuProps {
  dataMenu: Array<{ pathName: string; title: string }>;
}

export const Menu = ({ dataMenu }: MenuProps) => {
  const router = useRouter();
  const { handleLogout } = useAuth();
  const { tokenState } = useToken();

  const isSignInPage = router.pathname === '/sign-in';

  const signOut = () => {
    handleLogout();
  };

  return (
    <div style={menuStyles}>
      {dataMenu.map((item, idx) => (
        <div
          key={idx}
          onClick={() =>
            router.push({
              pathname: item.pathName,
            })
          }>
          {item.title}
        </div>
      ))}
      {!isSignInPage && tokenState.token ? (
        <div onClick={signOut}>Cerrar Sesion</div>
      ) : null}
    </div>
  );
};
