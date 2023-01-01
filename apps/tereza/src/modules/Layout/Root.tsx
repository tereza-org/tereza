import { AppsNav } from './AppsNav';
import { Box, Flex, Text } from '@ttoss/ui';
import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex as="nav">
        <Text>Tereza App</Text>
      </Flex>
      <AppsNav />
      <Box as="main">
        <Outlet />
      </Box>
    </Flex>
  );
};
