import { Container, Flex, Heading, Link, Text } from '@ttoss/ui';

export const ComingSoon = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        gap: 'xl',
        maxWidth: '500px',
        textAlign: 'center',
        marginTop: '3xl',
      }}
    >
      <Heading as="h1">Coming Soon 🚀</Heading>
      <Text>
        Tereza App is currently under development. Please check back later or
        contact me on <Link href="https://twitter.com/arantespp">Twitter</Link>{' '}
        to get early access.
      </Text>
    </Container>
  );
};
