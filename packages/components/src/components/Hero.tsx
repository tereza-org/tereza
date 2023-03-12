import { Flex, Heading, Text } from '@ttoss/ui';

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
          paddingX: 'md',
          gap: 'md',
        }}
      >
        <Heading
          as="h1"
          sx={{
            fontSize: ['2xl', '3xl', '5xl'],
            color: 'primary',
            padding: 'md',
            margin: 0,
            textShadow: 'shadow',
            textAlign: 'center',
            backgroundColor: 'black',
          }}
        >
          {headline}
        </Heading>
        <Text
          sx={{
            maxWidth: 1000,
            fontSize: ['md', 'md', 'xl'],
            color: 'white',
            textShadow: 'shadow',
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: 'black',
            padding: 'sm',
          }}
        >
          {subhead}
        </Text>
      </Flex>
    </Flex>
  );
};
