'use client';

import { Amplify } from 'aws-amplify';
import { I18nProvider, LoadLocaleData } from '@ttoss/react-i18n';
import { ThemeProvider } from '@ttoss/ui';
import { amplifyConfig } from 'src/amplify/amplifyConfig';

const loadLocaleData: LoadLocaleData = async (locale) => {
  switch (locale) {
    default:
      return (await import('../../i18n/compiled/en.json')).default;
  }
};

Amplify.configure(amplifyConfig);

export const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <I18nProvider locale="en" loadLocaleData={loadLocaleData}>
        {children}
      </I18nProvider>
    </ThemeProvider>
  );
};
