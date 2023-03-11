import { Box, Flex, Heading } from '@ttoss/ui';
import { Suspense } from './Suspense';

export const ModuleMain = ({
  title,
  children,
}: React.PropsWithChildren<{
  title: string;
}>) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      <Heading as="h1">{title}</Heading>
      <Suspense>
        <Box
          sx={{
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Suspense>
    </Flex>
  );
};
