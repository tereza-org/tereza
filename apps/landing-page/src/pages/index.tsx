import { Flex } from 'theme-ui';
import { Hero, Navbar } from '@tereza-tech/components';
import Head from 'next/head';
import Link from 'next/link';

const description =
  'We build tools to help you grow and reach your full potential.';

const links = [
  {
    href: 'http://developers.tereza.tech/',
    label: 'Developers',
  },
];

const Home = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        backgroundColor: 'secondary',
        minHeight: '100vh',
      }}
    >
      <Head>
        <title>Tereza Tech</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        title="Tereza Tech"
        logo="/tereza200x200.webp"
        links={links.map(({ href, label }) => {
          return (
            <Link href={href} key={href}>
              {label}
            </Link>
          );
        })}
      />
      <Hero
        headline="Tereza Tech"
        subhead={description}
        backgroundImage="/tereza.webp"
      />
    </Flex>
  );
};

export default Home;
