import { DecoratorFn } from '@storybook/react';
import { ThemeProvider } from '@tereza-tech/theme';
import * as React from 'react';
import { Flex } from '@ttoss/ui';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators: DecoratorFn[] = [
  (Story) => (
    <ThemeProvider>
      <Flex sx={{ flex: 1 }}>
        <Story />
      </Flex>
    </ThemeProvider>
  ),
];
