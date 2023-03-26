import * as React from 'react';
import { Container, Flex } from '@ttoss/ui';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export const AppRoot = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        height: ['100%', '100vh'],
        overflowY: ['hidden'],
        overflowX: 'hidden',
      }}
    >
      <Navbar />
      <Container sx={{ flex: 1, overflowY: 'auto' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </React.Suspense>
      </Container>
    </Flex>
  );
};