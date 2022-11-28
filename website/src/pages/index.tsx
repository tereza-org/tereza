import * as React from 'react';
import { Flex, Heading, Text } from '@ttoss/ui';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Hero = () => {
  const { siteConfig } = useDocusaurusContext();

  const backgroundImage = useBaseUrl('/img/tereza.webp');

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
        }}
      >
        <Heading
          as="h1"
          variant="h1"
          sx={{
            color: 'primary',
            padding: 0,
            margin: 0,
            textShadow: ({ colors }) =>
              `0 0 10px ${colors?.secondary}, 0 0 16px ${colors?.secondary}`,
          }}
        >
          {siteConfig.title}
        </Heading>
        <Text
          sx={{
            fontSize: [4, 5, 6],
            color: 'secondary',
            textShadow: ({ colors }) =>
              `0 0 4px ${colors?.white}, 0 0 4px ${colors?.white}`,
            fontWeight: 'bold',
          }}
        >
          {siteConfig.tagline}
        </Text>
      </Flex>
    </Flex>
  );
};

const Home = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <Hero />
      {/* <main></main> */}
    </Layout>
  );
};

export default Home;
