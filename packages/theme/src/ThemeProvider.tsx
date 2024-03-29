import { ThemeProvider as TtossThemeProvider } from '@ttoss/ui';
// import { fonts, theme } from './theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TtossThemeProvider>
      <>{children}</>
    </TtossThemeProvider>
  );
};
