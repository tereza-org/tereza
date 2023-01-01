import { Box, Flex, Text } from '@ttoss/ui';
import { Outlet } from 'react-router-dom';

export const ZettelRoot = () => {
  return (
    <Flex>
      <Flex>
        <Text>Zettel</Text>
      </Flex>
      <Box as="main">
        <Outlet />
      </Box>
    </Flex>
  );
};
