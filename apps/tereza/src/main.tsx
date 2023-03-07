import * as React from 'react';
import { App } from './App';
import { AuthProvider } from '@ttoss/react-auth';
import { I18nProvider } from '@ttoss/react-i18n';
import { NotificationsProvider } from '@ttoss/react-notifications';
import { RelayProvider } from './modules/ApiClient/RelayProvider';
import { Suspense } from './modules/Layout/Suspense';
import { ThemeProvider } from '@tereza-tech/theme';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <ThemeProvider>
        <I18nProvider>
          <NotificationsProvider>
            <AuthProvider>
              <RelayProvider>
                <App />
              </RelayProvider>
            </AuthProvider>
          </NotificationsProvider>
        </I18nProvider>
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>
);
