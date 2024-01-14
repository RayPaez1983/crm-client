import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/sign-in.context';
import { useToken } from '@/context/token.context';

interface MenuProps {
  dataMenu: Array<{ pathName: string; title: string }>;
}

export const Menu = ({ dataMenu }: MenuProps) => {
  const menuStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row', // Valid value for flex direction
    gap: '10px',
    backgroundColor: '#3a3af1',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
    position: 'fixed',
    top: '0',
    width: '100%',
  };
  const router = useRouter();
  const { handleLogout } = useAuth();
  const { tokenState } = useToken();

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
      {tokenState.token ? <div onClick={signOut}>Cerrar Sesion</div> : null}
    </div>
  );
};
