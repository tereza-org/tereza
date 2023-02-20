import * as React from 'react';
import { Container, Flex, Text } from '@ttoss/ui';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './ErrorPage';
import { Link } from 'react-router-dom';

export const ModuleContainer = ({
  title,
  links,
  children,
}: {
  title: string;
  links: { label: string; to: string }[];
  children: React.ReactNode;
}) => {
  return (
    <Flex
      sx={{
        height: '100%',
        flexDirection: ['column', 'row'],
      }}
    >
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
            flexDirection: 'column',
            gap: 'md',
            padding: 'md',
          }}
        >
          {links.map((link) => {
            return (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            );
          })}
        </Flex>
      </Flex>
      <Container
        as="main"
        sx={{
          maxWidth: '800px',
          width: '100%',
          padding: 'xl',
        }}
      >
        <React.Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary fallbackRender={ErrorPage}>{children}</ErrorBoundary>
        </React.Suspense>
      </Container>
    </Flex>
  );
};
