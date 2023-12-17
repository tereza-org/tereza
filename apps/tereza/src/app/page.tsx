'use client';

import { Button, Flex } from '@ttoss/ui';
import { Hero, Navbar } from '@tereza-tech/components';
import Link from 'next/link';

const links = [
  {
    href: '/my/home',
    label: 'App',
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
      <Navbar
        title="Tereza Tech"
        logo="/tereza200x200.webp"
        links={links.map(({ href, label }) => {
          return (
            <Link href={href} key={href}>
              <Button>{label}</Button>
            </Link>
          );
        })}
      />
      <Hero
        headline="Tereza Tech"
        subhead="We build tools to help you grow and reach your full potential."
        backgroundImage="/tereza.webp"
      />
    </Flex>
  );
};

export default Home;
