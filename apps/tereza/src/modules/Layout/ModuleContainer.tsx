import * as React from 'react';
import { Box, Container, Flex, Text } from '@ttoss/ui';
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
        position: 'relative',
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
            gap: 'lg',
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
      <Flex
        sx={{
          width: '100%',
          justifyContent: 'center',
          overflowY: 'auto',
          padding: 'xl',
        }}
      >
        <Container
          as="main"
          sx={{
            maxWidth: '800px',
            width: '100%',
            height: '100%',
          }}
        >
          <React.Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary fallbackRender={ErrorPage}>
              <Box
                sx={{
                  paddingBottom: '3xl',
                }}
              >
                {children}
              </Box>
            </ErrorBoundary>
          </React.Suspense>
        </Container>
      </Flex>
    </Flex>
  );
};
