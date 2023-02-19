import * as React from 'react';
import { Container, Flex } from '@ttoss/ui';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Navbar />
      <Container sx={{ flex: 1 }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </React.Suspense>
      </Container>
    </Flex>
  );
};
