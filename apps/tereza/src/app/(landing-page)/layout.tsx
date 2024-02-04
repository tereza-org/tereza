'use client';

import { Button, Flex, Image, Stack, Text } from '@ttoss/ui';
import Link from 'next/link';

const Header = ({
  logo,
  title,
  links,
}: {
  logo: string;
  title: string;
  links: React.ReactNode[];
}) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 72,
        paddingY: 'md',
        paddingX: ['md', 'md', 'lg'],
        backgroundColor: 'background',
      }}
    >
      <Flex sx={{ gap: 'md' }}>
        <Image src={logo} width={32} height={32} />
        <Text sx={{ fontWeight: 'bold', fontSize: ['base', 'base', 'lg'] }}>
          {title}
        </Text>
      </Flex>
      <Flex
        sx={{
          gap: 'lg',
          fontSize: ['md', 'md', 'md'],
        }}
      >
        {links}
      </Flex>
    </Flex>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 72,
        paddingY: 'md',
        backgroundColor: 'background',
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/privacy">Privacy Policy</Link>
      <Text sx={{ fontSize: 'sm' }}>© {year} Tereza</Text>
    </Stack>
  );
};

const links = [
  {
    href: '/my/journal',
    label: 'App',
  },
];

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex sx={{ flexDirection: 'column', height: '100vh' }}>
      <Header
        title="Tereza"
        logo="/tereza200x200.webp"
        links={links.map(({ href, label }) => {
          return (
            <Link href={href} key={href}>
              <Button>{label}</Button>
            </Link>
          );
        })}
      />
      <>{children}</>
      <Footer />
    </Flex>
  );
};

export default LandingPageLayout;
