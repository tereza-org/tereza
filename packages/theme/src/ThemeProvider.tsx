import { Global, css } from '@emotion/react';
import { ThemeProvider as ThemeUiProvider } from 'theme-ui';
import { theme } from './theme';

const Fonts = css`
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap');
`;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeUiProvider theme={theme}>
      <Global styles={Fonts} />
      {children}
    </ThemeUiProvider>
  );
};
