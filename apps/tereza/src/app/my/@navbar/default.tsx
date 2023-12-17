'use client';

import * as React from 'react';
import { Button, Flex, Text } from '@ttoss/ui';
import { useAuth } from '@ttoss/react-auth';
import Link from 'next/link';

const Navbar = () => {
  const { signOut } = useAuth();

  const onSignOut = React.useCallback(() => {
    signOut().then(() => {
      window.location.href = '/';
    });
  }, [signOut]);

  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        padding: 'lg',
        alignItems: 'center',
      }}
    >
      <Text>Tereza</Text>
      <Flex
        sx={{
          gap: 'lg',
        }}
      >
        <Link href="/my/journal">Journal</Link>
        <Link href="/my/zettel">Zettel</Link>
      </Flex>
      <Button onClick={onSignOut}>Sign out</Button>
    </Flex>
  );
};

export default Navbar;
