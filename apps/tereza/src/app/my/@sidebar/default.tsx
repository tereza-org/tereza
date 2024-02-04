'use client';

import * as React from 'react';
import { Flex, Text } from '@ttoss/ui';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const capitalizeFirstLetter = (str?: string) => {
  if (!str) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getTitleFromPathname = (pathname: string) => {
  const [, , module] = pathname.split('/');
  return capitalizeFirstLetter(module);
};

const LINKS: {
  [key: string]: {
    href: string;
    label: string;
  }[];
} = {
  '/my/journal': [
    {
      href: '/my/journal',
      label: 'Home',
    },
    {
      href: '/my/journal/stats',
      label: 'Stats',
    },
    {
      href: '/my/journal/all',
      label: 'All',
    },
  ],
  '/my/zettel': [
    {
      href: '/my/zettel',
      label: 'Home',
    },
    {
      href: '/my/zettel/new',
      label: 'New',
    },
    {
      href: '/my/zettel/references',
      label: 'References',
    },
    {
      href: '/my/zettel/all',
      label: 'All',
    },
  ],
};

const getLinksFromPathname = (pathname: string) => {
  const [, my, module] = pathname.split('/');
  const key = ['', my, module].join('/');
  return LINKS[key] || [];
};

const Sidebar = () => {
  const pathname = usePathname();

  const { links, title } = React.useMemo(() => {
    return {
      title: getTitleFromPathname(pathname),
      links: getLinksFromPathname(pathname),
    };
  }, [pathname]);

  return (
    <Flex
      as="nav"
      sx={{
        flexDirection: 'column',
        width: ['100%', '200px'],
        borderRight: ['none', '1px solid'],
        borderBottom: ['1px solid', 'none'],
        height: '100%',
      }}
    >
      <Text
        sx={{
          color: 'onPrimary',
          backgroundColor: 'primary',
          textAlign: 'center',
          marginBottom: 'md',
          padding: 'sm',
        }}
      >
        {title}
      </Text>
      <Flex
        sx={{
          flexDirection: ['row', 'column'],
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'lg',
          padding: 'md',
        }}
      >
        {links.map((link) => {
          return (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
