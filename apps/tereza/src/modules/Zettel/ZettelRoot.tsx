import { Box, Flex } from '@ttoss/ui';
import { Link, Outlet } from 'react-router-dom';

export const ZettelRoot = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
      }}
    >
      <Flex sx={{ gap: 4, justifyContent: 'center' }}>
        <Link to="/zettel">Home</Link>
        <Link to="/zettel/editor">Editor</Link>
      </Flex>
      <Box>
        <Outlet />
      </Box>
    </Flex>
  );
};
