import * as React from 'react';
import { AppsNav } from './AppsNav';
import { Box, Button, Container, Flex, Text } from '@ttoss/ui';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@ttoss/react-auth';

export const Root = () => {
  const { signOut } = useAuth();

  return (
    <Container
      sx={{
        maxWidth: 800,
      }}
    >
      <Flex
        as="nav"
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Text>Tereza App</Text>
        <Button onClick={signOut}>Sign out</Button>
      </Flex>
      <AppsNav />
      <Box as="main">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </React.Suspense>
      </Box>
    </Container>
  );
};
