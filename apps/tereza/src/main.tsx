import { App } from './App';
import { AuthProvider } from '@ttoss/react-auth';
import { I18nProvider } from '@ttoss/react-i18n';
import { NotificationsProvider } from '@ttoss/react-notifications';
import { ThemeProvider } from '@tereza-tech/theme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './amplify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <NotificationsProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NotificationsProvider>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>
);
