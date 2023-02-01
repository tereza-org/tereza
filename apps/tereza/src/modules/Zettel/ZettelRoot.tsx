import { Box, Flex, Text } from '@ttoss/ui';
import { Outlet } from 'react-router-dom';

export const ZettelRoot = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
      }}
    >
      <Flex>
        <Text>Zettel Home</Text>
      </Flex>
      <Box>
        <Outlet />
      </Box>
    </Flex>
  );
};
