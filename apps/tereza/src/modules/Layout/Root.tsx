import { AppsNav } from './AppsNav';
import { Box, Button, Flex, Text } from '@ttoss/ui';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@ttoss/react-auth';

export const Root = () => {
  const { signOut } = useAuth();

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex as="nav">
        <Text>Tereza App</Text>
        <Button onClick={signOut}>Sign out</Button>
      </Flex>
      <AppsNav />
      <Box as="main">
        <Outlet />
      </Box>
    </Flex>
  );
};
