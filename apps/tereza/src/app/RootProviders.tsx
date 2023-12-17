'use client';

import { Amplify } from 'aws-amplify';
import { AuthProvider } from '@ttoss/react-auth';
import { I18nProvider, LoadLocaleData } from '@ttoss/react-i18n';
import { NotificationsProvider } from '@ttoss/react-notifications';
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
        <NotificationsProvider>
          <AuthProvider>{children}</AuthProvider>
        </NotificationsProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};
