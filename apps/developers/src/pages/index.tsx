import * as React from 'react';
import { Hero } from '@tereza-tech/components';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Home = () => {
  const { siteConfig } = useDocusaurusContext();

  const backgroundImage = useBaseUrl('/img/tereza.webp');

  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <Hero
        headline={siteConfig.title}
        subhead={siteConfig.tagline}
        backgroundImage={backgroundImage}
      />
      {/* <main></main> */}
    </Layout>
  );
};

export default Home;
