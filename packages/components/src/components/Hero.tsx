import { Flex, Heading, Text } from 'theme-ui';

export const Hero = ({
  headline,
  subhead,
  backgroundImage,
}: {
  headline: string;
  subhead?: string;
  backgroundImage: string;
}) => {
  return (
    <Flex
      sx={{
        height: '80vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingX: 3,
          gap: 4,
        }}
      >
        <Heading
          as="h1"
          sx={{
            fontSize: [8, 8, 9],
            color: 'primary',
            padding: 0,
            margin: 0,
            textShadow: 'shadow',
            textAlign: 'center',
          }}
        >
          {headline}
        </Heading>
        <Text
          sx={{
            maxWidth: 1000,
            fontSize: [5, 5, 6],
            color: 'white',
            textShadow: 'shadow',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {subhead}
        </Text>
      </Flex>
    </Flex>
  );
};
